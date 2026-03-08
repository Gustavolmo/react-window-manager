import { ResizeState } from '../../../model/window-types'
import { useCursorState } from '../../states/cursor-state'
import { RefObject, useEffect } from 'react'
import { windowRegistry } from '../../../registration/window-store-factory'
import { getOpenedWindowCount } from '../../shared/bulk-actions'
import { useWorkspaceState } from '../../states/workspace-state'

type Props = {
  winId: string
  windowRef: RefObject<HTMLDivElement | null>
}

export default function ResizingControls({ winId, windowRef }: Props) {
  const ws = useWorkspaceState()
  const { x, y } = useCursorState()
  const {
    windowId,

    setWinVisualState,

    winCoord,
    setWinCoord,

    resizeAction,
    setResizeAction,

    winWidth,
    setWinWidth,

    winHeight,
    setWinHeight,

    WIN_MIN_WIDTH,
    WIN_MIN_HEIGHT,
  } = windowRegistry[winId]()

  useEffect(() => {
    if (!resizeAction) return

    setWinVisualState('demaximized')
    if (resizeAction === 'bottom-height') resizeBottomWinHeight()
    if (resizeAction === 'top-height') resizeTopWinHeight()

    if (resizeAction === 'right-width') resizeRightWinWidth()
    if (resizeAction === 'left-width') resizeLeftWinWidth()

    if (resizeAction === 'bottom-right-all') resizeRightBottomWidthAndHeight()
    if (resizeAction === 'bottom-left-all') resizeLeftBottomWidthAndHeight()

    if (resizeAction === 'top-right-all') resizeRightTopWidthAndHeight()
    if (resizeAction === 'top-left-all') resizeLeftTopWidthAndHeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeAction, x, y])

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

    const minWinWidth = winBox.right - x <= WIN_MIN_WIDTH
    if (minWinWidth) return

    const cursorOutOfBounds = x > window.innerWidth || x < 0
    if (cursorOutOfBounds) return

    const sizeDiff = winBox.left - x
    setWinWidth(winWidth + sizeDiff)
    setWinCoord({ pointX: x, pointY: winCoord.pointY })
  }

  const resizeTopWinHeight = () => {
    const winBox = windowRef.current?.getBoundingClientRect()
    if (!winBox) return

    const minWinHeight = winBox.bottom - y <= WIN_MIN_HEIGHT
    if (minWinHeight) return

    const cursorOutOfBounds = y > window.innerHeight || y < 0
    if (cursorOutOfBounds) return

    const sizeDiff = winBox.top - y
    setWinHeight(winHeight + sizeDiff)
    setWinCoord({ pointX: winCoord.pointX, pointY: y })
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

  /**
   * @note this specific case needs it's own logic instead of simply calling
   * resizeLeftWinWidth & resizeTopWinHeight. Since both manipulate
   * winWidth, winHeight and winCoord, one's logic will override the other
   */
  const resizeLeftTopWidthAndHeight = () => {
    const winBox = windowRef.current?.getBoundingClientRect()
    if (!winBox) return

    const cursorOutOfBoundsY = y > window.innerHeight || y < 0
    const cursorOutOfBoundsX = x > window.innerWidth || x < 0
    if (cursorOutOfBoundsY || cursorOutOfBoundsX) return

    const minWinHeight = winBox.bottom - y <= WIN_MIN_HEIGHT
    const minWinWidth = winBox.right - x <= WIN_MIN_WIDTH

    setWinCoord({
      pointX: minWinWidth ? winCoord.pointX : x,
      pointY: minWinHeight ? winCoord.pointY : y,
    })

    if (!minWinHeight) {
      const sizeDiffY = winBox.top - y
      setWinHeight(winHeight + sizeDiffY)
    }

    if (!minWinWidth) {
      const sizeDiffX = winBox.left - x
      setWinWidth(winWidth + sizeDiffX)
    }
  }

  const handleResizeClick = (isResizing: ResizeState) => {
    setResizeAction(isResizing)
    setRemoteIsResizing(isResizing)
  }

  /**
   * @FixMe
   * this function is a nice feature, but very complex, needs to be written in a clearer way.
   * Multi-window tiling can be brittle - isRemoteOutside needs refinement
   * */
  const setRemoteIsResizing = (currentResize: ResizeState) => {
    const tolerance = 4
    const allowDistantResize = getOpenedWindowCount() >= 3

    for (const key of Object.keys(windowRegistry)) {
      const remoteWin = windowRegistry[key].getState()
      const thisWin = windowRegistry[windowId].getState()

      if (remoteWin.windowId === thisWin.windowId) {
        continue
      }

      const thisWinStartY = thisWin.winCoord.pointY
      const thisWinEndY = thisWin.winCoord.pointY + thisWin.winHeight
      const remoteWinStartY = remoteWin.winCoord.pointY
      const remoteWinEndY = remoteWin.winCoord.pointY + remoteWin.winHeight

      const thisWinStartX = thisWin.winCoord.pointX
      const thisWinEndX = thisWin.winCoord.pointX + thisWin.winWidth
      const remoteWinStartX = remoteWin.winCoord.pointX
      const remoteWinEndX = remoteWin.winCoord.pointX + remoteWin.winWidth

      const isRemoteOutside =
        remoteWinEndY !== thisWinEndY ||
        remoteWinEndX !== thisWinEndX ||
        remoteWinStartY !== thisWinStartY ||
        remoteWinStartX !== thisWinStartX
      /*
       * thisWin right edge <::::> remoteWin left edge || remoteWin is stacked */
      if (currentResize === 'right-width') {
        const isEdgeAlignedOnXAxis = Math.abs(thisWinEndX - remoteWinStartX) <= tolerance
        const isOverlapOnYAxis = thisWinStartY <= remoteWinEndY && thisWinEndY >= remoteWinStartY

        const isEdgeResize = allowDistantResize
          ? isEdgeAlignedOnXAxis
          : isEdgeAlignedOnXAxis && isOverlapOnYAxis
        if (isEdgeResize) {
          remoteWin.setResizeAction('left-width')
        }

        const isRemoteOnSameLane =
          Math.abs(thisWinEndX - remoteWinEndX) < tolerance &&
          Math.abs(thisWinStartX - remoteWinStartX) < tolerance
        const isRemoteEdgeConnected =
          Math.abs(thisWinEndY - remoteWinStartY) < tolerance ||
          Math.abs(thisWinStartY - remoteWinEndY) < tolerance

        const isStackResize = allowDistantResize
          ? isRemoteOnSameLane && isRemoteOutside
          : isRemoteOnSameLane && isRemoteEdgeConnected
        if (isStackResize) {
          remoteWin.setResizeAction('right-width')
        }
      }

      /*
       * thisWin left edge <::::> remoteWin right edge || remoteWin is stacked */
      if (currentResize === 'left-width') {
        const isEdgeAlignedOnXAxis = Math.abs(thisWinStartX - remoteWinEndX) <= tolerance
        const isOverlapOnYAxis = thisWinStartY <= remoteWinEndY && thisWinEndY >= remoteWinStartY

        const isEdgeResize = allowDistantResize
          ? isEdgeAlignedOnXAxis
          : isEdgeAlignedOnXAxis && isOverlapOnYAxis
        if (isEdgeResize) {
          remoteWin.setResizeAction('right-width')
        }

        const isRemoteOnSameLane =
          Math.abs(thisWinEndX - remoteWinEndX) < tolerance &&
          Math.abs(thisWinStartX - remoteWinStartX) < tolerance
        const isRemoteEdgeConnected =
          Math.abs(thisWinEndY - remoteWinStartY) < tolerance ||
          Math.abs(thisWinStartY - remoteWinEndY) < tolerance

        const isStackResize = allowDistantResize
          ? isRemoteOnSameLane && isRemoteOutside
          : isRemoteOnSameLane && isRemoteEdgeConnected
        if (isStackResize) {
          remoteWin.setResizeAction('left-width')
        }
      }

      /*
       * thisWin top edge <::::> remoteWin bottom edge || remoteWin is stacked */
      if (currentResize === 'top-height') {
        const isEdgeAlignedOnYAxis = Math.abs(thisWinStartY - remoteWinEndY) <= tolerance
        const isOverlapOnXAxis = thisWinStartX <= remoteWinEndX && thisWinEndX >= remoteWinStartX

        const isEdgeResize = allowDistantResize
          ? isEdgeAlignedOnYAxis
          : isEdgeAlignedOnYAxis && isOverlapOnXAxis
        if (isEdgeResize) {
          remoteWin.setResizeAction('bottom-height')
        }

        const isRemoteOnSameLane =
          Math.abs(thisWinEndY - remoteWinEndY) < tolerance &&
          Math.abs(thisWinStartY - remoteWinStartY) < tolerance
        const isRemoteEdgeConnected =
          Math.abs(thisWinEndX - remoteWinStartX) < tolerance ||
          Math.abs(thisWinStartX - remoteWinEndX) < tolerance

        const isStackResize = allowDistantResize
          ? isRemoteOnSameLane && isRemoteOutside
          : isRemoteOnSameLane && isRemoteEdgeConnected
        if (isStackResize) {
          remoteWin.setResizeAction('top-height')
        }
      }

      /*
       * thisWin bottom edge <::::> remoteWin top edge || remoteWin is stacked */
      if (currentResize === 'bottom-height') {
        const isEdgeAlignedOnYAxis = Math.abs(thisWinEndY - remoteWinStartY) <= tolerance
        const isOverlapOnXAxis = thisWinStartX <= remoteWinEndX && thisWinEndX >= remoteWinStartX

        const isEdgeResize = allowDistantResize
          ? isEdgeAlignedOnYAxis
          : isEdgeAlignedOnYAxis && isOverlapOnXAxis
        if (isEdgeResize) {
          remoteWin.setResizeAction('top-height')
        }

        const isRemoteOnSameLane =
          Math.abs(thisWinEndY - remoteWinEndY) < tolerance &&
          Math.abs(thisWinStartY - remoteWinStartY) < tolerance
        const isRemoteEdgeConnected =
          Math.abs(thisWinEndX - remoteWinStartX) < tolerance ||
          Math.abs(thisWinStartX - remoteWinEndX) < tolerance

        const isStackResize = allowDistantResize
          ? isRemoteOnSameLane && isRemoteOutside
          : isRemoteOnSameLane && isRemoteEdgeConnected
        if (isStackResize) {
          remoteWin.setResizeAction('bottom-height')
        }
      }
    }
  }

  return (
    <>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('right-width')}
        id="win-resize-right-width"
        className="fixed w-2 opacity-60 cursor-w-resize z-10"
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX + winWidth - 4}px`,
          height: `${winHeight}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('left-width')}
        id="win-resize-left-width"
        className="fixed w-2 opacity-60 cursor-w-resize z-10"
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX - 4}px`,
          height: `${winHeight}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('bottom-height')}
        id="win-resize-bottom-height"
        className="fixed h-2 opacity-60 cursor-s-resize z-10"
        style={{
          top: `${winCoord.pointY + winHeight - 6}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('top-height')}
        id="win-resize-top-height"
        className="fixed h-2 opacity-60 cursor-s-resize z-10"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('bottom-right-all')}
        id="win-resize-bottom-right-all"
        className="fixed h-3 w-3 opacity-60 cursor-se-resize z-20"
        style={{
          top: `${winCoord.pointY + winHeight - 8}px`,
          left: `${winCoord.pointX + winWidth - 8}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('bottom-left-all')}
        id="win-resize-bottom-left-all"
        className="fixed h-3 w-3 opacity-60 cursor-sw-resize z-20"
        style={{
          top: `${winCoord.pointY + winHeight - 8}px`,
          left: `${winCoord.pointX - 8}px`,
        }}
      ></span>

      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('top-right-all')}
        id="win-resize-top-right-all"
        className="fixed h-3 w-3 opacity-60 cursor-ne-resize z-20"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX + winWidth - 6}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('top-left-all')}
        id="win-resize-top-left-all"
        className="fixed h-3 w-3 opacity-60 cursor-nw-resize z-20"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX - 6}px`,
        }}
      ></span>
    </>
  )
}
