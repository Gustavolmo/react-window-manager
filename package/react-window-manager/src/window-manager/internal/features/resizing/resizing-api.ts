import { ResizeState, WindowStore } from '../../../model/window-types'
import { WorkspaceRect } from '../../../model/workspace-types'
import { windowRegistry } from '../../../registration/window-registry'
import { useCursorState } from '../cursor/cursor-state'
import { wsApi } from '../workspace/workspace-api'

type ResizeContext = {
  wsRect: WorkspaceRect
  win: WindowStore
  winBox: DOMRect | undefined
  x: number
  y: number
}

export const resizeApi = {
  stopAllDragAndResize: () => {
    for (const key of Object.keys(windowRegistry)) {
      windowRegistry[key].getState().isDragging = false
      windowRegistry[key].getState().resizeAction = false
    }
  },

  setResizeAction: (winId: string, action: ResizeState) => {
    windowRegistry[winId].setState({ resizeAction: action })
  },

  dispatchResizeAction: (winId: string) => {
    const ctx = getDependencies(winId)
    if (!ctx.win.resizeAction) return

    ctx.win.setWinVisualState('demaximized')

    switch (ctx.win.resizeAction) {
      case 's':
        privateApi.resizeBottomWinHeight(ctx)
        break

      case 'n':
        privateApi.resizeTopWinHeight(ctx)
        break

      case 'e':
        privateApi.resizeRightWinWidth(ctx)
        break

      case 'w':
        privateApi.resizeLeftWinWidth(ctx)
        break

      case 'se':
        privateApi.resizeRightBottomWidthAndHeight(ctx)
        break

      case 'sw':
        privateApi.resizeLeftBottomWidthAndHeight(ctx)
        break

      case 'ne':
        privateApi.resizeRightTopWidthAndHeight(ctx)
        break

      case 'nw':
        privateApi.resizeLeftTopWidthAndHeight(ctx)
        break
    }
  },
}

const privateApi = {
  resizeRightWinWidth: (resizeCtx: ResizeContext) => {
    const { wsRect, win, winBox, x, y } = resizeCtx

    if (!winBox) return

    const minWinWidth = x - winBox.left < win.WIN_MIN_WIDTH
    if (minWinWidth) return

    const cursorOutOfBounds = x > wsRect.right || x < wsRect.left
    if (cursorOutOfBounds) return

    const sizeDiff = x - winBox.right
    win.setWinWidth(win.winWidth + sizeDiff)
  },

  resizeLeftWinWidth: (resizeCtx: ResizeContext) => {
    const { wsRect, win, winBox, x, y } = resizeCtx
    if (!winBox) return

    const minWinWidth = winBox.right - x <= win.WIN_MIN_WIDTH
    if (minWinWidth) return

    const cursorOutOfBounds = x > wsRect.right || x < wsRect.left
    if (cursorOutOfBounds) return

    const sizeDiff = winBox.left - x
    win.setWinWidth(win.winWidth + sizeDiff)
    win.setWinCoord({ pointX: x, pointY: win.winCoord.pointY })
  },

  resizeTopWinHeight: (resizeCtx: ResizeContext) => {
    const { wsRect, win, winBox, x, y } = resizeCtx

    if (!winBox) return

    const minWinHeight = winBox.bottom - y <= win.WIN_MIN_HEIGHT
    if (minWinHeight) return

    const cursorOutOfBounds = y > wsRect.bottom || y < wsRect.top
    if (cursorOutOfBounds) return

    const sizeDiff = winBox.top - y
    win.setWinHeight(win.winHeight + sizeDiff)
    win.setWinCoord({ pointX: win.winCoord.pointX, pointY: y })
  },

  resizeBottomWinHeight: (resizeCtx: ResizeContext) => {
    const { wsRect, win, winBox, x, y } = resizeCtx
    if (!winBox) return

    const minWinHeight = y - winBox.top < win.WIN_MIN_HEIGHT
    if (minWinHeight) return

    const cursorOutOfBounds = y > wsRect.bottom || y < wsRect.top
    if (cursorOutOfBounds) return

    const sizeDiff = y - winBox.bottom
    win.setWinHeight(win.winHeight + sizeDiff)
  },

  resizeRightBottomWidthAndHeight: (resizeCtx: ResizeContext) => {
    privateApi.resizeRightWinWidth(resizeCtx)
    privateApi.resizeBottomWinHeight(resizeCtx)
  },

  resizeLeftBottomWidthAndHeight: (resizeCtx: ResizeContext) => {
    privateApi.resizeLeftWinWidth(resizeCtx)
    privateApi.resizeBottomWinHeight(resizeCtx)
  },

  resizeRightTopWidthAndHeight: (resizeCtx: ResizeContext) => {
    privateApi.resizeRightWinWidth(resizeCtx)
    privateApi.resizeTopWinHeight(resizeCtx)
  },

  /**
   * @note this specific case needs it's own logic instead of simply calling
   * resizeLeftWinWidth & resizeTopWinHeight. Since both manipulate
   * winWidth, winHeight and winCoord, one's logic will override the other
   */
  resizeLeftTopWidthAndHeight: (resizeCtx: ResizeContext) => {
    const { wsRect, win, winBox, x, y } = resizeCtx
    if (!winBox) return

    const cursorOutOfBoundsY = y > wsRect.bottom || y < wsRect.top
    const cursorOutOfBoundsX = x > wsRect.right || x < wsRect.left
    if (cursorOutOfBoundsY || cursorOutOfBoundsX) return

    const minWinHeight = winBox.bottom - y <= win.WIN_MIN_HEIGHT
    const minWinWidth = winBox.right - x <= win.WIN_MIN_WIDTH

    win.setWinCoord({
      pointX: minWinWidth ? win.winCoord.pointX : x,
      pointY: minWinHeight ? win.winCoord.pointY : y,
    })

    if (!minWinHeight) {
      const sizeDiffY = winBox.top - y
      win.setWinHeight(win.winHeight + sizeDiffY)
    }

    if (!minWinWidth) {
      const sizeDiffX = winBox.left - x
      win.setWinWidth(win.winWidth + sizeDiffX)
    }
  },
}

const getDependencies = (winId: string): ResizeContext => {
  const wsRect = wsApi.getRect()
  const win = windowRegistry[winId].getState()
  const winBox = win.self?.current?.getBoundingClientRect()
  const { x, y } = useCursorState.getState()

  return { wsRect, win, winBox, x, y }
}
