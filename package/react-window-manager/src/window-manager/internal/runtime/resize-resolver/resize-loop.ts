import { WindowStore } from '../../../model/window-types'
import { WorkspaceRect } from '../../../model/workspace-types'
import { windowRegistry } from '../../../registration/window-registry'
import { cursorPosition } from '../../features/cursor/cursor-state'
import { useWorkspaceState } from '../../features/workspace/workspace-state'
import { WindowMutation } from '../rwm-runtime'
import { resolveNeighbourResizeLimit } from './resize-loop-rules'

export type RafResizeCommands = 'LOOP_RESIZE'
type RafResizeResolver = Record<
  RafResizeCommands,
  (targetWinId: string, commitCb: (patchStack: WindowMutation[]) => void) => void
>
export const rafResizeLoopResolver: RafResizeResolver = {
  LOOP_RESIZE: (targetWinId: string, commitCb: (patchStack: WindowMutation[]) => void) => {
    const dep = getRafResizeDependencies(targetWinId)

    const resizeDirection = dep.win.resizeAction
    if (!resizeDirection)
      throw new Error(`LOOP_RESIZE called with resizeAction as false for winId: ${targetWinId}`)

    const winElementBox = dep.winBox
    if (!winElementBox)
      throw new Error(`LOOP_RESIZE called with null window element for winId: ${targetWinId}`)

    requestAnimationFrame(() => {
      const neighbourLimit = resolveNeighbourResizeLimit(dep.win.windowId, resizeDirection)
      resizer[resizeDirection](getRafResizeDependencies(targetWinId), commitCb, neighbourLimit)
    })
  },
}

const resizer = {
  e: (
    resizeDep: ResizeDep,
    commit: (patchStack: WindowMutation[]) => void,
    neighbourLimit?: number
  ) => {
    const { wsRect, win, winBox, x } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBounds = x > wsRect.right || x < wsRect.left
    const sizeDiff = x - winBox.right

    const isResizeActive = !cursorOutOfBounds && sizeDiff !== 0
    const minWinWidth = x - winBox.left < win.WIN_MIN_WIDTH

    const leftMostXAtMinWidth = neighbourLimit
    const isNeighbourLimit = leftMostXAtMinWidth && x > leftMostXAtMinWidth
    if (isNeighbourLimit && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: { winWidth: leftMostXAtMinWidth - win.winCoord.pointX },
        },
      ])
    } else if (!minWinWidth && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: { winWidth: win.winWidth + sizeDiff },
        },
      ])
    } else if (minWinWidth && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: { winWidth: win.WIN_MIN_WIDTH },
        },
      ])
    }

    requestAnimationFrame(() =>
      resizer.e(getRafResizeDependencies(win.windowId), commit, neighbourLimit)
    )
  },

  w: (
    resizeDep: ResizeDep,
    commit: (patchStack: WindowMutation[]) => void,
    neighbourLimit?: number
  ) => {
    const { wsRect, win, winBox, x } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBounds = x > wsRect.right || x < wsRect.left
    const sizeDiff = winBox.left - x

    const isResizeActive = !cursorOutOfBounds && sizeDiff !== 0
    const minWinWidth = winBox.right - x <= win.WIN_MIN_WIDTH

    const rightMostXAtMinWidth = neighbourLimit
    const isNeighbourLimit = rightMostXAtMinWidth && x < rightMostXAtMinWidth
    if (isNeighbourLimit) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winWidth: win.winCoord.pointX - rightMostXAtMinWidth + win.winWidth,
            winCoord: {
              pointX: rightMostXAtMinWidth,
              pointY: win.winCoord.pointY,
            },
          },
        },
      ])
    } else if (!minWinWidth && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winWidth: win.winWidth + sizeDiff,
            winCoord: { pointX: x, pointY: win.winCoord.pointY },
          },
        },
      ])
    } else if (minWinWidth && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winCoord: {
              pointX: win.winCoord.pointX + win.winWidth - win.WIN_MIN_WIDTH,
              pointY: win.winCoord.pointY,
            },
            winWidth: win.WIN_MIN_WIDTH,
          },
        },
      ])
    }

    requestAnimationFrame(() =>
      resizer.w(getRafResizeDependencies(win.windowId), commit, neighbourLimit)
    )
  },

  n: (
    resizeDep: ResizeDep,
    commit: (patchStack: WindowMutation[]) => void,
    neighbourLimit?: number
  ) => {
    const { wsRect, win, winBox, y } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBounds = y > wsRect.bottom || y < wsRect.top
    const sizeDiff = winBox.top - y

    const isResizeActive = !cursorOutOfBounds && sizeDiff !== 0
    const minWinHeight = winBox.bottom - y <= win.WIN_MIN_HEIGHT

    const bottomMostYAtMinWidth = neighbourLimit
    const isNeighbourLimit = bottomMostYAtMinWidth && y < bottomMostYAtMinWidth
    if (isNeighbourLimit && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winHeight: win.winCoord.pointY - bottomMostYAtMinWidth + win.winHeight,
            winCoord: {
              pointX: win.winCoord.pointX,
              pointY: bottomMostYAtMinWidth,
            },
          },
        },
      ])
    } else if (!minWinHeight && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winHeight: win.winHeight + sizeDiff,
            winCoord: { pointX: win.winCoord.pointX, pointY: y },
          },
        },
      ])
    } else if (minWinHeight && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winHeight: win.WIN_MIN_HEIGHT,
            winCoord: {
              pointX: win.winCoord.pointX,
              pointY: win.winCoord.pointY + win.winHeight - win.WIN_MIN_HEIGHT,
            },
          },
        },
      ])
    }

    requestAnimationFrame(() =>
      resizer.n(getRafResizeDependencies(win.windowId), commit, neighbourLimit)
    )
  },

  s: (
    resizeDep: ResizeDep,
    commit: (patchStack: WindowMutation[]) => void,
    neighbourLimit?: number
  ) => {
    const { wsRect, win, winBox, y } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBounds = y > wsRect.bottom || y < wsRect.top
    const sizeDiff = y - winBox.bottom

    const isResizeActive = !cursorOutOfBounds && sizeDiff !== 0
    const minWinHeight = y - winBox.top < win.WIN_MIN_HEIGHT

    const topMostYAtMinWidth = neighbourLimit
    const isNeighbourLimit = topMostYAtMinWidth && y > topMostYAtMinWidth
    if (isNeighbourLimit && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winHeight: topMostYAtMinWidth - win.winCoord.pointY,
          },
        },
      ])
    } else if (!minWinHeight && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winHeight: win.winHeight + sizeDiff,
          },
        },
      ])
    } else if (minWinHeight && isResizeActive) {
      commit([
        {
          winId: win.windowId,
          patch: { winHeight: win.WIN_MIN_HEIGHT },
        },
      ])
    }

    requestAnimationFrame(() =>
      resizer.s(getRafResizeDependencies(win.windowId), commit, neighbourLimit)
    )
  },

  nw: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x, y } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBoundsY = y > wsRect.bottom || y < wsRect.top
    const cursorOutOfBoundsX = x > wsRect.right || x < wsRect.left
    const isCursorOutOfBounds = cursorOutOfBoundsY || cursorOutOfBoundsX
    if (isCursorOutOfBounds) {
      return
    }

    const minWinHeight = winBox.bottom - y <= win.WIN_MIN_HEIGHT
    const minWinWidth = winBox.right - x <= win.WIN_MIN_WIDTH

    const sizeDiffY = winBox.top - y
    const sizeDiffX = winBox.left - x

    if (sizeDiffY !== 0 || sizeDiffX !== 0) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winWidth: minWinWidth ? win.WIN_MIN_WIDTH : win.winWidth + sizeDiffX,
            winHeight: minWinHeight ? win.WIN_MIN_HEIGHT : win.winHeight + sizeDiffY,
            winCoord: {
              pointX: minWinWidth ? win.winCoord.pointX + win.winWidth - win.WIN_MIN_WIDTH : x,
              pointY: minWinHeight ? win.winCoord.pointY + win.winHeight - win.WIN_MIN_HEIGHT : y,
            },
          },
        },
      ])
    }

    requestAnimationFrame(() => resizer.nw(getRafResizeDependencies(win.windowId), commit))
  },

  se: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    resizer.e(resizeDep, commit)
    resizer.s(resizeDep, commit)
  },

  sw: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    resizer.w(resizeDep, commit)
    resizer.s(resizeDep, commit)
  },

  ne: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    resizer.e(resizeDep, commit)
    resizer.n(resizeDep, commit)
  },
}

type ResizeDep = {
  wsRect: WorkspaceRect
  win: WindowStore
  winBox: DOMRect | undefined
  x: number
  y: number
}

const getRafResizeDependencies = (winId: string): ResizeDep => {
  const win = windowRegistry[winId].getState()
  const winBox = win.winElement?.getBoundingClientRect()
  const wsRect = useWorkspaceState.getState().wsRect
  const { x, y } = cursorPosition
  return { wsRect, win, winBox, x, y }
}
