import { StoreApi, UseBoundStore } from 'zustand'
import { ResizeState, WindowStore } from '../window-types'
import { useScreenState } from '../../screen-manager/screen-state'
import { RefObject, useEffect } from 'react'

type Props = {
  useWindowStore: UseBoundStore<StoreApi<WindowStore>>
  windowRef: RefObject<HTMLDivElement | null>
}

export default function ResizingControls({ useWindowStore, windowRef }: Props) {
  const { x, y } = useScreenState()
  const {
    setWinVisualState,

    winCoord,
    setWinCoord,

    isResizing,
    setIsResizing,

    winWidth,
    setWinWidth,

    winHeight,
    setWinHeight,

    WIN_MIN_WIDTH,
    WIN_MIN_HEIGHT,
  } = useWindowStore()

  useEffect(() => {
    if (!isResizing) return

    setWinVisualState('demaximized')
    if (isResizing === 'bottom-height') resizeBottomWinHeight()
    if (isResizing === 'top-height') resizeTopWinHeight()

    if (isResizing === 'right-width') resizeRightWinWidth()
    if (isResizing === 'left-width') resizeLeftWinWidth()

    if (isResizing === 'bottom-right-all') resizeRightBottomWidthAndHeight()
    if (isResizing === 'bottom-left-all') resizeLeftBottomWidthAndHeight()

    if (isResizing === 'top-right-all') resizeRightTopWidthAndHeight()
    if (isResizing === 'top-left-all') resizeLeftTopWidthAndHeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResizing, x, y])

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

  /** @winXOverride we need to override windowX if another function that also sets windowX is called at the same time */
  const resizeTopWinHeight = (winXOverride?: number) => {
    const winBox = windowRef.current?.getBoundingClientRect()
    if (!winBox) return

    const minWinHeight = winBox.bottom - y < WIN_MIN_HEIGHT
    if (minWinHeight) return

    const cursorOutOfBounds = y > window.innerHeight || y < 0
    if (cursorOutOfBounds) return

    const sizeDiff = winBox.top - y
    setWinHeight(winHeight + sizeDiff)
    const winX = winXOverride ? winXOverride : winCoord.pointX
    setWinCoord({ pointX: winX, pointY: y })
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

  const resizeRightBottomWidthAndHeight = () => {
    resizeRightWinWidth()
    resizeBottomWinHeight()
  }

  const resizeLeftBottomWidthAndHeight = () => {
    resizeLeftWinWidth()
    resizeBottomWinHeight()
  }

  const resizeRightTopWidthAndHeight = () => {
    resizeRightWinWidth()
    resizeTopWinHeight()
  }

  const resizeLeftTopWidthAndHeight = () => {
    resizeLeftWinWidth()
    resizeTopWinHeight(x)
  }

  const handleResizeClick = (isResizing: ResizeState) => {
    setIsResizing(isResizing)
  }

  return (
    <>
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

      <span
        onMouseDown={() => handleResizeClick('top-right-all')}
        id="win-resize-all"
        className="fixed h-3 w-3 opacity-60 cursor-ne-resize z-20"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX + winWidth - 6}px`,
        }}
      ></span>
      <span
        onMouseDown={() => handleResizeClick('top-left-all')}
        id="win-resize-all"
        className="fixed h-3 w-3 opacity-60 cursor-nw-resize z-20"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX - 6}px`,
        }}
      ></span>
    </>
  )
}
