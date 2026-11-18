import { blogData, experienceData, freeTimeData, meta, projectData, skillData, socialLinks } from './data'

export const SITE = 'https://shobhnik.site'

const flat = (b: string | string[]) => (Array.isArray(b) ? b.join('') : b)
const current = experienceData.find((j) => /present/i.test(j.duration))

export const intro = [
  `# ${meta.name}`,
  '',
  `> ${meta.role}. ${meta.tagline}`,
  '',
  meta.openToCollaborate ? 'Looking for: full-time or contract engineering and product roles (backend, AI and founding/product engineering).' : '',
  '',
  'Superpower: I figure things out. Throw me at a messy, half-broken system, hand me coffee and my playlist, and I come back with ideas you never saw coming.',
].filter((l, i, a) => l || a[i - 1])

export const facts = [
  '## Quick facts',
  '',
  `- Role: ${meta.role}`,
  current ? `- Current: ${current.role} at ${current.company}` : null,
  '- Location: Gurugram, India (IST, UTC+5:30)',
  '- Experience: ~3 years shipping production backend and AI systems',
  `- Core stack: ${skillData
    .filter((c) => ['Languages', 'Runtime', 'Databases'].includes(c.category))
    .flatMap((c) => c.skills)
    .join(', ')}`,
  `- Proof points: ${experienceData
    .flatMap((j) => j.bullets.flatMap((b) => (Array.isArray(b) ? b.filter((p, i) => i % 2 === 1 && /^\d/.test(p)) : [])))
    .join(' · ')}`,
].filter((l): l is string => l !== null)

export const about = [
  '## About',
  '',
  "Backend & AI engineer with a product mindset. I've owned 0→1 systems end-to-end at YC and early-stage startups, from architecture and APIs to production.",
  '',
  'I care about systems that hold up at scale, not just code that works. Most of my code? Agents write it. I design the architecture, break down hard problems and make sure it doesn\'t suck.',
  '',
  'I work closely with founders, product and design teams, from system design and AI agents to launch and scale.',
]

export const experience = [
  '## Experience',
  ...experienceData.flatMap((job) => ['', `### ${job.role}, ${job.company}`, `${job.location}${/present/i.test(job.duration) ? ' · current role' : ''}`, '', ...job.bullets.map((b) => `- ${flat(b)}`)]),
]

export const skills = ['## Skills', '', ...skillData.map((c) => `- **${c.category}:** ${c.skills.join(', ')}`)]

const projectBlock = (p: (typeof projectData)[number]) => {
  const links = [p.liveLink && `[live](${p.liveLink})`, p.gitLink && `[source](${p.gitLink})`].filter(Boolean).join(' · ')
  return [`#### ${p.title}`, '', ...p.overview.map((o) => `- ${o}`), `- Status: ${p.status}`, `- Built with: ${p.techStack.join(', ')}`, ...(links ? [`- Links: ${links}`] : [])]
}

export const projects = [
  '## Projects',
  '',
  'Things I broke, fixed, and shipped.',
  '',
  '### Backend & systems',
  '',
  ...projectData.filter((p) => p.type === 'backend').flatMap((p) => [...projectBlock(p), '']),
  '### Full stack',
  '',
  ...projectData.filter((p) => p.type === 'fullstack').flatMap((p) => [...projectBlock(p), '']),
]

export const freeTime = ['## Free time', '', ...freeTimeData.map((f) => `- **${f.title}:** ${f.detail}`)]

export const writing = ['## Writing', '', ...blogData.map((b) => `- [${b.title}](${b.href}) · ${b.date} · ${b.readTime} read`)]

export const contact = [
  '## Contact',
  '',
  `- Email: ${meta.email}`,
  `- Book an intro call: ${meta.calLink}`,
  `- Resume: ${meta.resumeLink}`,
  ...socialLinks.map((s) => `- ${s.label}: ${s.href}`),
]

export const md = (...blocks: string[][]) => blocks.map((b) => b.join('\n').trimEnd()).join('\n\n') + '\n'

export const text = (body: string, type = 'text/markdown') =>
  new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8`, 'Access-Control-Allow-Origin': '*' } })
