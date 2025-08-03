export const projectData = [
    {
        id: 6,
        title: 'MyBrainDump',
        LiveLink: 'https://mybraindump.shobhnik.xyz',
        GithubLink: '',
        status: 'Live 👍🏽',
        techStack: 'Next.js, Shadcn/ui, MongoDB, Node.js, Express.js, Web Speech API, Gemini API, Clerk',
        overview: [
            ['Built an ', 'AI-powered task and date management platform', ' where users can ', 'speak their thoughts naturally', ' and have them ', 'converted into actionable tasks by AI', '.'],
            ['Integrated ', 'Web Speech API', ' for capturing voice input and ', 'Gemini API', ' for intelligent task and date parsing.'],
            ['Users can ', 'edit, complete, delete, or restore tasks', ' seamlessly within an intuitive dashboard.'],
            ['Implemented a feature for ', 'storing important dates through voice', ' with automated ', 'reminder notifications before the event', '.'],
            ['Used ', 'MongoDB', ' with a custom schema to manage user-specific tasks and dates, ensuring scalability and performance.'],
            ['Secured user data and sessions using ', 'Clerk authentication', ' and managed routes with a ', 'Node.js + Express backend', '.']
        ]
    },
    {
        id: 7,
        title: 'Gitalyze',
        LiveLink: 'https://gitalyze.xyz/',
        GithubLink: '',
        status: 'Live 👍🏽',
        techStack: 'React.js, Node.js, Express.js,  Shadcn/UI, Github API, Redis',
        overview: [
            ['Developed a ', 'GitHub profile analyzer', ' that allows users to enter their GitHub username and instantly view a ', 'visually rich dashboard', ' of their repositories, contributions, and coding stats.'],
            ['Used the ', 'GitHub API', ' to fetch real-time user data, including commit history, repository details, and language usage.'],
            ['Generated ', 'skill-based statistics and insights', ' by analyzing commit patterns, repo metadata, and language distribution, offering a unique and engaging representation of a developer\'s work.'],
            ['Designed the frontend with ', 'React.js and Shadcn/UI', ' for a clean, modern, and responsive interface.'],
            ['Implemented a ', 'Node.js and Express.js backend', ' with optimized API routes and caching using ', 'Redis', ' for fast and efficient data delivery.'],
            ['Used by over ', '100+ developers', ' to showcase their GitHub activity in a more exciting and insightful way.']
        ]
    },
    {
        id: 1,
        title: 'MakeMySkill',
        LiveLink: 'https://makemyskill.vercel.app',
        GithubLink: '',
        status: 'Live 👍🏽',
        techStack: 'Next.js, Shadcn/ui, PostgreSQL, Drizzle ORM, Framer Motion, Web Speech API, Node.js, Express.js',
        overview: [
            ['Developed an ', 'AI Mock Interview Platform', ' where users can create interviews, receive ', 'domain-specific questions', ', record answers, and get real-time ', 'AI-generated feedback', '.'],
            ['Integrated APIs for fetching dynamic interview data powered by ', 'Node.js', ' and ', 'Express.js', '.'],
            ['Built the platform using ', 'Next.js', ' with serverless API routes, ensuring fast performance and scalable architecture.'],
            ['Implemented ', 'Drizzle ORM', ' with ', 'PostgreSQL', ' to handle secure and efficient database interactions for user data and sessions.'],
            ['Used ', 'Web Speech-to-Text API', ' to capture spoken responses, convert them to text, and stream them to AI for real-time feedback.']
        ]
    },
    {
        id: 2,
        title: 'MakeMyPath',
        LiveLink: 'https://makemypath.xyz',
        GithubLink: '',
        status: 'Live 👍🏽',
        techStack: 'Next.js, Shadcn/ui, Node.js, Express.js, Framer Motion, Clerk',
        overview: [
            ['Developed a web application where users input a ', 'domain', ' and AI dynamically generates tailored career roadmaps with milestones and personalized learning paths.'],
            ['Built and integrated ', 'Node.js', ' and ', 'Express.js', ' based APIs to fetch dynamic AI-driven content.'],
            ['Designed a modern, responsive UI using ', 'Framer Motion', ' animations and ', 'Shadcn/UI', ' component library.'],
            ['Implemented secure authentication and session management using ', 'Clerk', ' to handle user data across the platform.']
        ]
    },
    // {
    //     id: 3,
    //     title: 'Promogenie',
    //     LiveLink: 'https://promogenie.xyz/',
    //     GithubLink: 'https://github.com/Shobhnik13/Promogenie',
    //     status: 'Under Review',
    //     techStack: 'Next.js, Node.js, Express.js, Typescript, JavaScript, Supabase, MongoDB',
    //     overview: [
    //         'Developed a SaaS (Software as a Service) application for AI content generation targeting various social media platforms.',
    //         'It was launched few months ago and currently it has 50+ Monthly Active Users.',
    //         'Implemented Next.js and TypeScript for the frontend service, ensuring robust and efficient user interactions and Utilized Node.js and Express.js for the backend service, facilitating seamless data processing and API handling.',
    //         'Also implemented PWA webapp concept so that the user can download this webapp on their mobilephones and use it frequently in their day to day lives.'
    //     ]
    // },
    {
        id: 3,
        title: 'BingePicks',
        LiveLink: 'https://bingepicks.vercel.app/',
        GithubLink: '',
        status: 'Live 👍🏽',
        techStack: 'Next.js, Drizzle ORM, PostgreSQL, Shadcn/UI',
        overview: [
            ['Built a platform where users can ', 'add and share movies/shows', ' with others to reduce time spent deciding what to watch.'],
            ['Enabled users to ', 'rate each other’s recommendations', ', promoting community-driven discovery and rankings.'],
            ['Top-rated movies are shown globally using a ', 'dynamic leaderboard system', ' based on user votes and feedback.'],
            ['Implemented the core using ', 'Next.js', ', structured backend via ', 'Drizzle ORM', ' and database with ', 'PostgreSQL', '.'],
            ['Crafted a responsive UI using ', 'Shadcn/UI', ' components for clean and modern design aesthetics.']
        ]
    },
    {
        id: 4,
        title: 'Excuz Me',
        LiveLink: 'https://excuzme.vercel.app',
        GithubLink: '',
        status: 'Live 👍🏽',
        techStack: 'Next.js, Gemini API, ShadCN UI, Tailwind CSS, TypeScript',
        overview: [
            ['Developed a ', 'corporate excuse generator', ' that creates professional-sounding reasons for workplace situations.'],
            ['Integrated ', 'Google Gemini API', ' to generate contextually appropriate and customizable excuses based on user inputs.'],
            ['Implemented ', 'custom gemini key addition feature', ' allowing users to provide and embbed their own key, for fast and seamless responses.'],
            ['Designed a ', 'clean, intuitive interface', ' using ShadCN UI components and Tailwind CSS for a seamless user experience.']
        ]
    },
    {
        id: 5,
        title: 'QuikChat',
        LiveLink: '',
        GithubLink: 'https://github.com/Shobhnik13/QuikChat',
        status: 'Under Review',
        techStack: 'Next.js, Redis, WebSockets, TypeScript, Pusher.js',
        overview: [
            ['Built a ', 'real-time chat application', ' using ', 'WebSockets', ', enabling instant messaging and responsive user interaction.'],
            ['Leveraged ', 'Pusher.js', ' to implement ', 'bidirectional communication', ', ensuring low latency and smooth message flow.'],
            ['Integrated ', 'Redis', ' to manage message streams efficiently, improving system performance and scalability.'],
            ['Implemented ', 'user authentication', ' and a ', 'friend request system', ', allowing users to send, accept, or decline chat invites.']
        ]
    },

    // {
    //     id:3,
    //     title:'SketchIt',
    //     LiveLink:'https://sketch-it-frontend.vercel.app/',
    //     GithubLink:'https://github.com/Shobhnik13/SketchIt-frontend',
    //     status:'Under Review',
    //     techStack:'Next.js, Typescript, Tailwind, Socket.io, Node.js, Express.js',
    //     overview:[
    //         'Implement a collaborative drawing board where multiple users can join and draw simultaneously in real-time.',
    //         'Utilize Next.js , TypeScript, Tailwind for user interface and design',
    //         'Employ Express.js and Node.js for the backend to handle HTTP requests',
    //         'Implement WebSocket protocol with Socket.io library to enable real-time communication between the server and clients, facilitating multiplayer drawing functionality with instant updates across all connected users.'
    //     ]
    // },

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
        subText: 'linkedin.com/in/shobhnik',
        link: 'https://www.linkedin.com/in/shobhnik-wadhwa-9986b6203/',
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
        link: 'https://drive.google.com/file/d/18TMjPV4I-4BJm3emtaymUXye7CmUgRJu/view?usp=sharing',
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
            ['Developed scalable and reusable frontend components using ', 'React.js', ' (Bulk File Upload, Role-Based Access Management, Analytics Dashboard), enhancing ', 'UX', ' and boosting user retention by ', '30%', '.'],
            ['Built and optimized high-performance ', 'Node.js', ' and ', 'Express.js APIs', ', reducing average execution time from ', '10 seconds to <1000ms', ' through logic refactoring and Redis-based caching.'],
            ['Delivered and deployed a core product feature that led to a revenue increase of over ', '166%', ' annually'],
            ['Engineered a custom ', 'EDI parser', ' capable of processing over ', '5.5 million records in minutes', ', enabling fast, large-scale file parsing.'],
            ['Improved database performance through advanced ', 'MySQL InnoDB buffer tuning', ', strategic ', 'query indexing', ', and optimal schema design — significantly cutting down I/O bottlenecks.'],
            ['Handled deployments and secure infrastructure setup using ', 'Nginx', ', ', 'Azure Blob Storage', ', and ', 'Azure Key Vault', ' for encrypted secret and asset management.'],
        ]
    }
    ,
    {
        id: 2,
        title: 'Software Engineering Intern, Publicis Groupe',
        duration: 'Aug, 2024 - Oct, 2024',
        overview: [
            ['Worked in the ', 'Cybersecurity team', ', gaining hands-on experience in information security practices and tooling.'],
            ['Used ', 'Burp Suite', ' to assess web vulnerabilities and explored real-world attacks including the ', 'OWASP Top 10', '.'],
            ['Automated internal tasks using ', 'Python scripts', ' and ', 'shell scripting', ', improving operational efficiency.']
        ]
    },
    {
        id: 3,
        title: 'Freelancing / Contract work',
        duration: 'Oct, 2023 - July, 2024',
        overview: [
            ['Served 10+ international clients providing full stack solutions'],
            ['Developed mutiple MVPs, DB migrations and deployement monitoring'],
            ['Tech used: Typescript, Javascript, React.js, Next.js, Node.js, Express.js, Tailwind, AWS, Vercel, Azure, MongoDb, Postgres, Redis, Docker'],
        ]
    },
    // {
    //   id: 4,
    //   title: 'Software Engineering Intern, GBTL',
    //   duration: 'June, 2024 - Aug, 2024',
    //   overview: [
    //     ['Customized and optimized sales and distribution processes using ', 'SAP ERP', ' and ', 'ABAP', ', enhancing business workflow efficiency.'],
    //     ['Developed and maintained ', 'sales and distribution modules', ' in ABAP, improving order processing and inventory tracking.'],
    //     ['Worked with cross-functional teams to resolve real-time SAP issues and implement best practices for ERP usage.']
    //   ]
    // },
    // {
    //   id: 5,
    //   title: 'Frontend Developer, Comify Technologies',
    //   duration: 'Contract-based',
    //   overview: [
    //     ['Built a fully responsive and engaging landing page using ', 'Next.js', ', ', 'TypeScript', ', and ', 'AOS animations', ' for better UX.'],
    //     ['Collaborated with designers and developers to improve feature adoption and overall product satisfaction.']
    //   ]
    // }
];



export const skillData = [
    {
        id: 1,
        "category": "languages",
        "skills": ["JavaScript", "TypeScript", "C++", "C"]
    },
    {
        id: 2,
        "category": "frameworks",
        "skills": ["React.js", "Next.js", "Express.js", "Node.js", "Redux", "Zustand"]
    },
    {
        id: 3,
        "category": "db",
        "skills": ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Redis", "Supabase"]
    },
    {
        id: 4,
        "category": "devops/infra",
        "skills": ["Git", "Docker", "Postman", "AWS (EC2, S3, Cloudfront)", "Azure(Key Vault, Blob storage , VM)", "Cloudflare-workers(Serverless)", "Burp Suite", "Vercel", "Messaging Queues",]
    }
]

export const blogData = [
    {
        id: 1,
        title: "How to build a fully scalable and customisable job scheduler that can handle thousands of concurrent requests in node.js?",
        image: "/blog_nodejs.webp",
        link: "https://medium.com/@shobhnikw/how-to-build-a-fully-scalable-and-customisable-job-scheduler-that-can-handle-thousands-of-13dc5b2d564b"
    },

];