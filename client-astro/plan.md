# Astro Migration Plan

## Philosophy
This is a true Astro conversion — not a React wrapper transplant.
- **Content lives in Markdown** (Astro Content Collections)
- **Structure lives in `.astro` files** (zero JS by default)
- **Interactivity via vanilla `<script>` tags** (scroll, theme toggle, filter)
- **React only for `react-github-calendar`** (unavoidable third-party React component)

---

## File-by-File Conversion Map

### Configuration

| Next.js File | Astro Equivalent | Notes |
|---|---|---|
| `next.config.js` | `astro.config.mjs` | Defines integrations: `@astrojs/react`, `@astrojs/tailwind` |
| `tsconfig.json` | `tsconfig.json` | Extends `astro/tsconfigs/strict`, keeps `@/*` alias → `./src/*` |
| `tailwind.config.ts` | `tailwind.config.ts` | Identical — update `content` glob to `./src/**/*.{astro,tsx,ts}` |
| `package.json` | `package.json` | Replace Next.js deps with Astro. Keep: framer-motion removed, keep: radix-ui tabs, react-github-calendar, lucide-react, tailwind deps |
| `postcss.config.js` | (not needed) | `@astrojs/tailwind` handles PostCSS automatically |
| `app/globals.css` | `src/styles/globals.css` | Exact copy — Tailwind directives + CSS variable tokens |
| `components.json` | (not needed) | shadcn config not used in Astro |

---

### Data & Utilities

| Next.js File | Astro Equivalent | Notes |
|---|---|---|
| `lib/utils.ts` | `src/lib/utils.ts` | Exact copy — `cn()` helper |
| `lib/data.ts` → `experienceData` | `src/lib/data.ts` | Kept as TypeScript — not a good fit for individual MD files |
| `lib/data.ts` → `skillData` | `src/lib/data.ts` | Kept as TypeScript |
| `lib/data.ts` → `socialData` | `src/lib/data.ts` | Kept as TypeScript |
| `lib/data.ts` → `blogData` | `src/lib/data.ts` | Kept as TypeScript (external Medium URLs, not local content) |
| `lib/data.ts` → `projectData` | `src/content/projects/*.md` | **Each project becomes its own Markdown file with frontmatter** |

---

### Content Collections (New in Astro)

| Next.js Source | Astro File | What Goes Where |
|---|---|---|
| `projectData[0]` (NovaEnv) | `src/content/projects/novaenv.md` | Frontmatter: id, title, name, liveLink, gitLink, status, techStack, type, image. Body: overview bullet points as markdown |
| `projectData[1]` (MyBrainDump) | `src/content/projects/mybraindump.md` | Same structure |
| `projectData[2]` (Gitalyze) | `src/content/projects/gitalyze.md` | Same structure |
| `projectData[3]` (MakeMyPath) | `src/content/projects/makemypath.md` | Same structure |
| `projectData[4]` (InsightPlus) | `src/content/projects/insightplus.md` | Same structure |
| `projectData[5]` (ChatApp) | `src/content/projects/chatapp.md` | Same structure |
| `projectData[6]` (DownDetective) | `src/content/projects/downdetective.md` | Same structure |
| `projectData[7]` (Job Scheduler) | `src/content/projects/jobscheduler.md` | Same structure |
| `projectData[8]` (LoadBalancer) | `src/content/projects/loadbalancer.md` | Same structure |
| `projectData[9]` (Dns Resolver) | `src/content/projects/dnsresolver.md` | Same structure |
| *(new)* | `src/content/config.ts` | Zod schema that validates all project frontmatter fields |

---

### Layout

| Next.js File | Astro Equivalent | Conversion Notes |
|---|---|---|
| `app/layout.tsx` | `src/layouts/Layout.astro` | `ThemeProvider` removed → replaced with `<script is:inline>` that reads localStorage and sets `class="dark"` before paint. Google Fonts loaded via `<link>` instead of `next/font`. `AppLoader` and `Navbar` embedded as `.astro` components. `<slot />` replaces `{children}`. |

---

### Pages

| Next.js File | Astro Equivalent | Conversion Notes |
|---|---|---|
| `app/page.tsx` | `src/pages/index.astro` | Import all section `.astro` components. `GithubContributions` included as React island with `client:idle`. |
| `app/projects/page.tsx` | `src/pages/projects/index.astro` | Cards rendered server-side with `data-type` attribute. Vanilla JS `<script>` handles tab filter (show/hide by dataset). No React, no framer-motion — CSS transitions used instead. |
| `app/projects/[name]/page.tsx` | `src/pages/projects/[slug].astro` | `getStaticPaths()` uses `getCollection('projects')`. `<Content />` renders the markdown body. No `notFound()` — Astro handles 404 automatically for missing static paths. |
| `app/blogs/page.tsx` | `src/pages/blogs/index.astro` | Pure `.astro`. Maps over `blogData` from `lib/data.ts` and renders `BlogCard.astro`. No client JS needed. |

---

### Components

| Next.js File | Astro Equivalent | React? | Conversion Notes |
|---|---|---|---|
| `components/Navbar.tsx` | `src/components/Navbar.astro` | No | `usePathname` → `Astro.url.pathname` in frontmatter. `useRouter` → `<a href>` tags. Scroll morph + theme toggle handled by vanilla `<script>` in the component. |
| `components/AppWrapper.tsx` | `src/components/AppLoader.astro` | No | Progress ring + bar rendered as static HTML/SVG. Vanilla `<script>` drives the animation on `DOMContentLoaded`. Controls `#page-content` opacity. |
| `components/Intro.tsx` | `src/components/Intro.astro` | No | Age calculated in frontmatter `---` block at build time. `next/image` → `<img>`. |
| `components/AboutMe.tsx` | `src/components/AboutMe.astro` | No | Pure HTML in Astro template. |
| `components/GithubContributions.tsx` | `src/components/GithubContributions.tsx` | **Yes** | Only React file. `useTheme` removed — reads `document.documentElement.classList` via `useEffect`. Used in page with `client:idle`. |
| `components/HireMe.tsx` | `src/components/HireMe.astro` | No | `next/link` → `<a>`. `Button` component → plain `<button>` with inline Tailwind classes. `GoArrowUpRight` → inline SVG. |
| `components/Experiences.tsx` | `src/components/Experiences.astro` | No | Data imported from `src/lib/data.ts` in frontmatter. Alternating bold rendering works the same in Astro template. |
| `components/Skills.tsx` | `src/components/Skills.astro` | No | Data imported in frontmatter. `<img>` tags for logos — identical behavior. |
| `components/Contact.tsx` | `src/components/Contact.astro` | No | `next/link` → `<a>`. `GoArrowUpRight` → inline SVG. |
| `components/ProjectCard.tsx` | `src/components/ProjectCard.astro` | No | `framer-motion` hover removed — replaced with `hover:-translate-y-1 transition-transform duration-300` Tailwind classes. `next/image` → `<img>`. Click navigation → wrapping `<a>` tag. |
| `components/ProjectsHero.tsx` | `src/components/ProjectsHero.astro` | No | Pure static HTML. |
| `components/BlogCard.tsx` | `src/components/BlogCard.astro` | No | Pure static HTML with `<a>` links. `GoArrowUpRight` → inline SVG. |
| `components/BlogHero.tsx` | `src/components/BlogHero.astro` | No | Pure static HTML. |
| `components/Strengths.tsx` | *(not ported)* | — | Was already commented out in Next.js version. |
| `components/DarkModeToggle.tsx` | *(not ported)* | — | Was unused in Next.js version. |
| `components/Loader.tsx` | *(not ported)* | — | Functionality absorbed into `AppLoader.astro`. |
| `components/ui/button.tsx` | *(not ported)* | — | No longer needed — HireMe uses plain `<button>`. |
| `components/ui/tabs.tsx` | *(not ported)* | — | Projects filter uses vanilla JS + HTML `<button>` tabs. |
| `components/ui/badge.tsx` | *(not ported)* | — | Was unused. |
| `components/ui/tooltip.tsx` | *(not ported)* | — | Was unused. |

---

## React Island Summary

Only **1 React component** in the entire Astro project:

| Component | Directive | Why React |
|---|---|---|
| `GithubContributions.tsx` | `client:idle` | `react-github-calendar` is a React-only package |

---

## What Gets Removed vs Replaced

| Removed | Replaced With |
|---|---|
| `next-themes` | `<script is:inline>` in Layout.astro |
| `framer-motion` | Tailwind `hover:` + `transition-` classes |
| `next/link` | `<a href>` |
| `next/image` | `<img>` |
| `usePathname`, `useRouter` | `Astro.url.pathname`, `<a href>` |
| `useState` for scroll | Vanilla JS `scroll` event listener |
| `useState` for theme | Vanilla JS + localStorage |
| `useState` for tab filter | Vanilla JS dataset filtering |
| shadcn/ui Tabs | HTML `<button>` tabs + vanilla JS |
| shadcn/ui Button | Plain `<button>` with Tailwind |
| `react-icons` | Inline SVG |
| `@tabler/icons-react` | Not needed |
| `lucide-react` (Sun/Moon) | Inline SVG in Navbar.astro |

---

## Directory Structure (Final)

```
astro-main/
├── plan.md                          ← this file
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── public/
│   ├── IntroImg.jpeg
│   ├── logos/         (20 SVGs)
│   └── projects/      (PNG screenshots)
└── src/
    ├── content/
    │   ├── config.ts              ← Zod schema
    │   └── projects/
    │       ├── novaenv.md
    │       ├── mybraindump.md
    │       ├── gitalyze.md
    │       ├── makemypath.md
    │       ├── insightplus.md
    │       ├── chatapp.md
    │       ├── downdetective.md
    │       ├── jobscheduler.md
    │       ├── loadbalancer.md
    │       └── dnsresolver.md
    ├── layouts/
    │   └── Layout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── projects/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   └── blogs/
    │       └── index.astro
    ├── components/
    │   ├── Navbar.astro
    │   ├── AppLoader.astro
    │   ├── Intro.astro
    │   ├── AboutMe.astro
    │   ├── GithubContributions.tsx   ← only React file
    │   ├── HireMe.astro
    │   ├── Experiences.astro
    │   ├── Skills.astro
    │   ├── Contact.astro
    │   ├── ProjectCard.astro
    │   ├── ProjectsHero.astro
    │   ├── BlogCard.astro
    │   └── BlogHero.astro
    ├── lib/
    │   ├── data.ts
    │   └── utils.ts
    └── styles/
        └── globals.css
```
