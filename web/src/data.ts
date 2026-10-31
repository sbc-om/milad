// Single source of truth for the resume content rendered by the site.
// print.html (the PDF version) mirrors this content by hand, keep both in sync.

export const profile = {
  name: 'Milad Raeisi',
  firstName: 'Milad',
  lastName: 'Raeisi',
  monogram: 'MR',
  headline: 'Systems Architect & ERP Systems Analyst',
  subtitle: 'Founder & CEO of SBC · Blockchain & AI Engineer',
  pdf: './Milad-Raeisi-CV.pdf',
  title: 'Systems Architect · ERP Systems Analyst · Blockchain & AI Engineer',
  location: 'Muscat, Oman',
  email: 'info@sbc.om',
  phone: '+968 9120 0634',
  phoneHref: 'tel:+96891200634',
  website: 'milad.sbc.om',
  linkedin: 'https://www.linkedin.com/in/miladraeisi/',
  github: 'https://github.com/miladsoft',
  summary:
    'Systems architect and full-stack engineer with 20+ years of designing and shipping enterprise software, from bespoke ERP platforms and regulated insurance systems to Bitcoin-native products and production AI. Founder & CEO of SBC (Senior BlockChain LLC), a Grade 1 technology company in Muscat, and core member of Blockcore and Angor. I pair rigorous systems analysis with hands-on engineering: mapping how a business really runs, then turning it into reliable, scalable software.',
  rotating: ['custom ERP platforms', 'enterprise systems', 'blockchain networks', 'AI-powered products'],
}

export const stats = [
  { value: 20, suffix: '+', label: 'Years of experience' },
  { value: 200, suffix: '+', label: 'Projects delivered' },
  { value: 50, suffix: '+', label: 'Enterprise clients' },
  { value: 10, suffix: '+', label: 'Industries served' },
]

export type Experience = {
  role: string
  company: string
  context: string
  period: string
  highlight?: boolean
  icon: 'building' | 'erp' | 'bitcoin' | 'blocks' | 'briefcase' | 'energy' | 'code'
  points: string[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    role: 'Founder & CEO',
    icon: 'building',
    company: 'SBC (Senior BlockChain LLC)',
    context: 'Grade 1 technology company · Muscat, Oman',
    period: 'Since 2022',
    points: [
      'Founded and lead a Grade 1 company delivering enterprise software, custom ERP, blockchain infrastructure and AI automation across the MENA region.',
      'Architected Oman’s online insurance platform: CMA compliant, integrated with Dhofar, National Life, Al Ahlia, Vision and Oman United Insurance, plus Omani bank payment gateways.',
      'Built an international e-commerce platform with Aramex / DHL logistics, Visa, PayPal and Thawani payments and multi-currency checkout.',
      'Delivered AI models for insurance risk scoring and fraud detection for Omani and regional clients.',
    ],
    tags: ['Leadership', 'Architecture', 'Next.js', 'PostgreSQL', 'AI'],
  },
  {
    role: 'Lead Systems Analyst & ERP Architect',
    icon: 'erp',
    company: 'Custom ERP Programs',
    context: 'BMS Company & SBC · Iran and Oman',
    period: 'Since 2015',
    highlight: true,
    points: [
      'Lead end-to-end systems analysis for bespoke ERP platforms: stakeholder workshops, as-is / to-be process mapping (BPMN), gap analysis and signed-off requirement specifications.',
      'Design modular ERP architectures (finance & general ledger, inventory & warehousing, procurement, sales, HR & payroll, production planning and project costing) on one multi-company data model.',
      'Currently building a modern, modular ERP platform on Next.js and TypeScript (React, server-rendered UI, PostgreSQL), designed for multi-company operations and fast, role-aware workflows.',
      'Delivered earlier ERP generations in C# / ASP.NET Core on SQL Server and on Odoo with custom Python / OWL modules, with role-based access control, a configurable approval-workflow engine, full audit trails and reporting.',
      'Run legacy data migration, user-acceptance testing, phased roll-outs and staff training; own post-go-live support and continuous improvement.',
      'Integrate ERP with banks and payment gateways, e-commerce storefronts, shipping carriers and third-party systems through REST APIs.',
    ],
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Systems Analysis', 'BPMN', 'C# / .NET', 'Odoo', 'SQL Server'],
  },
  {
    role: 'Core Member & Lead Architect',
    icon: 'bitcoin',
    company: 'Angor',
    context: 'Decentralized crowdfunding on Bitcoin',
    period: 'Since 2022',
    points: [
      'Designed and built a trustless crowdfunding protocol on Bitcoin with Nostr and Lightning Network integration.',
      'Led system architecture, UI/UX, cryptographic implementation, documentation, branding and go-to-market.',
      'Implemented PSBT-based smart escrow, decentralized storage and blockchain identity verification.',
    ],
    tags: ['Bitcoin', 'Nostr', 'Lightning', 'PSBT'],
  },
  {
    role: 'Core Member',
    icon: 'blocks',
    company: 'Blockcore',
    context: 'Open-source blockchain platform',
    period: 'Since 2018',
    points: [
      'Build custom blockchains from scratch: consensus engines, full-node implementations, wallets and block explorers.',
      'Developed decentralized identity, tokenization platforms and peer-to-peer payment networks used by the open-source community.',
    ],
    tags: ['C#', 'Consensus', 'Full Node', 'P2P'],
  },
  {
    role: 'Founder & Owner',
    icon: 'briefcase',
    company: 'BMS Company',
    context: 'Tehran, Iran',
    period: 'Since 2015',
    points: [
      'Founded a software house delivering custom enterprise software, ERP solutions and IT consulting.',
      'Built Iran’s online insurance platform integrating all major insurers and the Shaparak payment network.',
      'Hired, trained and led multi-disciplinary teams of developers, designers and QA engineers.',
    ],
    tags: ['ASP.NET', 'SQL Server', 'Team Leadership'],
  },
  {
    role: 'Project Manager',
    icon: 'energy',
    company: 'National Oil Company',
    context: 'Iran',
    period: 'Before 2018',
    points: [
      'Managed enterprise software projects for national energy infrastructure, including custom antivirus tooling and an ASP.NET content-management platform.',
    ],
    tags: ['Project Management', 'ASP.NET'],
  },
  {
    role: 'Senior Software Developer',
    icon: 'code',
    company: 'Freelance & Contract',
    context: 'Multiple clients',
    period: '2008 to 2018',
    points: [
      'Shipped 200+ web, mobile and desktop applications for fintech, healthcare, manufacturing and government clients, including CRM, inventory and analytics systems.',
    ],
    tags: ['Web', 'Mobile', 'Desktop'],
  },
]

export const erp = {
  generations: [
    {
      when: 'Now',
      title: 'ERP platform on Next.js',
      text: 'A modern, modular ERP in active development: one PostgreSQL data model across finance, inventory, procurement, sales and HR, with approval workflows, audit trails and role-aware dashboards.',
      stack: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    },
    {
      when: 'Previously',
      title: 'Enterprise ERP on .NET',
      text: 'Bespoke ERP systems analysed and engineered from the ground up for enterprise clients, with workflow engine, RBAC and reporting.',
      stack: ['C#', 'ASP.NET Core', 'SQL Server', 'Angular'],
    },
    {
      when: 'Previously',
      title: 'ERP on Odoo',
      text: 'Odoo implementations with custom modules for manufacturing, healthcare, real estate and retail where an off-the-shelf core fits best.',
      stack: ['Python', 'Odoo', 'OWL', 'QWeb', 'PostgreSQL'],
    },
  ],
  lifecycle: [
    { step: 'Discover', text: 'Stakeholder interviews, workshops and document review to understand how the business really operates.' },
    { step: 'Model', text: 'As-is / to-be processes in BPMN, use cases, data models (ERD) and a prioritised gap analysis.' },
    { step: 'Specify', text: 'Requirement specifications, user stories and acceptance criteria signed off by process owners.' },
    { step: 'Architect', text: 'Modular, multi-company design with RBAC, workflow engine, audit trail and integration layer.' },
    { step: 'Build', text: 'Iterative delivery on Next.js and TypeScript (earlier on C# / .NET and Odoo) with automated tests and CI/CD.' },
    { step: 'Go live', text: 'Data migration, UAT, phased roll-out and training, then support and continuous improvement.' },
  ],
  modules: [
    { name: 'Finance & GL', icon: 'calculator' },
    { name: 'Inventory & Warehouse', icon: 'warehouse' },
    { name: 'Procurement', icon: 'truck' },
    { name: 'Sales & CRM', icon: 'cart' },
    { name: 'HR & Payroll', icon: 'users' },
    { name: 'Manufacturing & MRP', icon: 'factory' },
    { name: 'Projects & Costing', icon: 'kanban' },
    { name: 'BI & Reporting', icon: 'chart' },
  ],
  capabilities: [
    'Multi-company & multi-currency',
    'Role-based access control',
    'Approval workflow engine',
    'Full audit trail',
    'Configurable reports & dashboards',
    'Bank, payment & logistics integrations',
    'Legacy data migration',
    'Odoo customisation (Python / OWL / QWeb)',
  ],
  analysis: ['BPMN 2.0', 'UML', 'ERD / data modelling', 'Use cases', 'User stories', 'Gap analysis', 'SRS', 'UAT planning'],
  stack: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'C# / ASP.NET Core', 'SQL Server', 'Python / Odoo', 'Redis', 'REST / GraphQL', 'Docker'],
}

export type ProjectCategory = 'Enterprise & ERP' | 'Blockchain' | 'AI' | 'Commerce'

export const projects: { title: string; text: string; category: ProjectCategory; tags: string[] }[] = [
  {
    title: 'ERP Platform on Next.js',
    text: 'A modern, modular ERP in active development: finance, inventory, procurement, sales and HR on one PostgreSQL data model, with approval workflows, audit trails and role-aware dashboards.',
    category: 'Enterprise & ERP',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    title: 'Bespoke ERP on .NET',
    text: 'Custom ERP systems analysed and engineered from the ground up: finance, inventory, procurement, HR and production on one data model, with workflow approvals and audit trails.',
    category: 'Enterprise & ERP',
    tags: ['C# / .NET', 'SQL Server', 'BPMN'],
  },
  {
    title: 'Enterprise ERP on Odoo',
    text: 'Custom Python modules for manufacturing, healthcare, real estate and retail: HR, CRM, accounting, inventory and automated supply-chain workflows.',
    category: 'Enterprise & ERP',
    tags: ['Python', 'Odoo', 'PostgreSQL'],
  },
  {
    title: 'Oman Online Insurance Platform',
    text: 'CMA-compliant sales platform integrated with leading Omani insurers: real-time quotes, policy issuance, claims tracking and Omani bank gateways.',
    category: 'Enterprise & ERP',
    tags: ['Next.js', 'PostgreSQL', 'CMA'],
  },
  {
    title: 'Iran Online Insurance Platform',
    text: 'All major Iranian insurers on one platform: liability, fire, life, health and travel products, Shaparak payments and Central Insurance APIs.',
    category: 'Enterprise & ERP',
    tags: ['ASP.NET', 'SQL Server', 'Shaparak'],
  },
  {
    title: 'Angor Decentralized Crowdfunding',
    text: 'Bitcoin-native crowdfunding with Nostr, Lightning payments and PSBT-based smart escrow for trustless investment.',
    category: 'Blockchain',
    tags: ['Bitcoin', 'Nostr', 'Lightning'],
  },
  {
    title: 'Custom Blockchain Networks',
    text: 'Multiple chains built from scratch with Blockcore: consensus, full nodes, wallets, explorers and staking.',
    category: 'Blockchain',
    tags: ['C#', 'Blockcore', 'PoS'],
  },
  {
    title: 'SeniorBlockchain Identity',
    text: 'Decentralized identity and reputation layer with TrustPulse scoring and verifiable credentials on Nostr and Bitcoin.',
    category: 'Blockchain',
    tags: ['DID', 'Nostr', 'Angular'],
  },
  {
    title: 'Tokenize Asset Tokenization',
    text: 'Fractional ownership of property, equity and commodities on Bitcoin and Nostr with a compliance-first architecture.',
    category: 'Blockchain',
    tags: ['Bitcoin', 'RWA', 'React'],
  },
  {
    title: 'AI Business Intelligence',
    text: 'ML models for insurance risk, fraud detection, churn prediction and automated claims, plus NLP pipelines and recommendation engines.',
    category: 'AI',
    tags: ['TensorFlow', 'PyTorch', 'MLOps'],
  },
  {
    title: 'International E-Commerce',
    text: 'Multi-vendor commerce with Aramex, DHL and FedEx shipping, Visa / PayPal / Thawani payments, multi-currency and GCC tax automation.',
    category: 'Commerce',
    tags: ['Next.js', 'Aramex', 'PayPal'],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['C#', 'Python', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'Kotlin', 'Swift', 'Dart', 'Java', 'C++', 'Solidity'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Angular', 'Vue.js', 'Nuxt.js', 'Blazor', 'TailwindCSS', 'Redux', 'Zustand', 'Vite'] },
  { group: 'Backend', items: ['ASP.NET Core', 'Node.js', 'NestJS', 'Django', 'FastAPI', 'Express', 'GraphQL', 'gRPC', 'SignalR', 'Socket.io'] },
  { group: 'ERP', items: ['Custom ERP', 'Next.js ERP', 'Odoo', 'Python ORM', 'OWL', 'QWeb', 'BPMN', 'UML', 'Data migration'] },
  { group: 'Data', items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'Elasticsearch', 'Supabase', 'Firebase', 'SQLite'] },
  { group: 'Cloud & DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform', 'GitHub Actions', 'Jenkins', 'Nginx'] },
  { group: 'AI & ML', items: ['PyTorch', 'TensorFlow', 'LLM fine-tuning', 'RAG', 'LangChain', 'Hugging Face', 'OpenCV', 'YOLO', 'Scikit-learn', 'MLflow'] },
  { group: 'Blockchain', items: ['Bitcoin Core', 'Lightning', 'PSBT', 'Taproot', 'Nostr', 'DID / VC', 'Blockcore', 'Solidity', 'Hyperledger'] },
  { group: 'Mobile & Desktop', items: ['React Native', 'Flutter', '.NET MAUI', 'SwiftUI', 'Jetpack Compose', 'Electron', 'Tauri', 'WPF'] },
  { group: 'Design', items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Brand identity'] },
]

export const languages = [
  { name: 'Persian (Farsi)', level: 'Native', value: 100 },
  { name: 'English', level: 'Professional', value: 75 },
  { name: 'Arabic', level: 'Basic', value: 30 },
]

export const education = {
  degree: 'Bachelor’s Degree in Mathematics & Computer Science',
  text: 'Algorithms, data structures, mathematical modelling and computational theory, the foundation for systems analysis, AI / ML and blockchain cryptography.',
}
