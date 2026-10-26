use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::{Deserialize, Serialize};

use crate::{
    auth::Admin,
    error::{AppError, AppResult, optional_url, require_text},
    state::AppState,
};

// ---------- Projects ----------

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    id: i32,
    title: String,
    tag: String,
    live_url: Option<String>,
    code_url: Option<String>,
    sort_order: i32,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectInput {
    title: String,
    tag: String,
    live_url: Option<String>,
    code_url: Option<String>,
    #[serde(default)]
    sort_order: i32,
}

impl ProjectInput {
    fn validate(&self) -> AppResult<()> {
        require_text("title", &self.title, 100)?;
        require_text("tag", &self.tag, 50)?;
        optional_url("liveUrl", &self.live_url)?;
        optional_url("codeUrl", &self.code_url)
    }
}

pub async fn list_projects(State(state): State<AppState>) -> AppResult<Json<Vec<Project>>> {
    let projects = sqlx::query_as!(
        Project,
        "SELECT id, title, tag, live_url, code_url, sort_order FROM projects ORDER BY sort_order, id"
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(projects))
}

pub async fn create_project(
    _: Admin,
    State(state): State<AppState>,
    Json(input): Json<ProjectInput>,
) -> AppResult<(StatusCode, Json<Project>)> {
    input.validate()?;
    let project = sqlx::query_as!(
        Project,
        "INSERT INTO projects (title, tag, live_url, code_url, sort_order)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, title, tag, live_url, code_url, sort_order",
        input.title.trim(),
        input.tag.trim(),
        input.live_url,
        input.code_url,
        input.sort_order,
    )
    .fetch_one(&state.db)
    .await?;
    Ok((StatusCode::CREATED, Json(project)))
}

pub async fn update_project(
    _: Admin,
    State(state): State<AppState>,
    Path(id): Path<i32>,
    Json(input): Json<ProjectInput>,
) -> AppResult<Json<Project>> {
    input.validate()?;
    let project = sqlx::query_as!(
        Project,
        "UPDATE projects SET title = $2, tag = $3, live_url = $4, code_url = $5, sort_order = $6
         WHERE id = $1
         RETURNING id, title, tag, live_url, code_url, sort_order",
        id,
        input.title.trim(),
        input.tag.trim(),
        input.live_url,
        input.code_url,
        input.sort_order,
    )
    .fetch_one(&state.db)
    .await?;
    Ok(Json(project))
}

pub async fn delete_project(
    _: Admin,
    State(state): State<AppState>,
    Path(id): Path<i32>,
) -> AppResult<StatusCode> {
    let result = sqlx::query!("DELETE FROM projects WHERE id = $1", id)
        .execute(&state.db)
        .await?;
    deleted(result.rows_affected())
}

// ---------- Skills ----------

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Skill {
    id: i32,
    name: String,
    detail: String,
    icon: String,
    percent: i32,
    sort_order: i32,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SkillInput {
    name: String,
    detail: String,
    icon: String,
    percent: i32,
    #[serde(default)]
    sort_order: i32,
}

impl SkillInput {
    fn validate(&self) -> AppResult<()> {
        require_text("name", &self.name, 50)?;
        require_text("detail", &self.detail, 100)?;
        require_text("icon", &self.icon, 30)?;
        if !(0..=100).contains(&self.percent) {
            return Err(AppError::BadRequest("percent must be between 0 and 100".into()));
        }
        Ok(())
    }
}

pub async fn list_skills(State(state): State<AppState>) -> AppResult<Json<Vec<Skill>>> {
    let skills = sqlx::query_as!(
        Skill,
        "SELECT id, name, detail, icon, percent, sort_order FROM skills ORDER BY sort_order, id"
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(skills))
}

pub async fn create_skill(
    _: Admin,
    State(state): State<AppState>,
    Json(input): Json<SkillInput>,
) -> AppResult<(StatusCode, Json<Skill>)> {
    input.validate()?;
    let skill = sqlx::query_as!(
        Skill,
        "INSERT INTO skills (name, detail, icon, percent, sort_order)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, name, detail, icon, percent, sort_order",
        input.name.trim(),
        input.detail.trim(),
        input.icon.trim(),
        input.percent,
        input.sort_order,
    )
    .fetch_one(&state.db)
    .await?;
    Ok((StatusCode::CREATED, Json(skill)))
}

pub async fn update_skill(
    _: Admin,
    State(state): State<AppState>,
    Path(id): Path<i32>,
    Json(input): Json<SkillInput>,
) -> AppResult<Json<Skill>> {
    input.validate()?;
    let skill = sqlx::query_as!(
        Skill,
        "UPDATE skills SET name = $2, detail = $3, icon = $4, percent = $5, sort_order = $6
         WHERE id = $1
         RETURNING id, name, detail, icon, percent, sort_order",
        id,
        input.name.trim(),
        input.detail.trim(),
        input.icon.trim(),
        input.percent,
        input.sort_order,
    )
    .fetch_one(&state.db)
    .await?;
    Ok(Json(skill))
}

pub async fn delete_skill(
    _: Admin,
    State(state): State<AppState>,
    Path(id): Path<i32>,
) -> AppResult<StatusCode> {
    let result = sqlx::query!("DELETE FROM skills WHERE id = $1", id)
        .execute(&state.db)
        .await?;
    deleted(result.rows_affected())
}

// ---------- Experience ----------

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Experience {
    id: i32,
    role: String,
    company: String,
    period: String,
    description: String,
    sort_order: i32,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ExperienceInput {
    role: String,
    company: String,
    period: String,
    description: String,
    #[serde(default)]
    sort_order: i32,
}

impl ExperienceInput {
    fn validate(&self) -> AppResult<()> {
        require_text("role", &self.role, 100)?;
        require_text("company", &self.company, 100)?;
        require_text("period", &self.period, 50)?;
        require_text("description", &self.description, 1000)
    }
}

pub async fn list_experience(State(state): State<AppState>) -> AppResult<Json<Vec<Experience>>> {
    let jobs = sqlx::query_as!(
        Experience,
        "SELECT id, role, company, period, description, sort_order FROM experiences ORDER BY sort_order, id"
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(jobs))
}

pub async fn create_experience(
    _: Admin,
    State(state): State<AppState>,
    Json(input): Json<ExperienceInput>,
) -> AppResult<(StatusCode, Json<Experience>)> {
    input.validate()?;
    let job = sqlx::query_as!(
        Experience,
        "INSERT INTO experiences (role, company, period, description, sort_order)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, role, company, period, description, sort_order",
        input.role.trim(),
        input.company.trim(),
        input.period.trim(),
        input.description.trim(),
        input.sort_order,
    )
    .fetch_one(&state.db)
    .await?;
    Ok((StatusCode::CREATED, Json(job)))
}

pub async fn update_experience(
    _: Admin,
    State(state): State<AppState>,
    Path(id): Path<i32>,
    Json(input): Json<ExperienceInput>,
) -> AppResult<Json<Experience>> {
    input.validate()?;
    let job = sqlx::query_as!(
        Experience,
        "UPDATE experiences SET role = $2, company = $3, period = $4, description = $5, sort_order = $6
         WHERE id = $1
         RETURNING id, role, company, period, description, sort_order",
        id,
        input.role.trim(),
        input.company.trim(),
        input.period.trim(),
        input.description.trim(),
        input.sort_order,
    )
    .fetch_one(&state.db)
    .await?;
    Ok(Json(job))
}

pub async fn delete_experience(
    _: Admin,
    State(state): State<AppState>,
    Path(id): Path<i32>,
) -> AppResult<StatusCode> {
    let result = sqlx::query!("DELETE FROM experiences WHERE id = $1", id)
        .execute(&state.db)
        .await?;
    deleted(result.rows_affected())
}

fn deleted(rows: u64) -> AppResult<StatusCode> {
    if rows == 0 {
        Err(AppError::NotFound)
    } else {
        Ok(StatusCode::NO_CONTENT)
    }
}
