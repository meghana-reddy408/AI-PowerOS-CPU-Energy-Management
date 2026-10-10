# AI PowerOS – Intelligent CPU Power & Energy Management

Academic software prototype (React + Vite + Tailwind CSS + Recharts + Lucide).
Runs fully in the browser: no backend, no API keys, no network calls.

## Run locally

```bash
npm install
npm run dev      # opens http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

Requires Node.js 18 or newer.

## What this is (and is not)

- All metrics are SIMULATED in the browser (src/hooks/useSimulation.js). Nothing is read from hardware.
- Random Forest is the PROPOSED algorithm. No trained model is connected; the prediction is simulated
  from the selected workload scenario and labelled "Random Forest — Prototype Prediction".
- Power recommendations are demonstrations. Real CPU frequency/governor control would need OS-level integration.

## Structure

```
src/
  App.jsx                 page composition
  data/profiles.js        workload scenarios, modes, colour tokens
  data/content.js         navigation, architecture, roadmap, team
  hooks/useSimulation.js  simulated metrics engine
  components/             Header, Hero, Monitoring, Prediction, Recommendation,
                          Energy, Classification, Architecture, DecisionFlow,
                          TechStack, Objective, Roadmap, About, Footer
```

To change demo behaviour (CPU ranges, confidence, energy numbers), edit `src/data/profiles.js`.
