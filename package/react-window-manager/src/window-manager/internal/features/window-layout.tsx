import { useEffect, useRef } from 'react'
import { IconWinMinimize, IconWinDemaximize, IconWinMaximize } from '../assets/svg-win-icons'
import ResizingControls from './resizing/resizing-controls'
import { windowRegistry } from '../../registration/window-registry'
import { dockApi } from './docking/docking-api'
import DragHandle from './drag/drag-handle'
import { useWorkspaceState } from './workspace/workspace-state'
import { focusApi } from './focus/focus-api'
import { DockPosition } from '../../model/window-types'

export type WindowLayoutProps = {
  children: React.ReactNode
  windowName: string | React.ReactNode
  winId: string
  navbarChildren?: React.ReactNode

  /**
   * @default
   * 'bg-white shadow-lg border border-zinc-600 rounded-sm'
   */
  className?: string

  /**
   * @default
   * 'bg-neutral-800 ${isActive ? 'brightness-100' : 'brightness-150'}'
   */
  navbarClassName?: string

  /**
   * @default  'deafult'
   * @param `deafult` keeps the window near full width but detached from the workspace edges
   * @param `full`
   * @param `right`
   * @param `left`
   * @param `top`
   * @param `bottom`
   * @param `top-right`
   * @param `top-left`
   * @param `bottom-right`
   * @param `bottom-left`
   * */
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
  navbarClassName,
  className,
  winId,
  defaultDock = 'default',
  style,
}: WindowLayoutProps) {
  const { wsElement, wsRect, isBelowBreakPoint } = useWorkspaceState()
  const windowRef = useRef<HTMLDivElement>(null)
  const {
    setWinElement,

    windowId,
    zIndex,
    isActive,

    winVisualState,

    isWindowClosed,

    winCoord,

    winWidth,
    winHeight,
  } = windowRegistry[winId]()

  useEffect(() => {
    setWinElement(windowRef.current)
  }, [setWinElement])

  useEffect(() => {
    dockingResolver[defaultDock](winId)

    /* Initialization is dependent on the workspace (wsElement) being mounted */
  }, [wsElement])

  const dockingResolver: Record<DockPosition, (winId: string) => void> = {
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
      onClick={() => focusApi.closeWindowAndRefocus(winId)}
    >
      <IconWinMinimize color={style?.navControlsColor} />
    </button>
  )

  return (
    <>
      <div
        id={windowId}
        ref={windowRef}
        className={`fixed overflow-hidden ${className ? className : 'bg-white shadow-lg border border-zinc-600 rounded-sm'} `}
        onPointerDown={() => focusApi.bringWindowToFocus(windowId)}
        style={{
          backgroundColor: style?.windowBackgroundColor,
          top: isBelowBreakPoint ? wsRect.top : `${winCoord.pointY}px`,
          left: isBelowBreakPoint ? wsRect.left : `${winCoord.pointX}px`,
          width: isBelowBreakPoint ? wsRect.innerWidth : `${winWidth}px`,
          height: isBelowBreakPoint ? wsRect.innerHeight : `${winHeight}px`,
          zIndex: `${zIndex}`,

          /* MINIMIZE LOGIC */
          transition: 'transform 0.2s ease-in-out, opacity 0.3s ease-in-out',
          opacity: isWindowClosed ? 0 : 1,
          transform: isWindowClosed
            ? `translate(${wsRect.innerWidth / 2 - winCoord.pointX - winWidth / 2}px,
              ${wsRect.innerHeight - winCoord.pointY - winHeight / 2}px) scale(0.02)`
            : '',
        }}
      >
        <nav
          style={{
            backgroundColor: style?.navBackgroundColor,
          }}
          className={`h-[32px] w-full flex items-center
            ${
              navbarClassName
                ? navbarClassName
                : `bg-neutral-800 ${isActive ? 'brightness-100' : 'brightness-150'}`
            } 
          `}
        >
          <div className="shrink h-8 px-2 text-white flex items-center text-sm truncate min-w-0">
            {windowName}
          </div>

          <div className="h-8 px-2 text-white flex items-center text-sm truncate min-w-0">
            {navbarChildren}
          </div>

          <DragHandle winId={winId} />

          {!isBelowBreakPoint && maximizeControl}
          {closeControl}
        </nav>

        {!isBelowBreakPoint && <ResizingControls winId={winId} />}

        {/* Offset the navbar => 'h-[calc(100%-32px)]' */}
        <div className={`relative w-full h-[calc(100%-32px)] overflow-auto select-text`}>
          {children}
        </div>
      </div>{' '}
    </>
  )
}
