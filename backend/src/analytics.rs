use axum::{Json, extract::State, http::StatusCode};
use chrono::NaiveDate;
use serde::{Deserialize, Serialize};

use crate::{
    auth::{Admin, ClientIp},
    error::{AppError, AppResult},
    state::AppState,
};

const KINDS: [&str; 3] = ["page_view", "cv_download", "project_click"];

#[derive(Deserialize)]
pub struct EventInput {
    kind: String,
    target: Option<String>,
}

pub async fn record(
    State(state): State<AppState>,
    ClientIp(ip): ClientIp,
    Json(input): Json<EventInput>,
) -> AppResult<StatusCode> {
    if !KINDS.contains(&input.kind.as_str()) {
        return Err(AppError::BadRequest("unknown event kind".into()));
    }
    if input.target.as_ref().is_some_and(|t| t.chars().count() > 200) {
        return Err(AppError::BadRequest("target must be at most 200 characters".into()));
    }
    // Over the limit: drop silently, analytics shouldn't surface errors to visitors.
    if !state.event_limiter.allow(ip) {
        return Ok(StatusCode::NO_CONTENT);
    }

    sqlx::query!(
        "INSERT INTO events (kind, target) VALUES ($1, $2)",
        input.kind,
        input.target,
    )
    .execute(&state.db)
    .await?;
    Ok(StatusCode::NO_CONTENT)
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct KindCount {
    kind: String,
    total: i64,
    last_30_days: i64,
}

#[derive(Serialize)]
pub struct DailyViews {
    day: NaiveDate,
    views: i64,
}

#[derive(Serialize)]
pub struct TargetCount {
    target: String,
    clicks: i64,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Stats {
    totals: Vec<KindCount>,
    daily_page_views: Vec<DailyViews>,
    top_projects: Vec<TargetCount>,
    messages: i64,
}

pub async fn stats(_: Admin, State(state): State<AppState>) -> AppResult<Json<Stats>> {
    let totals = sqlx::query_as!(
        KindCount,
        r#"SELECT kind,
                  COUNT(*) AS "total!",
                  COUNT(*) FILTER (WHERE created_at > now() - interval '30 days') AS "last_30_days!"
           FROM events GROUP BY kind ORDER BY kind"#
    )
    .fetch_all(&state.db)
    .await?;

    let daily_page_views = sqlx::query_as!(
        DailyViews,
        r#"SELECT created_at::date AS "day!", COUNT(*) AS "views!"
           FROM events
           WHERE kind = 'page_view' AND created_at > now() - interval '30 days'
           GROUP BY 1 ORDER BY 1"#
    )
    .fetch_all(&state.db)
    .await?;

    let top_projects = sqlx::query_as!(
        TargetCount,
        r#"SELECT target AS "target!", COUNT(*) AS "clicks!"
           FROM events
           WHERE kind = 'project_click' AND target IS NOT NULL
           GROUP BY target ORDER BY 2 DESC LIMIT 10"#
    )
    .fetch_all(&state.db)
    .await?;

    let messages = sqlx::query_scalar!(r#"SELECT COUNT(*) AS "count!" FROM messages"#)
        .fetch_one(&state.db)
        .await?;

    Ok(Json(Stats {
        totals,
        daily_page_views,
        top_projects,
        messages,
    }))
}
