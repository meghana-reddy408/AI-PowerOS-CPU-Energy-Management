import { useEffect, useState } from 'react'
import { STAGES, LAYERS } from '../data/content'
import { Badge, Reveal, Section, SectionHeader } from './ui'

function Connector() {
  return (
    <div
      className="relative mx-auto h-9 w-px bg-gradient-to-b from-cyan-400/10 via-cyan-400/40 to-cyan-400/10"
      aria-hidden="true"
    >
      <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-flow-y rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
    </div>
  )
}

export default function Architecture() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STAGES.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <Section id="architecture">
      <Reveal>
        <SectionHeader
          eyebrow="Architecture"
          title="AI PowerOS System Architecture"
          description="The proposed pipeline from system metrics to an energy-aware performance recommendation. The highlight moves through the stages to show the direction of data flow."
        />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="mx-auto w-full max-w-xl lg:col-span-7 lg:max-w-none">
          {STAGES.map((s, i) => {
            const on = i === step
            return (
              <div key={s.title}>
                <Reveal>
                  <div
                    className={`card flex items-center gap-4 p-4 transition-all duration-500 sm:p-5 ${
                      on ? 'border-cyan-400/40 shadow-[0_0_40px_-14px_rgba(34,211,238,0.6)]' : ''
                    }`}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500 ${
                        on ? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-300' : 'border-white/10 bg-white/[0.04] text-slate-400'
                      }`}
                    >
                      <s.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-white">{s.title}</h3>
                        <Badge tone={s.tag === 'Prototype prediction' ? 'amber' : 'slate'}>{s.tag}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
                {i < STAGES.length - 1 && <Connector />}
              </div>
            )
          })}
        </div>

        <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {LAYERS.map((l, i) => (
            <Reveal key={l.title} delay={i * 60}>
              <div className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
                    <l.icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-white">{l.title}</h3>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
                  {l.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-cyan-400" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
