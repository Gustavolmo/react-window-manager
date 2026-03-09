import { useEffect, useRef } from 'react'
import { resetAllWindows, stopAllDragAndResize } from './internal/shared/bulk-actions'
import { useCursorState } from './internal/states/cursor-state'
import {
  isBelowBreakPoint,
  ResponsiveSizes,
  useWorkspaceState,
} from './internal/states/workspace-state'
import DockingControls from './internal/features/docking/docking-controls'

type Props = {
  children: React.ReactNode
  className?: string
  /**
   * @default 'sm'
   * @param sm uses mobile format at 640px
   * @param md uses mobile format at 768px
   * @param lg uses mobile format at 1024px
   * @param xl uses mobile format at 1280px
   * @param never never uses mobile format
   * @param always always uses mobile format
   * @param number set custom break point value in px */
  responsiveBreak?: ResponsiveSizes
}

export default function WorkspaceLayout({ children, className, responsiveBreak = 'sm' }: Props) {
  const workspaceRef = useRef<HTMLElement | null>(null)
  const { setRef, setResponsiveBreak } = useWorkspaceState()

  useEffect(() => {
    setRef(workspaceRef.current)
  }, [])

  useEffect(() => {
    setResponsiveBreak(responsiveBreak)
  }, [responsiveBreak])

  return (
    <section
      ref={workspaceRef}
      onMouseLeave={stopAllDragAndResize}
      onMouseUp={stopAllDragAndResize}
      className={className ? className : 'fixed overflow-hidden h-full w-full touch-none'}
    >
      <CursorCoordinates />
      <WindowResizeReset />
      <div className="border border-red-600 w-full h-full relative overflow-hidden">
        {!isBelowBreakPoint(responsiveBreak) && <DockingControls />}
        {children}
      </div>
    </section>
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
