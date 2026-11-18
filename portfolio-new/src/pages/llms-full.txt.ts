import type { APIRoute } from 'astro'
import { about, contact, experience, facts, freeTime, intro, md, projects, skills, text, writing } from '../lib/agent'

export const GET: APIRoute = () => text(md(intro, facts, about, experience, projects, skills, writing, freeTime, contact), 'text/plain')
