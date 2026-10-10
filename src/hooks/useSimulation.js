import { useState, useEffect, useCallback, useMemo } from 'react'
import { PROFILES } from '../data/profiles'

/*
  Demo simulation engine.
  All values are generated in the browser from scenario ranges (see data/profiles.js).
  No hardware access, no network calls, no trained model.
*/

const MAX_POINTS = 40
const TICK_MS = 2000

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
const rand = (min, max) => min + Math.random() * (max - min)
const r1 = (v) => Math.round(v * 10) / 10
const fmtTime = (d) => d.toLocaleTimeString('en-GB')

/* Random walk pulled toward the middle of a range and capped per step. */
function drift(prev, [min, max], pull = 0.35, maxStep = 20) {
  const target = (min + max) / 2
  const half = (max - min) / 2
  const desired = clamp(prev + (target - prev) * pull + rand(-half * 0.6, half * 0.6), min, max)
  return prev + clamp(desired - prev, -maxStep, maxStep)
}

function makePoint(prev, profile, at) {
  const cpu = drift(prev.cpu, profile.cpu)
  const memory = drift(prev.memory, profile.mem, 0.25, 6)
  const process = drift(prev.process, profile.proc, 0.3, 15)
  const activity = drift(prev.activity, profile.sys, 0.3, 15)
  const raw = 0.6 * cpu + 0.25 * process + 0.15 * memory
  const index = prev.index * 0.4 + raw * 0.6
  return {
    time: fmtTime(at),
    ts: at.getTime(),
    cpu: r1(cpu),
    memory: r1(memory),
    process: r1(process),
    activity: r1(activity),
    index: r1(index),
  }
}

function makeProbs(profile) {
  const top = Math.round(clamp(profile.confidence + rand(-4, 4), 70, 95))
  const rest = 100 - top
  const [[k1, s1], [k2]] = profile.neighbors
  const a = Math.round(rest * s1)
  return { [profile.key]: top, [k1]: a, [k2]: rest - a }
}

function derive(profile) {
  return {
    probs: makeProbs(profile),
    efficiency: Math.round(clamp(profile.efficiency + rand(-2, 2), 0, 100)),
    energy: {
      base: Math.round(clamp(profile.energy.base + rand(-1.5, 1.5), 0, 100)),
      ai: Math.round(clamp(profile.energy.ai + rand(-1.5, 1.5), 0, 100)),
    },
  }
}

function init(workload) {
  const now = Date.now()
  let prev = { cpu: 45, memory: 52, process: 40, activity: 42, index: 45 }
  const history = []
  for (let i = 0; i < MAX_POINTS; i++) {
    const at = new Date(now - (MAX_POINTS - i) * TICK_MS)
    // A short ramp from medium to the starting workload so the charts have context.
    const profile = i < MAX_POINTS - 14 ? PROFILES.MEDIUM : PROFILES[workload]
    prev = makePoint(prev, profile, at)
    history.push(prev)
  }
  return { workload, history, updatedAt: now, trend: 4.2, ...derive(PROFILES[workload]) }
}

function advance(s) {
  const profile = PROFILES[s.workload]
  const prev = s.history[s.history.length - 1]
  const at = new Date()
  const point = makePoint(prev, profile, at)
  const history = [...s.history.slice(-(MAX_POINTS - 1)), point]
  const recent = history.slice(-6, -1)
  const avg = recent.reduce((sum, p) => sum + p.cpu, 0) / recent.length
  return { ...s, history, updatedAt: at.getTime(), trend: r1(point.cpu - avg), ...derive(profile) }
}

export function useSimulation(initialWorkload = 'HIGH') {
  const [state, setState] = useState(() => init(initialWorkload))
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => setState((s) => advance(s)), TICK_MS)
    return () => clearInterval(id)
  }, [running])

  const setWorkload = useCallback((workload) => {
    setState((s) => (s.workload === workload ? s : advance({ ...s, workload })))
  }, [])

  return useMemo(() => {
    const latest = state.history[state.history.length - 1]
    const profile = PROFILES[state.workload]
    return {
      workload: state.workload,
      profile,
      history: state.history,
      latest,
      metrics: { ...latest, trend: state.trend },
      probs: state.probs,
      confidence: state.probs[state.workload],
      efficiency: state.efficiency,
      energy: { ...state.energy, saving: Math.max(0, state.energy.base - state.energy.ai) },
      updatedAt: state.updatedAt,
      running,
      setRunning,
      setWorkload,
    }
  }, [state, running, setWorkload])
}

export function useRelativeTime(ts, running) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  if (!running) return 'Paused'
  const s = Math.max(0, Math.floor((now - ts) / 1000))
  return s < 3 ? 'Just now' : `${s}s ago`
}

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join(',')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return active
}
