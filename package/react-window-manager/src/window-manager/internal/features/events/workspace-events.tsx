import { useEffect } from 'react'
import { useCursorState } from '../../states/cursor-state'
import { windowRegistry } from '../../../registration/window-store-factory'

export function onWindowResizeReset() {
  useEffect(() => {
    const resetAllWindows = () => {
      for (const key of Object.keys(windowRegistry)) {
        windowRegistry[key].getState().reset()
      }
    }

    window.addEventListener('resize', resetAllWindows)

    return () => window.removeEventListener('resize', resetAllWindows)
  }, [])

  return <></>
}

export function onCursorCoordinates() {
  const { setX, setY } = useCursorState()

  useEffect(() => {
    const handleWindowPosition = (e: MouseEvent) => {
      e.preventDefault()
      setX(e.clientX)
      setY(e.clientY)
    }

    window.addEventListener('pointermove', handleWindowPosition)

    return () => window.removeEventListener('pointermove', handleWindowPosition)
  }, [setX, setY])

  return <></>
}