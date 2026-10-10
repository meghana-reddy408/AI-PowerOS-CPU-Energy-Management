import { useEffect, useState } from 'react'
import { ArrowRight, Info } from 'lucide-react'
import { BASELINE_MODE, MODES, MODE_ORDER, TONES } from '../data/profiles'
import { Badge, Reveal, Section, SectionHeader } from './ui'

export default function Recommendation({ sim }) {
  const { profile } = sim
  const rec = MODES[profile.mode]
  const base = MODES[BASELINE_MODE]
  const tone = TONES[rec.tone]
  const [preview, setPreview] = useState(profile.mode)
  useEffect(() => setPreview(profile.mode), [profile.mode])
  const pv = MODES[preview]
  const pvTone = TONES[pv.tone]
  const RecIcon = rec.icon
  const unchanged = profile.mode === BASELINE_MODE

  return (
    <Section id="power">
      <Reveal>
        <SectionHeader
          eyebrow="Power management"
          title="Intelligent Power Recommendation"
          description="Based on the predicted workload, AI PowerOS recommends an appropriate CPU performance level."
        />
      </Reveal>

      <Reveal>
        <div className={`card relative overflow-hidden p-6 sm:p-8 ${tone.glow}`}>
          <div
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: tone.hex }}
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm text-slate-400">Current workload</p>
              <p className={`text-2xl font-extrabold ${TONES[profile.tone].text}`}>{profile.key}</p>

              <p className="mt-6 text-sm text-slate-400">Recommended performance</p>
              <p className="mt-1 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${tone.border} ${tone.soft}`}>
                  <RecIcon className={`h-6 w-6 ${tone.text}`} aria-hidden="true" />
                </span>
                {rec.caps}
              </p>

              <p className="mt-6 text-sm text-slate-400">Reason</p>
              <p className="mt-1 max-w-xl text-lg leading-relaxed text-slate-200">“{profile.reason}”</p>
            </div>

            <dl className="grid content-start gap-3 lg:col-span-5">
              <div className="rounded-xl border border-white/[0.07] bg-ink-900/60 p-4">
                <dt className="text-xs text-slate-500">Current power mode</dt>
                <dd className="mt-1 text-lg font-bold text-white">{base.label}</dd>
              </div>
              <div className={`rounded-xl border p-4 ${tone.border} ${tone.soft}`}>
                <dt className="text-xs text-slate-400">Recommended mode</dt>
                <dd className={`mt-1 flex items-center gap-2 text-lg font-bold ${tone.text}`}>
                  {unchanged ? 'Keep ' + rec.label : (
                    <>
                      {base.label} <ArrowRight className="h-4 w-4" aria-hidden="true" /> {rec.label}
                    </>
                  )}
                </dd>
                <dd className="mt-1 text-xs text-slate-400">{unchanged ? 'No change needed' : 'Change suggested'}</dd>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-ink-900/60 p-4">
                <dt className="text-xs text-slate-500">Expected objective</dt>
                <dd className="mt-1 text-lg font-bold text-white">{profile.objective}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-4 grid gap-4 md:grid-cols-3" role="group" aria-label="Performance states">
          {MODE_ORDER.map((key) => {
            const m = MODES[key]
            const t = TONES[m.tone]
            const Icon = m.icon
            const recommended = key === profile.mode
            const previewing = key === preview
            return (
              <button
                key={key}
                type="button"
                onClick={() => setPreview(key)}
                aria-pressed={previewing}
                className={`rounded-2xl border p-5 text-left transition-all duration-500 ${
                  recommended
                    ? `${t.border} ${t.soft} ring-1 ${t.ring} ${t.glow}`
                    : `border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] ${previewing ? 'border-white/30' : ''}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${t.border} ${t.soft}`}>
                    <Icon className={`h-5 w-5 ${t.text}`} aria-hidden="true" />
                  </span>
                  {recommended && <Badge tone={m.tone}>Recommended</Badge>}
                </div>
                <p className={`mt-4 text-base font-extrabold ${recommended ? t.text : 'text-slate-200'}`}>{m.caps}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{m.summary}</p>
              </button>
            )
          })}
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-sm text-slate-400">
          <span className={`font-semibold ${pvTone.text}`}>{pv.label}</span> — concept mapping: comparable to the
          Linux <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-slate-200">{pv.governor}</code>{' '}
          CPU governor. Previewing a state does not change anything on this device.
        </div>
        <p className="mt-4 flex items-start gap-2 text-sm text-slate-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
          Recommendation is simulated for demonstration. Actual CPU frequency/governor control would require
          operating-system-level integration.
        </p>
      </Reveal>
    </Section>
  )
}
