import { useEffect, useRef } from 'react'
import {
  ResponsiveSizes,
  useWorkspaceState,
} from './internal/features/workspace/workspace-state'
import DockingControls from './internal/features/docking/docking-controls'
import { resizeApi } from './internal/features/resizing/resizing-api'
import { CursorMoveListener } from './internal/features/cursor/cursor-move-listener'
import { ViewPortResizeListener } from './internal/features/view-port/view-port-resize-listener'
import { wsApi } from './internal/features/workspace/workspace-api'

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
      onMouseLeave={resizeApi.stopAllDragAndResize}
      onMouseUp={resizeApi.stopAllDragAndResize}
      className={className ? className : 'fixed overflow-hidden h-full w-full touch-none'}
    >
      <ViewPortResizeListener />
      <CursorMoveListener />
      <div className=" w-full h-full relative overflow-hidden">
        {!wsApi.isBelowBreakPoint() && <DockingControls />}
        {children}
      </div>
    </section>
  )
}
