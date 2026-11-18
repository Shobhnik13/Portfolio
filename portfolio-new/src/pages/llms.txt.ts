import type { APIRoute } from 'astro'
import { SITE, contact, facts, intro, md, text } from '../lib/agent'

export const GET: APIRoute = () =>
  text(
    md(
      intro,
      facts,
      [
        '## Pages',
        '',
        `- [Home](${SITE}/index.md): about, experience, skills and free time`,
        `- [Projects](${SITE}/projects.md): backend, systems and full-stack projects with source links`,
        `- [Writing](${SITE}/blogs.md): technical articles I've written`,
        '',
        '## Full content',
        '',
        `- [Everything in one file](${SITE}/llms-full.txt)`,
      ],
      contact,
    ),
    'text/plain',
  )
