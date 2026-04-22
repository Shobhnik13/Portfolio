import sharp from 'sharp'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath   = join(__dirname, '../public/og.svg')
const outPath   = join(__dirname, '../public/og.png')

const svg = readFileSync(svgPath)

await sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile(outPath)

console.log('✓ og.png generated')
