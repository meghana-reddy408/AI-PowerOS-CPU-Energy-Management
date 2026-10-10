import { useMemo } from 'react'
import { SECTION_IDS, SECTION_TO_NAV } from './data/content'
import { useActiveSection, useSimulation } from './hooks/useSimulation'
import Header from './components/Header'
import Hero from './components/Hero'
import Monitoring from './components/Monitoring'
import Prediction from './components/Prediction'
import Recommendation from './components/Recommendation'
import Energy from './components/Energy'
import Classification from './components/Classification'
import Architecture from './components/Architecture'
import DecisionFlow from './components/DecisionFlow'
import TechStack from './components/TechStack'
import Objective from './components/Objective'
import Roadmap from './components/Roadmap'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  const sim = useSimulation('HIGH')
  const activeSection = useActiveSection(SECTION_IDS)
  const activeNav = useMemo(() => SECTION_TO_NAV[activeSection] || 'overview', [activeSection])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan-400 focus:px-4 focus:py-2 focus:font-bold focus:text-ink-950"
      >
        Skip to content
      </a>
      <Header active={activeNav} />
      <main id="main">
        <Hero sim={sim} />
        <Monitoring sim={sim} />
        <Prediction sim={sim} />
        <Recommendation sim={sim} />
        <Energy sim={sim} />
        <Classification sim={sim} />
        <Architecture />
        <DecisionFlow />
        <TechStack />
        <Objective />
        <Roadmap />
        <About />
      </main>
      <Footer />
    </div>
  )
}
