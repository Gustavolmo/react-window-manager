import { useEffect, useState } from 'react'
import { windowRegistry } from '../window-store-factory'

type Props = {
  winId: string
}

export default function DockingControls({ winId }: Props) {
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
  } = windowRegistry[winId]()

  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  useEffect(() => {
    let dealy: ReturnType<typeof setTimeout>

    if (isDragging) {
      dealy = setTimeout(() => {
        setIsVisible(true)
      }, 100)
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
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-10 h-6 rounded-sm"
          onMouseUp={dockWindowTopLeft}
        ></button>
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-10 h-6 rounded-sm"
          onMouseUp={dockWindowBottomLeft}
        ></button>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-center gap-0.5">
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-10 h-6 rounded-sm"
          onMouseUp={dockWindowTopRight}
        ></button>
        <button
          className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-10 h-6 rounded-sm"
          onMouseUp={dockWindowBottomRight}
        ></button>
      </div>
    </div>
  )

  const sideDideControl = (
    <div className={`flex shrink-0 items-center gap-0.5`}>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-8 h-12 rounded-sm"
        onMouseUp={dockWindowLeft}
      ></button>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-8 h-12 rounded-sm"
        onMouseUp={dockWindowRight}
      ></button>
    </div>
  )

  const horizontalDockControl = (
    <div className={`flex flex-col shrink-0 items-center gap-0.5`}>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-14 h-6 rounded-sm"
        onMouseUp={dockWindowTop}
      ></button>
      <button
        className="hover:bg-zinc-300 border border-zinc-500 bg-zinc-600 w-14 h-6 rounded-sm"
        onMouseUp={dockWindowBottom}
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

  return (
    <div
      className={`
        ${
          isVisible
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
