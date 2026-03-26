-- ============================================================
-- Kanini POC Hub — Seed Data
-- ============================================================

-- ---- Domains ----
INSERT INTO domains (name) VALUES
  ('AI/ML'),
  ('Cloud'),
  ('Blockchain'),
  ('IoT'),
  ('Data Science')
ON CONFLICT (name) DO NOTHING;

-- ---- Tags ----
INSERT INTO tags (name) VALUES
  ('AI/ML'),
  ('Supply Chain'),
  ('Cloud'),
  ('DevOps'),
  ('Blockchain'),
  ('FinTech'),
  ('Automation'),
  ('IoT'),
  ('Manufacturing'),
  ('Data Science'),
  ('CRM'),
  ('Security'),
  ('Digital Twin')
ON CONFLICT (name) DO NOTHING;

-- ---- Teams ----
INSERT INTO teams (name) VALUES
  ('Nexus Team'),
  ('CloudOps Elite'),
  ('Ledger Labs'),
  ('DocFlow Squad'),
  ('Edge Pioneers'),
  ('Insight Crew'),
  ('SecOps Alpha'),
  ('Risk Engine'),
  ('Twin Works')
ON CONFLICT (name) DO NOTHING;

-- ---- Users (sample) ----
INSERT INTO users (email, display_name) VALUES
  ('arun.kumar@kanini.com',   'Arun Kumar'),
  ('priya.sharma@kanini.com', 'Priya Sharma'),
  ('dev.team@kanini.com',     'Dev Team')
ON CONFLICT (email) DO NOTHING;

-- ---- Team members ----
INSERT INTO team_members (team_id, user_id, role)
SELECT t.id, u.id, 'lead'
FROM teams t, users u
WHERE t.name = 'Nexus Team' AND u.email = 'arun.kumar@kanini.com'
ON CONFLICT DO NOTHING;

INSERT INTO team_members (team_id, user_id, role)
SELECT t.id, u.id, 'member'
FROM teams t, users u
WHERE t.name = 'CloudOps Elite' AND u.email = 'priya.sharma@kanini.com'
ON CONFLICT DO NOTHING;

-- ---- POCs ----
INSERT INTO pocs (title, description, icon, status, domain_id, team_id) VALUES
  (
    'Predictive Inventory Engine',
    'AI-driven engine that predicts stock requirements across regional warehouses with 94% accuracy.',
    'smart_toy',
    'In Production',
    (SELECT id FROM domains WHERE name = 'AI/ML'),
    (SELECT id FROM teams WHERE name = 'Nexus Team')
  ),
  (
    'Multi-Cloud Orchestrator',
    'Automated deployment tool for containerized applications across AWS, Azure and GCP environments.',
    'cloud_done',
    'Testing Phase',
    (SELECT id FROM domains WHERE name = 'Cloud'),
    (SELECT id FROM teams WHERE name = 'CloudOps Elite')
  ),
  (
    'Immutable Audit Ledger',
    'Blockchain-based recording system for internal financial transactions to ensure absolute audit trails.',
    'payments',
    'Ideation',
    (SELECT id FROM domains WHERE name = 'Blockchain'),
    (SELECT id FROM teams WHERE name = 'Ledger Labs')
  ),
  (
    'Smart Document Parser',
    'NLP-powered extraction pipeline that processes invoices, contracts and reports with 97% field accuracy.',
    'description',
    'In Production',
    (SELECT id FROM domains WHERE name = 'AI/ML'),
    (SELECT id FROM teams WHERE name = 'DocFlow Squad')
  ),
  (
    'Edge IoT Gateway',
    'Low-latency edge computing gateway for collecting and processing sensor data across manufacturing floors.',
    'sensors',
    'Pilot',
    (SELECT id FROM domains WHERE name = 'IoT'),
    (SELECT id FROM teams WHERE name = 'Edge Pioneers')
  ),
  (
    'Customer Churn Predictor',
    'Machine learning model that identifies at-risk customer accounts 30 days before churn with 89% recall.',
    'trending_down',
    'Testing Phase',
    (SELECT id FROM domains WHERE name = 'Data Science'),
    (SELECT id FROM teams WHERE name = 'Insight Crew')
  ),
  (
    'Zero-Trust Access Mesh',
    'Identity-aware micro-segmentation layer that replaces legacy VPN with per-request authentication.',
    'shield',
    'Pilot',
    (SELECT id FROM domains WHERE name = 'Cloud'),
    (SELECT id FROM teams WHERE name = 'SecOps Alpha')
  ),
  (
    'Real-time Fraud Detector',
    'Streaming analytics engine scoring payment transactions in under 50ms with adaptive threshold tuning.',
    'security',
    'In Production',
    (SELECT id FROM domains WHERE name = 'Data Science'),
    (SELECT id FROM teams WHERE name = 'Risk Engine')
  ),
  (
    'Digital Twin Simulator',
    'Physics-based digital twin of factory floor robots enabling predictive maintenance scheduling.',
    'precision_manufacturing',
    'Ideation',
    (SELECT id FROM domains WHERE name = 'IoT'),
    (SELECT id FROM teams WHERE name = 'Twin Works')
  )
ON CONFLICT DO NOTHING;

-- ---- POC tags ----
-- Predictive Inventory Engine → AI/ML, Supply Chain
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Predictive Inventory Engine' AND t.name IN ('AI/ML', 'Supply Chain')
ON CONFLICT DO NOTHING;

-- Multi-Cloud Orchestrator → Cloud, DevOps
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Multi-Cloud Orchestrator' AND t.name IN ('Cloud', 'DevOps')
ON CONFLICT DO NOTHING;

-- Immutable Audit Ledger → Blockchain, FinTech
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Immutable Audit Ledger' AND t.name IN ('Blockchain', 'FinTech')
ON CONFLICT DO NOTHING;

-- Smart Document Parser → AI/ML, Automation
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Smart Document Parser' AND t.name IN ('AI/ML', 'Automation')
ON CONFLICT DO NOTHING;

-- Edge IoT Gateway → IoT, Manufacturing
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Edge IoT Gateway' AND t.name IN ('IoT', 'Manufacturing')
ON CONFLICT DO NOTHING;

-- Customer Churn Predictor → Data Science, CRM
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Customer Churn Predictor' AND t.name IN ('Data Science', 'CRM')
ON CONFLICT DO NOTHING;

-- Zero-Trust Access Mesh → Cloud, Security
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Zero-Trust Access Mesh' AND t.name IN ('Cloud', 'Security')
ON CONFLICT DO NOTHING;

-- Real-time Fraud Detector → Data Science, FinTech
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Real-time Fraud Detector' AND t.name IN ('Data Science', 'FinTech')
ON CONFLICT DO NOTHING;

-- Digital Twin Simulator → IoT, Digital Twin
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Digital Twin Simulator' AND t.name IN ('IoT', 'Digital Twin')
ON CONFLICT DO NOTHING;

-- ---- Featured POC ----
INSERT INTO featured_pocs (title, subtitle, description, deployment_status, active) VALUES
  (
    'Real-time Vision Analytics',
    'Featured Spotlight',
    'The most successful POC of Q3. Using computer vision to monitor assembly line quality in real-time, reducing defects by 18% in our Munich facility. Now scaling to all global plants.',
    'Global Rollout Active',
    true
  )
ON CONFLICT DO NOTHING;

INSERT INTO featured_poc_stats (featured_poc_id, value, label) VALUES
  ((SELECT id FROM featured_pocs WHERE title = 'Real-time Vision Analytics' LIMIT 1), '18%', 'Defect Reduction'),
  ((SELECT id FROM featured_pocs WHERE title = 'Real-time Vision Analytics' LIMIT 1), '40ms', 'Latency')
ON CONFLICT DO NOTHING;

-- ---- Hero stats ----
INSERT INTO hero_stats (value, label, sort_order) VALUES
  (42, 'Active POCs', 1),
  (12, 'Tech Domains', 2),
  (8,  'Active Teams', 3)
ON CONFLICT DO NOTHING;

-- ---- Global stats ----
INSERT INTO global_stats (value, label, prefix, suffix, sort_order) VALUES
  (128,  'Contributors',       '',  '',  1),
  (2.4,  'Savings Generated',  '$', 'M', 2),
  (15,   'Patents Filed',      '',  '',  3),
  (92,   'Success Rate',       '',  '%', 4)
ON CONFLICT DO NOTHING;

-- ---- Partners ----
INSERT INTO partners (name, sort_order) VALUES
  ('Microsoft',    1),
  ('AWS',          2),
  ('Google Cloud', 3),
  ('Snowflake',    4),
  ('Databricks',   5),
  ('Confluent',    6),
  ('MongoDB',      7),
  ('Docker',       8),
  ('Kubernetes',   9),
  ('Terraform',    10)
ON CONFLICT DO NOTHING;
