import { useEffect, useRef } from 'react'
import { resetAllWindows, stopAllDragAndResize } from './internal/shared/bulk-actions'
import { useCursorState } from './internal/states/cursor-state'
import { useWorkspaceState } from './internal/states/workspace-state'

type Props = {
  children: React.ReactNode
}

export default function WorkspaceLayout({ children }: Props) {
  const workspaceRef = useRef<HTMLElement>(null)
  const { setInnerHeight, setInnerWidth, setCoord } = useWorkspaceState()

  useEffect(() => {
    // const wsElement = workspaceRef.current
    // if (!wsElement) return

    // const updateRect = () => {
    //   if (!wsElement) return
    //   const rect = wsElement.getBoundingClientRect()
    //   setInnerHeight(rect.height)
    //   setInnerWidth(rect.width)
    //   setCoord({ pointX: rect.left, pointY: rect.top })
    // }

    // updateRect()
    // const observer = new ResizeObserver(() => updateRect())

    // observer.observe(wsElement)
    // return () => observer.disconnect()
  }, [])

  return (
    <main
      ref={workspaceRef}
      onMouseLeave={stopAllDragAndResize}
      onMouseUp={stopAllDragAndResize}
      className="absolute overflow-hidden h-full w-full touch-none"
    >
      <CursorCoordinates />
      <WindowResizeReset />
      {children}
    </main>
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
