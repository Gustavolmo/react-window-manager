import { useEffect } from 'react'
import { setCursorPosition } from './cursor-state'

export function CursorMoveListener() {
  useEffect(() => {
    /* FIND ME: Make this an adapter that converts global pixel coordinates to workspace relative coordinates - requires some investigation */
    const handlePointerMove = (e: PointerEvent) => {
      e.preventDefault()
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return <></>
}
