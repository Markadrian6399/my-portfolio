use axum::{Json, extract::State, http::StatusCode};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};

use crate::{
    auth::{Admin, ClientIp},
    error::{AppError, AppResult, require_text},
    state::AppState,
};

#[derive(Deserialize)]
pub struct ContactInput {
    name: String,
    email: String,
    message: String,
    /// Honeypot: hidden in the form, so only bots fill it in.
    #[serde(default)]
    website: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct StoredMessage {
    id: i64,
    name: String,
    email: String,
    message: String,
    created_at: DateTime<Utc>,
}

pub async fn submit(
    State(state): State<AppState>,
    ClientIp(ip): ClientIp,
    Json(input): Json<ContactInput>,
) -> AppResult<(StatusCode, Json<Value>)> {
    if !input.website.is_empty() {
        // Pretend it worked so bots don't learn to skip the field.
        return Ok((StatusCode::CREATED, Json(json!({ "ok": true }))));
    }

    require_text("name", &input.name, 100)?;
    require_text("message", &input.message, 5000)?;
    let email = input.email.trim();
    if email.len() > 254 || !looks_like_email(email) {
        return Err(AppError::BadRequest("a valid email is required".into()));
    }

    if !state.contact_limiter.allow(ip) {
        return Err(AppError::TooManyRequests);
    }

    let name = input.name.trim().to_owned();
    let message = input.message.trim().to_owned();
    sqlx::query!(
        "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
        name,
        email,
        message,
    )
    .execute(&state.db)
    .await?;

    if let Some(mailer) = state.mailer.clone() {
        let email = email.to_owned();
        tokio::spawn(async move {
            if let Err(err) = notify(&mailer, &name, &email, &message).await {
                tracing::warn!("failed to send contact notification: {err}");
            }
        });
    }

    Ok((StatusCode::CREATED, Json(json!({ "ok": true }))))
}

pub async fn list_messages(
    _: Admin,
    State(state): State<AppState>,
) -> AppResult<Json<Vec<StoredMessage>>> {
    let messages = sqlx::query_as!(
        StoredMessage,
        "SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC LIMIT 100"
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(messages))
}

fn looks_like_email(email: &str) -> bool {
    match email.split_once('@') {
        Some((local, domain)) => {
            !local.is_empty()
                && domain.contains('.')
                && !domain.starts_with('.')
                && !domain.ends_with('.')
                && !email.contains(char::is_whitespace)
        }
        None => false,
    }
}

async fn notify(
    mailer: &crate::state::Mailer,
    name: &str,
    email: &str,
    message: &str,
) -> Result<(), String> {
    let res = mailer
        .client
        .post("https://api.resend.com/emails")
        .bearer_auth(&mailer.api_key)
        .json(&json!({
            "from": mailer.from,
            "to": [mailer.to],
            "reply_to": email,
            "subject": format!("Portfolio message from {name}"),
            "text": format!("From: {name} <{email}>\n\n{message}"),
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if res.status().is_success() {
        Ok(())
    } else {
        let status = res.status();
        let body = res.text().await.unwrap_or_default();
        Err(format!("Resend returned {status}: {body}"))
    }
}

#[cfg(test)]
mod tests {
    use super::looks_like_email;

    #[test]
    fn email_check() {
        assert!(looks_like_email("mark@example.com"));
        assert!(!looks_like_email("mark@example"));
        assert!(!looks_like_email("@example.com"));
        assert!(!looks_like_email("mark @example.com"));
        assert!(!looks_like_email("mark.example.com"));
    }
}
