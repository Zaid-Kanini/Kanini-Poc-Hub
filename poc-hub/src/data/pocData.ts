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
  github_url?: string | null;
  application_url?: string | null;
}

export const pocData: PocItem[] = [
  {
    id: 1,
    title: 'Loan Closing & Loan Origination POC',
    description:
      'This Proof of Concept demonstrates an end-to-end digital workflow for loan origination and closing processes. It showcases how users can initiate loan applications, capture required details, and seamlessly progress through approval and closing stages.',
    icon: 'account_balance',
    status: 'In Production',
    domain: 'FinTech',
    tags: ['FinTech', 'Loan Processing', 'Workflow Automation'],
    team: 'Lending Squad',
    github_url: 'https://github.com/kanini/Loan-Origination-Poc.git',
    application_url: 'https://temp-repo-ruby-kappa.vercel.app/landing',
  },
  {
    id: 2,
    title: 'Dashboard Metrics POC',
    description:
      'This POC focuses on building an interactive analytics dashboard that provides real-time insights into key business and operational metrics. It highlights dynamic data visualization, customizable widgets, and performance tracking capabilities.',
    icon: 'dashboard',
    status: 'In Production',
    domain: 'Data Science',
    tags: ['Analytics', 'Dashboard', 'Data Visualization'],
    team: 'Metrics Crew',
    github_url: 'https://github.com/Chaman-Kanini/Dashboard_Metrics',
    application_url: 'https://dashboard-metrics-liart.vercel.app/',
  },
  {
    id: 3,
    title: 'CPP to Web Modernization POC',
    description:
      'This Proof of Concept demonstrates the modernization of legacy C++-based systems into a web-based application. It showcases how core functionalities can be transformed into a responsive, browser-accessible interface while preserving existing business logic.',
    icon: 'code',
    status: 'In Production',
    domain: 'Modernization',
    tags: ['Legacy Modernization', 'C++', 'Web'],
    team: 'Modernization Team',
    github_url: 'https://github.com/kanini/Cpp_Web_Modernization.git',
    application_url: 'https://cpp-web-frontend.vercel.app/login',
  },
];

export const categories = [
  'All POCs',
  'FinTech',
  'Data Science',
  'Modernization',
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
