import { useEffect } from 'react'
import { appHistoryApi } from './history-api'

export function HistoryKeysListener() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrlOrCmd = e.metaKey || e.ctrlKey
      if (!ctrlOrCmd) return

      if (e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault()
        appHistoryApi.moveToPreviousSnapshot()
      }

      if (e.key.toLowerCase() === 'z' && e.shiftKey) {
        e.preventDefault()
        appHistoryApi.moveToNextSnapshot()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return <></>
}
