import { resetAllWindows } from '../shared/window-actions'
import { useCursorState } from './cursor-state'
import { useEffect } from 'react'

export default function ScreenListeners() {
  return (
    <>
      <CursorCoordinates />
      <WindowResizeReset />
    </>
  )
}

function WindowResizeReset() {
  useEffect(() => {
    window.addEventListener('resize', resetAllWindows)

    return () => window.removeEventListener('resize', resetAllWindows)
  }, [])

  return <></>
}

function CursorCoordinates() {
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
