import { Activity, Brain, Cpu, Info, Layers, MemoryStick, TrendingDown, TrendingUp, Minus, Workflow } from 'lucide-react'
import { LEVELS, PROFILES, TONES } from '../data/profiles'
import { Badge, ProgressBar, Reveal, Section, SectionHeader, AnimatedNumber } from './ui'

function votesFor(probs) {
  const h = Math.round(probs.HIGH / 10)
  const m = Math.round(probs.MEDIUM / 10)
  const l = Math.max(0, 10 - h - m)
  return [...Array(h).fill('HIGH'), ...Array(m).fill('MEDIUM'), ...Array(l).fill('LOW')].slice(0, 10)
}

export default function Prediction({ sim }) {
  const { profile, metrics, probs, confidence, workload } = sim
  const tone = TONES[profile.tone]
  const trend = metrics.trend
  const trendLabel = trend > 3 ? 'Rising' : trend < -3 ? 'Falling' : 'Stable'
  const TrendIcon = trend > 3 ? TrendingUp : trend < -3 ? TrendingDown : Minus
  const votes = votesFor(probs)

  const features = [
    { icon: Cpu, label: 'CPU Utilization', value: `${metrics.cpu.toFixed(0)}%`, bar: metrics.cpu },
    { icon: MemoryStick, label: 'Memory Usage', value: `${metrics.memory.toFixed(0)}%`, bar: metrics.memory },
    { icon: Layers, label: 'Process Activity', value: `${metrics.process.toFixed(0)}%`, bar: metrics.process },
    { icon: TrendIcon, label: 'Workload Trend', value: `${trendLabel} (${trend > 0 ? '+' : ''}${trend.toFixed(1)})`, bar: Math.min(100, Math.max(0, 50 + trend * 3)) },
    { icon: Activity, label: 'System Activity Level', value: `${metrics.activity.toFixed(0)}%`, bar: metrics.activity },
  ]

  return (
    <Section id="prediction">
      <Reveal>
        <SectionHeader
          eyebrow="AI layer"
          title="AI Workload Prediction"
          description="The proposed AI layer predicts CPU workload based on system activity and workload characteristics."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="card h-full p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="cyan" icon={Brain}>Random Forest — Prototype Prediction</Badge>
              <Badge tone="amber">Prototype AI Prediction</Badge>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-xs text-slate-500">Algorithm</p>
                <p className="mt-1 text-lg font-bold text-white">Random Forest</p>
                <p className="text-xs text-slate-500">Proposed ML approach</p>
              </div>
              <div className={`rounded-xl border p-4 ${tone.border} ${tone.soft}`}>
                <p className="text-xs text-slate-400">Prediction</p>
                <p className={`mt-1 text-lg font-extrabold ${tone.text}`}>{profile.key} WORKLOAD</p>
                <p className="text-xs text-slate-400">Simulated output</p>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-xs text-slate-500">Confidence</p>
                <p className="mt-1 text-lg font-extrabold text-white">
                  <AnimatedNumber value={confidence} suffix="%" />
                </p>
                <p className="text-xs text-slate-500">Simulated probability</p>
              </div>
            </div>

            <div className="mt-6" role="group" aria-label="Predicted workload level">
              <p className="mb-3 text-sm font-semibold text-white">Predicted level</p>
              <div className="grid grid-cols-3 gap-3">
                {LEVELS.map((lvl) => {
                  const p = PROFILES[lvl]
                  const t = TONES[p.tone]
                  const on = workload === lvl
                  return (
                    <div
                      key={lvl}
                      aria-current={on ? 'true' : undefined}
                      className={`rounded-xl border px-3 py-4 text-center transition-all duration-500 ${
                        on ? `${t.border} ${t.soft} ring-1 ${t.ring} ${t.glow}` : 'border-white/[0.07] bg-white/[0.02] opacity-60'
                      }`}
                    >
                      <p className={`text-sm font-extrabold sm:text-base ${on ? t.text : 'text-slate-400'}`}>{lvl}</p>
                      <p className="mt-1 text-xs text-slate-500">{on ? 'Predicted' : 'Not predicted'}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-white">Class probability (simulated)</p>
              <div className="space-y-3">
                {LEVELS.map((lvl) => {
                  const t = TONES[PROFILES[lvl].tone]
                  return (
                    <div key={lvl} className="grid grid-cols-[4.5rem_1fr_3rem] items-center gap-3 text-sm">
                      <span className="font-medium text-slate-300">{lvl.charAt(0) + lvl.slice(1).toLowerCase()}</span>
                      <ProgressBar value={probs[lvl]} tone={PROFILES[lvl].tone} label={`${lvl} probability`} />
                      <span className={`text-right font-mono ${workload === lvl ? t.text : 'text-slate-400'}`}>{probs[lvl]}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <Reveal delay={80}>
            <div className="card p-6">
              <h3 className="text-base font-bold text-white">Input features</h3>
              <p className="mb-4 text-xs text-slate-500">Simulated values supplied to the proposed model</p>
              <ul className="space-y-4">
                {features.map((f) => (
                  <li key={f.label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-300">
                        <f.icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                        {f.label}
                      </span>
                      <span className="font-mono text-slate-200">{f.value}</span>
                    </div>
                    <ProgressBar value={f.bar} tone="cyan" label={f.label} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card p-6">
              <div className="flex items-center gap-2">
                <Workflow className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                <h3 className="text-base font-bold text-white">Ensemble voting concept</h3>
              </div>
              <p className="mb-4 mt-1 text-xs text-slate-500">
                A Random Forest combines the votes of many decision trees. This 10-tree illustration is simulated.
              </p>
              <div className="flex flex-wrap gap-2" role="img" aria-label={`Illustrative tree votes: ${votes.filter((v) => v === profile.key).length} of 10 vote ${profile.key}`}>
                {votes.map((v, i) => {
                  const t = TONES[PROFILES[v].tone]
                  return (
                    <span
                      key={i}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-bold ${t.border} ${t.soft} ${t.text}`}
                    >
                      {v[0]}
                    </span>
                  )
                })}
              </div>
              <p className="mt-3 text-xs text-slate-500">L = Low, M = Medium, H = High. Majority vote decides the class.</p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-sm text-amber-100/80">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
          Random Forest is the proposed ML algorithm. No trained model is connected to this page; the prediction
          shown here is simulated from the selected workload scenario to demonstrate the intended behavior.
        </p>
      </Reveal>
    </Section>
  )
}
