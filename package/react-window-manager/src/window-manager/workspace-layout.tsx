import { useEffect, useRef } from 'react'
import { useWorkspaceState } from './internal/features/workspace/workspace-state'
import DockingControls from './internal/features/docking/docking-controls'
import { resizeApi } from './internal/features/resizing/resizing-api'
import { CursorMoveListener } from './internal/features/cursor/cursor-move-listener'
import { ResponsiveSizes } from './model/workspace-types'
import WorkspaceResizeListener from './internal/features/workspace/workspace-resize-listener'

type Props = {
  children: React.ReactNode
  className?: string
  /**
   * Always relative to the WorkspaceLayout dimensions
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

export default function WorkspaceLayout({ children, className, responsiveBreak }: Props) {
  const workspaceRef = useRef<HTMLElement | null>(null)
  const { setWsElement, setResponsiveBreak, wsElement, isBelowBreakPoint } = useWorkspaceState()

  useEffect(() => {
    setWsElement(workspaceRef.current)
  }, [wsElement])

  useEffect(() => {
    if (responsiveBreak) setResponsiveBreak(responsiveBreak)
  }, [responsiveBreak])

  return (
    <section
      ref={workspaceRef}
      onPointerLeave={resizeApi.stopAllDragAndResize}
      onPointerUp={resizeApi.stopAllDragAndResize}
      className={className ? className : 'fixed overflow-hidden h-full w-full touch-none'}
    >
      <WorkspaceResizeListener />
      <CursorMoveListener />
      <div className=" w-full h-full relative overflow-hidden">
        {!isBelowBreakPoint() && <DockingControls />}
        {children}
      </div>
    </section>
  )
}
