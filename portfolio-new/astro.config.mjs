import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// Serves Vercel's /api functions during `astro dev` (production uses Vercel's runtime).
const vercelApiInDev = {
  name: 'vercel-api-in-dev',
  hooks: {
    'astro:server:setup': ({ server }) => {
      try { process.loadEnvFile('.env') } catch {}

      server.middlewares.use('/api/now-playing', async (req, res) => {
        const { default: handler } = await server.ssrLoadModule('/api/now-playing.js')
        const vres = {
          status(code) { res.statusCode = code; return vres },
          setHeader: (k, v) => res.setHeader(k, v),
          json(body) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)) },
          end: () => res.end(),
        }
        await handler(req, vres)
      })
    },
  },
}

export default defineConfig({
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    vercelApiInDev,
  ],
})
