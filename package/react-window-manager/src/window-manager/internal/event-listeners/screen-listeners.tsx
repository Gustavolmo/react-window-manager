import { adjustAllWindowsToViewport } from '../shared/window-actions'
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
    let prevViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    const adjustOnResize = () => {
      const nextViewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      adjustAllWindowsToViewport(prevViewport, nextViewport, 48)
      prevViewport = nextViewport
    }

    window.addEventListener('resize', adjustOnResize)

    return () => window.removeEventListener('resize', adjustOnResize)
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
