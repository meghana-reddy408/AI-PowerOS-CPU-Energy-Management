import { Activity, Clock, Cpu, Info, MemoryStick, Pause, Play, Zap } from 'lucide-react'
import {
  Area, ComposedChart, CartesianGrid, Legend, Line, LineChart, ReferenceArea, ReferenceLine,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { MODES, TONES } from '../data/profiles'
import { useRelativeTime } from '../hooks/useSimulation'
import { AnimatedNumber, Badge, ChartBoundary, ChartTooltip, ProgressBar, Reveal, Section, SectionHeader } from './ui'
import WorkloadSwitch from './WorkloadSwitch'

const axis = { stroke: '#64748b', fontSize: 11, tickLine: false, axisLine: false }

function MetricTile({ icon: Icon, label, tone, children, sub, progress }) {
  const t = TONES[tone]
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${t.border} ${t.soft}`}>
          <Icon className={`h-4 w-4 ${t.text}`} aria-hidden="true" />
        </span>
        <p className="text-sm font-medium text-slate-400">{label}</p>
      </div>
      <div className="mt-3 text-2xl font-extrabold text-white">{children}</div>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
      {progress != null && (
        <div className="mt-3">
          <ProgressBar value={progress} tone={tone} label={label} />
        </div>
      )}
    </div>
  )
}

export default function Monitoring({ sim }) {
  const { metrics, profile, history, running, setRunning, updatedAt, workload, setWorkload } = sim
  const mode = MODES[profile.mode]
  const updated = useRelativeTime(updatedAt, running)

  return (
    <Section id="monitoring">
      <Reveal>
        <SectionHeader
          eyebrow="Monitoring"
          title="Live System Monitoring"
          description="Real-time simulated system metrics for prototype demonstration."
        />
      </Reveal>

      <Reveal>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="cyan" icon={Activity}>Simulation Mode</Badge>
            <Badge tone="slate" icon={Clock}>Last updated: {updated}</Badge>
            <button
              type="button"
              onClick={() => setRunning(!running)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300 hover:bg-white/5"
              aria-pressed={!running}
            >
              {running ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
              {running ? 'Pause updates' : 'Resume updates'}
            </button>
          </div>
          <WorkloadSwitch value={workload} onChange={setWorkload} size="md" />
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricTile icon={Cpu} label="CPU Usage" tone="cyan" sub="Simulated utilization" progress={metrics.cpu}>
            <AnimatedNumber value={metrics.cpu} decimals={1} suffix="%" />
          </MetricTile>
          <MetricTile icon={MemoryStick} label="Memory Usage" tone="green" sub="Simulated memory in use" progress={metrics.memory}>
            <AnimatedNumber value={metrics.memory} decimals={1} suffix="%" />
          </MetricTile>
          <MetricTile icon={Activity} label="Workload Level" tone={profile.tone} sub={`Workload index ${metrics.index.toFixed(0)}/100`} progress={metrics.index}>
            {profile.key}
          </MetricTile>
          <MetricTile icon={Zap} label="Estimated Power State" tone={mode.tone} sub="Illustrative, not applied to hardware">
            {mode.label}
          </MetricTile>
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="card p-5">
            <h3 className="text-base font-bold text-white">CPU &amp; memory utilization</h3>
            <p className="mb-4 text-xs text-slate-500">Last {history.length} simulated samples</p>
            <div className="h-64 w-full">
              <ChartBoundary>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={history} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="cpuFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />
                    <XAxis dataKey="time" {...axis} interval="preserveStartEnd" minTickGap={48} />
                    <YAxis domain={[0, 100]} {...axis} tickFormatter={(v) => `${v}%`} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend verticalAlign="top" height={28} iconType="circle" wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
                    <Area type="monotone" dataKey="cpu" name="CPU" stroke="#22d3ee" strokeWidth={2} fill="url(#cpuFill)" isAnimationActive={false} />
                    <Line type="monotone" dataKey="memory" name="Memory" stroke="#34d399" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartBoundary>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="card p-5">
            <h3 className="text-base font-bold text-white">Workload trend</h3>
            <p className="mb-4 text-xs text-slate-500">Composite workload index with LOW / MEDIUM / HIGH bands</p>
            <div className="h-64 w-full">
              <ChartBoundary>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />
                    <ReferenceArea y1={0} y2={38} fill="#34d399" fillOpacity={0.06} ifOverflow="visible" />
                    <ReferenceArea y1={38} y2={65} fill="#22d3ee" fillOpacity={0.06} ifOverflow="visible" />
                    <ReferenceArea y1={65} y2={100} fill="#fbbf24" fillOpacity={0.07} ifOverflow="visible" />
                    <ReferenceLine y={38} stroke="rgba(148,163,184,0.35)" strokeDasharray="4 4" />
                    <ReferenceLine y={65} stroke="rgba(148,163,184,0.35)" strokeDasharray="4 4" />
                    <XAxis dataKey="time" {...axis} interval="preserveStartEnd" minTickGap={48} />
                    <YAxis domain={[0, 100]} ticks={[0, 38, 65, 100]} {...axis} />
                    <Tooltip content={<ChartTooltip unit="" />} />
                    <Legend verticalAlign="top" height={28} iconType="circle" wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
                    <Line type="monotone" dataKey="index" name="Workload index" stroke="#60a5fa" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                    <Line type="monotone" dataKey="process" name="Process activity" stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="5 4" dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartBoundary>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-sm text-slate-400">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
          Browser-based prototype using simulated monitoring data. Real implementation can connect to Linux
          system monitoring APIs.
        </p>
      </Reveal>
    </Section>
  )
}
