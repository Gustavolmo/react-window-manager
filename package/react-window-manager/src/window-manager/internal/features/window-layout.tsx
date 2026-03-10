import { useEffect, useRef } from 'react'
import { IconWinMinimize, IconWinDemaximize, IconWinMaximize } from '../assets/svg-win-icons'
import ResizingControls from './resizing/resizing-controls'
import { windowRegistry } from '../../registration/window-store-factory'
import { stackApi } from './stack/stack-api'
import { dockApi } from './docking/docking-api'
import { wsApi } from './workspace/workspace-api'
import DragHandle from './drag/drag-handle'

type DockPosition =
  | 'right'
  | 'left'
  | 'full'
  | 'top'
  | 'bottom'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'default'

export type WindowLayoutProps = {
  children: React.ReactNode
  windowName: string | React.ReactNode
  winId: string
  navbarChildren?: React.ReactNode
  defaultDock?: DockPosition

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
  defaultDock = 'default',
  style,
}: WindowLayoutProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const {
    windowId,
    zIndex,
    isActive,
    setSelf,

    resetFlag,

    winVisualState,

    isWindowClosed,

    winCoord,

    winWidth,
    winHeight,
  } = windowRegistry[winId]()

  useEffect(() => {
    setSelf(windowRef)

    if (wsApi.isBelowBreakPoint()) {
      dockApi.maximizeWindow(winId)
      return
    }

    dockingRoutes[defaultDock](winId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelf, windowRef, resetFlag])

  const dockingRoutes: Record<DockPosition, (winId: string) => void> = {
    right: dockApi.dockWindowRight,
    left: dockApi.dockWindowLeft,
    full: dockApi.maximizeWindow,
    top: dockApi.dockWindowTop,
    bottom: dockApi.dockWindowBottom,
    'top-right': dockApi.dockWindowTopRight,
    'top-left': dockApi.dockWindowTopLeft,
    'bottom-right': dockApi.dockWindowBottomRight,
    'bottom-left': dockApi.dockWindowBottomLeft,
    default: dockApi.demaximizeWindow,
  }

  const maximizeControl =
    winVisualState === 'maximized' ? (
      <button
        className={`block hover:bg-gray-500 hover:bg-opacity-10 px-5 h-full`}
        onClick={() => dockApi.demaximizeWindow(winId)}
      >
        <IconWinDemaximize color={style?.navControlsColor} />
      </button>
    ) : (
      <button
        className={`block hover:bg-gray-500 hover:bg-opacity-10 px-5 h-full`}
        onClick={() => dockApi.maximizeWindow(winId)}
      >
        <IconWinMaximize color={style?.navControlsColor} />
      </button>
    )

  const closeControl = (
    <button
      className="hover:bg-red-500 hover:bg-opacity-20 px-5 h-full"
      onClick={() => dockApi.closeWindow(winId)}
    >
      <IconWinMinimize color={style?.navControlsColor} />
    </button>
  )

  return (
    <>
      <div
        id={windowId}
        ref={windowRef}
        className={`fixed bg-white shadow-lg border border-zinc-600 rounded-sm overflow-hidden`}
        onMouseDown={() => stackApi.bringTargetWindowToFront(windowId)}
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
            ? `translate(${wsApi.getRect().innerWidth / 2 - winCoord.pointX - winWidth / 2}px,
              ${wsApi.getRect().innerHeight - winCoord.pointY - winHeight / 2}px) scale(0.02)`
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

          <DragHandle winId={winId} />

          {!wsApi.isBelowBreakPoint() && maximizeControl}
          {closeControl}
        </nav>

        {!wsApi.isBelowBreakPoint() && <ResizingControls winId={winId} />}

        {/* Offset the navbar => 'h-[calc(100%-32px)]' */}
        <div className={`relative w-full h-[calc(100%-32px)] overflow-auto`}>{children}</div>
      </div>{' '}
    </>
  )
}
