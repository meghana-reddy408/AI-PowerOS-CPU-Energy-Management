import { Check, Circle, Cpu } from 'lucide-react'
import { TEAM } from '../data/content'
import { Reveal, Section, SectionHeader } from './ui'

const DONE = [
  'Dashboard interface and navigation',
  'Simulated CPU, memory, and workload metrics',
  'Prototype workload prediction behavior',
  'Rule-based power recommendation workflow',
  'Simulated energy-efficiency comparison',
]
const TODO = [
  'Reading real CPU or memory data',
  'A trained Random Forest model',
  'Linux or OS-level integration',
  'Applying CPU frequency or governor changes',
]

export default function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeader eyebrow="About" title="About the Project" />
      </Reveal>

      <Reveal>
        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600">
              <Cpu className="h-7 w-7 text-ink-950" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-white">AI PowerOS</h3>
              <p className="text-slate-400">Intelligent CPU Power &amp; Energy Management System</p>
            </div>
          </div>
          <span className="w-fit rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold text-slate-200">
            Academic Project
          </span>
        </div>
      </Reveal>

      <Reveal>
        <h3 className="mb-4 mt-10 text-lg font-bold text-white">Team members</h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <li key={m.roll} className="card flex items-center gap-4 p-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-bold text-cyan-300"
                aria-hidden="true"
              >
                {m.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{m.name}</p>
                <p className="font-mono text-xs text-slate-400">{m.roll}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <h3 className="mb-4 mt-10 text-lg font-bold text-white">Prototype scope</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-5">
            <p className="mb-3 font-semibold text-emerald-300">Implemented in this prototype</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {DONE.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <p className="mb-3 font-semibold text-slate-300">Not implemented yet (future work)</p>
            <ul className="space-y-2 text-sm text-slate-400">
              {TODO.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
