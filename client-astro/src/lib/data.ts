export const socialData = [
  {
    id: 1,
    title: 'GitHub',
    subText: '@shobhnik13',
    link: 'https://github.com/Shobhnik13',
  },
  {
    id: 2,
    title: 'Twitter',
    subText: '@shobhnik__13',
    link: 'https://twitter.com/Shobhnik__13',
  },
  {
    id: 3,
    title: 'Leetcode',
    subText: '@shobhnik',
    link: 'https://leetcode.com/Shobhnik_1326/',
  },
  {
    id: 4,
    title: 'Linkedin',
    subText: 'linkedin.com/in/shobhnik13',
    link: 'https://www.linkedin.com/in/shobhnik13/',
  },
  {
    id: 5,
    title: 'Medium',
    subText: '@shobhnikw',
    link: 'https://medium.com/@shobhnikw',
  },
  {
    id: 10,
    title: 'Peerlist',
    subText: '@shobhnik13',
    link: 'https://peerlist.io/shobhnik13',
  },
  {
    id: 6,
    title: 'Schedule a meeting',
    subText: 'cal.com/shobhnik13',
    link: 'https://cal.com/shobhnik13/15min',
  },
  {
    id: 7,
    title: 'Resume',
    subText: 'shobhnik13/resume',
    link: 'https://drive.google.com/file/d/1cuEWRpMEgK-7zeMsC5Gf1ETmabCTtz8r/view?usp=drive_link',
  },
  {
    id: 8,
    title: 'Email',
    subText: 'shobhnikw@gmail.com',
    link: 'mailto:shobhnikw@gmail.com',
  },
]

export const experienceData = [
  {
    id: 1,
    title: 'Backend Engineer, Xane AI',
    duration: 'Jan 2026 – Present',
    location: 'Gurugram, Haryana, India (On-site)',
    overview: [
      ['Working as a ', 'Backend Engineer', ' building scalable backend services and system architectures for AI-powered products.'],
      ['Designing and optimizing APIs and data pipelines using ', 'Node.js', ', ', 'TypeScript', ', and modern backend practices.'],
      ['Collaborating with product and ML teams to deliver high-performance and reliable systems in production.'],
    ],
  },
  {
    id: 2,
    title: 'Software Engineer, Otomashen (E-solutions)',
    duration: 'Feb 2025 – Jan 2026',
    location: 'Noida, India (On-site)',
    overview: [
      ['Built and scaled a high-throughput ', 'EDI/X12 processing engine', ' handling ', '20K+ claim files and millions of encrypted denial records', ', driving a ', '166% revenue increase', '.'],
      ['Optimized backend services in ', 'Node.js/TypeScript', ' with query tuning, indexing, and caching; reduced API latency from ', '10s → <1s', ' at scale.'],
      ['Engineered a ', 'real-time dispatch system', ' for proximity-based doctor matching, request lifecycle (accept/decline), and instant notifications.'],
      ['Delivered ', '4 production-grade client systems', ', led one end-to-end as ', 'Lead Developer', ', owning architecture and execution.'],
    ],
  },
  {
    id: 3,
    title: 'Full Stack Developer, Stealth Startup',
    duration: 'Aug 2024 – Jan 2025',
    location: 'Remote',
    overview: [
      ['Owned the product end-to-end as the ', 'sole engineer', ', building all frontend workflows and integrating backend APIs from design to production.'],
      ['Architected the complete backend system, designing scalable architecture, database schema, and core processing workflows.'],
      ['Built a high-throughput notification pipeline using ', 'Node.js/TypeScript', ', ', 'BullMQ', ', ', 'Redis', ', ', 'PostgreSQL', ', and ', 'Socket.io', ', delivering thousands of notifications per second; implemented ', 'vector search', ' for fast large-scale retrieval.'],
      ['Developed a production-grade AI agent using ', 'LangGraph', ', ', 'LangChain', ', and ', 'Gemini', ' for complex workflow automation.'],
      ['Scaled the platform to ', '200–250 active users', ' managing ', '500K+ production records', ' in production.'],
    ],
  },
]

export const skillData = [
  {
    id: 1,
    category: 'languages',
    skills: [
      { name: 'JavaScript', logo: '/logos/js.svg' },
      { name: 'TypeScript', logo: '/logos/ts.svg' },
      { name: 'Golang', logo: '/logos/go.svg' },
    ],
  },
  {
    id: 2,
    category: 'frameworks',
    skills: [
      { name: 'React.js', logo: '/logos/react.svg' },
      { name: 'Next.js', logo: '/logos/nextjs.svg' },
      { name: 'Express.js', logo: '/logos/express.svg' },
      { name: 'Node.js', logo: '/logos/nodejs.svg' },
      { name: 'Socket.io', logo: '/logos/sio.svg' },
    ],
  },
  {
    id: 3,
    category: 'db',
    skills: [
      { name: 'PostgreSQL', logo: '/logos/psql.svg' },
      { name: 'MongoDB', logo: '/logos/mongo.svg' },
      { name: 'MySQL', logo: '/logos/mysql.svg' },
      { name: 'Redis', logo: '/logos/redis.svg' },
    ],
  },
  {
    id: 4,
    category: 'devops/infra',
    skills: [
      { name: 'Git', logo: '/logos/git.svg' },
      { name: 'Docker', logo: '/logos/docker.svg' },
      { name: 'Postman', logo: '/logos/postman.svg' },
      { name: 'AWS', logo: '/logos/aws.svg' },
      { name: 'Azure', logo: '/logos/azure.svg' },
      { name: 'Cloudflare', logo: '/logos/cloudflare.svg' },
      { name: 'Burp Suite', logo: '/logos/burpsuite.svg' },
    ],
  },
]

export const blogData = [
  {
    title: 'Simplifying your architecture with PostgresSQL',
    description:
      'This article dives deep into how you can leverage PostgreSQL for a wide range of use cases, helping you avoid unnecessary complexity and over-engineering in applications that don\'t yet require heavy scaling',
    date: '2026-03-26',
    readTime: '6 MIN READ',
    tags: ['BACKEND', 'SYSTEM DESIGN', 'POSTGRES', 'QUEUES', 'DATABASES'],
    href: 'https://medium.com/@shobhnikw/simplifying-your-architecture-with-postgressql-ccef50b5f993',
  },
  {
    title: 'Understanding Concurrency vs Parallelism in Node.js: The Beginner\'s Guide – Part 1.',
    description:
      'Diving deep into the concepts of concurrency and parallelism in Node.js, exploring how they differ and their significance in building efficient applications.',
    date: '2025-08-25',
    readTime: '4 MIN READ',
    tags: ['NODE.JS', 'CONCURRENCY', 'PARALLELISM', 'BACKEBND', 'WORKER THREADS', 'CLUSTERING', 'EVENT LOOP'],
    href: 'https://medium.com/@shobhnikw/concurrency-vs-parallelism-in-node-js-part-1-introduction-1b87c468b788',
  },
  {
    title: 'How to engineer a fully scalable, customizable Node.js job scheduler capable of handling thousands of concurrent tasks effortlessly.',
    description:
      'A comprehensive guide to building a robust job scheduler in Node.js using BullMQ and Redis, designed to manage thousands of concurrent tasks with ease and efficiency.',
    date: '2025-07-26',
    readTime: '5 MIN READ',
    tags: ['NODE.JS', 'BULLMQ', 'REDIS', 'BACKEND', 'WORKERS'],
    href: 'https://medium.com/@shobhnikw/how-to-build-a-fully-scalable-and-customisable-job-scheduler-that-can-handle-thousands-of-13dc5b2d564b',
  },
]
