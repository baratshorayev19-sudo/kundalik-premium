import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { HabitForm } from '../components/HabitForm'
import { useHabitStore } from '../store'

const cardDetails = [
  { label: 'Focus sessions', value: '18/24', tone: 'text-emerald-300' },
  { label: 'Streak power', value: '12 days', tone: 'text-sky-300' },
  { label: 'Daily pulse', value: '96%', tone: 'text-violet-300' },
]

export default function Dashboard() {
  const habits = useHabitStore((state) => state.habits)
  const loading = useHabitStore((state) => state.loading)
  const toggleComplete = useHabitStore((state) => state.toggleComplete)
  const resetAll = useHabitStore((state) => state.resetAll)
  const loadHabits = useHabitStore((state) => state.loadHabits)

  useEffect(() => {
    loadHabits()
  }, [loadHabits])

  const totalProgress = useMemo(
    () => (habits.length ? Math.round(habits.reduce((sum, habit) => sum + habit.progress, 0) / habits.length) : 0),
    [habits],
  )

  const completedCount = useMemo(() => habits.filter((habit) => habit.progress >= 100).length, [habits])
  const recentList = useMemo(() => habits.slice(0, 4), [habits])

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="space-y-8"
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-black/25 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Daily command center</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Luxury focus flow</h1>
              <p className="mt-3 max-w-2xl text-slate-400">
                Curate your rituals, review premium insights, and maintain momentum with a calm daily workspace.
              </p>
            </div>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-300/40 hover:bg-violet-500/10"
            >
              Reset workspace
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {cardDetails.map((card) => (
              <article key={card.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{card.label}</p>
                <p className={`mt-3 text-3xl font-semibold ${card.tone}`}>{card.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Momentum</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Progress cadence</h2>
              </div>
              <span className="rounded-full bg-slate-800/80 px-4 py-2 text-sm font-semibold text-slate-300">
                {totalProgress}% complete
              </span>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-400 transition-all"
                style={{ width: `${totalProgress}%` }}
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Active rituals</p>
                <p className="mt-3 text-3xl font-semibold text-white">{habits.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Completed today</p>
                <p className="mt-3 text-3xl font-semibold text-white">{completedCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <HabitForm />

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Refinement list</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Today’s rituals</h2>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-300">Top rituals</span>
            </div>

            <div className="mt-6 space-y-4">
              {loading ? (
                <p className="text-slate-400">Loading rituals…</p>
              ) : recentList.length ? (
                recentList.map((habit) => (
                  <div
                    key={habit.id}
                    className="rounded-3xl border border-white/10 bg-slate-900/80 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{habit.category}</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">{habit.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{habit.cadence} ritual</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleComplete(habit.id)}
                        className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/15"
                      >
                        {habit.progress >= 100 ? 'Reset' : 'Advance'}
                      </button>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>Completion</span>
                        <span>{habit.progress}%</span>
                      </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-400"
                          style={{ width: `${habit.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-3xl border border-dashed border-white/10 bg-slate-900/80 p-6 text-slate-400">
                  Create your first ritual to begin tracking an elevated flow.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
