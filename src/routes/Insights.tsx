import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useHabitStore } from '../store'

const ringColors = ['#c084fc', '#38bdf8', '#fb7185', '#22c55e']

export default function Insights() {
  const habits = useHabitStore((state) => state.habits)

  const categoryDistribution = useMemo(() => {
    const counts = {
      Focus: 0,
      Wellness: 0,
      Creativity: 0,
      Routine: 0,
    }

    habits.forEach((habit) => {
      counts[habit.category] += 1
    })

    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [habits])

  const weeklyData = useMemo(() => {
    const trend = habits.length
    return [
      { day: 'Mon', focus: 42 + trend * 3, wellness: 22 + trend * 2 },
      { day: 'Tue', focus: 50 + trend * 3, wellness: 28 + trend * 2 },
      { day: 'Wed', focus: 60 + trend * 3, wellness: 32 + trend * 2 },
      { day: 'Thu', focus: 72 + trend * 3, wellness: 36 + trend * 2 },
      { day: 'Fri', focus: 84 + trend * 3, wellness: 40 + trend * 2 },
      { day: 'Sat', focus: 92 + trend * 3, wellness: 52 + trend * 2 },
      { day: 'Sun', focus: 88 + trend * 3, wellness: 60 + trend * 2 },
    ]
  }, [habits.length])

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-black/25 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Executive insights</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Analytics for your premium flow</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Review weekly momentum and category distribution to keep your high-end process sharp.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Weekly rhythm</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Focus & wellbeing</h2>
              </div>
              <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">Live update</span>
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradientFocus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gradientWellness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)' }} />
                  <Area type="monotone" dataKey="focus" stroke="#8b5cf6" fill="url(#gradientFocus)" strokeWidth={3} />
                  <Area type="monotone" dataKey="wellness" stroke="#14b8a6" fill="url(#gradientWellness)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Category split</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Where your energy lives</h2>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={4}
                  >
                    {categoryDistribution.map((entry, idx) => (
                      <Cell key={entry.name} fill={ringColors[idx % ringColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)' }} />
                  <Legend verticalAlign="bottom" wrapperStyle={{ color: '#cbd5e1' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-black/25">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Premium score</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Adaptive focus health</h2>
          <p className="mt-4 text-slate-400">
            A refined overview of how your ritual categories align with your weekly energy.
          </p>

          <div className="mt-8 space-y-4">
            {categoryDistribution.map((segment) => (
              <div key={segment.name} className="rounded-3xl bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{segment.name}</p>
                  <span className="text-sm text-slate-400">{segment.value} rituals</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-400" style={{ width: `${Math.min(100, segment.value * 28)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-black/25">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Insight brief</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">High-value patterns</h2>
          <p className="mt-4 text-slate-400">
            Gain clarity on your premium routine with a single glance. Build momentum in categories that matter most.
          </p>

          <div className="mt-8 space-y-5">
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-sm text-slate-400">Focus acceleration</p>
              <p className="mt-2 text-2xl font-semibold text-white">{habits.length ? 86 + habits.length : 74}%</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-sm text-slate-400">Wellness alignment</p>
              <p className="mt-2 text-2xl font-semibold text-white">{habits.length ? 68 + habits.length : 58}%</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-sm text-slate-400">Creative balance</p>
              <p className="mt-2 text-2xl font-semibold text-white">{habits.length ? 62 + habits.length : 52}%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
