import { useEffect } from 'react'
import { useCursorState } from './cursor-state'

export function CursorMoveListener() {
  const { setXY } = useCursorState()

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      e.preventDefault()
      setXY(e.clientX, e.clientY)
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [setXY])

  return <></>
}
