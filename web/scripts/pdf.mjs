// Renders ../print.html to ../Milad-Raeisi-CV.pdf with headless Chrome.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const candidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const chrome = candidates.find((p) => existsSync(p))
if (!chrome) throw new Error('Chrome not found, set CHROME_PATH')

execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=4000',
  `--print-to-pdf=${root}Milad-Raeisi-CV.pdf`,
  pathToFileURL(`${root}print.html`).href,
], { stdio: 'inherit' })
console.log('PDF written to Milad-Raeisi-CV.pdf')
