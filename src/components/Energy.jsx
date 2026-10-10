import { Leaf, Target, TrendingDown } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LEVELS, PROFILES } from '../data/profiles'
import { AnimatedNumber, ChartBoundary, ChartTooltip, ProgressBar, Reveal, Section, SectionHeader } from './ui'

const axis = { stroke: '#64748b', fontSize: 11, tickLine: false, axisLine: false }

export default function Energy({ sim }) {
  const { energy, efficiency, workload, profile } = sim

  const data = LEVELS.map((k) => ({
    key: k,
    name: k.charAt(0) + k.slice(1).toLowerCase() + ' workload',
    'Current strategy': k === workload ? energy.base : PROFILES[k].energy.base,
    'AI-optimized strategy': k === workload ? energy.ai : PROFILES[k].energy.ai,
  }))

  const stats = [
    { icon: Leaf, label: 'Estimated Energy Usage', value: energy.ai, suffix: '%', tone: 'cyan', sub: 'Relative energy index, AI-optimized' },
    { icon: TrendingDown, label: 'Potential Optimization', value: energy.saving, suffix: '%', tone: 'green', sub: 'Reduction versus the current strategy' },
    { icon: Target, label: 'Efficiency Score', value: efficiency, suffix: '/100', tone: efficiency >= 80 ? 'green' : 'amber', sub: profile.efficiencyLabel + ' efficiency for this workload' },
  ]

  return (
    <Section id="energy">
      <Reveal>
        <SectionHeader
          eyebrow="Energy analytics"
          title="Energy Efficiency Analysis"
          description="AI PowerOS aims to reduce unnecessary CPU performance during low or moderate workloads while providing higher performance when demand increases."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="card h-full p-5">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <s.icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                  {s.label}
                </div>
                <p className="mt-2 text-3xl font-extrabold text-white">
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </p>
                <p className="mb-3 mt-1 text-xs text-slate-500">{s.sub}</p>
                <ProgressBar value={s.suffix === '/100' || s.suffix === '%' ? s.value : 0} tone={s.tone} label={s.label} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="lg:col-span-8">
          <div className="card h-full p-5">
            <h3 className="text-base font-bold text-white">Current strategy vs AI-optimized strategy</h3>
            <p className="mb-4 text-xs text-slate-500">
              Simulated relative energy index (%) per workload scenario. The selected scenario is highlighted.
            </p>
            <div className="h-72 w-full">
              <ChartBoundary>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }} barGap={6}>
                    <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />
                    <XAxis dataKey="name" {...axis} />
                    <YAxis domain={[0, 100]} {...axis} tickFormatter={(v) => `${v}%`} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                    <Legend verticalAlign="top" height={28} iconType="circle" wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
                    <Bar dataKey="Current strategy" fill="#64748b" radius={[6, 6, 0, 0]} animationDuration={700}>
                      {data.map((d) => (
                        <Cell key={d.key} fill="#64748b" fillOpacity={d.key === workload ? 1 : 0.4} />
                      ))}
                    </Bar>
                    <Bar dataKey="AI-optimized strategy" fill="#34d399" radius={[6, 6, 0, 0]} animationDuration={700}>
                      {data.map((d) => (
                        <Cell key={d.key} fill="#34d399" fillOpacity={d.key === workload ? 1 : 0.4} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartBoundary>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              “Current strategy” is a static policy with no workload awareness. All values are illustrative and
              not measured energy consumption.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
