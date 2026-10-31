import { useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Effect } from '@animate-ui/react/primitives/effects/effect'
import { Highlight } from '@animate-ui/react/primitives/effects/highlight'
import { CountingNumber } from '@animate-ui/react/primitives/texts/counting-number'
import { ScrollProgress, ScrollProgressProvider } from '@animate-ui/react/primitives/scroll-progress'
import {
  Bitcoin, Blocks, Bot, Brain, Briefcase, Building, Building2, Calculator, ChartBar, Check, ClipboardCheck,
  Cloud, Code2, Copy, Database, Download, Factory, FileText, Flame, FolderKanban, GraduationCap, Languages,
  Layers, LayoutGrid, Link2, Mail, MapPin, Monitor, Network, Palette, Phone, Puzzle, Rocket, Search, Server,
  ShoppingBag, ShoppingCart, Smartphone, Sparkles, Truck, Users, Warehouse, Workflow, Wrench, type LucideProps,
} from 'lucide-react'
import { Brand } from './components/Brand'
import { Intro } from './components/Intro'
import { education, erp, experience, languages, profile, projects, skills, stats, type Experience as Job, type ProjectCategory } from './data'

type Phase = 'intro' | 'flying' | 'done'
type Icon = ComponentType<LucideProps>

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'erp', label: 'ERP Systems' },
  { id: 'work', label: 'Selected Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const jobIcons: Record<Job['icon'], Icon> = {
  building: Building2, erp: LayoutGrid, bitcoin: Bitcoin, blocks: Blocks, briefcase: Briefcase, energy: Flame, code: Code2,
}
const generationIcons: Icon[] = [Sparkles, Server, Puzzle]
const stepIcons: Icon[] = [Search, Workflow, FileText, Network, Code2, Rocket]
const moduleIcons: Record<string, Icon> = {
  calculator: Calculator, warehouse: Warehouse, truck: Truck, cart: ShoppingCart, users: Users, factory: Factory, kanban: FolderKanban, chart: ChartBar,
}
const projectIcons: Record<ProjectCategory, Icon> = { 'Enterprise & ERP': Building, Blockchain: Link2, AI: Bot, Commerce: ShoppingBag }
const skillIcons: Record<string, Icon> = {
  Languages: Code2, Frontend: Monitor, Backend: Server, ERP: LayoutGrid, Data: Database, 'Cloud & DevOps': Cloud,
  'AI & ML': Brain, Blockchain: Bitcoin, 'Mobile & Desktop': Smartphone, Design: Palette,
}

export default function App() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduce ? 'done' : 'intro')
  const logo = useRef<HTMLAnchorElement>(null)
  const revealed = phase !== 'intro'

  useEffect(() => {
    if (phase === 'done') return
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [phase])

  const onFlyStart = useCallback(() => setPhase('flying'), [])
  const onDone = useCallback(() => setPhase('done'), [])

  return (
    <ScrollProgressProvider global>
      <ScrollProgress className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent" mode="scaleX" />

      {phase !== 'done' && <Intro target={logo} onFlyStart={onFlyStart} onDone={onDone} />}

      <GlobalNav logoRef={logo} phase={phase} />

      {revealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <PageBar />
          <Container className="grid grid-cols-[minmax(0,1fr)] gap-10 pt-10 pb-24 md:grid-cols-[230px_minmax(0,1fr)] md:gap-14 md:pt-14">
            <Sidebar />
            <main className="min-w-0">
              <Overview />
              <ExperienceSection />
              <Erp />
              <Work />
              <Skills />
              <Contact />
            </main>
          </Container>
          <Footer />
        </motion.div>
      )}
    </ScrollProgressProvider>
  )
}

/* ───────────────────────────── Building blocks ──────────────────────────── */

function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1000px] px-5 sm:px-6 ${className}`}>{children}</div>
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <Effect inView inViewMargin="-40px" fade slide={{ direction: 'up', offset: 14 }} delay={delay} className={className}>
      {children}
    </Effect>
  )
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="pb-16 last:pb-0">
      <Reveal>
        <h2 className="text-[30px] leading-tight font-semibold tracking-[-0.022em] sm:text-[32px]">{title}</h2>
        {intro && <p className="mt-3 max-w-[620px] text-[15px] leading-[1.5] text-ink/80">{intro}</p>}
      </Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  )
}

function Card({ title, icon: IconCmp, wide, delay = 0, highlight, children }: {
  title: ReactNode; icon?: Icon; wide?: boolean; delay?: number; highlight?: boolean; children?: ReactNode
}) {
  return (
    <Reveal delay={delay} className={wide ? 'sm:col-span-2' : ''}>
      <div
        className={`h-full rounded-[18px] border bg-gradient-to-b from-white to-[#fbfbfd] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.09)] sm:p-6 ${
          highlight ? 'border-accent/35' : 'border-black/[0.07]'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[17px] leading-snug font-semibold tracking-[-0.015em]">{title}</h3>
          {IconCmp && <IconCmp className="size-[22px] shrink-0 text-accent" strokeWidth={1.6} />}
        </div>
        {children && <div className="mt-1.5 text-[14px] leading-[1.5] text-muted">{children}</div>}
      </div>
    </Reveal>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <span className="mt-3 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className="rounded-full bg-soft px-2.5 py-0.5 text-[12px] text-muted">{t}</span>
      ))}
    </span>
  )
}

function Sub({ children }: { children: ReactNode }) {
  return <span className="mt-1 block text-[14px] font-normal tracking-normal text-muted">{children}</span>
}

function GitHubIcon(props: LucideProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={props.className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

function LinkedInIcon(props: LucideProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={props.className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

/* ──────────────────────────────── Chrome ────────────────────────────────── */

function GlobalNav({ logoRef, phase }: { logoRef: React.RefObject<HTMLAnchorElement | null>; phase: Phase }) {
  const show = phase !== 'intro'
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        initial={false}
        animate={{ backgroundColor: show ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0)' }}
        transition={{ duration: 0.5, delay: show ? 0.5 : 0 }}
        style={{ backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)' }}
      >
        <Container className="flex h-12 items-center justify-between">
          <a ref={logoRef} href="#overview" aria-label={profile.name} className="text-[16px]" style={{ opacity: phase === 'done' ? 1 : 0 }}>
            <Brand />
          </a>
          <motion.nav
            className="hidden items-center gap-7 text-[12px] text-ink/80 md:flex"
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="transition-colors hover:text-ink">{s.label}</a>
            ))}
          </motion.nav>
          <motion.a
            href={profile.pdf}
            download
            aria-label="Download CV"
            className="grid size-8 place-items-center rounded-full text-ink/80 transition-colors hover:bg-soft hover:text-ink"
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Download className="size-[17px]" strokeWidth={1.8} />
          </motion.a>
        </Container>
      </motion.div>
    </header>
  )
}

function PageBar() {
  return (
    <div className="pt-12">
      <Container>
        <div className="flex items-center justify-between border-b border-line py-4">
          <span className="text-[21px] font-semibold tracking-[-0.02em]">Curriculum Vitae</span>
          <a href={profile.pdf} download className="rounded-full bg-accent px-3.5 py-1 text-[12px] font-medium text-white transition-opacity hover:opacity-90">
            Download PDF
          </a>
        </div>
      </Container>
    </div>
  )
}

function useActiveSection() {
  const [active, setActive] = useState(sections[0].id)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

function Sidebar() {
  const active = useActiveSection()
  return (
    <aside className="min-w-0 md:sticky md:top-24 md:self-start">
      <div className="flex items-center gap-4 md:block">
        <div className="relative grid size-[72px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#8e8ef5] via-[#5b5bd6] to-[#2f2f8f] text-[24px] font-semibold tracking-[-0.02em] text-white shadow-[0_6px_20px_rgba(91,91,214,0.35)] md:size-20 md:text-[26px]">
          {profile.monogram}
        </div>
        <div className="md:mt-4">
          <p className="text-[20px] leading-tight font-semibold tracking-[-0.02em]">{profile.name}</p>
          <p className="mt-1 text-[14px] text-muted">{profile.email}</p>
        </div>
      </div>

      <nav className="-mx-5 mt-6 flex gap-1 overflow-x-auto px-5 md:mx-0 md:mt-8 md:block md:overflow-visible md:px-0">
        <Highlight hover className="rounded-lg bg-soft" transition={{ type: 'spring', stiffness: 400, damping: 34 }}>
          {sections.map((s) => (
            <a
              key={s.id}
              data-value={s.id}
              href={`#${s.id}`}
              className={`relative block shrink-0 rounded-lg px-2 py-1.5 text-[16px] whitespace-nowrap transition-colors md:-mx-2 md:text-[17px] ${
                active === s.id ? 'text-accent' : 'text-ink hover:text-ink'
              }`}
            >
              {s.label}
            </a>
          ))}
        </Highlight>
      </nav>
    </aside>
  )
}

/* ──────────────────────────────── Sections ──────────────────────────────── */

function Overview() {
  const [current, ...earlier] = erp.generations
  return (
    <section id="overview" className="pb-16">
      <Reveal>
        <p className="text-[14px] font-medium text-accent">{profile.location}</p>
        <h1 className="mt-2 text-[34px] leading-[1.1] font-semibold tracking-[-0.025em] text-balance sm:text-[44px]">
          {profile.headline}
        </h1>
        <p className="mt-2 text-[19px] leading-snug text-muted">{profile.subtitle}</p>
        <p className="mt-6 max-w-[640px] text-[15px] leading-[1.6] text-ink/80">{profile.summary}</p>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 70}>
            <div className="h-full rounded-[18px] bg-soft p-5">
              <p className="text-[34px] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                <CountingNumber number={s.value} inView inViewOnce transition={{ stiffness: 70, damping: 30 }} />
                {s.suffix}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Card title="Current Role" icon={Briefcase}>
          Founder & CEO
          <br />SBC (Senior BlockChain LLC), Oman
          <br />Since 2022
        </Card>
        <Card title="Now Building" icon={Sparkles} delay={60} highlight>
          {current.title}
          <br />{current.stack.join(', ')}
        </Card>
        <Card title="Earlier ERP Work" icon={LayoutGrid} delay={120}>
          {earlier.map((g) => (
            <span key={g.title} className="block">{g.title}</span>
          ))}
          Since 2015
        </Card>
        <Card title="Open Source" icon={Blocks} delay={180}>
          Core member at Blockcore, since 2018
          <br />Core member & lead architect at Angor, since 2022
        </Card>
        <Card title="Education" icon={GraduationCap} delay={240}>
          {education.degree}
        </Card>
        <Card title="Languages" icon={Languages} delay={300}>
          {languages.map((l) => (
            <span key={l.name} className="block">{l.name} · {l.level}</span>
          ))}
        </Card>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <Section id="experience" title="Experience" intro="Twenty years across enterprise software, custom ERP, regulated insurance platforms, Bitcoin infrastructure and production AI.">
      {experience.map((job, i) => (
        <Card
          key={job.role + job.company}
          wide
          highlight={job.highlight}
          icon={jobIcons[job.icon]}
          delay={Math.min(i, 3) * 60}
          title={
            <>
              {job.role}
              <Sub>{job.company} · {job.context} · {job.period}</Sub>
            </>
          }
        >
          <ul className="mt-3 space-y-2 text-[14px] leading-[1.55] text-ink/80">
            {job.points.map((p) => (
              <li key={p} className="relative pl-4">
                <span className="absolute top-[0.6em] left-0 size-[5px] rounded-full bg-accent/60" />
                {p}
              </li>
            ))}
          </ul>
          <Chips items={job.tags} />
        </Card>
      ))}
    </Section>
  )
}

function Erp() {
  return (
    <Section
      id="erp"
      title="ERP Systems"
      intro="Custom ERP systems analysed, designed and developed around each organisation. Today on Next.js, built on earlier generations in .NET and Odoo."
    >
      {erp.generations.map((g, i) => (
        <Card
          key={g.title}
          wide={i === 0}
          highlight={i === 0}
          icon={generationIcons[i]}
          delay={(i % 2) * 60}
          title={
            <>
              {g.title}
              <Sub>{g.when}</Sub>
            </>
          }
        >
          <span className="mt-2 block">{g.text}</span>
          <Chips items={g.stack} />
        </Card>
      ))}
      {erp.lifecycle.map((s, i) => (
        <Card key={s.step} title={`${i + 1}. ${s.step}`} icon={stepIcons[i]} delay={(i % 2) * 60}>
          {s.text}
        </Card>
      ))}
      <Card title="Modules" icon={Layers}>
        <span className="grid gap-0.5">
          {erp.modules.map((m) => {
            const I = moduleIcons[m.icon]
            return (
              <span key={m.name} className="flex items-center gap-2">
                <I className="size-3.5 text-faint" strokeWidth={1.8} /> {m.name}
              </span>
            )
          })}
        </span>
      </Card>
      <Card title="Platform Capabilities" icon={Check} delay={60}>
        <span className="grid gap-0.5">
          {erp.capabilities.map((c) => <span key={c}>{c}</span>)}
        </span>
      </Card>
      <Card title="Analysis Toolkit" icon={ClipboardCheck}>
        <Chips items={erp.analysis} />
      </Card>
      <Card title="Engineering Stack" icon={Wrench} delay={60}>
        <Chips items={erp.stack} />
      </Card>
    </Section>
  )
}

function Work() {
  return (
    <Section id="work" title="Selected Work" intro="Platforms in production across enterprise and ERP, blockchain, AI and commerce.">
      {projects.map((p, i) => (
        <Card
          key={p.title}
          wide={i === 0}
          highlight={i === 0}
          icon={projectIcons[p.category]}
          delay={(i % 2) * 60}
          title={
            <>
              {p.title}
              <Sub>{p.category}</Sub>
            </>
          }
        >
          <span className="mt-2 block">{p.text}</span>
          <Chips items={p.tags} />
        </Card>
      ))}
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" title="Skills" intro="A toolkit that spans systems analysis, software architecture, blockchain and AI.">
      {skills.map((g, i) => (
        <Card key={g.group} title={g.group === 'Languages' ? 'Programming' : g.group} icon={skillIcons[g.group] ?? Code2} delay={(i % 2) * 60}>
          {g.items.join(', ')}
        </Card>
      ))}
    </Section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Section id="contact" title="Contact" intro="Get in touch about ERP programmes, enterprise platforms, blockchain infrastructure or AI.">
      <Card title="Email" icon={Mail}>
        <span className="flex items-center gap-2">
          <a href={`mailto:${profile.email}`} className="text-accent hover:underline">{profile.email}</a>
          <button type="button" onClick={copy} aria-label="Copy email" className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-soft hover:text-ink">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? 'ok' : 'copy'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </span>
      </Card>
      <Card title="Phone" icon={Phone} delay={60}>
        <a href={profile.phoneHref} className="text-accent hover:underline">{profile.phone}</a>
      </Card>
      <Card title="LinkedIn" icon={LinkedInIcon}>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-accent hover:underline">in/miladraeisi</a>
      </Card>
      <Card title="GitHub" icon={GitHubIcon} delay={60}>
        <a href={profile.github} target="_blank" rel="noreferrer" className="text-accent hover:underline">github.com/miladsoft</a>
      </Card>
      <Card title="Location" icon={MapPin}>{profile.location}</Card>
      <Card title="Resume" icon={Download} delay={60}>
        <a href={profile.pdf} download className="text-accent hover:underline">Download PDF</a>
        <span className="mx-1.5 text-line">|</span>
        <a href="print.html" className="text-accent hover:underline">Printable version</a>
      </Card>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="bg-soft">
      <Container className="flex flex-col gap-2 py-6 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright © {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>{profile.website}</p>
      </Container>
    </footer>
  )
}
