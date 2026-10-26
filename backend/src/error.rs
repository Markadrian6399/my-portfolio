use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

#[derive(Debug)]
pub enum AppError {
    BadRequest(String),
    Unauthorized,
    NotFound,
    TooManyRequests,
    Internal(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            AppError::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg),
            AppError::Unauthorized => (StatusCode::UNAUTHORIZED, "unauthorized".into()),
            AppError::NotFound => (StatusCode::NOT_FOUND, "not found".into()),
            AppError::TooManyRequests => (
                StatusCode::TOO_MANY_REQUESTS,
                "too many requests, try again later".into(),
            ),
            AppError::Internal(detail) => {
                tracing::error!("internal error: {detail}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "internal server error".into(),
                )
            }
        };
        (status, Json(json!({ "error": message }))).into_response()
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::RowNotFound => AppError::NotFound,
            other => AppError::Internal(other.to_string()),
        }
    }
}

pub type AppResult<T> = Result<T, AppError>;

/// Rejects empty or overly long text fields.
pub fn require_text(field: &str, value: &str, max_chars: usize) -> AppResult<()> {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        return Err(AppError::BadRequest(format!("{field} is required")));
    }
    if trimmed.chars().count() > max_chars {
        return Err(AppError::BadRequest(format!(
            "{field} must be at most {max_chars} characters"
        )));
    }
    Ok(())
}

/// Only allows http(s) links so stored URLs can't become `javascript:` hrefs.
pub fn optional_url(field: &str, value: &Option<String>) -> AppResult<()> {
    match value {
        Some(url) if !(url.starts_with("https://") || url.starts_with("http://")) => Err(
            AppError::BadRequest(format!("{field} must start with http:// or https://")),
        ),
        Some(url) if url.len() > 500 => Err(AppError::BadRequest(format!(
            "{field} must be at most 500 characters"
        ))),
        _ => Ok(()),
    }
}
