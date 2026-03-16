import { WindowStore } from '../../../model/window-types'
import { WorkspaceRect } from '../../../model/workspace-types'
import { windowRegistry } from '../../../registration/window-registry'
import { useCursorState } from '../../features/cursor/cursor-state'
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
    const { wsRect, win, winBox, x, y } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBounds = x > wsRect.right || x < wsRect.left
    const minWinWidth = x - winBox.left < win.WIN_MIN_WIDTH
    const sizeDiff = x - winBox.right

    if (!minWinWidth && !cursorOutOfBounds && sizeDiff !== 0) {
      commit([
        {
          winId: win.windowId,
          patch: { winWidth: win.winWidth + sizeDiff },
        },
      ])
    }

    requestAnimationFrame(() => resizer.e(getRafResizeDependencies(win.windowId), commit))
  },

  w: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x, y } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const minWinWidth = winBox.right - x <= win.WIN_MIN_WIDTH
    const cursorOutOfBounds = x > wsRect.right || x < wsRect.left
    const sizeDiff = winBox.left - x

    if (!minWinWidth && !cursorOutOfBounds && sizeDiff !== 0) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winWidth: win.winWidth + sizeDiff,
            winCoord: { pointX: x, pointY: win.winCoord.pointY },
          },
        },
      ])
    }

    requestAnimationFrame(() => resizer.w(getRafResizeDependencies(win.windowId), commit))
  },

  n: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x, y } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const minWinHeight = winBox.bottom - y <= win.WIN_MIN_HEIGHT
    const cursorOutOfBounds = y > wsRect.bottom || y < wsRect.top
    const sizeDiff = winBox.top - y

    if (!minWinHeight && !cursorOutOfBounds && sizeDiff !== 0) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winHeight: win.winHeight + sizeDiff,
            winCoord: { pointX: win.winCoord.pointX, pointY: y },
          },
        },
      ])
    }

    requestAnimationFrame(() => resizer.n(getRafResizeDependencies(win.windowId), commit))
  },

  s: (resizeDep: ResizeDep, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x, y } = resizeDep
    if (!win.resizeAction) return
    if (!winBox) return

    const minWinHeight = y - winBox.top < win.WIN_MIN_HEIGHT
    const cursorOutOfBounds = y > wsRect.bottom || y < wsRect.top
    const sizeDiff = y - winBox.bottom

    if (!minWinHeight && !cursorOutOfBounds && sizeDiff !== 0) {
      commit([
        {
          winId: win.windowId,
          patch: {
            winHeight: win.winHeight + sizeDiff,
          },
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
      requestAnimationFrame(() => resizer.nw(getRafResizeDependencies(win.windowId), commit))
    }

    const minWinHeight = winBox.bottom - y <= win.WIN_MIN_HEIGHT
    const minWinWidth = winBox.right - x <= win.WIN_MIN_WIDTH
    const sizeDiffY = winBox.top - y
    const sizeDiffX = winBox.left - x

    const stagedChagnes: WindowMutation[] = []

    if (sizeDiffY !== 0 || sizeDiffX !== 0) {
      stagedChagnes.push({
        winId: win.windowId,
        patch: {
          winCoord: {
            pointX: minWinWidth ? win.winCoord.pointX : x,
            pointY: minWinHeight ? win.winCoord.pointY : y,
          },
        },
      })
    }

    if (!minWinHeight && sizeDiffY !== 0) {
      stagedChagnes.push({
        winId: win.windowId,
        patch: { winHeight: win.winHeight + sizeDiffY },
      })
    }

    if (!minWinWidth && sizeDiffX !== 0) {
      stagedChagnes.push({
        winId: win.windowId,
        patch: { winWidth: win.winWidth + sizeDiffX },
      })
    }

    commit(stagedChagnes)

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
  const { x, y } = useCursorState.getState()
  return { wsRect, win, winBox, x, y }
}
