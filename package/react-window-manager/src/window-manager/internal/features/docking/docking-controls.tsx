import { useState } from 'react'
import { windowRegistry } from '../../../registration/window-store-factory'
import { useWorkspaceState } from '../workspace/workspace-state'
import { dockApi } from './docking-api'

export default function DockingControls() {
  const [isHovering, setIsHovering] = useState(false)

  const { activeWindowId } = useWorkspaceState()
  const { isDragging } = windowRegistry[activeWindowId]()

  const cornerDockControl = (
    <div className={`flex xl:p-0 shrink-0 gap-0.5`}>
      <div className="flex flex-col justify-center gap-0.5">
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-10 h-6 rounded-sm"
          onMouseUp={() => dockApi.dockWindowTopLeft(activeWindowId)}
        ></button>
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-10 h-6 rounded-sm"
          onMouseUp={() => dockApi.dockWindowBottomLeft(activeWindowId)}
        ></button>
      </div>
      <div className="flex flex-col justify-center gap-0.5">
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-10 h-6 rounded-sm"
          onMouseUp={() => dockApi.dockWindowTopRight(activeWindowId)}
        ></button>
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-10 h-6 rounded-sm"
          onMouseUp={() => dockApi.dockWindowBottomRight(activeWindowId)}
        ></button>
      </div>
    </div>
  )

  const sideDideControl = (
    <div className={`flex shrink-0 items-center gap-0.5`}>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-8 h-12 rounded-sm"
        onMouseUp={() => dockApi.dockWindowLeft(activeWindowId)}
      ></button>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-8 h-12 rounded-sm"
        onMouseUp={() => dockApi.dockWindowRight(activeWindowId)}
      ></button>
    </div>
  )

  const horizontalDockControl = (
    <div className={`flex flex-col shrink-0 items-center gap-0.5`}>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-14 h-6 rounded-sm"
        onMouseUp={() => dockApi.dockWindowTop(activeWindowId)}
      ></button>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-14 h-6 rounded-sm"
        onMouseUp={() => dockApi.dockWindowBottom(activeWindowId)}
      ></button>
    </div>
  )

  const windowDockPannel = (
    <span
      className="pointer-events-auto px-4 pb-2"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <section
        className={`
        flex w-fit border border-zinc-600 border-t-0 rounded-b-md bg-zinc-800 
        overflow-hidden px-8 gap-4 h-full py-4 
        `}
      >
        {cornerDockControl}
        {horizontalDockControl}
        {sideDideControl}
      </section>
    </span>
  )

  /** @Note could easily add a drop on area to dock feature */
  return (
    <div
      className={`
        ${
          isDragging
            ? isHovering
              ? 'top-0 opacity-50'
              : 'top-[-68px] opacity-80'
            : 'top-[-104px] opacity-0'
        } 
        transition-all duration-500
        absolute z-50 flex items-center justify-center 
        w-full mx-auto pointer-events-none`}
    >
      {windowDockPannel}
    </div>
  )
}
