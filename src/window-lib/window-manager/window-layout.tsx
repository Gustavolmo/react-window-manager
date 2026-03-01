import { useScreenState } from '../screen-manager/screen-state'
import { useEffect, useRef } from 'react'
import { StoreApi, UseBoundStore } from 'zustand'
import { WindowStore, ResizeState } from './window-types'
import { iconWinMinimize, iconWinDemaximize, iconWinMaximize } from '../window-assets/svg-win-icons'
import { bringTargetWindowToFront } from './window-global-actions'

type StoreProp = {
  children: React.ReactNode
  windowName: string | React.ReactNode
  navbarChildren?: React.ReactNode
  defaultDock?: 'right' | 'left' | 'full'
  useWindowStore: UseBoundStore<StoreApi<WindowStore>>
}

export default function WindowLayout({
  children,
  windowName,
  navbarChildren,
  useWindowStore,
  defaultDock,
}: StoreProp) {
  const { x, y } = useScreenState()
  const windowRef = useRef<HTMLDivElement>(null)
  const {
    windowId,
    zIndex,
    isActive,
    setSelf,

    resetFlag,

    winVisualState,
    setWinVisualState,

    isWinMinimized,

    dragClickOffset,
    setDragClickOffset,

    isDragging,
    setIsDragging,

    winCoord,
    setWinCoord,

    isResizing,
    setIsResizing,

    winWidth,
    setWinWidth,

    winHeight,
    setWinHeight,

    minimizeWindow,
    maximizeWindow,
    demaximizeWindow,

    dockWindowRight,
    dockWindowLeft,

    dockWindowTopLeft,
    dockWindowBottomLeft,
    dockWindowTopRight,
    dockWindowBottomRight,

    WIN_MIN_WIDTH,
    WIN_MIN_HEIGHT,
  } = useWindowStore()

  useEffect(() => {
    setSelf(windowRef)
    if (defaultDock === 'left') dockWindowLeft()
    else if (defaultDock === 'right') dockWindowRight()
    else if (defaultDock === 'full') maximizeWindow()
    else demaximizeWindow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelf, windowRef, resetFlag])

  useEffect(() => {
    if (!isDragging) return

    if (winVisualState === 'maximized') demaximizeWindow()

    let adjustedX = x - dragClickOffset.pointX
    if (x > window.innerWidth || x < 0) adjustedX = winCoord.pointX

    let adjustedY = y - dragClickOffset.pointY
    if (y > window.innerHeight || y < 0) adjustedY = winCoord.pointY

    setWinCoord({ pointX: adjustedX, pointY: adjustedY })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, x, y])

  useEffect(() => {
    if (!isResizing) return

    setWinVisualState('demaximized')
    if (isResizing === 'bottom-height') resizeBottomWinHeight()
    if (isResizing === 'top-height') resizeTopWinHeight()

    if (isResizing === 'right-width') resizeRightWinWidth()
    if (isResizing === 'left-width') resizeLeftWinWidth()

    if (isResizing === 'bottom-right-all') resizeRightBottomWidthAndHeight()
    if (isResizing === 'bottom-left-all') resizeLeftBottomWidthAndHeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResizing, x, y])

  const handleNavbarClick = (isDragging: boolean) => {
    setDragClickOffset({ pointX: x - winCoord.pointX, pointY: y - winCoord.pointY })
    setIsDragging(isDragging)
  }

  const resizeRightWinWidth = () => {
    const winBox = windowRef.current?.getBoundingClientRect()
    if (!winBox) return

    const minWinWidth = x - winBox.left < WIN_MIN_WIDTH
    if (minWinWidth) return

    const cursorOutOfBounds = x > window.innerWidth || x < 0
    if (cursorOutOfBounds) return

    const sizeDiff = x - winBox.right
    setWinWidth(winWidth + sizeDiff)
  }

  const resizeLeftWinWidth = () => {
    const winBox = windowRef.current?.getBoundingClientRect()
    if (!winBox) return

    const minWinWidth = winBox.right - x < WIN_MIN_WIDTH
    if (minWinWidth) return

    const cursorOutOfBounds = x > window.innerWidth || x < 0
    if (cursorOutOfBounds) return

    const sizeDiff = winBox.left - x
    setWinWidth(winWidth + sizeDiff)
    setWinCoord({ pointX: x, pointY: winCoord.pointY })
  }

  const resizeBottomWinHeight = () => {
    const winBox = windowRef.current?.getBoundingClientRect()
    if (!winBox) return

    const minWinHeight = y - winBox.top < WIN_MIN_HEIGHT
    if (minWinHeight) return

    const cursorOutOfBounds = y > window.innerHeight || y < 0
    if (cursorOutOfBounds) return

    const sizeDiff = y - winBox.bottom
    setWinHeight(winHeight + sizeDiff)
  }

  const resizeTopWinHeight = () => {
    const winBox = windowRef.current?.getBoundingClientRect()
    if (!winBox) return

    const minWinHeight = winBox.bottom - y < WIN_MIN_HEIGHT
    if (minWinHeight) return

    const cursorOutOfBounds = y > window.innerHeight || y < 0
    if (cursorOutOfBounds) return

    const sizeDiff = winBox.top - y
    setWinHeight(winHeight + sizeDiff)
    setWinCoord({ pointX: winCoord.pointX, pointY: y })
  }

  const resizeRightBottomWidthAndHeight = () => {
    resizeRightWinWidth()
    resizeBottomWinHeight()
  }

  const resizeLeftBottomWidthAndHeight = () => {
    resizeLeftWinWidth()
    resizeBottomWinHeight()
  }

  const handleResizeClick = (isResizing: ResizeState) => {
    setIsResizing(isResizing)
  }

  return (
    <div
      onMouseDown={() => bringTargetWindowToFront(windowId)}
      id={windowId}
      ref={windowRef}
      style={{
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
      onMouseUp={() => {
        handleNavbarClick(false)
        handleResizeClick(false)
      }}
      className={`fixed bg-white shadow-lg border border-zinc-600`}
    >
      <nav
        className={`h-[32px] w-full bg-neutral-800 flex items-center
        ${isActive ? 'brightness-100 opacity-100' : 'brightness-75 opacity-90'}`}
      >
        <div
          onMouseDown={() => handleNavbarClick(true)}
          onDoubleClick={maximizeWindow}
          className="w-full h-8 px-2 text-white flex items-center text-sm truncate"
        >
          {windowName}
          {navbarChildren}
        </div>

        <div className="hidden lg:flex px-2 shrink-0 gap-1">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center gap-1">
            <button
              className="hover:bg-gray-100 hover:bg-opacity-20  border w-4 h-[10px] rounded-sm"
              onClick={dockWindowTopLeft}
            ></button>
            <button
              className="hover:bg-gray-100 hover:bg-opacity-20  border w-4 h-[10px] rounded-sm"
              onClick={dockWindowBottomLeft}
            ></button>
          </div>
          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center gap-1">
            <button
              className="hover:bg-gray-100 hover:bg-opacity-20  border w-4 h-[10px] rounded-sm"
              onClick={dockWindowTopRight}
            ></button>
            <button
              className="hover:bg-gray-100 hover:bg-opacity-20  border w-4 h-[10px] rounded-sm"
              onClick={dockWindowBottomRight}
            ></button>
          </div>
        </div>

        <div className="hidden lg:flex px-2 shrink-0 items-center gap-1">
          <button
            className="hover:bg-gray-100 hover:bg-opacity-20 px-[1px] border w-4 h-6 rounded-sm"
            onClick={dockWindowLeft}
          ></button>
          <button
            className="hover:bg-gray-100 hover:bg-opacity-20 px-[1px] border w-4 h-6 rounded-sm"
            onClick={dockWindowRight}
          ></button>
        </div>

        {winVisualState === 'maximized' ? (
          <button
            className="hidden lg:block hover:bg-gray-100 hover:bg-opacity-20 px-5 h-full"
            onClick={demaximizeWindow}
          >
            {iconWinDemaximize()}
          </button>
        ) : (
          <button
            className="hidden lg:block hover:bg-gray-100 hover:bg-opacity-20 px-5 h-full"
            onClick={maximizeWindow}
          >
            {iconWinMaximize()}
          </button>
        )}

        <button
          className="hover:bg-red-500 hover:bg-opacity-20 px-5 h-full"
          onClick={minimizeWindow}
        >
          {iconWinMinimize()}
        </button>
      </nav>

      {/* FIX ME: Add resize on top right and left? */}
      <span
        onMouseDown={() => handleResizeClick('right-width')}
        id="win-resize-width"
        className="fixed w-2 opacity-60 cursor-w-resize z-10"
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX + winWidth - 4}px`,
          height: `${winHeight}px`,
        }}
      ></span>
      <span
        onMouseDown={() => handleResizeClick('left-width')}
        id="win-resize-width"
        className="fixed w-2 opacity-60 cursor-w-resize z-10"
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX - 4}px`,
          height: `${winHeight}px`,
        }}
      ></span>
      <span
        onMouseDown={() => handleResizeClick('bottom-height')}
        id="win-resize-height"
        className="fixed h-2 opacity-60 cursor-s-resize z-10"
        style={{
          top: `${winCoord.pointY + winHeight - 6}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
        }}
      ></span>
      <span
        onMouseDown={() => handleResizeClick('top-height')}
        id="win-resize-height"
        className="fixed h-2 opacity-60 cursor-s-resize z-10"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
        }}
      ></span>
      <span
        onMouseDown={() => handleResizeClick('bottom-right-all')}
        id="win-resize-all"
        className="fixed h-3 w-3 opacity-60 cursor-se-resize z-20"
        style={{
          top: `${winCoord.pointY + winHeight - 8}px`,
          left: `${winCoord.pointX + winWidth - 8}px`,
        }}
      ></span>
      <span
        onMouseDown={() => handleResizeClick('bottom-left-all')}
        id="win-resize-all"
        className="fixed h-3 w-3 opacity-60 cursor-sw-resize z-20"
        style={{
          top: `${winCoord.pointY + winHeight - 8}px`,
          left: `${winCoord.pointX - 8}px`,
        }}
      ></span>

      {/* Offset the navbar => 'h-[calc(100%-32px)]' */}
      <div className={`w-full h-[calc(100%-32px)] overflow-auto`}>{children}</div>
    </div>
  )
}
