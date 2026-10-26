mod analytics;
mod auth;
mod contact;
mod content;
mod error;
mod state;

use std::{net::SocketAddr, sync::Arc, time::Duration};

use axum::{
    Router,
    http::{HeaderValue, Method, header},
    routing::{get, post, put},
};
use sqlx::postgres::PgPoolOptions;
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing_subscriber::EnvFilter;

use crate::state::{AppState, Mailer, RateLimiter};

fn required_env(key: &str) -> String {
    std::env::var(key).unwrap_or_else(|_| panic!("{key} must be set"))
}

fn router(state: AppState, allowed_origins: Vec<HeaderValue>) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(allowed_origins)
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers([header::CONTENT_TYPE, header::AUTHORIZATION]);

    Router::new()
        .route("/health", get(|| async { "ok" }))
        .route(
            "/api/projects",
            get(content::list_projects).post(content::create_project),
        )
        .route(
            "/api/projects/{id}",
            put(content::update_project).delete(content::delete_project),
        )
        .route(
            "/api/skills",
            get(content::list_skills).post(content::create_skill),
        )
        .route(
            "/api/skills/{id}",
            put(content::update_skill).delete(content::delete_skill),
        )
        .route(
            "/api/experience",
            get(content::list_experience).post(content::create_experience),
        )
        .route(
            "/api/experience/{id}",
            put(content::update_experience).delete(content::delete_experience),
        )
        .route("/api/contact", post(contact::submit))
        .route("/api/messages", get(contact::list_messages))
        .route("/api/events", post(analytics::record))
        .route("/api/stats", get(analytics::stats))
        .layer(cors)
        .layer(TraceLayer::new_for_http())
        .with_state(state)
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "portfolio_api=info,tower_http=info".into()),
        )
        .init();

    let admin_token = required_env("ADMIN_TOKEN");
    assert!(
        admin_token.len() >= 24,
        "ADMIN_TOKEN must be at least 24 characters"
    );

    let db = PgPoolOptions::new()
        .max_connections(5)
        .connect(&required_env("DATABASE_URL"))
        .await
        .expect("failed to connect to the database");
    sqlx::migrate!()
        .run(&db)
        .await
        .expect("failed to run migrations");

    let mailer = Mailer::from_env().expect("invalid email configuration");
    match &mailer {
        Some(m) => tracing::info!("contact messages will be emailed to {}", m.to),
        None => tracing::info!("RESEND_API_KEY not set; contact messages are stored but not emailed"),
    }

    let allowed_origins = std::env::var("ALLOWED_ORIGINS")
        .unwrap_or_else(|_| "http://localhost:3000".into())
        .split(',')
        .map(|o| o.trim().parse().expect("invalid origin in ALLOWED_ORIGINS"))
        .collect();

    let state = AppState {
        db,
        admin_token: admin_token.into(),
        mailer: mailer.map(Arc::new),
        contact_limiter: Arc::new(RateLimiter::new(5, Duration::from_secs(600))),
        event_limiter: Arc::new(RateLimiter::new(120, Duration::from_secs(600))),
        trust_proxy: std::env::var("TRUST_PROXY").is_ok_and(|v| v == "true"),
    };

    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(8080);
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("failed to bind");
    tracing::info!("listening on {addr}");

    axum::serve(
        listener,
        router(state, allowed_origins).into_make_service_with_connect_info::<SocketAddr>(),
    )
    .await
    .expect("server error");
}
