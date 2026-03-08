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

/**  @FixMe Until I find a better way to handle browser resize, the react window state resets if the browser resizes */
function WindowResizeReset() {
  useEffect(() => {
    const handleWindowResize = () => {
      resetAllWindows()
    }

    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
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
