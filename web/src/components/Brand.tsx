import { SplittingText } from '@animate-ui/react/primitives/texts/splitting'
import { profile } from '../data'

const letterIn = {
  initial: { y: '0.5em', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  stagger: 0.035,
} as const

// Text-only logo. Every dimension is in `em`, so the intro's large copy and the
// header's small copy have identical proportions and the intro can scale one onto the other.
export function Brand({ animated = false }: { animated?: boolean }) {
  return (
    <span className="inline-flex items-center leading-none whitespace-nowrap font-semibold tracking-[-0.025em]">
      {animated ? (
        <>
          <SplittingText text={profile.firstName} {...letterIn} delay={250} />
          &nbsp;
          <SplittingText text={profile.lastName} {...letterIn} delay={470} className="text-faint" />
        </>
      ) : (
        <>
          {profile.firstName}&nbsp;<span className="text-faint">{profile.lastName}</span>
        </>
      )}
    </span>
  )
}
