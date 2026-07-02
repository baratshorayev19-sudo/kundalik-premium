import { create } from 'zustand'
import { db, type Habit } from './db'

type HabitInput = Omit<Habit, 'id' | 'progress' | 'streak' | 'lastUpdated'>

interface HabitState {
  habits: Habit[]
  loading: boolean
  loadHabits: () => Promise<void>
  addHabit: (habit: HabitInput) => Promise<void>
  toggleComplete: (id: string) => Promise<void>
  resetAll: () => Promise<void>
}

export const useHabitStore = create<HabitState>((set, get) => ({
  habits: [],
  loading: true,
  loadHabits: async () => {
    const habits = await db.habits.toArray()
    set({ habits, loading: false })
  },
  addHabit: async (habit) => {
    const next: Habit = {
      id: crypto.randomUUID(),
      progress: 18,
      streak: 1,
      lastUpdated: Date.now(),
      ...habit,
    }

    await db.habits.put(next)
    set((state) => ({ habits: [next, ...state.habits] }))
  },
  toggleComplete: async (id) => {
    const current = get().habits.find((habit) => habit.id === id)
    if (!current) return

    const nextProgress = current.progress >= 100 ? 0 : Math.min(100, current.progress + 25)
    const updated: Habit = {
      ...current,
      progress: nextProgress,
      streak: nextProgress > 0 ? current.streak + 1 : 0,
      lastUpdated: Date.now(),
    }

    await db.habits.put(updated)
    set((state) => ({
      habits: state.habits.map((habit) => (habit.id === id ? updated : habit)),
    }))
  },
  resetAll: async () => {
    await db.habits.clear()
    set({ habits: [] })
  },
}))
