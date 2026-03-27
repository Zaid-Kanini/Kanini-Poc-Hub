-- ============================================================
-- Kanini POC Hub — Seed Data
-- ============================================================

-- ---- Domains ----
INSERT INTO domains (name) VALUES
  ('FinTech'),
  ('Data Science'),
  ('Modernization')
ON CONFLICT (name) DO NOTHING;

-- ---- Tags ----
INSERT INTO tags (name) VALUES
  ('FinTech'),
  ('Loan Processing'),
  ('Workflow Automation'),
  ('Analytics'),
  ('Dashboard'),
  ('Data Visualization'),
  ('Legacy Modernization'),
  ('C++'),
  ('Web')
ON CONFLICT (name) DO NOTHING;

-- ---- Teams ----
INSERT INTO teams (name) VALUES
  ('Lending Squad'),
  ('Metrics Crew'),
  ('Modernization Team')
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
WHERE t.name = 'Lending Squad' AND u.email = 'arun.kumar@kanini.com'
ON CONFLICT DO NOTHING;

INSERT INTO team_members (team_id, user_id, role)
SELECT t.id, u.id, 'member'
FROM teams t, users u
WHERE t.name = 'Metrics Crew' AND u.email = 'priya.sharma@kanini.com'
ON CONFLICT DO NOTHING;

INSERT INTO team_members (team_id, user_id, role)
SELECT t.id, u.id, 'member'
FROM teams t, users u
WHERE t.name = 'Modernization Team' AND u.email = 'dev.team@kanini.com'
ON CONFLICT DO NOTHING;

-- ---- POCs ----
INSERT INTO pocs (title, description, icon, status, domain_id, team_id, github_url, application_url) VALUES
  (
    'Loan Closing & Loan Origination POC',
    'This Proof of Concept demonstrates an end-to-end digital workflow for loan origination and closing processes. It showcases how users can initiate loan applications, capture required details, and seamlessly progress through approval and closing stages. The system emphasizes streamlined data entry, workflow automation, and improved user experience, enabling faster processing and reduced manual intervention. It serves as a foundation for modernizing traditional lending systems with scalable, user-friendly interfaces.',
    'account_balance',
    'In Production',
    (SELECT id FROM domains WHERE name = 'FinTech'),
    (SELECT id FROM teams WHERE name = 'Lending Squad'),
    'https://github.com/kanini/Loan-Origination-Poc.git',
    'https://temp-repo-ruby-kappa.vercel.app/landing'
  ),
  (
    'Dashboard Metrics POC',
    'This POC focuses on building an interactive analytics dashboard that provides real-time insights into key business and operational metrics. It highlights dynamic data visualization, customizable widgets, and performance tracking capabilities. The solution is designed to help stakeholders quickly interpret trends, monitor KPIs, and make data-driven decisions through a clean and intuitive interface.',
    'dashboard',
    'In Production',
    (SELECT id FROM domains WHERE name = 'Data Science'),
    (SELECT id FROM teams WHERE name = 'Metrics Crew'),
    'https://github.com/Chaman-Kanini/Dashboard_Metrics',
    'https://dashboard-metrics-liart.vercel.app/'
  ),
  (
    'CPP to Web Modernization POC',
    'This Proof of Concept demonstrates the modernization of legacy C++-based systems into a web-based application. It showcases how core functionalities can be transformed into a responsive, browser-accessible interface while preserving existing business logic. The POC highlights improved accessibility, enhanced user experience, and the potential for integrating modern technologies, making legacy systems more scalable and easier to maintain.',
    'code',
    'In Production',
    (SELECT id FROM domains WHERE name = 'Modernization'),
    (SELECT id FROM teams WHERE name = 'Modernization Team'),
    'https://github.com/kanini/Cpp_Web_Modernization.git',
    'https://cpp-web-frontend.vercel.app/login'
  )
ON CONFLICT DO NOTHING;

-- ---- POC tags ----
-- Loan Closing & Loan Origination POC → FinTech, Loan Processing, Workflow Automation
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Loan Closing & Loan Origination POC' AND t.name IN ('FinTech', 'Loan Processing', 'Workflow Automation')
ON CONFLICT DO NOTHING;

-- Dashboard Metrics POC → Analytics, Dashboard, Data Visualization
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'Dashboard Metrics POC' AND t.name IN ('Analytics', 'Dashboard', 'Data Visualization')
ON CONFLICT DO NOTHING;

-- CPP to Web Modernization POC → Legacy Modernization, C++, Web
INSERT INTO poc_tags (poc_id, tag_id)
SELECT p.id, t.id FROM pocs p, tags t
WHERE p.title = 'CPP to Web Modernization POC' AND t.name IN ('Legacy Modernization', 'C++', 'Web')
ON CONFLICT DO NOTHING;

-- ---- Featured POC ----
INSERT INTO featured_pocs (poc_id, title, subtitle, description, deployment_status, active) VALUES
  (
    (SELECT id FROM pocs WHERE title = 'Loan Closing & Loan Origination POC' LIMIT 1),
    'Loan Closing & Loan Origination',
    'Featured Spotlight',
    'Our most impactful POC — a complete digital workflow for loan origination and closing. Streamlined data entry, workflow automation, and an improved user experience that enables faster processing and reduced manual intervention.',
    'Live on Production',
    true
  )
ON CONFLICT DO NOTHING;

INSERT INTO featured_poc_stats (featured_poc_id, value, label) VALUES
  ((SELECT id FROM featured_pocs WHERE title = 'Loan Closing & Loan Origination' LIMIT 1), '60%', 'Faster Processing'),
  ((SELECT id FROM featured_pocs WHERE title = 'Loan Closing & Loan Origination' LIMIT 1), '3x', 'Efficiency Gain')
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
