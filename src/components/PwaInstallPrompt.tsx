import { useEffect, useState } from 'react'

export function PwaInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setPromptEvent(event as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const handleInstall = async () => {
    if (!promptEvent) return
    promptEvent.prompt()
    const choice = await promptEvent.userChoice
    if (choice.outcome === 'accepted' || choice.outcome === 'dismissed') {
      setVisible(false)
      setPromptEvent(null)
    }
  }

  if (!visible) return null

  return (
    <section className="rounded-[2rem] border border-violet-400/15 bg-slate-950/90 p-5 text-slate-100 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Install ready</p>
          <p className="mt-2 text-base text-slate-200">Add Kundalik Premium to your home screen for offline luxury productivity.</p>
        </div>
        <button
          type="button"
          onClick={handleInstall}
          className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
        >
          Install app
        </button>
      </div>
    </section>
  )
}

declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
  }
}
