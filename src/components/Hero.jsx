import { ArrowRight, Cpu, MemoryStick, Brain, Leaf, Network } from 'lucide-react'
import { MODES, TONES } from '../data/profiles'
import { AnimatedNumber, Badge, ProgressBar, PulseDot, RingGauge, Sparkline } from './ui'

function KpiCard({ icon: Icon, label, status, tone, progress, children, spark, delay = 0 }) {
  const t = TONES[tone]
  return (
    <article
      className="card animate-fade-up p-5"
      style={{ animationDelay: `${delay}ms` }}
      aria-label={label}
    >
      <div className="flex items-start justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${t.border} ${t.soft}`}>
          <Icon className={`h-5 w-5 ${t.text}`} aria-hidden="true" />
        </span>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${t.text}`}>
          <PulseDot tone={tone} />
          {status}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-400">{label}</p>
      <div className="mt-1 text-3xl font-extrabold tracking-tight text-white">{children}</div>
      <div className="mt-4 space-y-3">
        <ProgressBar value={progress} tone={tone} label={label} />
        {spark && <Sparkline values={spark} color={t.hex} />}
      </div>
    </article>
  )
}

export default function Hero({ sim }) {
  const { profile, metrics, history, confidence, efficiency } = sim
  const mode = MODES[profile.mode]
  const tone = profile.tone
  const ModeIcon = mode.icon

  return (
    <section id="overview" className="relative scroll-mt-24 overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-16">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="animate-fade-up lg:col-span-7">
            <Badge tone="cyan" icon={Network}>
              Academic software prototype
            </Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Intelligent <span className="text-gradient">CPU Power Management</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
              AI PowerOS analyzes CPU workload patterns and recommends an appropriate performance level to
              improve energy efficiency while maintaining suitable system performance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#monitoring"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3.5 text-sm font-bold text-ink-950 shadow-[0_8px_30px_-8px_rgba(34,211,238,0.6)] transition hover:brightness-110"
              >
                Launch AI Monitor
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#architecture"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"
              >
                View System Architecture
              </a>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-500">
              AI PowerOS demonstrates the proposed intelligent power-management workflow using simulated
              data. Random Forest is the proposed ML algorithm; the dashboard shows prototype prediction
              behavior.
            </p>
          </div>

          <div className="animate-fade-up lg:col-span-5" style={{ animationDelay: '120ms' }}>
            <div className={`card relative overflow-hidden p-6 ${TONES[tone].glow}`}>
              <div className="absolute inset-x-0 top-0 h-px overflow-hidden" aria-hidden="true">
                <div className="h-px w-1/2 animate-scan bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">System snapshot</p>
                <Badge tone="slate">Simulation mode</Badge>
              </div>
              <div className="mt-5 flex items-center gap-6">
                <RingGauge value={metrics.cpu} tone={tone}>
                  <span className="text-3xl font-extrabold text-white">
                    <AnimatedNumber value={metrics.cpu} decimals={0} suffix="%" />
                  </span>
                  <span className="text-xs text-slate-400">CPU</span>
                </RingGauge>
                <dl className="min-w-0 flex-1 space-y-3 text-sm">
                  <div>
                    <dt className="text-slate-500">Predicted workload</dt>
                    <dd className={`font-bold ${TONES[tone].text}`}>{profile.key}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Recommended mode</dt>
                    <dd className="flex items-center gap-2 font-bold text-white">
                      <ModeIcon className={`h-4 w-4 ${TONES[mode.tone].text}`} aria-hidden="true" />
                      {mode.label}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Efficiency score</dt>
                    <dd className="font-bold text-white">{efficiency}/100</dd>
                  </div>
                </dl>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-xs text-slate-400">
                {['Monitor', 'Predict', 'Recommend', 'Optimize'].map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    {i > 0 && <span className="h-px w-4 bg-white/20" aria-hidden="true" />}
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard icon={Cpu} label="CPU Utilization" status="Active" tone="cyan" progress={metrics.cpu} spark={history.map((p) => p.cpu)} delay={160}>
            <AnimatedNumber value={metrics.cpu} decimals={0} suffix="%" />
          </KpiCard>
          <KpiCard icon={MemoryStick} label="Memory Usage" status="Normal" tone="green" progress={metrics.memory} spark={history.map((p) => p.memory)} delay={220}>
            <AnimatedNumber value={metrics.memory} decimals={0} suffix="%" />
          </KpiCard>
          <KpiCard icon={Brain} label="Predicted Workload" status={`Confidence ${confidence}%`} tone={tone} progress={confidence} delay={280}>
            {profile.key}
          </KpiCard>
          <KpiCard icon={Leaf} label="Energy Efficiency" status={profile.efficiencyStatus} tone={efficiency >= 80 ? 'green' : 'amber'} progress={efficiency} delay={340}>
            <AnimatedNumber value={efficiency} decimals={0} suffix="%" />
          </KpiCard>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          All values on this page are simulated for demonstration and are not measured from your device.
        </p>
      </div>
    </section>
  )
}
