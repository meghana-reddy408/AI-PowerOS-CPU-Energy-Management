import { useEffect, useState } from 'react'
import { FLOW } from '../data/content'
import { Reveal, Section, SectionHeader } from './ui'

export default function DecisionFlow() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % FLOW.length), 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <Section id="flow">
      <Reveal>
        <SectionHeader
          eyebrow="Decision flow"
          title="AI Decision Flow"
          description="Six steps repeat continuously in the proposed system."
        />
      </Reveal>
      <Reveal>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {FLOW.map((f, i) => {
            const on = i === step
            return (
              <li key={f.title} className="relative">
                <div
                  className={`card h-full p-5 transition-all duration-500 ${
                    on ? 'border-cyan-400/40 shadow-[0_0_36px_-14px_rgba(34,211,238,0.6)]' : ''
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-500 ${
                      on ? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-300' : 'border-white/10 bg-white/[0.04] text-slate-400'
                    }`}
                  >
                    <f.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-base font-bold text-white">
                    <span className="mr-1.5 font-mono text-xs text-slate-500">{i + 1}</span>
                    {f.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{f.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </Reveal>
    </Section>
  )
}
