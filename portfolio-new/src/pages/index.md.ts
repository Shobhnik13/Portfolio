import type { APIRoute } from 'astro'
import { about, contact, experience, facts, freeTime, intro, md, skills, text } from '../lib/agent'

export const GET: APIRoute = () => text(md(intro, facts, about, experience, skills, freeTime, contact))
