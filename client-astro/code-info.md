# Astro Deep Dive — For Next.js Engineers

This document explains Astro from 0 to 1 for someone coming from Next.js.
It covers internal architecture, every fundamental concept, and maps every file
in this project to its Next.js equivalent.

---

## PART 1 — How Next.js Works Internally (What You Already Know)

Before explaining Astro, it helps to be precise about what Next.js actually does,
because Astro's design is a direct reaction to it.

### Next.js App Router — What Happens at Runtime

When a user visits your Next.js portfolio:

1. **Server renders the HTML** for the route (React Server Components run on the server)
2. **Sends that HTML** to the browser → user sees content fast (good)
3. **Also sends the full React runtime** (~45KB gzipped) + the Next.js client router (~30KB) + your component code
4. **Hydration runs** — React "takes over" the static HTML, attaches event listeners, and makes it interactive
5. **Now the page is interactive** — but only after all that JS has downloaded, parsed, and executed

Even if your component is 100% static (like `AboutMe.tsx` which has zero interactivity),
Next.js still ships it as part of the React tree and hydrates it. You paid the hydration
cost for a `<div>` with text in it. That's the problem Astro solves.

### The "Islands" Mental Model

Think of your portfolio page as an ocean of static HTML with a few tiny islands
of interactivity floating in it:

```
[static text] [static text] [ISLAND: github calendar] [static text] [static text]
```

Next.js treats the entire ocean as one big React app.
Astro treats each island as an isolated component and ships JS only for those islands.

---

## PART 2 — Astro's Internal Architecture

### 2.1 Build Time vs Runtime

Astro is fundamentally a **build-time framework**. Here's what this means:

```
Next.js:  Request → Server runs React → HTML + JS bundle → Browser hydrates everything
Astro:    Build time → Renders all .astro files to pure HTML → Deploy static files
          Request → Browser gets HTML (no JS unless you asked for it)
```

When you run `npm run build`, Astro:
1. Reads every `.astro` file
2. Runs the frontmatter (the `---` block) as **Node.js code at build time**
3. Renders the template to a plain HTML string
4. Writes `.html` files to `dist/`
5. For React islands (`client:idle`, `client:load`, etc.) — bundles only those components separately

Your entire portfolio compiles to 13 `.html` files + ~80KB of JS (only for the GitHub calendar).
A Next.js equivalent ships ~300KB of JS just to render the same static content.

### 2.2 The `.astro` File Format

A `.astro` file has two sections separated by `---`:

```astro
---
// FRONTMATTER — runs at BUILD TIME in Node.js
// This is TypeScript/JavaScript. Not JSX. Not a React component.
// Has full access to: fs, imports, await, environment variables
// Output of this section: variables available in the template below
import { something } from './somewhere'
const data = await fetch('https://api.example.com/data')
const computed = data.json()
---

<!-- TEMPLATE — HTML with {expressions} -->
<!-- This is NOT JSX. It's HTML with Astro's expression syntax -->
<div class="container">  <!-- class, not className -->
  <p>{computed.title}</p>  <!-- same {} expressions as JSX -->
  {computed.items.map(item => <span>{item}</span>)}
</div>
```

**Key differences from a React component:**

| | React Component | Astro Component |
|---|---|---|
| Runs on | Client (browser) or Server | Build time ONLY |
| Re-renders | Yes (state changes) | Never (HTML is static) |
| Hooks | useState, useEffect, etc. | Not available — it's not React |
| `class` vs `className` | `className` | `class` (it's real HTML) |
| `htmlFor` | Yes | `for` (real HTML) |
| `{expression}` | JSX expressions | Same syntax, but evaluated once at build |
| Can be async | No (hooks break it) | Yes — `const data = await fetch(...)` in frontmatter |
| Props | Function parameters | `Astro.props` |

### 2.3 Astro's Rendering Pipeline (Deep)

When Astro processes `src/pages/index.astro`:

```
1. Parse frontmatter (---block---) → extract imports, run TS code in Node.js
2. Resolve component tree → follow all imports recursively
3. Execute each component's frontmatter in dependency order
4. Render template to HTML string (no virtual DOM, no diffing)
5. Inline or reference any <script> tags
6. Write dist/index.html
```

This is fundamentally different from React's reconciler. There is no virtual DOM.
No diffing. No fiber tree. Just: code runs → string output. It's closer to
PHP/EJS templates than React, but with full TypeScript support.

### 2.4 Script Handling — Three Modes

Astro has three ways to add JavaScript:

```astro
<!-- MODE 1: Hoisted (default) -->
<!-- Bundled, deduped, loaded as a module -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    console.log('runs in browser')
  })
</script>

<!-- MODE 2: is:inline -->
<!-- NOT processed by Vite. Inlined as-is into HTML. Runs immediately. -->
<!-- Use for: theme initialization (must run before paint to avoid flash) -->
<script is:inline>
  const theme = localStorage.getItem('theme')
  document.documentElement.classList.toggle('dark', theme === 'dark')
</script>

<!-- MODE 3: src= with define:vars -->
<!-- External script with variables passed from frontmatter -->
<script define:vars={{ myVar }}>
  console.log(myVar) // myVar came from frontmatter
</script>
```

The theme script in `Layout.astro` uses `is:inline` specifically because it
**must run synchronously before the browser paints** — if it were a module,
it would be deferred and users would see a flash of the wrong theme.

### 2.5 React Islands — The `client:*` Directives

When you use a React component in Astro, you control WHEN its JS loads:

```astro
<!-- Hydrate immediately on page load -->
<Counter client:load />

<!-- Hydrate when browser is idle (requestIdleCallback) -->
<GithubContributions client:idle />

<!-- Hydrate when the component enters the viewport -->
<HeavyChart client:visible />

<!-- Hydrate only on a specific media query -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- Never hydrate — server render only, no JS sent -->
<StaticWidget client:only="react" />
```

This project uses `client:idle` for `GithubContributions` because:
- The GitHub calendar is below the fold
- It uses `react-github-calendar` which is React-only
- We don't want it to block initial page paint
- Idle means: browser loads critical content first, then hydrates the calendar

Everything else (`Navbar`, `Intro`, `AboutMe`, etc.) has **no directive** — which
means Astro renders them to HTML at build time and sends zero JS for them.

### 2.6 Content Collections

Content Collections are Astro's equivalent of a CMS or database — but built on
local Markdown files with TypeScript schema validation.

```
src/content/
  config.ts          ← Zod schema definition
  projects/
    novaenv.md       ← Each file = one "entry"
    gitalyze.md
    ...
```

**The flow:**
1. You define a Zod schema in `config.ts`
2. Astro validates every `.md` file's frontmatter against that schema at build time
3. In any page, you call `getCollection('projects')` to get typed data
4. Calling `entry.render()` gives you a `<Content />` component that renders the markdown body

**Next.js equivalent:** There's no direct equivalent. The closest is `gray-matter` +
`remark` to parse markdown manually, or using a CMS. Astro builds this in natively
with type safety.

### 2.7 `Astro.url` and Server Context

In Next.js, you use hooks:
```tsx
const pathname = usePathname()   // client component
const params = useParams()       // client component
```

In Astro, these are available in frontmatter at build time:
```astro
---
const pathname = Astro.url.pathname  // works in any .astro file
const { slug } = Astro.params        // from dynamic routes like [slug].astro
const props = Astro.props            // props passed to this component
---
```

`Astro` is a global object available in every `.astro` file's frontmatter.
It's like Next.js's server-side context but available everywhere, not just in page files.

### 2.8 `<slot />` — Astro's `{children}`

```astro
<!-- Layout.astro -->
<html>
  <body>
    <slot />  <!-- renders whatever the parent passed between tags -->
  </body>
</html>
```

```astro
<!-- index.astro — using the layout -->
<Layout>
  <Intro />    <!-- this goes into <slot /> -->
  <AboutMe />
</Layout>
```

Next.js equivalent: `{children}` prop in a React component.
Astro also supports named slots: `<slot name="header" />` for multiple injection points.

### 2.9 File-Based Routing (Same as Next.js)

```
src/pages/
  index.astro          → /
  projects/
    index.astro        → /projects
    [slug].astro       → /projects/novaenv, /projects/gitalyze, etc.
  blogs/
    index.astro        → /blogs
```

Dynamic routes work exactly like Next.js `[name]` folders. The difference:
- Next.js: `generateStaticParams()` for static generation
- Astro: `getStaticPaths()` — same concept, slightly different API

---

## PART 3 — File by File: This Project

### `astro.config.mjs`
**Next.js equivalent:** `next.config.js`

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [
    react(),           // enables React components + JSX processing
    tailwind({
      applyBaseStyles: false,  // we import globals.css manually, don't auto-inject
    }),
  ],
})
```

**What integrations are:**
Next.js bundles everything (React, routing, image optimization) into one package.
Astro is modular — you opt into features. `@astrojs/react` adds React support
(without it, `.tsx` files won't compile). `@astrojs/tailwind` wires up PostCSS
and Tailwind automatically — you don't need `postcss.config.js`.

**`applyBaseStyles: false`:** By default the Tailwind integration injects
`@tailwind base/components/utilities` for you. We set this to false because
we have our own `globals.css` with custom base styles and CSS variables — we
don't want them injected twice.

---

### `tsconfig.json`
**Next.js equivalent:** `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

`astro/tsconfigs/strict` is Astro's base tsconfig — it sets up JSX for React,
enables strict mode, and tells TypeScript about Astro-specific types (like the
`Astro` global object and `.astro` file imports).

`@/*` alias maps to `./src/*` — same as your Next.js config. So `import x from '@/lib/data'`
works identically.

---

### `tailwind.config.ts`
**Next.js equivalent:** `tailwind.config.ts` — nearly identical

The only change from the Next.js version:
```ts
// Next.js version:
content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}']

// Astro version:
content: ['./src/**/*.{astro,tsx,ts}']
```

The glob now includes `.astro` files — Tailwind needs to scan them for class names.
**Removed:** `tailwindcss-animate` plugin (it was only used for Radix accordion
animations which are gone).

---

### `src/styles/globals.css`
**Next.js equivalent:** `app/globals.css`

Exact copy. This file contains:
- `@tailwind base/components/utilities` directives
- CSS custom properties (HSL color tokens) for light/dark mode
- Global `body` and `*` styles
- Scrollbar styling

It's imported in `Layout.astro` frontmatter:
```astro
---
import '../styles/globals.css'
---
```

In Next.js you imported it in `layout.tsx`. Same pattern, same file content.

---

### `src/content/config.ts`
**Next.js equivalent:** No direct equivalent (you had `lib/data.ts` → `projectData` array)

```ts
import { z, defineCollection } from 'astro:content'

const projects = defineCollection({
  schema: z.object({
    id: z.number(),
    title: z.string(),
    name: z.string(),
    liveLink: z.string(),
    gitLink: z.string(),
    status: z.string(),
    techStack: z.array(z.string()),
    type: z.enum(['fullstack', 'backend']),
    image: z.string(),
  }),
})

export const collections = { projects }
```

**What Zod does here:** When `npm run build` runs, Astro reads every `.md` file in
`src/content/projects/`. For each file it validates the frontmatter against this
Zod schema. If a field is missing or wrong type, the build **fails with a clear error**.
This is type safety for your content files — like TypeScript but for Markdown.

The key export is `collections` — the object keys (`projects`) must match the
directory names under `src/content/`.

---

### `src/content/projects/*.md` (10 files)
**Next.js equivalent:** Each entry in `projectData` array in `lib/data.ts`

Each file looks like:
```markdown
---
id: 5
title: "NovaEnv"
name: "novaenv"
liveLink: "https://novaenv.shobhnik.site"
gitLink: "https://github.com/Shobhnik13/NovaEnv-frontend"
status: "Building 🧩"
techStack: ["Next.js", "Typescript", "Node.js", "Express.js", "MongoDB"]
type: "fullstack"
image: "/projects/nenv_new.png"
---

- A environment variable manager with project-based organization.
- Fully encrypted with AES-256 encryption.
```

The `---` block is YAML frontmatter — validated by the Zod schema in `config.ts`.
The content below the second `---` is Markdown — rendered by `<Content />` on the
detail page.

**Why projects got Markdown but experiences/skills/blogs did not:**
- Projects have their own URL (`/projects/novaenv`) and a readable body → ideal for Content Collections
- Experiences have complex rendering logic (alternating bold text from `string[]`) → TypeScript is cleaner
- Skills are just `{name, logo}` pairs → no body, no URL, pure config data
- Blogs link to external Medium → you're not hosting the content

---

### `src/lib/data.ts`
**Next.js equivalent:** `lib/data.ts` (minus `projectData` and `strengthsData`)

Identical structure — `experienceData`, `skillData`, `socialData`, `blogData`.
`projectData` was removed (now in content collections).
`strengthsData` was removed (was already commented out in Next.js version).

Imported in `.astro` frontmatter blocks:
```astro
---
import { experienceData } from '../lib/data'
---
```

This runs at build time. `experienceData` is inlined into the HTML output.
No client JS is generated, no bundle includes this file.

---

### `src/lib/utils.ts`
**Next.js equivalent:** `lib/utils.ts` — exact copy

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

`cn()` merges Tailwind classes, handling conflicts intelligently.
Used in `.astro` files and `.tsx` React components the same way.

---

### `src/layouts/Layout.astro`
**Next.js equivalent:** `app/layout.tsx`

```astro
---
import '../styles/globals.css'
import Navbar from '../components/Navbar.astro'
import AppLoader from '../components/AppLoader.astro'

interface Props { title?: string }
const { title = 'Shobhnik — Portfolio' } = Astro.props
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- Google Fonts via <link> instead of next/font -->
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif..." rel="stylesheet" />

    <!-- Flash-free theme — MUST run before paint -->
    <script is:inline>
      (function() {
        const stored = localStorage.getItem('theme')
        if (stored === 'dark') document.documentElement.classList.add('dark')
        else if (stored === 'light') document.documentElement.classList.remove('dark')
        else document.documentElement.classList.toggle('dark',
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      })()
    </script>
  </head>
  <body>
    <AppLoader />
    <Navbar />
    <main id="page-content" style="opacity:0;transition:opacity 0.4s ease;">
      <slot />
    </main>
  </body>
</html>
```

**Key differences from Next.js `layout.tsx`:**

1. **`ThemeProvider` removed** → replaced by `<script is:inline>`. In Next.js,
   `next-themes` wraps your app in a React context that reads localStorage and sets
   the class. In Astro there's no React context across the page, so we use a raw
   inline script. The `is:inline` means it runs synchronously before the browser
   renders anything — zero flash of wrong theme.

2. **`next/font` removed** → replaced by a `<link>` tag. `next/font` is a Next.js
   optimization that self-hosts Google Fonts and injects them as CSS variables. In
   Astro we just link directly to Google Fonts. You could self-host fonts manually
   in `/public` for the same perf benefit.

3. **`{children}` → `<slot />`** — Astro's version of React's children prop.

4. **`AppWrapper` (React) → `AppLoader.astro`** — The loader was a React component
   using `useState`/`useEffect`/`useRef`. In Astro it's static HTML + a `<script>`
   tag with vanilla JS. No React needed.

5. **`interface Props`** — This is how you type props in Astro components.
   Astro reads this interface and uses it for TypeScript checking when you use
   `<Layout title="foo" />`.

6. **`page-content` starts with `opacity:0`** — the AppLoader script will set it
   to 1 after the loading animation completes. This is the Astro equivalent of
   Next.js's `AppWrapper` controlling `{children}` opacity via React state.

---

### `src/components/AppLoader.astro`
**Next.js equivalent:** `components/AppWrapper.tsx`

The Next.js version used:
- `useState` for progress, visible, loaded, message
- `useRef` for interval handles
- `usePathname` for route-specific messages
- `useEffect` to run the loader on mount and route changes

The Astro version:
```astro
---
<!-- No frontmatter needed — pure HTML + script -->
---

<div id="app-loader" ...>
  <!-- SVG ring, progress bar, message — static HTML -->
</div>

<script>
  // Vanilla TypeScript — runs once when the page loads
  const loader = document.getElementById('app-loader')
  // ... interval logic ...
  document.addEventListener('DOMContentLoaded', () => {
    runLoader(window.location.pathname)
  })
</script>
```

**Why this works without React state:**
React state exists to trigger re-renders. But here we don't need re-renders —
we directly manipulate the DOM:
```ts
ring.style.strokeDashoffset = String(offset)   // instead of setState({progress})
bar.style.width = progress + '%'               // instead of style={{width: progress+'%'}}
```

Direct DOM manipulation is fine here because the loader is a one-shot animation.
It runs once, completes, and removes itself from the DOM.

**One important difference from the Next.js version:**
The Next.js `AppWrapper` also handled **route change** loading (re-running the
loader when you navigate between pages). Astro pages are static HTML files —
navigation is a full page load, not a client-side route change. So each page
load naturally triggers the loader fresh. No `usePathname` needed.

---

### `src/components/Navbar.astro`
**Next.js equivalent:** `components/Navbar.tsx`

```astro
---
const pathname = Astro.url.pathname   // replaces usePathname()

const navItems = [
  { id: 'projects', title: 'projects', href: '/projects' },
  { id: 'blogs', title: 'blogs', href: '/blogs' },
]
---

<nav id="navbar">
  <a href="/">Shobhnik</a>   <!-- replaces router.push('/') -->
  {navItems.map(item => {
    const isActive = pathname === item.href
    return <a href={item.href} class={isActive ? '... underline' : '...'}>
      {item.title}
    </a>
  })}
  <button id="theme-toggle">...</button>
</nav>

<script>
  // Scroll detection — replaces useState(isScrolled) + useEffect(scroll listener)
  let scrolled = false
  window.addEventListener('scroll', () => {
    const nowScrolled = window.scrollY > 100
    if (nowScrolled !== scrolled) {
      scrolled = nowScrolled
      updateScrolledStyle(scrolled)
    }
  })

  // Theme toggle — replaces useState(darkMode) + toggleTheme()
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const newDark = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
    updateIcons()
  })
</script>
```

**What changed:**
- `usePathname()` → `Astro.url.pathname` evaluated at build time per page.
  Each page's HTML has the correct `isActive` baked in — no client JS needed for it.
- `useRouter().push(href)` → `<a href={item.href}>` — plain anchor tags.
- `useState(isScrolled)` → a local `let scrolled = false` variable in the script.
  Since there's no component tree to re-render, we just call `updateScrolledStyle()`
  directly when the value changes.
- `useState(darkMode)` → read directly from `document.documentElement.classList`
  every time we need to know the current theme. No state needed when the DOM IS the state.
- `lucide-react` Sun/Moon icons → inline SVG. Two small SVGs directly in the HTML,
  toggled with `classList.add/remove('hidden')`.

**The `mounted` trick is gone:**
In the Next.js Navbar there was `const [mounted, setMounted] = useState(false)` and
the theme button was hidden until after hydration (to avoid SSR/client mismatch).
In Astro there's no hydration of this component at all — it's pure HTML rendered
once at build time. No mismatch is possible.

---

### `src/components/Intro.astro`
**Next.js equivalent:** `components/Intro.tsx`

```astro
---
// Age calculated at BUILD TIME — runs once when you deploy, not on every request
const birthDate = new Date(2003, 6, 13)
const today = new Date()
let age = today.getFullYear() - birthDate.getFullYear()
const hasHadBirthday = today.getMonth() > birthDate.getMonth() || ...
if (!hasHadBirthday) age--
---

<img src="/IntroImg.jpeg" .../>  <!-- replaces next/image -->
<p>{age}, he/him</p>
```

**What changed:**
- `next/image` → plain `<img>`. Next.js's `<Image>` component handles lazy loading,
  WebP conversion, and sizing. Astro doesn't have a built-in equivalent (you can add
  `@astrojs/image` integration). For a 100×100 profile photo the difference is minimal.
- `getAge()` function → inline computation in frontmatter. In Next.js it recalculated
  on every render. In Astro it runs once at build time. Small optimization but cleaner.

---

### `src/components/AboutMe.astro`
**Next.js equivalent:** `components/AboutMe.tsx`

100% static text → became pure `.astro` with zero JavaScript.

The Next.js version was marked `'use client'` despite having no interactivity.
That meant React had to hydrate it. The Astro version sends exactly zero JS.

---

### `src/components/HireMe.astro`
**Next.js equivalent:** `components/HireMe.tsx`

**What changed:**
- `import { Button } from "./ui/button"` (shadcn, CVA, Radix Slot) → plain `<a>` tag with Tailwind classes
- `import Link from "next/link"` → `<a href>`
- `import { GoArrowUpRight } from "react-icons/go"` → inline SVG `<path d="M7 7h10v10"/>...`

The shadcn `Button` component brought in `@radix-ui/react-slot` + `class-variance-authority`
for a single button with one style. Replacing it with:
```html
<a class="inline-flex items-center px-4 py-2 bg-purple-200 ...">Schedule a meet</a>
```
is 40KB+ smaller and does the same thing.

---

### `src/components/Experiences.astro`
**Next.js equivalent:** `components/Experiences.tsx`

```astro
---
import { experienceData } from '../lib/data'
---

{experienceData.map(data => (
  <div>
    {data.overview.map(item => (
      <li>
        {Array.isArray(item)
          ? item.map((part, i) =>
              i % 2 === 1
                ? <strong>{part}</strong>   <!-- odd index = bold -->
                : <span>{part}</span>        <!-- even index = normal -->
            )
          : item}
      </li>
    ))}
  </div>
))}
```

The alternating-bold logic is identical to the React version — it works in Astro
templates the same way. The difference: this produces a static HTML string at build time.
No React runtime involved.

---

### `src/components/Skills.astro`
**Next.js equivalent:** `components/Skills.tsx`

Pure static — imports `skillData`, maps to `<span>` tags with `<img>` logos.
The `dark:invert` Tailwind class on Next.js/Express.js/Socket.io logos works
identically since we keep the same Tailwind config.

Zero JavaScript. Zero React. Just HTML.

---

### `src/components/Contact.astro`
**Next.js equivalent:** `components/Contact.tsx`

Same as HireMe — removed `react-icons` arrow icon, replaced with inline SVG.
`import Link from "next/link"` → `<a href>` with `target="_blank"`.

---

### `src/components/ProjectCard.astro`
**Next.js equivalent:** `components/ProjectCard.tsx`

```astro
---
interface Props { title: string; image: string; name: string }
const { title, image, name } = Astro.props
---

<a href={`/projects/${name}`}
   class="... hover:-translate-y-1 transition-transform duration-300">
  <img src={image} alt={title} />
  <h3>{title}</h3>
</a>
```

**What changed:**
- `motion.div whileHover={{ y: -4 }}` (framer-motion) → `hover:-translate-y-1 transition-transform duration-300` (Tailwind CSS)
  - Framer Motion is ~70KB gzipped. CSS `transform` is zero bytes.
  - The visual result is identical: card lifts 4px on hover with 300ms ease.
- `useRouter().push('/projects/' + name)` → wrapping `<a href>` tag
- `next/image fill` → `<img class="object-cover w-full h-full">`
- Props typed via `interface Props` instead of TypeScript function parameters

---

### `src/components/ProjectsHero.astro`
**Next.js equivalent:** `components/ProjectsHero.tsx`

Pure static HTML. The Next.js version was also static but still shipped as part
of the React hydration bundle. Astro sends it as raw HTML, nothing more.

---

### `src/components/BlogCard.astro`
**Next.js equivalent:** `components/BlogCard.tsx`

Same changes as other components: removed `react-icons`, replaced `Link` with `<a>`.
Tags rendering (slice(0,3) + "+X more") works identically in Astro template syntax.

---

### `src/components/BlogHero.astro`
**Next.js equivalent:** `components/BlogHero.tsx`

Pure static HTML.

---

### `src/components/GithubContributions.tsx`
**Next.js equivalent:** `components/GithubContributions.tsx`

This is the **only React component** in the entire project. It stays `.tsx` because
`react-github-calendar` is a React-only package — it can't run in an Astro template.

**What changed from the Next.js version:**
```tsx
// BEFORE (Next.js) — used next-themes
import { useTheme } from 'next-themes'
const { resolvedTheme } = useTheme()
useEffect(() => setIsDark(resolvedTheme === 'dark'), [resolvedTheme])

// AFTER (Astro) — reads DOM directly, watches for class changes
useEffect(() => {
  setIsDark(document.documentElement.classList.contains('dark'))

  const observer = new MutationObserver(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  return () => observer.disconnect()
}, [])
```

`useTheme` from `next-themes` required the entire app to be wrapped in
`ThemeProvider` React context. In Astro, there's no React context outside this
component — so we watch for class changes on `<html>` using a `MutationObserver`.
When the Navbar script toggles `dark` class, the observer fires and updates the
calendar's color theme.

**Used in `index.astro` as:**
```astro
<GithubContributions client:idle />
```

`client:idle` means: after the browser has finished loading critical resources
and is idle, then download and hydrate this component. The calendar appears
slightly after page load but doesn't block anything.

---

### `src/pages/index.astro`
**Next.js equivalent:** `app/page.tsx`

```astro
---
import Layout from '../layouts/Layout.astro'
import Intro from '../components/Intro.astro'
// ... all other imports
---

<Layout title="Shobhnik — Portfolio">
  <div class="max-w-3xl mx-auto px-4 pt-28">
    <Intro />
    <AboutMe />
    <HireMe />
    <GithubContributions client:idle />
    <Experiences />
    <Skills />
    <Contact />
  </div>
</Layout>
```

In Next.js, `app/page.tsx` was a React Server Component — it rendered on the
server and could be async. Astro's `.astro` page is also server-rendered (at
build time) and can be async. The mental model is similar, but Astro's output
is a static HTML file with no server runtime required.

---

### `src/pages/projects/index.astro`
**Next.js equivalent:** `app/projects/page.tsx`

**The filter system — biggest architecture change:**

Next.js used:
```tsx
'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const [tab, setTab] = useState('all')
const filtered = tab === 'all' ? projectData : projectData.filter(p => p.type === tab)

return (
  <Tabs onValueChange={setTab}>
    <TabsTrigger value="all">All</TabsTrigger>
    ...
  </Tabs>
  <AnimatePresence>
    <motion.div key={tab} initial={{opacity:0}} animate={{opacity:1}}>
      {filtered.map(proj => <ProjectCard ... />)}
    </motion.div>
  </AnimatePresence>
)
```

This brought in: Radix UI Tabs (~20KB), Framer Motion AnimatePresence (~70KB),
React state management, and required the entire page to be a client component.

Astro version:
```astro
---
const projects = await getCollection('projects')
---

<!-- ALL cards rendered in HTML, each tagged with data-type -->
{projects.map(p => (
  <div data-type={p.data.type} class="project-card-wrapper">
    <ProjectCard ... />
  </div>
))}

<!-- Filter buttons -->
<button data-tab="all" class="tab-btn bg-neutral-900 text-white">All</button>
<button data-tab="fullstack" class="tab-btn">Full Stack</button>
<button data-tab="backend" class="tab-btn">Backend</button>

<script>
  // 20 lines of vanilla JS vs 20KB of Radix + 70KB of Framer Motion
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab
      document.querySelectorAll('.project-card-wrapper').forEach(card => {
        card.style.display = (tab === 'all' || card.dataset.type === tab) ? '' : 'none'
      })
    })
  })
</script>
```

All 10 cards exist in the HTML at all times. The filter just shows/hides them
with `display:none`. No React, no state, no 90KB of animation libraries.

---

### `src/pages/projects/[slug].astro`
**Next.js equivalent:** `app/projects/[name]/page.tsx`

```astro
---
export async function getStaticPaths() {
  const projects = await getCollection('projects')
  return projects.map(project => ({
    params: { slug: project.data.name },  // URL segment
    props: { project },                    // data available as Astro.props
  }))
}

const { project } = Astro.props
const { Content } = await project.render()  // renders markdown body
---

<h1>{project.data.title}</h1>
<Content />  <!-- renders the markdown overview bullets -->
```

**`getStaticPaths()`** is the Astro equivalent of Next.js's `generateStaticParams()`.
It tells Astro which URLs to generate at build time. For 10 projects → 10 HTML files.

**`project.render()`** is unique to Content Collections. It returns a `<Content />`
component that renders the Markdown body of the file. The `---` frontmatter is
already in `project.data`. The bullet points below the frontmatter become `<ul>/<li>`
HTML via `<Content />`.

**`notFound()`** is gone — Astro simply doesn't generate URLs for unknown slugs,
so the server/CDN returns a 404 automatically for any path not in `getStaticPaths`.

---

### `src/pages/blogs/index.astro`
**Next.js equivalent:** `app/blogs/page.tsx`

```astro
---
import { blogData } from '../../lib/data'
---

{blogData.map(post => (
  <BlogCard title={post.title} ... />
))}
```

The Next.js version was `'use client'` for no reason (no hooks, no interactivity).
The Astro version is zero JavaScript — pure HTML output. The external Medium links
are just `<a href target="_blank">` anchors.

---

## PART 4 — What Was Deleted and Why

| Deleted | Was | Replaced With |
|---|---|---|
| `framer-motion` | 70KB - hover animations, AnimatePresence | CSS `hover:-translate-y-1 transition-all` |
| `react-icons` | 50KB - one arrow icon used 3 times | Inline SVG `<path d="M7 7h10v10"/>...` |
| `next-themes` | 4KB - ThemeProvider context | `<script is:inline>` in Layout.astro |
| `@radix-ui/react-tabs` | 20KB - project filter tabs | `<button>` + 20 lines of vanilla JS |
| `@radix-ui/react-tooltip` | 15KB - never used | Deleted |
| `@radix-ui/react-slot` | 5KB - shadcn Button primitive | Deleted |
| `class-variance-authority` | 5KB - shadcn variant system | Deleted |
| `tailwindcss-animate` | 2KB - accordion keyframes | Deleted |
| `@tabler/icons-react` | variable - never imported | Deleted |
| `react-hot-toast` | 5KB - never used | Deleted |
| `components/ui/button.tsx` | CVA Button | Plain `<a class="...">` |
| `components/ui/tabs.tsx` | Radix Tabs | `<button data-tab>` + vanilla JS |
| `components/ui/badge.tsx` | Dead code | Deleted |
| `components/ui/tooltip.tsx` | Dead code | Deleted |
| `components/Strengths.tsx` | Commented out in page | Deleted |
| `components/DarkModeToggle.tsx` | Duplicate of Navbar toggle | Deleted |
| `components/Loader.tsx` | Unused (AppWrapper was used) | Deleted |
| `next/image` | Image optimization component | Plain `<img>` |
| `next/link` | Client-side navigation | `<a href>` |
| `usePathname` | Hook — requires client component | `Astro.url.pathname` in frontmatter |
| `useRouter` | Hook — requires client component | `<a href>` |

**Total JS removed: ~250KB+ gzipped**

---

## PART 5 — Build Output Comparison

```
Next.js portfolio:
  First Load JS: ~250-300KB (shared chunks + page JS)
  Per page: + 5-20KB additional
  Hydrates: every component on every page

Astro portfolio (this project):
  Total client JS: ~80KB (almost all is react-github-calendar)
  Per page HTML: ~15-30KB
  Hydrates: one component (GithubContributions)
```

The Astro build produces:
```
dist/
  index.html               ← home page — complete HTML, no waiting
  projects/index.html      ← all 10 cards pre-rendered
  projects/novaenv/index.html
  projects/gitalyze/index.html
  ... (8 more)
  blogs/index.html
  _astro/
    GithubContributions.js  ← the ONE React island
    index.js                ← React runtime (only loaded on home page)
```

You can deploy the entire `dist/` folder to any static host — GitHub Pages,
Cloudflare Pages, Netlify, S3 — with zero server required.

---

## PART 6 — Mental Model Summary

```
Next.js thinks in components:  page = tree of React components, all hydrated
Astro thinks in output:        page = HTML file + optional JS islands

Next.js default: JavaScript everywhere, opt-out with RSC
Astro default:   No JavaScript, opt-in per component with client:*

Next.js runtime: Node.js server (or edge) for every request
Astro runtime:   None — build time only (for static output)

Next.js data:    fetch() in Server Components, cached intelligently
Astro data:      await in frontmatter, runs once at build time
```

The shift from Next.js to Astro is the shift from
**"render components on the server"**
to
**"generate HTML files that have no server"**.

For content that doesn't change between deploys (a portfolio, a blog, a docs site),
Astro is strictly better: faster, smaller, simpler, cheaper to host.
