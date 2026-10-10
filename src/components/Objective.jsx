import { Target } from 'lucide-react'
import { Reveal, Section, SectionHeader } from './ui'

const GOALS = [
  { title: 'Predict', text: 'Estimate workload demand with machine learning.' },
  { title: 'Recommend', text: 'Suggest a suitable CPU performance level.' },
  { title: 'Save energy', text: 'Avoid unnecessary performance when demand is low.' },
]

export default function Objective() {
  return (
    <Section id="objective">
      <Reveal>
        <SectionHeader eyebrow="Goal" title="Project Objective" />
      </Reveal>
      <Reveal>
        <div className="card relative overflow-hidden p-6 sm:p-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 sm:flex-row">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
              <Target className="h-6 w-6 text-cyan-300" aria-hidden="true" />
            </span>
            <p className="max-w-4xl text-xl font-medium leading-relaxed text-white sm:text-2xl">
              To develop an intelligent software-based CPU power-management prototype that predicts workload
              demand using machine learning and recommends suitable CPU performance levels to improve energy
              efficiency without unnecessarily sacrificing system performance.
            </p>
          </div>
          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
            {GOALS.map((g) => (
              <div key={g.title} className="rounded-xl border border-white/[0.07] bg-ink-900/60 p-4">
                <p className="font-bold text-white">{g.title}</p>
                <p className="mt-1 text-sm text-slate-400">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
