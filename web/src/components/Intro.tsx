import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { motion, useAnimationControls } from 'motion/react'
import { ShimmeringText } from '@animate-ui/react/primitives/texts/shimmering'
import { Brand } from './Brand'
import { profile } from '../data'

const HOLD_MS = 2900
const EASE = [0.76, 0, 0.24, 1] as const

type Props = {
  target: RefObject<HTMLElement | null>
  onFlyStart: () => void
  onDone: () => void
}

// Full-screen intro: the name assembles in the centre as a large logo, then shrinks
// and flies into the header logo slot measured from `target`.
export function Intro({ target, onFlyStart, onDone }: Props) {
  const group = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const [flying, setFlying] = useState(false)
  const started = useRef(false)

  const fly = useCallback(async () => {
    if (started.current || !group.current || !target.current) return
    started.current = true
    const from = group.current.getBoundingClientRect()
    const to = target.current.getBoundingClientRect()
    setFlying(true)
    onFlyStart()
    await controls.start({
      x: to.left - from.left,
      y: to.top - from.top,
      scale: to.width / from.width,
      transition: { duration: 1, ease: EASE },
    })
    onDone()
  }, [controls, onDone, onFlyStart, target])

  useEffect(() => {
    const timer = setTimeout(fly, HOLD_MS)
    const skip = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') && fly()
    window.addEventListener('keydown', skip)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', skip)
    }
  }, [fly])

  return (
    <div className="fixed inset-0 z-50" onClick={fly} role="presentation">
      <motion.div
        className="absolute inset-0 bg-paper"
        animate={{ opacity: flying ? 0 : 1 }}
        transition={{ duration: 0.7, delay: flying ? 0.25 : 0, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="flex flex-col items-center">
          <motion.div
            ref={group}
            animate={controls}
            style={{ transformOrigin: '0 0', fontSize: 'clamp(28px, 6vw, 72px)' }}
          >
            <Brand animated />
          </motion.div>

          <motion.div
            className="mt-[clamp(18px,3vw,34px)] flex flex-col items-center gap-4"
            animate={{ opacity: flying ? 0 : 1, y: flying ? -8 : 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.span
              className="block h-px w-[min(60vw,420px)] origin-center bg-ink/15"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.1, ease: EASE }}
            />
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center font-mono text-[11px] uppercase tracking-[0.24em] sm:text-xs"
            >
              <ShimmeringText text={profile.headline} color="#a1a1a8" shimmeringColor="#0f0f10" duration={1.6} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={fly}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.24em] text-faint hover:text-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: flying ? 0 : 0.8 }}
        transition={{ delay: flying ? 0 : 1.2 }}
      >
        Skip intro
      </motion.button>
    </div>
  )
}
