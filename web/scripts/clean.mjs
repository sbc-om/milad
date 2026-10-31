// The build writes into the repository root (served by GitHub Pages), so
// emptyOutDir is off. Remove only the previous hashed bundle before rebuilding.
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

rmSync(fileURLToPath(new URL('../../assets', import.meta.url)), { recursive: true, force: true })
