import Dexie, { type Table } from 'dexie'

export interface Habit {
  id: string
  title: string
  category: 'Focus' | 'Wellness' | 'Creativity' | 'Routine'
  cadence: 'Daily' | 'Weekly' | 'Monthly'
  progress: number
  streak: number
  lastUpdated: number
}

class KundalikDB extends Dexie {
  habits!: Table<Habit, string>

  constructor() {
    super('KundalikPremiumDB')
    this.version(1).stores({
      habits: 'id,title,category,cadence,progress,streak,lastUpdated',
    })
  }
}

export const db = new KundalikDB()
