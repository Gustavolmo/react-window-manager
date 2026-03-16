import { windowRegistry } from '../../../registration/window-registry'
import { BatchMutation, WindowMutation, WorkspaceMutation } from '../rwm-runtime'

export type FocusCommands = 'FOCUS_WINDOW' | 'CLOSE_WINDOW_AND_REFOCUS'

type FocusResolver = Record<FocusCommands, (targetWinId: string) => BatchMutation>
export const focusCommandResolver: FocusResolver = {
  FOCUS_WINDOW: (targetWinId: string) => {
    const targetWin = windowRegistry[targetWinId].getState()
    if (targetWin.isActive && !targetWin.isWindowClosed) return { win: [], ws: {} }

    const newStackOrderUpdate: WindowMutation[] = []
    const workspaceUpdate: WorkspaceMutation = { activeWindowId: targetWinId }

    for (const key of Object.keys(windowRegistry)) {
      const otherWin = windowRegistry[key].getState()
      if (otherWin.windowId === targetWin.windowId) continue

      const adjustedIndex =
        otherWin.zIndex >= targetWin.zIndex ? otherWin.zIndex - 1 : otherWin.zIndex

      newStackOrderUpdate.push({
        winId: otherWin.windowId,
        patch: {
          isActive: false,
          zIndex: adjustedIndex,
        },
      })
    }

    newStackOrderUpdate.push({
      winId: targetWin.windowId,
      patch: {
        isWindowClosed: false,
        isActive: true,
        zIndex: newStackOrderUpdate.length + 1,
      },
    })

    return {
      win: newStackOrderUpdate,
      ws: workspaceUpdate,
    }
  },
  CLOSE_WINDOW_AND_REFOCUS: (targetWinId: string) => {
    const isTargetWinClosed = windowRegistry[targetWinId].getState().isWindowClosed
    if (isTargetWinClosed) return { win: [], ws: {} }

    let prevIndex = 0
    let highestIndexWinId: string | undefined = undefined

    for (const key of Object.keys(windowRegistry)) {
      const { zIndex, windowId, isWindowClosed } = windowRegistry[key].getState()
      if (windowId === targetWinId) continue
      if (isWindowClosed) continue

      if (zIndex > prevIndex) {
        prevIndex = zIndex
        highestIndexWinId = windowId
      }
    }

    return !highestIndexWinId
      ? {
          ws: {},
          win: [
            {
              winId: targetWinId,
              patch: { isActive: false, isWindowClosed: true },
            },
          ],
        }
      : {
          ws: { activeWindowId: highestIndexWinId },
          win: [
            {
              winId: highestIndexWinId,
              patch: { isActive: true },
            },
            {
              winId: targetWinId,
              patch: { isActive: false, isWindowClosed: true },
            },
          ],
        }
  },
}
