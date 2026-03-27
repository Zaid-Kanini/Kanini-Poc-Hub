-- ============================================================
-- Kanini POC Hub — Database Schema
-- ============================================================

-- ---- Enums ----
DO $$ BEGIN
  CREATE TYPE poc_status AS ENUM ('In Production', 'Testing Phase', 'Ideation', 'Pilot');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ---- Users ----
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  display_name  VARCHAR(255),
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- ---- Teams ----
CREATE TABLE IF NOT EXISTS teams (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Team members (join table) ----
CREATE TABLE IF NOT EXISTS team_members (
  team_id  INT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role     VARCHAR(50) NOT NULL DEFAULT 'member',
  PRIMARY KEY (team_id, user_id)
);

-- ---- Domains / Categories ----
CREATE TABLE IF NOT EXISTS domains (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL UNIQUE
);

-- ---- Tags ----
CREATE TABLE IF NOT EXISTS tags (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL UNIQUE
);

-- ---- POCs ----
CREATE TABLE IF NOT EXISTS pocs (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(255) NOT NULL,
  description     TEXT NOT NULL,
  icon            VARCHAR(100) NOT NULL DEFAULT 'science',
  status          poc_status NOT NULL DEFAULT 'Ideation',
  domain_id       INT NOT NULL REFERENCES domains(id),
  team_id         INT NOT NULL REFERENCES teams(id),
  github_url      TEXT,
  application_url TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pocs_domain ON pocs (domain_id);
CREATE INDEX IF NOT EXISTS idx_pocs_status ON pocs (status);
CREATE INDEX IF NOT EXISTS idx_pocs_team   ON pocs (team_id);

-- ---- POC ↔ Tag (many-to-many) ----
CREATE TABLE IF NOT EXISTS poc_tags (
  poc_id INT NOT NULL REFERENCES pocs(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (poc_id, tag_id)
);

-- ---- Featured POC ----
CREATE TABLE IF NOT EXISTS featured_pocs (
  id                SERIAL PRIMARY KEY,
  poc_id            INT REFERENCES pocs(id) ON DELETE SET NULL,
  title             VARCHAR(255) NOT NULL,
  subtitle          VARCHAR(255),
  description       TEXT,
  deployment_status VARCHAR(255),
  active            BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Featured POC stats ----
CREATE TABLE IF NOT EXISTS featured_poc_stats (
  id              SERIAL PRIMARY KEY,
  featured_poc_id INT NOT NULL REFERENCES featured_pocs(id) ON DELETE CASCADE,
  value           VARCHAR(50) NOT NULL,
  label           VARCHAR(100) NOT NULL
);

-- ---- Hero stats (displayed in hero section) ----
CREATE TABLE IF NOT EXISTS hero_stats (
  id     SERIAL PRIMARY KEY,
  value  NUMERIC NOT NULL,
  label  VARCHAR(100) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- ---- Global stats (StatsStrip) ----
CREATE TABLE IF NOT EXISTS global_stats (
  id      SERIAL PRIMARY KEY,
  value   NUMERIC NOT NULL,
  label   VARCHAR(100) NOT NULL,
  prefix  VARCHAR(10) DEFAULT '',
  suffix  VARCHAR(10) DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
);

-- ---- Partner logos ----
CREATE TABLE IF NOT EXISTS partners (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  logo_url   TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- ---- Safe column additions (idempotent) ----
DO $$ BEGIN
  ALTER TABLE pocs ADD COLUMN github_url TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE pocs ADD COLUMN application_url TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;
