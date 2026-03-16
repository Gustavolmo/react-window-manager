import { useEffect } from 'react'
import { useCursorState } from './cursor-state'

export function CursorMoveListener() {
  const { setXY } = useCursorState()

  useEffect(() => {
    const handleWindowPosition = (e: PointerEvent) => {
      e.preventDefault()
      setXY(e.clientX, e.clientY)
    }

    window.addEventListener('pointermove', handleWindowPosition)

    return () => window.removeEventListener('pointermove', handleWindowPosition)
  }, [setXY])

  return <></>
}
