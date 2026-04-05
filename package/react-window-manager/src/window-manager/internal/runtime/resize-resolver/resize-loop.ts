import { WindowStore } from '../../../model/window-types'
import { WorkspaceRect } from '../../../model/workspace-types'
import { windowRegistry } from '../../../registration/window-registry'
import { cursorPosition } from '../../features/cursor/cursor-state'
import { useWorkspaceState } from '../../features/workspace/workspace-state'
import { WindowMutation } from '../rwm-runtime'

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

    requestAnimationFrame(() =>
      resizer[resizeDirection](getRafResizeDependencies(targetWinId), commitCb)
    )
  },
}

const resizer = {
  e: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBounds = x > wsRect.right || x < wsRect.left
    const sizeDiff = x - winBox.right

    const isResizeActive = !cursorOutOfBounds && sizeDiff !== 0
    const minWinWidth = x - winBox.left < win.WIN_MIN_WIDTH

    const leftMostXAtMinWidth = eastNeightbourLeftAtMinWidth(win.windowId)
    if (leftMostXAtMinWidth && isResizeActive) {
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
          patch: { winWidth: Math.round(win.winWidth + sizeDiff) },
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

    requestAnimationFrame(() => resizer.e(getRafResizeDependencies(win.windowId), commit))
  },

  w: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBounds = x > wsRect.right || x < wsRect.left
    const sizeDiff = winBox.left - x

    const isResizeActive = !cursorOutOfBounds && sizeDiff !== 0
    const minWinWidth = winBox.right - x <= win.WIN_MIN_WIDTH

    const rightMostXAtMinWidth = westNeightbourRightAtMinWidth(win.windowId)
    if (rightMostXAtMinWidth) {
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
            winWidth: Math.round(win.winWidth + sizeDiff),
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

    requestAnimationFrame(() => resizer.w(getRafResizeDependencies(win.windowId), commit))
  },

  n: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, y } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBounds = y > wsRect.bottom || y < wsRect.top
    const sizeDiff = winBox.top - y

    const isResizeActive = !cursorOutOfBounds && sizeDiff !== 0
    const minWinHeight = winBox.bottom - y <= win.WIN_MIN_HEIGHT

    const bottomMostYAtMinWidth = northNeightbourBottomAtMinWidth(win.windowId)
    if (bottomMostYAtMinWidth && isResizeActive) {
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
            winHeight: Math.round(win.winHeight + sizeDiff),
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

    requestAnimationFrame(() => resizer.n(getRafResizeDependencies(win.windowId), commit))
  },

  s: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, y } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBounds = y > wsRect.bottom || y < wsRect.top
    const sizeDiff = y - winBox.bottom

    const isResizeActive = !cursorOutOfBounds && sizeDiff !== 0
    const minWinHeight = y - winBox.top < win.WIN_MIN_HEIGHT

    const topMostYAtMinWidth = southNeightbourTopAtMinWidth(win.windowId)
    if (topMostYAtMinWidth && isResizeActive) {
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
            winHeight: Math.round(win.winHeight + sizeDiff),
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

    requestAnimationFrame(() => resizer.s(getRafResizeDependencies(win.windowId), commit))
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
            winWidth: minWinWidth ? win.WIN_MIN_WIDTH : Math.round(win.winWidth + sizeDiffX),
            winHeight: minWinHeight ? win.WIN_MIN_HEIGHT : Math.round(win.winHeight + sizeDiffY),
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

const eastNeightbourLeftAtMinWidth = (currentWinId: string) => {
  let leftMostXAtMinWidth = undefined

  for (const key of Object.keys(windowRegistry)) {
    const remoteWin = windowRegistry[key].getState()
    if (key === currentWinId) continue
    if (remoteWin.resizeAction !== 'w') continue
    if (remoteWin.isWindowClosed) continue

    const { x } = cursorPosition
    const winBox = remoteWin.winElement?.getBoundingClientRect()
    if (!winBox) continue

    const minWinWidth = winBox.right - x <= remoteWin.WIN_MIN_WIDTH

    if (minWinWidth) {
      if (leftMostXAtMinWidth === undefined) leftMostXAtMinWidth = winBox.left
      if (leftMostXAtMinWidth > winBox.left) leftMostXAtMinWidth = winBox.left
    }
  }

  return leftMostXAtMinWidth
}

const westNeightbourRightAtMinWidth = (currentWinId: string) => {
  let rightMostXAtMinWidth = undefined

  for (const key of Object.keys(windowRegistry)) {
    const remoteWin = windowRegistry[key].getState()
    if (key === currentWinId) continue
    if (remoteWin.resizeAction !== 'e') continue
    if (remoteWin.isWindowClosed) continue

    const { x } = cursorPosition
    const winBox = remoteWin.winElement?.getBoundingClientRect()
    if (!winBox) continue

    const minWinWidth = x - winBox.left < remoteWin.WIN_MIN_WIDTH

    if (minWinWidth) {
      if (rightMostXAtMinWidth === undefined) rightMostXAtMinWidth = winBox.right
      if (rightMostXAtMinWidth < winBox.right) rightMostXAtMinWidth = winBox.right
    }
  }

  return rightMostXAtMinWidth
}

const northNeightbourBottomAtMinWidth = (currentWinId: string) => {
  let bottomMostYAtMinWidth = undefined

  for (const key of Object.keys(windowRegistry)) {
    const remoteWin = windowRegistry[key].getState()
    if (key === currentWinId) continue
    if (remoteWin.resizeAction !== 's') continue
    if (remoteWin.isWindowClosed) continue

    const { y } = cursorPosition
    const winBox = remoteWin.winElement?.getBoundingClientRect()
    if (!winBox) continue

    const minWinHeight = y - winBox.top < remoteWin.WIN_MIN_HEIGHT

    if (minWinHeight) {
      if (bottomMostYAtMinWidth === undefined) bottomMostYAtMinWidth = winBox.bottom
      if (bottomMostYAtMinWidth < winBox.bottom) bottomMostYAtMinWidth = winBox.bottom
    }
  }

  return bottomMostYAtMinWidth
}

const southNeightbourTopAtMinWidth = (currentWinId: string) => {
  let topMostYAtMinWidth = undefined

  for (const key of Object.keys(windowRegistry)) {
    const remoteWin = windowRegistry[key].getState()
    if (key === currentWinId) continue
    if (remoteWin.resizeAction !== 'n') continue
    if (remoteWin.isWindowClosed) continue

    const { y } = cursorPosition
    const winBox = remoteWin.winElement?.getBoundingClientRect()
    if (!winBox) continue

    const minWinHeight = winBox.bottom - y <= remoteWin.WIN_MIN_HEIGHT

    if (minWinHeight) {
      if (topMostYAtMinWidth === undefined) topMostYAtMinWidth = winBox.top
      if (topMostYAtMinWidth > winBox.top) topMostYAtMinWidth = winBox.top
    }
  }

  return topMostYAtMinWidth
}
