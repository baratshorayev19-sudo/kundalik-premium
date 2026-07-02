import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useHabitStore } from '../store'

const habitSchema = z.object({
  title: z.string().min(3, 'Enter a focus ritual'),
  category: z.enum(['Focus', 'Wellness', 'Creativity', 'Routine']),
  cadence: z.enum(['Daily', 'Weekly', 'Monthly']),
})

type HabitFormValues = z.infer<typeof habitSchema>

export function HabitForm() {
  const addHabit = useHabitStore((state) => state.addHabit)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      title: '',
      category: 'Focus',
      cadence: 'Daily',
    },
  })

  const onSubmit = async (values: HabitFormValues) => {
    await addHabit(values)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
    >
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Craft your ritual</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Add premium micro-habit</h2>
      </div>

      <div className="space-y-4">
        <label className="block text-sm text-slate-300">
          Name
          <input
            {...register('title')}
            aria-invalid={errors.title ? 'true' : 'false'}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
          />
          {errors.title ? <p className="mt-2 text-sm text-rose-300">{errors.title.message}</p> : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-300">
            Category
            <select
              {...register('category')}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
            >
              <option>Focus</option>
              <option>Wellness</option>
              <option>Creativity</option>
              <option>Routine</option>
            </select>
          </label>

          <label className="block text-sm text-slate-300">
            Cadence
            <select
              {...register('cadence')}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Create ritual
      </button>
    </form>
  )
}
