import { useEffect } from 'react'
import { setCursorPosition } from './cursor-state'

export function CursorMoveListener() {
  useEffect(() => {

    const handlePointerMove = (e: PointerEvent) => {
      e.preventDefault()
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return <></>
}
