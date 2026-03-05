import { resetAllWindows } from '../window-manager/window-global-actions'
import { useScreenState } from './screen-state'
import { useEffect } from 'react'

export default function ScreenListeners() {
  return (
    <>
      <CursorCoordinates />
      <WindowResizeReset />
    </>
  )
}

/* FIX ME: Until I find a better way to handle window resize, the state restes on resize */
function WindowResizeReset() {
  useEffect(() => {
    const handleWindowResize = () => {
      resetAllWindows()
    }

    window.addEventListener('resize', handleWindowResize)

    return () => document.removeEventListener('pointermove', handleWindowResize)
  }, [])

  return <></>
}

function CursorCoordinates() {
  const { setX, setY } = useScreenState()

  useEffect(() => {
    const handleWindowPosition = (e: MouseEvent) => {
      e.preventDefault()
      setX(e.clientX)
      setY(e.clientY)
    }

    document.addEventListener('pointermove', handleWindowPosition)

    return () => document.removeEventListener('pointermove', handleWindowPosition)
  }, [setX, setY])

  return <></>
}
