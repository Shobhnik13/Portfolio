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
