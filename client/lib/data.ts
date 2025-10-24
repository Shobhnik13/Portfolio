export const projectData = [
    {
        id: 5,
        title: "NovaEnv",
        name: "novaenv",
        LiveLink: "https://novaenv.shobhnik.xyz",
        gitLink: "https://github.com/Shobhnik13/NovaEnv-frontend",
        status: "Building 🧩",
        techStack: ["Next.js", "Typescript", "Node.js", "Express.js", "MongoDB", "AES-256 Encryption", "Tailwind CSS", "shadcn/ui"],
        overview: [
            "Dark, metallic-themed environment variable manager.",
            "Project-based organization with token-based structure.",
        ],
        type: "fullstack",
        image: "/projects/nenv.png",
    },
    {
        id: 1,
        title: "MyBrainDump",
        name: "mybraindump",
        LiveLink: "https://mybraindump.shobhnik.xyz",
        gitLink: "https://github.com/Shobhnik13/MyBrainDump-frontend", // Add GitHub link if available
        status: "Live 👍🏽",
        techStack: [
            "Next.js",
            "Shadcn/ui",
            "MongoDB",
            "Node.js",
            "Express.js",
            "Web Speech API",
            "Gemini API",
            "Clerk",
        ],
        overview: [
            "AI-powered task and date manager.",
            "Users speak naturally, and AI converts it into actionable tasks, so that you can focus on what matters.",
        ],
        type: "fullstack",
        image: "/projects/mbd.png",
    },
    {
        id: 2,
        title: "Gitalyze",
        name: "gitalyze",
        LiveLink: "https://gitalyze.xyz",
        gitLink: "https://github.com/Shobhnik13/Gitalyze",
        status: "Stable 🟢",
        techStack: ["Next.js", "Redis", 'GitHub API', "Shadcn/ui", "Node.js", "Express.js"],
        overview: [
            "Developed a GitHub profile analyzer that allows users to enter their GitHub username and instantly view a visually rich dashboard of their repositories, contributions, and coding stats."
        ],
        type: "fullstack",
        image: "/projects/gl.png",
    },
    {
        id: 3,
        title: "MakeMyPath",
        name: "makemypath",
        LiveLink: "https://makemypath.shobhnik.xyz/",
        gitLink: "https://github.com/Shobhnik13/makemypath",
        status: "In Progress 🧠",
        techStack: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Framer Motion"],
        overview: [
            "An AI-powered roadmap generator that helps users create personalized learning paths based on their goals and interests.",
        ],
        type: "fullstack",
        image: "/projects/mmp.png",
    },
    {
        id: 4,
        title: "ChatApp",
        name: "chatapp",
        LiveLink: "",
        gitLink: "https://github.com/Shobhnik13/chatApp",
        status: "Stable 💪",
        techStack: ["Redis", "Pub-sub", "Socket.io", "Typescript", "Turborepo", "Node.js", "Express.js"],
        overview: [
            "A scalable chat app template built to integrate with various frontends and services.",
        ],
        type: "backend",
        image: "/projects/chat.png",
    },
    {
        id: 6,
        title: "DownDetective",
        name: "downdetective",
        LiveLink: "",
        gitLink: "https://github.com/Shobhnik13/DownDetective",
        status: "Stable 💪",
        techStack: ["Golang"],
        overview: [
            "A fun project to monitor websites and check whether they are up or down",
        ],
        type: "backend",
        image: "/projects/golang.png",
    },
    {
        id: 6,
        title: "Job Scheduler",
        name: "jobscheduler",
        LiveLink: "",
        gitLink: "https://github.com/Shobhnik13/Scheduler",
        status: "Stable 💪",
        techStack: ["Golang", "Goroutine", "Channel", "Mutex"],
        overview: [
            "A customizable job scheduler for scheduling one time and recurring jobs",
        ],
        type: "backend",
        image: "/projects/gs.png",
    },
    {
        id: 6,
        title: "LoadBalancer",
        name: "loadbalancer",
        LiveLink: "",
        gitLink: "https://github.com/Shobhnik13/Load-Balancer",
        status: "Stable 💪",
        techStack: ["Golang", "Round Robin Algorithm", "HTTP", "Goroutine", "Mutex"],
        overview: [
            "A simple load balancer implementing the round robin algorithm to distribute incoming HTTP requests across multiple servers.",
        ],
        type: "backend",
        image: "/projects/lb.png",
    }
]


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
        link: 'https://drive.google.com/file/d/1aTxVfQoofBxWySbcsZO-iTZa8IIyjgmz/view?usp=sharing',
    },
    {
        id: 8,
        title: 'Email',
        subText: 'shobhnikw@gmail.com',
        link: 'mailto:shobhnikw@gmail.com',
    }
]

export const experienceData = [
    {
        id: 1,
        title: 'Software Engineer, Otomashen (E-solutions)',
        duration: 'Feb 2025 – Present',
        location: 'Noida (In-office)',
        overview: [
            [
                'Owned and engineered a custom ',
                'EDI parser',
                ' capable of processing over ',
                '20k files (~6M records) in minutes',
                ', directly boosting platform efficiency and increasing revenue by ',
                '166%',
                '.'
            ],
            [
                'Redesigned backend using ',
                'Node.js',
                ' + ',
                'Express',
                ', ',
                'PostgreSQL',
                ', and ',
                'Redis',
                ', optimized queries, reduced API response times from ',
                '10s → <1s',
                ', and built event-driven microservices integrated with ',
                'Kafka',
                ', ',
                'Grafana',
                ', and ',
                'Prometheus',
                ' for full observability.'
            ],
            [
                'Developed full-stack features including ',
                'React dashboards with Chart.js',
                ', integrated APIs, implemented a dynamic ',
                'RBAC module',
                ', and built ',
                'bulk file upload with real-time progress tracking',
                '.'
            ]
        ]
    }
    ,
    {
        id: 2,
        title: 'Software Engineer, Freelancing – Remote',
        duration: 'Oct 2024 – Jan 2025',
        overview: [
            [
                'Built a scalable ticketing platform for customer support using ',
                'Node.js, Express, MongoDB, Redis, BullMQ',
                ' with an automated ticket assignment algorithm.'
            ],
            [
                'Designed multi-tenant architecture with ',
                'RBAC',
                ', serving 5+ teams with 200–250 members, providing Jira-like functionality for different client organizations.'
            ],
            [
                'Led full-stack development as sole contributor: designed UI using ',
                'Next.js, Tailwind CSS, Shadcn, Framer Motion',
                ', integrated APIs, implemented pagination, infinite scroll using react-virtualized, dynamic filtering, responsive layouts, and real-time updates for high-performance frontend.'
            ],
            [
                'Implemented a complete end-to-end real-time offline and online notification system using ',
                'Redis Pub/Sub Adapter, Node.js, Express, Socket.io and PostgreSQL',
                ', capable of handling over 10,000 concurrent requests per minute with horizontally scalable architecture.'
            ]
        ]
    },
    {
        id: 3,
        title: 'Software Engineer Intern, Publicis Groupe – Gurugram, India',
        duration: 'Aug 2024 – Oct 2024',
        overview: [
            [
                'Contributed as a junior member of the ',
                'cybersecurity team',
                ', developing authorized ',
                'JavaScript malwares',
                ' to simulate attacks for internal vulnerability assessments.'
            ],
            [
                'Performed hands-on vulnerability research, completed ',
                'OWASP Top 10 labs',
                ' and ',
                'PortSwigger exercises using Burp Suite',
                ', and practiced defense scenarios on ',
                'Hack The Box',
                '.'
            ],
            [
                'Collaborated with senior engineers to improve ',
                'secure coding',
                ' and ',
                'application security practices',
                '.'
            ]
        ]
    }
];

export const skillData = [
    {
        id: 1,
        category: "languages",
        skills: [
            { name: "JavaScript", logo: "/logos/js.svg" },
            { name: "TypeScript", logo: "/logos/ts.svg" },
            { name: "Golang", logo: "/logos/go.svg" },
        ],
    },
    {
        id: 2,
        category: "frameworks",
        skills: [
            { name: "React.js", logo: "/logos/react.svg" },
            { name: "Next.js", logo: "/logos/nextjs.svg" },
            { name: "Express.js", logo: "/logos/express.svg" },
            { name: "Node.js", logo: "/logos/nodejs.svg" },
            { name: "Socket.io", logo: "/logos/sio.svg" },
        ],
    },
    {
        id: 3,
        category: "db",
        skills: [
            { name: "PostgreSQL", logo: "/logos/psql.svg" },
            { name: "MongoDB", logo: "/logos/mongo.svg" },
            { name: "MySQL", logo: "/logos/mysql.svg" },
            { name: "Redis", logo: "/logos/redis.svg" },
        ],
    },
    {
        id: 4,
        category: "devops/infra",
        skills: [
            { name: "Git", logo: "/logos/git.svg" },
            { name: "Docker", logo: "/logos/docker.svg" },
            { name: "Postman", logo: "/logos/postman.svg" },
            { name: "AWS", logo: "/logos/aws.svg" },
            { name: "Azure", logo: "/logos/azure.svg" },
            { name: "Cloudflare", logo: "/logos/cloudflare.svg" },
            { name: "Burp Suite", logo: "/logos/burpsuite.svg" },
        ],
    },
];


export const blogData = [
    {
        title: "Understanding Concurrency vs Parallelism in Node.js: The Beginner’s Guide – Part 1.",
        description:
            "Diving deep into the concepts of concurrency and parallelism in Node.js, exploring how they differ and their significance in building efficient applications.",
        date: "2025-08-25",
        readTime: "4 MIN READ",
        tags: ["NODE.JS", "CONCURRENCY", "PARALLELISM", "BACKEBND", "WORKER THREADS", "CLUSTERING", "EVENT LOOP"],
        href: "https://medium.com/@shobhnikw/concurrency-vs-parallelism-in-node-js-part-1-introduction-1b87c468b788"
    },
    {
        title: "How to engineer a fully scalable, customizable Node.js job scheduler capable of handling thousands of concurrent tasks effortlessly.",
        description:
            "A comprehensive guide to building a robust job scheduler in Node.js using BullMQ and Redis, designed to manage thousands of concurrent tasks with ease and efficiency.",
        date: "2025-07-26",
        readTime: "5 MIN READ",
        tags: ["NODE.JS", "BULLMQ", "REDIS", "BACKEND", "WORKERS"],
        href: "https://medium.com/@shobhnikw/how-to-build-a-fully-scalable-and-customisable-job-scheduler-that-can-handle-thousands-of-13dc5b2d564b"
    },
]

export const strengthsData = [
    "0 → 1 product development, building from scratch",
    "Designing scalable backend systems",
    "Building clean, maintainable APIs",
    "Solving complex data and algorithmic problems",
    "Writing clean and well documented code",
    "Rapid prototyping and product development",
]