export const meta = {
  name: 'Shobhnik',
  role: 'Backend Engineer · Full Stack Developer',
  tagline: 'I build scalable backend systems, clean APIs, and reliable products. Based in India.',
  email: 'shobhnikw@gmail.com',
  calLink: 'https://cal.com/shobhnik13/15min',
  resumeLink: 'https://drive.google.com/file/d/1cuEWRpMEgK-7zeMsC5Gf1ETmabCTtz8r/view?usp=drive_link',
  githubUsername: 'SHOBHNIK13',
  // Toggle this to false when not available
  openToCollaborate: true,
}

export const navLinks = [
  { label: 'about',      href: '#about' },
  { label: 'work',       href: '#experience' },
  { label: 'projects',   href: '#projects' },
  { label: 'writing',    href: '#blogs' },
]

export const socialLinks = [
  { label: 'GitHub',    href: 'https://github.com/Shobhnik13' },
  { label: 'Twitter',   href: 'https://twitter.com/Shobhnik__13' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/shobhnik13/' },
  { label: 'Peerlist',  href: 'https://peerlist.io/shobhnik13' },
  { label: 'Medium',    href: 'https://medium.com/@shobhnikw' },
  { label: 'LeetCode',  href: 'https://leetcode.com/Shobhnik_1326/' },
]

export const experienceData = [
  {
    id: 1,
    role: 'Backend Engineer',
    company: 'Xane AI',
    logoUrl: 'https://www.google.com/s2/favicons?domain=xane.ai&sz=64',
    duration: 'Jan 2026 – Present',
    location: 'Gurugram, India · On-site',
    bullets: [
      ['Building scalable backend services and system architectures for ', 'AI-powered products', '.'],
      ['Designing and optimizing APIs and data pipelines in ', 'Node.js', ' and ', 'TypeScript', '.'],
      ['Collaborating with product and ML teams on high-performance production systems.'],
    ],
  },
  {
    id: 2,
    role: 'Software Engineer',
    company: 'Otomashen (E-solutions)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=otomashen.com&sz=64',
    duration: 'Feb 2025 – Jan 2026',
    location: 'Noida, India · On-site',
    bullets: [
      ['Built a high-throughput ', 'EDI/X12 processing engine', ' handling 20K+ claim files, driving a ', '166% revenue increase', '.'],
      ['Reduced API latency from ', '10s → <1s', ' via query tuning, indexing, and caching at scale.'],
      ['Engineered a ', 'real-time dispatch system', ' for proximity-based doctor matching and notifications.'],
      ['Delivered ', '4 production-grade client systems', ', leading one end-to-end as ', 'Lead Developer', '.'],
    ],
  },
  {
    id: 3,
    role: 'Full Stack Developer',
    company: 'Stealth Startup',
    logoUrl: '',
    duration: 'Aug 2024 – Jan 2025',
    location: 'Remote',
    bullets: [
      ['Sole engineer — owned product end-to-end from design to production.'],
      ['Built a notification pipeline using ', 'BullMQ', ', ', 'Redis', ', ', 'PostgreSQL', ', and ', 'Socket.io', ' — thousands of events/sec.'],
      ['Scaled to ', '200–250 active users', ' managing ', '500K+ production records', '.'],
    ],
  },
]

export const projectData = [
  {
    id: 1,
    title: 'NovaEnv',
    liveLink: 'https://novaenv.shobhnik.site',
    gitLink: 'https://github.com/Shobhnik13/NovaEnv-frontend',
    status: 'Building',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'AES-256'],
    overview: [
      'Project-based environment variable manager with token-based access control.',
      'All secrets encrypted at rest with AES-256.',
      'Ships with a CLI (NovaEnv CLI) to pull env vars directly into any local machine.',
    ],
    type: 'fullstack',
  },
  {
    id: 2,
    title: 'MyBrainDump',
    liveLink: 'https://mybraindump.shobhnik.site',
    gitLink: 'https://github.com/Shobhnik13/MyBrainDump-frontend',
    status: 'Live',
    techStack: ['Next.js', 'MongoDB', 'Node.js', 'Web Speech API', 'Gemini API', 'Clerk'],
    overview: [
      'AI-powered task and date manager — speak naturally, AI converts speech to actionable tasks.',
      'Uses Gemini API for intent parsing and Clerk for auth.',
    ],
    type: 'fullstack',
  },
  {
    id: 3,
    title: 'Gitalyze',
    liveLink: 'https://gitalyze.xyz',
    gitLink: 'https://github.com/Shobhnik13/Gitalyze',
    status: 'Stable',
    techStack: ['Next.js', 'Redis', 'GitHub API', 'Node.js', 'Express.js'],
    overview: [
      'GitHub profile analyzer — enter a username, get a rich dashboard of repos, contributions, and stats.',
      'GitHub API responses cached in Redis for fast repeat lookups.',
    ],
    type: 'fullstack',
  },
  {
    id: 4,
    title: 'MakeMyPath',
    liveLink: 'https://makemypath.shobhnik.site/',
    gitLink: 'https://github.com/Shobhnik13/makemypath',
    status: 'In Progress',
    techStack: ['Next.js', 'OpenAI API', 'TypeScript', 'Tailwind CSS'],
    overview: [
      'AI-powered learning roadmap generator — users describe their goal, AI builds a personalized path.',
    ],
    type: 'fullstack',
  },
  {
    id: 5,
    title: 'InsightPlus',
    liveLink: '',
    gitLink: 'https://github.com/Shobhnik13/InsightPlus',
    status: 'Stable',
    techStack: ['NestJS', 'TypeScript', 'Redis', 'PostgreSQL', 'Clickhouse'],
    overview: [
      'Open-source, self-hostable analytics engine with dual-DB architecture (PostgreSQL + Clickhouse).',
      'Processes thousands of events per second with fully customizable metrics and event schemas.',
    ],
    type: 'backend',
  },
  {
    id: 6,
    title: 'ChatApp',
    liveLink: '',
    gitLink: 'https://github.com/Shobhnik13/chatApp',
    status: 'Stable',
    techStack: ['Redis', 'Pub-sub', 'Socket.io', 'TypeScript', 'Turborepo', 'Node.js'],
    overview: [
      'Scalable real-time chat backend template using Redis pub/sub for horizontal scaling.',
    ],
    type: 'backend',
  },
  {
    id: 7,
    title: 'DownDetective',
    liveLink: '',
    gitLink: 'https://github.com/Shobhnik13/DownDetective',
    status: 'Stable',
    techStack: ['Golang'],
    overview: [
      'Lightweight uptime monitor — concurrently checks a list of URLs and reports their status.',
    ],
    type: 'backend',
  },
  {
    id: 8,
    title: 'Job Scheduler',
    liveLink: '',
    gitLink: 'https://github.com/Shobhnik13/Scheduler',
    status: 'Stable',
    techStack: ['Golang', 'Goroutines', 'Channels', 'Mutex'],
    overview: [
      'Customizable scheduler for one-time and recurring jobs using goroutines and channels.',
    ],
    type: 'backend',
  },
  {
    id: 9,
    title: 'LoadBalancer',
    liveLink: '',
    gitLink: 'https://github.com/Shobhnik13/Load-Balancer',
    status: 'Stable',
    techStack: ['Golang', 'Round Robin', 'HTTP', 'Goroutines'],
    overview: [
      'Round-robin HTTP load balancer distributing requests across multiple backend servers.',
    ],
    type: 'backend',
  },
  {
    id: 10,
    title: 'DNS Resolver',
    liveLink: '',
    gitLink: 'https://github.com/Shobhnik13/go-resolver',
    status: 'Stable',
    techStack: ['Golang'],
    overview: [
      'Recursive DNS resolver with in-memory caching for fast repeated lookups.',
    ],
    type: 'backend',
  },
]

export const skillData = [
  {
    category: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Golang'],
  },
  {
    category: 'Frameworks',
    skills: ['React.js', 'Next.js', 'Express.js', 'Node.js', 'Bun', 'NestJS', 'Socket.io'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Clickhouse'],
  },
  {
    category: 'DevOps / Infra',
    skills: ['Docker', 'AWS', 'Azure', 'Cloudflare', 'Git', 'Postman', 'Burp Suite'],
  },
]

export const blogData = [
  {
    title: 'Simplifying your architecture with PostgreSQL',
    date: '26 Mar 2026',
    readTime: '6 min',
    href: 'https://medium.com/@shobhnikw/simplifying-your-architecture-with-postgressql-ccef50b5f993',
  },
  {
    title: 'Concurrency vs Parallelism in Node.js — Part 1',
    date: '25 Aug 2025',
    readTime: '4 min',
    href: 'https://medium.com/@shobhnikw/concurrency-vs-parallelism-in-node-js-part-1-introduction-1b87c468b788',
  },
  {
    title: 'Building a scalable Node.js job scheduler with BullMQ',
    date: '26 Jul 2025',
    readTime: '5 min',
    href: 'https://medium.com/@shobhnikw/how-to-build-a-fully-scalable-and-customisable-job-scheduler-that-can-handle-thousands-of-13dc5b2d564b',
  },
]
