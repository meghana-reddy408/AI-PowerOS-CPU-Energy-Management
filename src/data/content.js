import {
  Cpu, Database, Filter, Brain, SlidersHorizontal, Gauge, Leaf, Eye, GitBranch, Lightbulb,
  Code, Palette, TrendingUp, Terminal,
} from 'lucide-react'

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'prediction', label: 'AI Prediction' },
  { id: 'power', label: 'Power Management' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'about', label: 'About' },
]

export const SECTION_IDS = [
  'overview', 'monitoring', 'prediction', 'power', 'energy', 'classification',
  'architecture', 'flow', 'tech', 'objective', 'roadmap', 'about',
]

/* Maps every page section to the nav item that should be highlighted. */
export const SECTION_TO_NAV = {
  overview: 'overview',
  monitoring: 'monitoring',
  prediction: 'prediction',
  power: 'power',
  energy: 'power',
  classification: 'power',
  architecture: 'architecture',
  flow: 'architecture',
  tech: 'architecture',
  objective: 'about',
  roadmap: 'about',
  about: 'about',
}

export const STAGES = [
  { icon: Cpu, title: 'CPU / System Metrics', tag: 'Simulated', text: 'Utilization, memory, and process signals from the host system.' },
  { icon: Database, title: 'Data Collection Layer', tag: 'Simulated', text: 'Periodic sampling of metrics into a rolling time window.' },
  { icon: Filter, title: 'Feature Processing', tag: 'Simulated', text: 'Normalization and trend features derived from the raw samples.' },
  { icon: Brain, title: 'Random Forest — Workload Prediction', tag: 'Prototype prediction', text: 'Proposed ensemble classifier that labels demand as LOW, MEDIUM, or HIGH.' },
  { icon: SlidersHorizontal, title: 'Power Management Policy', tag: 'Rule-based demo', text: 'Maps the predicted workload class to a performance policy.' },
  { icon: Gauge, title: 'Performance Recommendation', tag: 'Demo', text: 'Suggests Power Saver, Balanced, or High Performance.' },
  { icon: Leaf, title: 'Energy Efficiency', tag: 'Demo', text: 'Reduces unnecessary CPU performance when demand is low or moderate.' },
]

export const LAYERS = [
  { title: 'Input', icon: Cpu, items: ['CPU utilization', 'Memory usage', 'Process activity', 'Workload trend'] },
  { title: 'AI layer', icon: Brain, items: ['Feature processing', 'Random Forest prediction'] },
  { title: 'Decision layer', icon: GitBranch, items: ['Workload classification', 'Power recommendation'] },
  { title: 'Output', icon: Leaf, items: ['Performance level', 'Energy efficiency objective'] },
]

export const FLOW = [
  { icon: Eye, title: 'Monitor', text: 'Observe CPU, memory, and process activity.' },
  { icon: Database, title: 'Collect', text: 'Gather samples into a rolling window.' },
  { icon: Brain, title: 'Predict', text: 'Classify the expected workload level.' },
  { icon: GitBranch, title: 'Decide', text: 'Apply the power-management policy.' },
  { icon: Lightbulb, title: 'Recommend', text: 'Suggest a suitable performance level.' },
  { icon: Leaf, title: 'Optimize', text: 'Reduce wasted energy while staying responsive.' },
]

export const TECH = [
  { icon: Code, group: 'Frontend', name: 'React + Vite', text: 'Component-based single-page app with fast local builds.' },
  { icon: Palette, group: 'UI', name: 'Tailwind CSS', text: 'Utility-first styling for the dark dashboard theme.' },
  { icon: TrendingUp, group: 'Visualization', name: 'Recharts', text: 'Area, line, and bar charts for the simulated metrics.' },
  { icon: Brain, group: 'AI/ML', name: 'Random Forest', text: 'Proposed workload-prediction algorithm (not yet trained).' },
  { icon: Cpu, group: 'System concept', name: 'CPU Power Management', text: 'Mapping workload demand to performance levels.' },
  { icon: Terminal, group: 'Target environment', name: 'Linux / OS integration', text: 'Planned future target; not implemented in this prototype.' },
]

export const ROADMAP = [
  { phase: 1, title: 'Prototype Dashboard', status: 'done', text: 'Dashboard, simulated monitoring, prototype prediction, and recommendation workflow.' },
  { phase: 2, title: 'Real CPU Monitoring', status: 'next', text: 'Collect actual utilization, memory, and process metrics from the host.' },
  { phase: 3, title: 'Train Random Forest Model', status: 'planned', text: 'Train and validate a Random Forest classifier on collected workload data.' },
  { phase: 4, title: 'Linux System Integration', status: 'planned', text: 'Connect the monitoring and prediction pipeline to Linux system interfaces.' },
  { phase: 5, title: 'Real-Time Power Management', status: 'planned', text: 'Apply recommended performance levels through OS-level controls.' },
  { phase: 6, title: 'Performance & Energy Evaluation', status: 'planned', text: 'Measure responsiveness and energy savings against baseline strategies.' },
]

export const TEAM = [
  { roll: '2510030410', name: 'CHANDANA PRIYA', initials: 'CP' },
  { roll: '2510030099', name: 'Meghana', initials: 'M' },
  { roll: '2510030355', name: 'G. Sricharan Reddy', initials: 'GS' },
  { roll: '2510030390', name: 'Abhijith Jayan', initials: 'AJ' },
  { roll: '2510030137', name: 'Ramakrishna', initials: 'R' },
]
