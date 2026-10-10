import { LEVELS, PROFILES, TONES } from '../data/profiles'

export default function WorkloadSwitch({ value, onChange, label = 'Simulate workload', size = 'md' }) {
  const pad = size === 'lg' ? 'px-5 py-2.5 text-sm' : 'px-3.5 py-2 text-sm'
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span id={`ws-${size}`} className="text-sm font-medium text-slate-300">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={`ws-${size}`}
        className="inline-flex rounded-xl border border-white/10 bg-ink-900/70 p-1"
      >
        {LEVELS.map((lvl) => {
          const active = value === lvl
          const t = TONES[PROFILES[lvl].tone]
          return (
            <button
              key={lvl}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(lvl)}
              className={`rounded-lg font-semibold transition-colors ${pad} ${
                active ? `${t.soft} ${t.text} ring-1 ${t.ring}` : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
