import { useCursorState } from '../event-listeners/cursor-state'
import { useEffect, useRef } from 'react'
import { ResizeState } from '../../model/window-types'
import { iconWinMinimize, iconWinDemaximize, iconWinMaximize } from '../assets/svg-win-icons'
import { bringTargetWindowToFront } from '../shared/window-actions'
import DockingControls from './docking/docking-controls'
import ResizingControls from './resizing/resizing-controls'
import { windowRegistry } from '../../registration/window-store-factory'

type ResponsiveSizes = 'sm' | 'md' | 'lg' | 'xl' | 'never' | 'always' | number

export type WindowLayoutProps = {
  children: React.ReactNode
  windowName: string | React.ReactNode
  winId: string
  /**
   * @default 'lg'
   * @param sm uses mobile format at 640px
   * @param md uses mobile format at 768px
   * @param lg uses mobile format at 1024px
   * @param xl uses mobile format at 1280px
   * @param never never uses mobile format
   * @param always always uses mobile format
   * @param number set custom break point value in px */
  responsiveBreak?: ResponsiveSizes
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
  responsiveBreak = 'lg',
  children,
  windowName,
  navbarChildren,
  winId,
  defaultDock,
  style,
}: WindowLayoutProps) {
  const { x, y } = useCursorState()
  const windowRef = useRef<HTMLDivElement>(null)
  const {
    windowId,
    zIndex,
    isActive,
    setSelf,

    resetFlag,

    winVisualState,

    isWinMinimized,

    dragClickOffset,
    setDragClickOffset,

    isDragging,
    setIsDragging,

    winCoord,
    setWinCoord,

    setIsResizing,

    winWidth,
    winHeight,

    minimizeWindow,
    maximizeWindow,
    demaximizeWindow,

    dockWindowRight,
    dockWindowLeft,
  } = windowRegistry[winId]()

  useEffect(() => {
    setSelf(windowRef)

    if (isMobile()) maximizeWindow()
    else if (defaultDock === 'left') dockWindowLeft()
    else if (defaultDock === 'right') dockWindowRight()
    else if (defaultDock === 'full') maximizeWindow()
    else demaximizeWindow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelf, windowRef, resetFlag])

  useEffect(() => {
    if (isMobile()) return
    if (!isDragging) return

    if (winVisualState === 'maximized') demaximizeWindow()

    let adjustedX = x - dragClickOffset.pointX
    if (x > window.innerWidth || x < 0) adjustedX = winCoord.pointX

    let adjustedY = y - dragClickOffset.pointY
    if (y > window.innerHeight || y < 0) adjustedY = winCoord.pointY

    setWinCoord({ pointX: adjustedX, pointY: adjustedY })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, x, y])

  const responsiveBreakInPx = (breakPoint: ResponsiveSizes): number => {
    switch (breakPoint) {
      case 'sm':
        return 640
      case 'md':
        return 768
      case 'lg':
        return 1024
      case 'xl':
        return 1280
      case 'never':
        return 0
      case 'always':
        return Infinity
      default:
        return breakPoint
    }
  }

  const handleNavbarClick = (isDragging: boolean) => {
    setDragClickOffset({ pointX: x - winCoord.pointX, pointY: y - winCoord.pointY })
    setIsDragging(isDragging)
  }

  const isMobile = (): boolean => {
    return window.innerWidth < responsiveBreakInPx(responsiveBreak)
  }

  const handleResizeClick = (isResizing: ResizeState) => {
    setIsResizing(isResizing)
  }

  const maximizeControl =
    winVisualState === 'maximized' ? (
      <button
        className={`block hover:bg-gray-100 hover:bg-opacity-20 px-5 h-full`}
        onClick={demaximizeWindow}
      >
        {iconWinDemaximize(style?.navControlsColor)}
      </button>
    ) : (
      <button
        className={`block hover:bg-gray-100 hover:bg-opacity-20 px-5 h-full`}
        onClick={maximizeWindow}
      >
        {iconWinMaximize(style?.navControlsColor)}
      </button>
    )

  const minimizeControl = (
    <button className="hover:bg-red-500 hover:bg-opacity-20 px-5 h-full" onClick={minimizeWindow}>
      {iconWinMinimize(style?.navControlsColor)}
    </button>
  )

  return (
    <>
      {!isMobile() && <DockingControls winId={winId} />}
      <div
        id={windowId}
        ref={windowRef}
        className={`fixed bg-white shadow-lg border border-zinc-600 rounded-sm overflow-hidden`}
        onMouseDown={() => bringTargetWindowToFront(windowId)}
        onMouseUp={() => {
          handleNavbarClick(false)
          handleResizeClick(false)
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
          opacity: isWinMinimized ? 0 : 1,
          transform: isWinMinimized
            ? `translate(${window.innerWidth / 2 - winCoord.pointX - winWidth / 2}px,
              ${window.innerHeight - winCoord.pointY - winHeight / 2}px) scale(0.02)`
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
            onMouseDown={() => handleNavbarClick(true)}
            onDoubleClick={maximizeWindow}
            className="grow min-w-8 h-8 px-2 text-white flex items-center text-sm"
          ></div>

          {!isMobile() && maximizeControl}
          {minimizeControl}
        </nav>

        {!isMobile() && <ResizingControls winId={winId} windowRef={windowRef} />}

        {/* Offset the navbar => 'h-[calc(100%-32px)]' */}
        <div className={`relative w-full h-[calc(100%-32px)] overflow-auto`}>{children}</div>
      </div>{' '}
    </>
  )
}
