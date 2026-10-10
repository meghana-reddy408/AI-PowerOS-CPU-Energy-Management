import { Cpu } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-ink-900/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
            <Cpu className="h-5 w-5 text-ink-950" aria-hidden="true" />
          </span>
          <div>
            <p className="font-extrabold text-white">AI PowerOS</p>
            <p className="text-sm text-slate-400">Intelligent CPU Power &amp; Energy Management</p>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              AI-powered concept for intelligent CPU workload and energy management.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-500">Prototype Dashboard • Academic Project</p>
      </div>
    </footer>
  )
}
