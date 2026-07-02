import { useState } from 'react'

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [focusMode, setFocusMode] = useState(true)
  const [dailyReset, setDailyReset] = useState(false)

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-black/25 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Flow settings</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Tailor your premium routine</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Adjust the environment that supports your daily ritual and focus journey.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Sync</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Offline first</h2>
            <p className="mt-4 text-slate-400">
              Progress is stored locally and remains available even without internet access.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Experience</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Dark luxury mode</h2>
            <p className="mt-4 text-slate-400">
              A rich visual palette designed for a premium, distraction-free workflow.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {[
            { label: 'Smart notifications', description: 'Receive prompts for high-priority rituals.', state: notifications, setter: setNotifications },
            { label: 'Auto focus theme', description: 'Switch to immersive mode during active sessions.', state: focusMode, setter: setFocusMode },
            { label: 'Morning ritual reset', description: 'Refresh your dashboard each morning.', state: dailyReset, setter: setDailyReset },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div>
                <p className="font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-sm text-slate-400">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => item.setter(!item.state)}
                className={`inline-flex h-11 w-20 items-center rounded-full p-1 transition ${item.state ? 'bg-violet-500/20' : 'bg-white/5'}`}
              >
                <span
                  className={`inline-block h-9 w-9 rounded-full bg-white transition ${item.state ? 'translate-x-9 bg-violet-400' : 'translate-x-0 bg-slate-700'}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
