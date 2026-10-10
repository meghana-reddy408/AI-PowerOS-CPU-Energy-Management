import { Leaf, Gauge, Zap } from 'lucide-react'

/* Full class strings so Tailwind's JIT can detect them. */
export const TONES = {
  green: {
    text: 'text-emerald-300',
    soft: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    solid: 'bg-emerald-400',
    ring: 'ring-emerald-400/50',
    glow: 'shadow-[0_0_56px_-18px_rgba(52,211,153,0.6)]',
    hex: '#34d399',
  },
  cyan: {
    text: 'text-cyan-300',
    soft: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    solid: 'bg-cyan-400',
    ring: 'ring-cyan-400/50',
    glow: 'shadow-[0_0_56px_-18px_rgba(34,211,238,0.6)]',
    hex: '#22d3ee',
  },
  amber: {
    text: 'text-amber-300',
    soft: 'bg-amber-400/10',
    border: 'border-amber-400/30',
    solid: 'bg-amber-400',
    ring: 'ring-amber-400/50',
    glow: 'shadow-[0_0_56px_-18px_rgba(251,191,36,0.55)]',
    hex: '#fbbf24',
  },
  red: {
    text: 'text-red-300',
    soft: 'bg-red-400/10',
    border: 'border-red-400/30',
    solid: 'bg-red-400',
    ring: 'ring-red-400/50',
    glow: 'shadow-[0_0_56px_-18px_rgba(248,113,113,0.55)]',
    hex: '#f87171',
  },
  slate: {
    text: 'text-slate-300',
    soft: 'bg-white/5',
    border: 'border-white/10',
    solid: 'bg-slate-400',
    ring: 'ring-white/20',
    glow: '',
    hex: '#94a3b8',
  },
}

export const MODES = {
  POWER_SAVER: {
    key: 'POWER_SAVER',
    label: 'Power Saver',
    caps: 'POWER SAVER',
    tone: 'green',
    icon: Leaf,
    governor: 'powersave',
    summary: 'Lowers the performance ceiling to reduce energy draw while demand is low.',
  },
  BALANCED: {
    key: 'BALANCED',
    label: 'Balanced',
    caps: 'BALANCED',
    tone: 'cyan',
    icon: Gauge,
    governor: 'schedutil',
    summary: 'Scales performance with demand to balance responsiveness and energy use.',
  },
  PERFORMANCE: {
    key: 'PERFORMANCE',
    label: 'High Performance',
    caps: 'HIGH PERFORMANCE',
    tone: 'amber',
    icon: Zap,
    governor: 'performance',
    summary: 'Prioritizes responsiveness and throughput when demand is high.',
  },
}

export const MODE_ORDER = ['POWER_SAVER', 'BALANCED', 'PERFORMANCE']
export const BASELINE_MODE = 'BALANCED'
export const LEVELS = ['LOW', 'MEDIUM', 'HIGH']

/*
  Scenario profiles used by the simulator. Every number here is illustrative demo data;
  nothing is measured from the host machine.
  - cpu / mem / proc / sys : [min, max] ranges the simulated metrics drift inside
  - confidence             : typical top-class probability (%)
  - neighbors              : how the remaining probability is split between the other classes
  - energy                 : relative energy index (%) for the static strategy (base) vs AI-optimized (ai)
*/
export const PROFILES = {
  LOW: {
    key: 'LOW',
    title: 'Low Workload',
    tone: 'green',
    demand: 'CPU demand is low.',
    mode: 'POWER_SAVER',
    cpu: [20, 35],
    mem: [38, 48],
    proc: [14, 28],
    sys: [18, 32],
    confidence: 86,
    neighbors: [['MEDIUM', 0.75], ['HIGH', 0.25]],
    efficiency: 93,
    efficiencyLabel: 'High',
    efficiencyStatus: 'Optimized',
    energy: { base: 88, ai: 46 },
    reason:
      'Low workload detected. Reducing CPU performance saves energy with no noticeable impact on responsiveness.',
    objective: 'Minimize unnecessary energy use',
  },
  MEDIUM: {
    key: 'MEDIUM',
    title: 'Medium Workload',
    tone: 'cyan',
    demand: 'CPU demand is moderate.',
    mode: 'BALANCED',
    cpu: [40, 65],
    mem: [50, 62],
    proc: [38, 58],
    sys: [40, 60],
    confidence: 80,
    neighbors: [['LOW', 0.5], ['HIGH', 0.5]],
    efficiency: 82,
    efficiencyLabel: 'Moderate',
    efficiencyStatus: 'Balanced',
    energy: { base: 90, ai: 72 },
    reason:
      'Moderate workload detected. A balanced performance level keeps the system responsive while limiting energy use.',
    objective: 'Balance performance and energy',
  },
  HIGH: {
    key: 'HIGH',
    title: 'High Workload',
    tone: 'amber',
    demand: 'CPU demand is high.',
    mode: 'PERFORMANCE',
    cpu: [70, 95],
    mem: [62, 78],
    proc: [66, 90],
    sys: [70, 92],
    confidence: 87,
    neighbors: [['MEDIUM', 0.75], ['LOW', 0.25]],
    efficiency: 71,
    efficiencyLabel: 'Reduced',
    efficiencyStatus: 'Performance-prioritized',
    energy: { base: 94, ai: 91 },
    reason:
      'High workload detected. Increased CPU performance is recommended to maintain responsiveness.',
    objective: 'Maintain responsiveness',
  },
}
