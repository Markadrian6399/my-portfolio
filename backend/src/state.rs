use std::{
    collections::HashMap,
    net::IpAddr,
    sync::{Arc, Mutex},
    time::{Duration, Instant},
};

use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,
    pub admin_token: Arc<str>,
    pub mailer: Option<Arc<Mailer>>,
    pub contact_limiter: Arc<RateLimiter>,
    pub event_limiter: Arc<RateLimiter>,
    /// Read the client IP from `X-Forwarded-For` (only safe behind a trusted proxy).
    pub trust_proxy: bool,
}

/// Sends notification emails through Resend's HTTPS API (SMTP ports are
/// blocked on many free hosts, including Render).
pub struct Mailer {
    pub client: reqwest::Client,
    pub api_key: String,
    pub from: String,
    pub to: String,
}

impl Mailer {
    /// Builds a mailer from `RESEND_API_KEY` and `CONTACT_TO`, or returns `None` if unset.
    pub fn from_env() -> Result<Option<Self>, String> {
        let Ok(api_key) = std::env::var("RESEND_API_KEY") else {
            return Ok(None);
        };
        if api_key.trim().is_empty() {
            return Ok(None);
        }
        let to = std::env::var("CONTACT_TO")
            .map_err(|_| "CONTACT_TO must be set when RESEND_API_KEY is set".to_string())?;
        // Resend's shared sender works without a verified domain, but only
        // delivers to the address that owns the Resend account.
        let from = std::env::var("EMAIL_FROM")
            .unwrap_or_else(|_| "Portfolio <onboarding@resend.dev>".into());

        let client = reqwest::Client::builder()
            .timeout(Duration::from_secs(10))
            .build()
            .map_err(|e| format!("failed to build HTTP client: {e}"))?;

        Ok(Some(Self {
            client,
            api_key,
            from,
            to,
        }))
    }
}

/// Fixed-window-ish limiter: at most `max` hits per IP within `window`.
pub struct RateLimiter {
    max: usize,
    window: Duration,
    hits: Mutex<HashMap<IpAddr, Vec<Instant>>>,
}

impl RateLimiter {
    pub fn new(max: usize, window: Duration) -> Self {
        Self {
            max,
            window,
            hits: Mutex::new(HashMap::new()),
        }
    }

    pub fn allow(&self, ip: IpAddr) -> bool {
        let now = Instant::now();
        let mut hits = self.hits.lock().expect("rate limiter lock poisoned");
        hits.retain(|_, times| {
            times.retain(|t| now.duration_since(*t) < self.window);
            !times.is_empty()
        });
        let times = hits.entry(ip).or_default();
        if times.len() >= self.max {
            return false;
        }
        times.push(now);
        true
    }
}
