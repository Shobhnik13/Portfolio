import type { APIRoute } from 'astro'
import { contact, md, projects, text } from '../lib/agent'

export const GET: APIRoute = () => text(md(['# Projects · Shobhnik'], projects, contact))
