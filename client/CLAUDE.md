# Portfolio — Next.js Codebase Reference

## Stack

- **Framework:** Next.js 14.2.35 (App Router)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 3.3.0 + shadcn/ui
- **Animation:** Framer Motion 12.11.4
- **Theme:** next-themes 0.4.6 (dark/light, class-based)
- **Icons:** lucide-react, react-icons, @tabler/icons-react
- **Fonts:** Inter (body), Instrument Serif (headings) — Google Fonts
- **Analytics:** @vercel/analytics, @vercel/speed-insights

---

## Directory Structure

```
client/
├── app/
│   ├── layout.tsx               # Root layout: ThemeProvider, Navbar, AppWrapper, fonts
│   ├── page.tsx                 # Home page: 7 sequential sections
│   ├── globals.css              # CSS variables (HSL tokens), Tailwind directives
│   ├── favicon.ico
│   ├── projects/
│   │   ├── page.tsx             # Projects grid with tab filter (client component)
│   │   └── [name]/
│   │       └── page.tsx         # Dynamic project detail (notFound() on miss)
│   └── blogs/
│       └── page.tsx             # Blog listing (external Medium links)
├── components/
│   ├── Navbar.tsx               # Fixed nav, scroll morph, theme toggle
│   ├── AppWrapper.tsx           # Full-screen loader + route transition
│   ├── Intro.tsx                # Hero: profile image + dynamic age
│   ├── AboutMe.tsx              # Bio paragraph
│   ├── GithubContributions.tsx  # react-github-calendar, dynamic import
│   ├── HireMe.tsx               # CTA: cal.com + resume links
│   ├── Experiences.tsx          # Work timeline from experienceData
│   ├── Skills.tsx               # Skill grid with SVG logos
│   ├── Strengths.tsx            # Strengths list (UNUSED — commented out in page.tsx)
│   ├── Contact.tsx              # Social links from socialData
│   ├── ProjectCard.tsx          # Card with framer-motion hover (client)
│   ├── ProjectsHero.tsx         # Projects page header
│   ├── BlogCard.tsx             # Blog post card (external link, client)
│   ├── BlogHero.tsx             # Blogs page header
│   ├── DarkModeToggle.tsx       # Standalone toggle (unused — Navbar handles it)
│   ├── Loader.tsx               # Loading spinner animation
│   └── ui/
│       ├── button.tsx           # shadcn Button (CVA variants)
│       ├── tabs.tsx             # shadcn Tabs (Radix UI)
│       ├── badge.tsx            # shadcn Badge
│       └── tooltip.tsx          # shadcn Tooltip (Radix UI)
├── lib/
│   ├── data.ts                  # ALL portfolio content (single source of truth)
│   └── utils.ts                 # cn() — clsx + tailwind-merge
└── public/
    ├── IntroImg.jpeg            # Profile photo
    ├── logos/                   # 20 tech SVGs (js, ts, go, react, nextjs, express,
    │                            #   nodejs, sio, psql, mongo, mysql, redis, git,
    │                            #   docker, aws, azure, cloudflare, postman,
    │                            #   burpsuite, jira)
    └── projects/                # Project screenshots (nenv_new.png, mbd_new.png,
                                 #   gl_new.png, mmp_new.png, chat_new.png,
                                 #   dd_new.png, lb_new.png, js_new.png, ip.png,
                                 #   gs.png, gr.png, golang.png)
```

---

## Routes

| Route | File | Type | Notes |
|-------|------|------|-------|
| `/` | `app/page.tsx` | Server | 7 sections |
| `/projects` | `app/projects/page.tsx` | Client | Tab filter + AnimatePresence |
| `/projects/[name]` | `app/projects/[name]/page.tsx` | Server | notFound() on miss |
| `/blogs` | `app/blogs/page.tsx` | Client | External Medium links |

---

## Data Architecture (`lib/data.ts`)

All content is static, centralized here. No database, no API routes.

### `projectData` — 10 projects

```typescript
interface ProjectItem {
  id: number
  title: string
  name: string        // route slug, matches [name] param
  LiveLink: string    // URL or ""
  gitLink: string     // GitHub URL or ""
  status: string      // e.g. "Live 👍🏽" | "Building 🧩"
  techStack: string[]
  overview: string[]  // bullet points shown on detail page
  type: "fullstack" | "backend"
  image: string       // path under /public/projects/
}
```

Projects: NovaEnv, MyBrainDump, Gitalyze, MakeMyPath, InsightPlus, ChatApp, DownDetective, Job Scheduler, LoadBalancer, DNS Resolver

### `experienceData` — 3 entries

```typescript
interface ExperienceItem {
  id: number
  title: string
  duration: string
  location: string
  overview: Array<string | string[]>  // string[] = bold alternating text
}
```

Experiences: Backend Engineer @ Xane AI (Jan 2026–Present), Software Engineer @ Otomashen (Feb 2025–Jan 2026), Full Stack Dev @ Stealth Startup (Aug 2024–Jan 2025)

### `skillData` — 4 categories

```typescript
interface SkillCategory {
  id: number
  category: "languages" | "frameworks" | "db" | "devops/infra"
  skills: Array<{ name: string; logo: string }>  // logo = /logos/*.svg
}
```

### `blogData` — 3 posts

```typescript
interface BlogItem {
  title: string
  description: string
  date: string      // ISO format
  readTime: string  // "X MIN READ"
  tags: string[]
  href: string      // external Medium URL
}
```

### `socialData` — 9 links

```typescript
interface SocialItem {
  id: number
  title: string
  subText: string
  link: string  // full URL or mailto:
}
```

Links: GitHub, Twitter, LeetCode, LinkedIn, Medium, Peerlist, cal.com scheduling, Resume (Google Drive), Email

### `strengthsData` — string[] (6 items, currently unused)

---

## Component Details

### `Navbar.tsx` (client)
- Fixed top, morphs on scroll: expands → compact pill with blur backdrop
- Scroll threshold: detects `window.scrollY > 10`
- Active route highlighted (bold + underline) via `usePathname`
- Theme toggle: reads/writes `localStorage`, toggles `document.documentElement.classList`
- Transition: 700ms cubic-bezier(0.4,0,0.2,1)

### `AppWrapper.tsx` (client)
- Full-screen loader overlay on route changes
- SVG circular progress ring (stroke-dasharray animation) + linear progress bar
- Route-specific messages: `/` → "initialising portfolio...", `/projects` → "curating projects...", `/blogs` → "loading blog posts..."
- Progress: 0→100% over ~20ms intervals; fade out 500ms after complete

### `Intro.tsx` (server)
- Calculates age dynamically from birthdate `2003-07-13`
- Profile image from `/public/IntroImg.jpeg` with hover scale-110

### `GithubContributions.tsx` (client)
- Uses `react-github-calendar` with dynamic import (no SSR)
- Username: `"SHOBHNIK13"`
- Last 6 months, block size 14px, margin 4px
- Custom color theme per dark/light mode

### `ProjectCard.tsx` (client)
- Props: `title: string`, `image: string`, `link: string`, `name: string`
- `motion.div` with `whileHover={{ y: -4 }}`, duration 0.3s
- Clicking routes to `/projects/[name]`

### `BlogCard.tsx` (client)
- Props: `title, description, date, readTime, tags: string[], href`
- Shows first 3 tags, "+X more" badge for overflow
- Opens `href` in new tab (external Medium)

---

## Styling

### Color Tokens (`app/globals.css`)

Light mode:
- `--background: 0 0% 100%` (pure white)
- `--foreground: 222.2 84% 4.9%` (deep navy)
- `--primary: 222.2 47.4% 11.2%`
- `--secondary: 210 40% 96.1%`
- `--border: 214.3 31.8% 91.4%`

Dark mode:
- `--background: 0 0% 0%` (pure black)
- `--foreground: 0 0% 95%` (off-white)
- `--primary: 0 0% 95%`
- `--secondary: 0 0% 20%`
- `--border: 0 0% 20%`

All colors consumed as `hsl(var(--token))` in Tailwind.

### Tailwind Config
- `darkMode: ["class"]`
- Colors mapped to CSS variables
- `--radius: 0.5rem` (lg), calc -2px (md), calc -4px (sm)
- Plugin: `tailwindcss-animate` (accordion animations)

### Fonts
- `Inter` → `var(--font-inter)` on `<body>`
- `Instrument Serif` (400) → `var(--font-instrument-serif)` on `<html>`
- Usage: `className="font-[family-name:var(--font-instrument-serif)]"`

### Animation Timings
- 125ms — image zoom (ultra-fast)
- 200ms — button hovers
- 300ms — color/border transitions
- 500ms — page fade transitions
- 700ms — navbar morph

---

## Key Patterns

- **Data-driven:** All content in `lib/data.ts`; components just render it
- **"use client" only where needed:** useState, useEffect, framer-motion, usePathname
- **Dynamic imports:** `next/dynamic` for `react-github-calendar` (avoids SSR crash)
- **`cn()` for class merging:** `import { cn } from "@/lib/utils"` — always use instead of string concat
- **Path alias:** `@/*` → project root (configured in `tsconfig.json`)
- **shadcn/ui pattern:** CVA variants in `components/ui/`, Radix primitives underneath
- **notFound():** Used in `[name]/page.tsx` when project slug not found
- **No API routes, no database** — purely static

---

## Scripts

```bash
npm run dev    # next dev (localhost:3000)
npm run build  # next build
npm run start  # next start
npm run lint   # next lint
```

---

## Logo Dark Mode Inversion

Next.js, Express.js, and Socket.io SVGs require `dark:invert` class because their logos are black (invisible on dark backgrounds). Applied in `Skills.tsx`.
