import { useEffect } from 'react'
import { useCursorState } from './cursor-state'

export function CursorMoveListener() {
  const { setX, setY } = useCursorState()

  useEffect(() => {
    const handleWindowPosition = (e: PointerEvent) => {
      e.preventDefault()
      setX(e.clientX)
      setY(e.clientY)
    }

    window.addEventListener('pointermove', handleWindowPosition)

    return () => window.removeEventListener('pointermove', handleWindowPosition)
  }, [setX, setY])

  return <></>
}
