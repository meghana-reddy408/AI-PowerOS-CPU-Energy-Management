import React, { useEffect, useRef, useState } from 'react'
import { TONES } from '../data/profiles'

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-white/[0.05] py-14 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-10">
      {eyebrow && <p className="mb-2 text-sm font-semibold text-cyan-300">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-relaxed text-slate-400">{description}</p>}
    </div>
  )
}

export function Badge({ tone = 'slate', icon: Icon, children, className = '' }) {
  const t = TONES[tone]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${t.soft} ${t.border} ${t.text} ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  )
}

export function PulseDot({ tone = 'green' }) {
  const t = TONES[tone]
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${t.solid}`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${t.solid}`} />
    </span>
  )
}

export function ProgressBar({ value, tone = 'cyan', label }) {
  const t = TONES[tone]
  const v = Math.max(0, Math.min(100, value))
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
    >
      <div className={`h-full rounded-full transition-all duration-700 ease-out ${t.solid}`} style={{ width: `${v}%` }} />
    </div>
  )
}

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function AnimatedNumber({ value, decimals = 0, suffix = '', duration = 700 }) {
  const [display, setDisplay] = useState(0)
  const from = useRef(0)
  useEffect(() => {
    const start = from.current
    const delta = value - start
    if (Math.abs(delta) < 1e-9) return undefined
    const t0 = performance.now()
    let raf
    const step = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = start + delta * eased
      from.current = v
      setDisplay(v)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return (
    <span className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function RingGauge({ value, tone = 'cyan', children }) {
  const t = TONES[tone]
  const r = 52
  const c = 2 * Math.PI * r
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={t.hex}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v / 100)}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

export function Sparkline({ values, color = '#22d3ee' }) {
  if (!values || values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${26 - ((v - min) / span) * 24}`)
    .join(' ')
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-7 w-full" aria-hidden="true">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ChartTooltip({ active, payload, label, unit = '%' }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-ink-900/95 px-3 py-2 text-xs shadow-xl backdrop-blur">
      <p className="mb-1 font-mono text-slate-400">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey || p.name} className="flex items-center gap-2 text-slate-200">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.stroke || p.fill }} />
          {p.name}: <span className="font-mono text-white">{Number(p.value).toFixed(1)}{unit}</span>
        </p>
      ))}
    </div>
  )
}

export class ChartBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {}
  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-full min-h-[10rem] items-center justify-center rounded-xl border border-white/10 px-4 text-center text-sm text-slate-400">
          This chart could not be drawn. The live metrics above are still updating.
        </div>
      )
    }
    return this.props.children
  }
}
