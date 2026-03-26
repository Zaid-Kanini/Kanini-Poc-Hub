export type PocStatus = 'In Production' | 'Testing Phase' | 'Ideation' | 'Pilot';

export interface PocItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: PocStatus;
  domain: string;
  tags: string[];
  team: string;
}

export const pocData: PocItem[] = [
  {
    id: 1,
    title: 'Predictive Inventory Engine',
    description:
      'AI-driven engine that predicts stock requirements across regional warehouses with 94% accuracy.',
    icon: 'smart_toy',
    status: 'In Production',
    domain: 'AI/ML',
    tags: ['AI/ML', 'Supply Chain'],
    team: 'Nexus Team',
  },
  {
    id: 2,
    title: 'Multi-Cloud Orchestrator',
    description:
      'Automated deployment tool for containerized applications across AWS, Azure and GCP environments.',
    icon: 'cloud_done',
    status: 'Testing Phase',
    domain: 'Cloud',
    tags: ['Cloud', 'DevOps'],
    team: 'CloudOps Elite',
  },
  {
    id: 3,
    title: 'Immutable Audit Ledger',
    description:
      'Blockchain-based recording system for internal financial transactions to ensure absolute audit trails.',
    icon: 'payments',
    status: 'Ideation',
    domain: 'Blockchain',
    tags: ['Blockchain', 'FinTech'],
    team: 'Ledger Labs',
  },
  {
    id: 4,
    title: 'Smart Document Parser',
    description:
      'NLP-powered extraction pipeline that processes invoices, contracts and reports with 97% field accuracy.',
    icon: 'description',
    status: 'In Production',
    domain: 'AI/ML',
    tags: ['AI/ML', 'Automation'],
    team: 'DocFlow Squad',
  },
  {
    id: 5,
    title: 'Edge IoT Gateway',
    description:
      'Low-latency edge computing gateway for collecting and processing sensor data across manufacturing floors.',
    icon: 'sensors',
    status: 'Pilot',
    domain: 'IoT',
    tags: ['IoT', 'Manufacturing'],
    team: 'Edge Pioneers',
  },
  {
    id: 6,
    title: 'Customer Churn Predictor',
    description:
      'Machine learning model that identifies at-risk customer accounts 30 days before churn with 89% recall.',
    icon: 'trending_down',
    status: 'Testing Phase',
    domain: 'Data Science',
    tags: ['Data Science', 'CRM'],
    team: 'Insight Crew',
  },
  {
    id: 7,
    title: 'Zero-Trust Access Mesh',
    description:
      'Identity-aware micro-segmentation layer that replaces legacy VPN with per-request authentication.',
    icon: 'shield',
    status: 'Pilot',
    domain: 'Cloud',
    tags: ['Cloud', 'Security'],
    team: 'SecOps Alpha',
  },
  {
    id: 8,
    title: 'Real-time Fraud Detector',
    description:
      'Streaming analytics engine scoring payment transactions in under 50ms with adaptive threshold tuning.',
    icon: 'security',
    status: 'In Production',
    domain: 'Data Science',
    tags: ['Data Science', 'FinTech'],
    team: 'Risk Engine',
  },
  {
    id: 9,
    title: 'Digital Twin Simulator',
    description:
      'Physics-based digital twin of factory floor robots enabling predictive maintenance scheduling.',
    icon: 'precision_manufacturing',
    status: 'Ideation',
    domain: 'IoT',
    tags: ['IoT', 'Digital Twin'],
    team: 'Twin Works',
  },
];

export const categories = [
  'All POCs',
  'AI/ML',
  'Cloud',
  'Blockchain',
  'IoT',
  'Data Science',
];

export const heroStats = [
  { value: 42, label: 'Active POCs' },
  { value: 12, label: 'Tech Domains' },
  { value: 8, label: 'Active Teams' },
];

export const globalStats = [
  { value: 128, label: 'Contributors', prefix: '' },
  { value: 2.4, label: 'Savings Generated', prefix: '$', suffix: 'M' },
  { value: 15, label: 'Patents Filed', prefix: '' },
  { value: 92, label: 'Success Rate', prefix: '', suffix: '%' },
];

export const featuredPoc = {
  title: 'Real-time Vision Analytics',
  subtitle: 'Featured Spotlight',
  description:
    'The most successful POC of Q3. Using computer vision to monitor assembly line quality in real-time, reducing defects by 18% in our Munich facility. Now scaling to all global plants.',
  stats: [
    { value: '18%', label: 'Defect Reduction' },
    { value: '40ms', label: 'Latency' },
  ],
  deploymentStatus: 'Global Rollout Active',
};

export const partnerLogos = [
  'Microsoft',
  'AWS',
  'Google Cloud',
  'Snowflake',
  'Databricks',
  'Confluent',
  'MongoDB',
  'Docker',
  'Kubernetes',
  'Terraform',
];
