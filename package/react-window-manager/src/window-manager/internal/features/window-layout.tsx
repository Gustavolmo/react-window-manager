import { useCursorState } from '../states/cursor-state'
import { useEffect, useRef, useState } from 'react'
import { Coord } from '../../model/window-types'
import { iconWinMinimize, iconWinDemaximize, iconWinMaximize } from '../assets/svg-win-icons'
import ResizingControls from './resizing/resizing-controls'
import { windowRegistry } from '../../registration/window-store-factory'
import { getWSRect, isBelowBreakPoint, useWorkspaceState } from '../../workspace-state'
import { stackApi } from './stack/stack-api'
import { dockApi } from './docking/docking-api'

export type WindowLayoutProps = {
  children: React.ReactNode
  windowName: string | React.ReactNode
  winId: string
  navbarChildren?: React.ReactNode
  defaultDock?: 'right' | 'left' | 'full'

  /** @note use CSS values such as hex or supported color names */
  style?: {
    navBackgroundColor?: string
    windowBackgroundColor?: string
    navControlsColor?: string
  }
}

export default function WindowLayout({
  children,
  windowName,
  navbarChildren,
  winId,
  defaultDock,
  style,
}: WindowLayoutProps) {
  const { responsiveBreak } = useWorkspaceState()
  const { x, y } = useCursorState()
  const windowRef = useRef<HTMLDivElement>(null)
  const {
    windowId,
    zIndex,
    isActive,
    setSelf,

    resetFlag,

    winVisualState,

    isWindowClosed,

    isDragging,
    setIsDragging,

    winCoord,
    setWinCoord,

    winWidth,
    winHeight,
  } = windowRegistry[winId]()

  const [dragClickOffset, setDragClickOffset] = useState<Coord>({
    pointX: getWSRect().left,
    pointY: getWSRect().top,
  })

  useEffect(() => {
    setSelf(windowRef)

    if (isBelowBreakPoint(responsiveBreak)) dockApi.maximizeWindow(winId)
    else if (defaultDock === 'left') dockApi.dockWindowLeft(winId)
    else if (defaultDock === 'right') dockApi.dockWindowRight(winId)
    else if (defaultDock === 'full') dockApi.maximizeWindow(winId)
    else dockApi.demaximizeWindow(winId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelf, windowRef, resetFlag])

  useEffect(() => {
    if (isBelowBreakPoint(responsiveBreak)) return
    if (!isDragging) return

    if (winVisualState === 'maximized') dockApi.demaximizeWindow(winId)

    const wSpace = getWSRect()

    let adjustedX = x - dragClickOffset.pointX
    if (x > wSpace.right || x < wSpace.left) adjustedX = winCoord.pointX

    let adjustedY = y - dragClickOffset.pointY
    if (y > wSpace.bottom || y < wSpace.top) adjustedY = winCoord.pointY

    setWinCoord({ pointX: adjustedX, pointY: adjustedY })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, x, y])

  const handleNavbarDrag = (isDragging: boolean) => {
    setDragClickOffset({ pointX: x - winCoord.pointX, pointY: y - winCoord.pointY })
    setIsDragging(isDragging)
  }

  const maximizeControl =
    winVisualState === 'maximized' ? (
      <button
        className={`block hover:bg-gray-100 hover:bg-opacity-20 px-5 h-full`}
        onClick={() => dockApi.demaximizeWindow(winId)}
      >
        {iconWinDemaximize(style?.navControlsColor)}
      </button>
    ) : (
      <button
        className={`block hover:bg-gray-100 hover:bg-opacity-20 px-5 h-full`}
        onClick={() => dockApi.maximizeWindow(winId)}
      >
        {iconWinMaximize(style?.navControlsColor)}
      </button>
    )

  const minimizeControl = (
    <button
      className="hover:bg-red-500 hover:bg-opacity-20 px-5 h-full"
      onClick={() => dockApi.closeWindow(winId)}
    >
      {iconWinMinimize(style?.navControlsColor)}
    </button>
  )

  return (
    <>
      <div
        id={windowId}
        ref={windowRef}
        className={`fixed bg-white shadow-lg border border-zinc-600 rounded-sm overflow-hidden`}
        onMouseDown={() => stackApi.bringTargetWindowToFront(windowId)}
        onMouseUp={() => {
          handleNavbarDrag(false)
        }}
        style={{
          backgroundColor: style?.windowBackgroundColor,
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
          height: `${winHeight}px`,
          zIndex: `${zIndex}`,

          /* MINIMIZE LOGIC */
          transition: 'transform 0.2s ease-in-out, opacity 0.3s ease-in-out',
          opacity: isWindowClosed ? 0 : 1,
          transform: isWindowClosed
            ? `translate(${getWSRect().innerWidth / 2 - winCoord.pointX - winWidth / 2}px,
              ${getWSRect().innerHeight - winCoord.pointY - winHeight / 2}px) scale(0.02)`
            : '',
        }}
      >
        <nav
          style={{
            backgroundColor: style?.navBackgroundColor,
          }}
          className={`
            h-[32px] w-full flex items-center bg-neutral-800
            ${isActive ? 'brightness-100 opacity-100' : 'brightness-75 opacity-80'}`}
        >
          <div className="w-fit shrink-0 h-8 px-2 text-white flex items-center text-sm truncate">
            {windowName}
          </div>

          <div className="h-8 px-2 text-white flex items-center text-sm truncate">
            {navbarChildren}
          </div>

          <div
            onMouseDown={() => handleNavbarDrag(true)}
            onDoubleClick={() => dockApi.maximizeWindow(winId)}
            className="grow min-w-8 h-8 px-2 text-white flex items-center text-sm"
          ></div>

          {!isBelowBreakPoint(responsiveBreak) && maximizeControl}
          {minimizeControl}
        </nav>

        {!isBelowBreakPoint(responsiveBreak) && (
          <ResizingControls winId={winId} windowRef={windowRef} />
        )}

        {/* Offset the navbar => 'h-[calc(100%-32px)]' */}
        <div className={`relative w-full h-[calc(100%-32px)] overflow-auto`}>{children}</div>
      </div>{' '}
    </>
  )
}
