import { useEffect, useRef } from 'react'
import { useWorkspaceState } from './internal/features/workspace/workspace-state'
import DockingControls from './internal/features/docking/docking-controls'
import { resizeApi } from './internal/features/resizing/resizing-api'
import { CursorMoveListener } from './internal/features/cursor/cursor-move-listener'
import WorkspaceResizeListener from './internal/features/workspace/workspace-resize-listener'
import { dragApi } from './internal/features/drag/drag-api'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function WorkspaceLayout({ children, className }: Props) {
  const { setWsElement, wsElement, isBelowBreakPoint, activeWindowId } = useWorkspaceState()
  const workspaceRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!workspaceRef.current) return
    setWsElement(workspaceRef.current)
  }, [wsElement])

  const disabledDragAndResize = () => {
    dragApi.stopDrag(activeWindowId)
    resizeApi.stopResize(activeWindowId)
  }

  return (
    <section
      id="rwm-workspace-layout"
      ref={workspaceRef}
      onPointerLeave={disabledDragAndResize}
      onPointerUp={disabledDragAndResize}
      className={className ? className : 'fixed overflow-hidden h-full w-full touch-none'}
    >
      <WorkspaceResizeListener />
      <CursorMoveListener />
      <div className=" w-full h-full relative overflow-hidden">
        {!isBelowBreakPoint && <DockingControls />}
        {children}
      </div>
    </section>
  )
}
