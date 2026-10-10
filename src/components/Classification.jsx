import { ArrowDown, Cpu } from 'lucide-react'
import { LEVELS, MODES, PROFILES, TONES } from '../data/profiles'
import { AnimatedNumber, Reveal, Section, SectionHeader } from './ui'
import WorkloadSwitch from './WorkloadSwitch'

export default function Classification({ sim }) {
  const { workload, setWorkload, profile, metrics, efficiency } = sim
  const mode = MODES[profile.mode]
  const tone = TONES[profile.tone]

  return (
    <Section id="classification">
      <Reveal>
        <SectionHeader
          eyebrow="Workload classification"
          title="How the proposed system behaves"
          description="Each workload class maps to a power recommendation. Select a scenario to see the whole dashboard respond."
        />
      </Reveal>

      <Reveal>
        <div className="mb-6">
          <WorkloadSwitch value={workload} onChange={setWorkload} label="Simulate Workload" size="lg" />
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {LEVELS.map((lvl, i) => {
          const p = PROFILES[lvl]
          const t = TONES[p.tone]
          const m = MODES[p.mode]
          const MIcon = m.icon
          const on = lvl === workload
          return (
            <Reveal key={lvl} delay={i * 70}>
              <button
                type="button"
                onClick={() => setWorkload(lvl)}
                aria-pressed={on}
                className={`flex h-full w-full flex-col rounded-2xl border p-6 text-left transition-all duration-500 ${
                  on ? `${t.border} ${t.soft} ring-1 ${t.ring} ${t.glow}` : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05]'
                }`}
              >
                <p className={`text-lg font-extrabold ${on ? t.text : 'text-slate-200'}`}>{p.title.toUpperCase()}</p>
                <p className="mt-1 text-sm text-slate-400">{p.demand}</p>
                <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                  Simulated CPU range {p.cpu[0]}–{p.cpu[1]}%
                </p>
                <ArrowDown className={`my-4 h-5 w-5 ${on ? t.text : 'text-slate-600'}`} aria-hidden="true" />
                <p className="text-xs text-slate-500">Recommended</p>
                <p className={`mt-1 flex items-center gap-2 text-base font-bold ${on ? t.text : 'text-slate-300'}`}>
                  <MIcon className="h-4 w-4" aria-hidden="true" />
                  {m.label}
                </p>
              </button>
            </Reveal>
          )
        })}
      </div>

      <Reveal>
        <div className={`card mt-4 grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4 ${tone.glow}`} aria-live="polite">
          <div>
            <p className="text-xs text-slate-500">CPU utilization</p>
            <p className="mt-1 text-2xl font-extrabold text-white">
              <AnimatedNumber value={metrics.cpu} decimals={0} suffix="%" />
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Predicted workload</p>
            <p className={`mt-1 text-2xl font-extrabold ${tone.text}`}>{profile.key}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Recommendation</p>
            <p className={`mt-1 text-2xl font-extrabold ${TONES[mode.tone].text}`}>{mode.label}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Efficiency indicator</p>
            <p className="mt-1 text-2xl font-extrabold text-white">
              {profile.efficiencyLabel} <span className="text-base font-semibold text-slate-400">({efficiency}/100)</span>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
