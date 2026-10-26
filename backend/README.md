# Portfolio API

Node.js backend for the portfolio: Express + node-postgres + PostgreSQL. It serves
the site's content, receives contact-form messages (emailed through Resend), and
records simple analytics.

## Run locally

```bash
# Postgres on port 5433
docker run -d --name portfolio-db -e POSTGRES_USER=portfolio \
  -e POSTGRES_PASSWORD=portfolio -e POSTGRES_DB=portfolio -p 5433:5432 postgres:16-alpine

cp .env.example .env          # then set ADMIN_TOKEN (openssl rand -hex 32)
npm install
npm run dev                   # runs migrations on startup, listens on :8080
npm test                      # unit tests
npm run send-test-email       # sends Resend's "Hello World" to CONTACT_TO
```

Point the frontend at it with `REACT_APP_API_URL=http://localhost:8080` in
`../.env.development.local`. Without that variable the frontend uses its built-in
content and EmailJS, so the site works with or without the API.

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | — | Liveness check |
| GET | `/api/projects`, `/api/skills`, `/api/experience` | — | Site content |
| POST | `/api/projects`, `/api/skills`, `/api/experience` | admin | Add an item |
| PUT / DELETE | `/api/{projects,skills,experience}/{id}` | admin | Edit / remove an item |
| POST | `/api/contact` | — | Contact form (5 per IP per 10 min) |
| GET | `/api/messages` | admin | Latest 100 contact messages |
| POST | `/api/events` | — | Analytics: `page_view`, `cv_download`, `project_click` |
| GET | `/api/stats` | admin | Totals, daily page views, top projects |

Admin endpoints need `Authorization: Bearer $ADMIN_TOKEN`. Example:

```bash
curl -X POST localhost:8080/api/projects \
  -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" \
  -d '{"title":"MkArt","tag":"Next.js","liveUrl":"https://...","sortOrder":6}'

curl localhost:8080/api/stats -H "Authorization: Bearer $ADMIN_TOKEN"
```

Skill `icon` values map to images in the frontend: `html`, `css`, `tailwind`,
`javascript`, `react`, `mern`, `rust`. Any other value shows the skill's first letter.

## Configuration

See [.env.example](.env.example). `RESEND_API_KEY` is optional: when set, each
contact message is also emailed to `CONTACT_TO` through Resend's HTTPS API (SMTP
is blocked on Render's free tier). Set `TRUST_PROXY=true` when deployed behind a
proxy (Render, Railway, Fly.io) so rate limiting sees real client IPs.

Migrations are plain SQL files in `migrations/`, applied in name order on startup
and recorded in the `schema_migrations` table. Add new ones as `0003_*.sql`, etc.

## Deploy (Render + Neon)

[`../render.yaml`](../render.yaml) is a Render Blueprint for this service. The
database is on Neon, because Render's free Postgres is deleted after 30 days.

1. Create a Neon project and copy its **direct** connection string (connection
   pooling off).
2. In Render: New → Blueprint → pick this repo and branch. Fill in
   `DATABASE_URL` and `RESEND_API_KEY` when asked. `ADMIN_TOKEN` is generated;
   find it under the service's Environment tab.
3. Set `REACT_APP_API_URL` to the service URL on the frontend host and redeploy it.

Free Render services sleep after ~15 minutes idle; the first request after that
takes up to a minute.
