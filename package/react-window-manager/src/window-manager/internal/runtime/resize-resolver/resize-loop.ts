import { windowRegistry } from "../../../registration/window-registry"
import { useCursorState } from "../../features/cursor/cursor-state"
import { useWorkspaceState } from "../../features/workspace/workspace-state"
import { WindowMutation } from "../rwm-runtime"
import { ResizeContext } from "./resize-commands"

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
      throw new Error(`LOOP_RESIZE called with null window element: ${targetWinId}`)

    requestAnimationFrame(() =>
      resizeLoopResolver[resizeDirection](getRafResizeDependencies(targetWinId), commitCb)
    )
  },
}

const getRafResizeDependencies = (winId: string): ResizeContext => {
  const win = windowRegistry[winId].getState()
  const winBox = win.winElement?.getBoundingClientRect()
  const wsRect = useWorkspaceState.getState().wsRect
  const { x, y } = useCursorState.getState()
  return { wsRect, win, winBox, x, y }
}

const resizeLoopResolver = {
  e: (resizeCtx: ResizeContext, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x, y } = resizeCtx
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

    requestAnimationFrame(() =>
      resizeLoopResolver.e(getRafResizeDependencies(win.windowId), commit)
    )
  },

  w: (resizeCtx: ResizeContext, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x, y } = resizeCtx
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

    requestAnimationFrame(() =>
      resizeLoopResolver.w(getRafResizeDependencies(win.windowId), commit)
    )
  },

  n: (resizeCtx: ResizeContext, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x, y } = resizeCtx
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

    requestAnimationFrame(() =>
      resizeLoopResolver.n(getRafResizeDependencies(win.windowId), commit)
    )
  },

  s: (resizeCtx: ResizeContext, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x, y } = resizeCtx
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

    requestAnimationFrame(() =>
      resizeLoopResolver.s(getRafResizeDependencies(win.windowId), commit)
    )
  },

  nw: (resizeCtx: ResizeContext, commit: (patchStack: WindowMutation[]) => void) => {
    const { wsRect, win, winBox, x, y } = resizeCtx
    if (!win.resizeAction) return
    if (!winBox) return

    const cursorOutOfBoundsY = y > wsRect.bottom || y < wsRect.top
    const cursorOutOfBoundsX = x > wsRect.right || x < wsRect.left
    const isCursorOutOfBounds = cursorOutOfBoundsY || cursorOutOfBoundsX
    if (isCursorOutOfBounds) {
      requestAnimationFrame(() =>
        resizeLoopResolver.nw(getRafResizeDependencies(win.windowId), commit)
      )
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

    requestAnimationFrame(() =>
      resizeLoopResolver.nw(getRafResizeDependencies(win.windowId), commit)
    )
  },

  se: (resizeCtx: ResizeContext, commit: (patchStack: WindowMutation[]) => void) => {
    resizeLoopResolver.e(resizeCtx, commit)
    resizeLoopResolver.s(resizeCtx, commit)
  },

  sw: (resizeCtx: ResizeContext, commit: (patchStack: WindowMutation[]) => void) => {
    resizeLoopResolver.w(resizeCtx, commit)
    resizeLoopResolver.s(resizeCtx, commit)
  },

  ne: (resizeCtx: ResizeContext, commit: (patchStack: WindowMutation[]) => void) => {
    resizeLoopResolver.e(resizeCtx, commit)
    resizeLoopResolver.n(resizeCtx, commit)
  },
}
