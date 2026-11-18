import type { APIRoute } from 'astro'
import { contact, md, text, writing } from '../lib/agent'

export const GET: APIRoute = () => text(md(['# Writing · Shobhnik'], writing, contact))
