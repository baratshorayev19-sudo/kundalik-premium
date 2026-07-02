import { motion } from 'framer-motion'
import { HashRouter as Router, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import Insights from './routes/Insights'
import Settings from './routes/Settings'
import { PwaInstallPrompt } from './components/PwaInstallPrompt'

const navigation = [
  { label: 'Dashboard', path: '/' },
  { label: 'Insights', path: '/insights' },
  { label: 'Settings', path: '/settings' },
]

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_30%),linear-gradient(180deg,#04040c_0%,#09070f_100%)] text-slate-100">
        <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-8 px-6 py-6 sm:px-8 lg:px-10 xl:px-16">
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Kundalik Premium</p>
                <h1 className="max-w-3xl text-4xl font-semibold text-white sm:text-5xl">A luxury planner for rituals, focus, and momentum.</h1>
                <p className="max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                  Build a premium daily workflow with offline-ready persistence, elegant analytics, and a calm, distraction-free experience.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-violet-200 sm:text-sm">
                  Offline-first PWA
                </span>
                <span className="rounded-full border border-slate-500/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300 sm:text-sm">
                  Premium workflow
                </span>
              </div>
            </div>
          </motion.header>

          <PwaInstallPrompt />

          <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-2xl shadow-black/25">
              <div className="space-y-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Refined focus</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">One environment for calm execution.</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Navigate between your dashboard, ritual insights, and personalization settings for a seamless premium flow.
                  </p>
                </div>

                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-3xl border px-5 py-4 text-sm font-semibold transition ${
                          isActive
                            ? 'border-violet-400 bg-violet-500/10 text-white shadow-lg shadow-violet-500/10'
                            : 'border-white/10 bg-slate-900/80 text-slate-300 hover:border-violet-300/20 hover:bg-slate-900/95 hover:text-white'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>

              <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Workspace summary</p>
                <p className="text-base leading-7 text-slate-300">
                  Your premium planner is built for everyday rituals, with a quiet luxury aesthetic and intelligent offline storage.
                </p>
              </div>
            </aside>

            <main className="space-y-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
