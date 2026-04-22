import sharp from 'sharp'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svg = readFileSync(join(__dirname, '../public/favicon.svg'))
const out = (file, size) =>
  sharp(svg).resize(size, size).png().toFile(join(__dirname, `../public/${file}`))

await Promise.all([
  out('favicon-32.png', 32),
  out('favicon-180.png', 180), // apple-touch-icon
])
console.log('✓ favicons generated')
