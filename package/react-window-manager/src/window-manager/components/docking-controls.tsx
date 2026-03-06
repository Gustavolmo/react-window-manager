import { useEffect, useState } from 'react'
import { StoreApi, UseBoundStore } from 'zustand'
import { WindowStore } from '../window-types'

type Props = {
  useWindowStore: UseBoundStore<StoreApi<WindowStore>>
}

export default function DockingControls({ useWindowStore }: Props) {
  const {
    isDragging,

    dockWindowRight,
    dockWindowLeft,

    dockWindowBottom,
    dockWindowTop,

    dockWindowTopLeft,
    dockWindowBottomLeft,
    dockWindowTopRight,
    dockWindowBottomRight,
  } = useWindowStore()

  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    let dealy: ReturnType<typeof setTimeout>

    if (isDragging) {
      dealy = setTimeout(() => {
        setIsVisible(true)
      }, 400)
    } else {
      setIsVisible(false)
    }

    return () => clearTimeout(dealy)
  }, [isDragging])

  const cornerDockControl = (
    <div className={`flex xl:p-0 shrink-0 gap-0.5`}>
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center gap-0.5">
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-8 h-5 rounded-sm"
          onMouseUp={dockWindowTopLeft}
        ></button>
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-8 h-5 rounded-sm"
          onMouseUp={dockWindowBottomLeft}
        ></button>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-center gap-0.5">
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-8 h-5 rounded-sm"
          onMouseUp={dockWindowTopRight}
        ></button>
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-8 h-5 rounded-sm"
          onMouseUp={dockWindowBottomRight}
        ></button>
      </div>
    </div>
  )

  const sideDideControl = (
    <div className={`flex shrink-0 items-center gap-1`}>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-7 h-10 rounded-sm"
        onMouseUp={dockWindowLeft}
      ></button>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-7 h-10 rounded-sm"
        onMouseUp={dockWindowRight}
      ></button>
    </div>
  )

  const horizontalDockControl = (
    <div className={`flex flex-col shrink-0 items-center gap-0.5`}>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-12 h-5 rounded-sm"
        onMouseUp={dockWindowTop}
      ></button>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-12 h-5 rounded-sm"
        onMouseUp={dockWindowBottom}
      ></button>
    </div>
  )

  const windowDockPannel = (
    <section
      className={`
        flex w-fit border border-zinc-600 rounded-md bg-zinc-800 opacity-50
        overflow-hidden px-4 gap-3 h-full py-2 pointer-events-auto
        `}
    >
      {cornerDockControl}
      {horizontalDockControl}
      {sideDideControl}
    </section>
  )

  return (
    true && (
      <div className="absolute z-50 flex items-center justify-center top-2 w-full mx-auto pointer-events-none">
        {isVisible && windowDockPannel}
      </div>
    )
  )
}
