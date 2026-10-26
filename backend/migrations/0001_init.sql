CREATE TABLE projects (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    tag         TEXT NOT NULL,
    live_url    TEXT,
    code_url    TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE skills (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    detail      TEXT NOT NULL,
    icon        TEXT NOT NULL,
    percent     INTEGER NOT NULL CHECK (percent BETWEEN 0 AND 100),
    sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE experiences (
    id           SERIAL PRIMARY KEY,
    role         TEXT NOT NULL,
    company      TEXT NOT NULL,
    period       TEXT NOT NULL,
    description  TEXT NOT NULL,
    sort_order   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE messages (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    message     TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE events (
    id          BIGSERIAL PRIMARY KEY,
    kind        TEXT NOT NULL CHECK (kind IN ('page_view', 'cv_download', 'project_click')),
    target      TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX events_kind_created_at_idx ON events (kind, created_at);
