import { Check } from 'lucide-react'
import { ROADMAP } from '../data/content'
import { Badge, Reveal, Section, SectionHeader } from './ui'

const STATUS = {
  done: { label: 'Implemented in prototype', tone: 'green' },
  next: { label: 'Next phase', tone: 'cyan' },
  planned: { label: 'Future work', tone: 'slate' },
}

export default function Roadmap() {
  return (
    <Section id="roadmap">
      <Reveal>
        <SectionHeader
          eyebrow="Roadmap"
          title="Future Implementation"
          description="Only Phase 1 is complete. Every other phase is planned work and is not part of this prototype."
        />
      </Reveal>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROADMAP.map((r, i) => {
          const s = STATUS[r.status]
          const done = r.status === 'done'
          return (
            <li key={r.phase}>
              <Reveal delay={(i % 3) * 60}>
                <div className={`card h-full p-5 ${done ? 'border-emerald-400/30' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold ${
                        done ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300' : 'border-white/15 text-slate-400'
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" aria-label="Completed" /> : r.phase}
                    </span>
                    <Badge tone={s.tone}>{s.label}</Badge>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">Phase {r.phase}</p>
                  <h3 className="text-base font-bold text-white">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{r.text}</p>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
