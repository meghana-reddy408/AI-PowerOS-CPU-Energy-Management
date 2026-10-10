import { Info } from 'lucide-react'
import { TECH } from '../data/content'
import { Reveal, Section, SectionHeader } from './ui'

export default function TechStack() {
  return (
    <Section id="tech">
      <Reveal>
        <SectionHeader eyebrow="Technology" title="Technology Stack" description="What the prototype is built with, and what the project targets." />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECH.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 60}>
            <div className="card h-full p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                  <t.icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">{t.group}</p>
                  <h3 className="text-base font-bold text-white">{t.name}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-4 flex items-start gap-2 text-sm text-slate-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
          Linux CPU control is a planned target environment. It is not implemented in this website.
        </p>
      </Reveal>
    </Section>
  )
}
