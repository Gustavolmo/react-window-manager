import { BatchMutation, WindowMutation } from '../rwm-runtime'
import { appHistory } from './app-history'

export type HistoryCommands = 'APPLY_PREVIOUS' | 'APPLY_NEXT' | 'CLEAR_HISTORY'

type HistoryResolver = Record<HistoryCommands, () => BatchMutation>
export const historyCommandResolver: HistoryResolver = {
  APPLY_PREVIOUS: () => {
    if (appHistory.ptr <= 0) return { ws: {}, win: [] }

    appHistory.ptr -= 1
    const snapshot = appHistory.snapshots[appHistory.ptr]

    const wsUpdate = snapshot.ws
    const winBatchUpdate: WindowMutation[] = []

    snapshot.winState.forEach((win) => {
      const { windowId, setWinElement, ...state } = win
      winBatchUpdate.push({
        winId: windowId!,
        patch: { ...state },
      })
    })

    return {
      ws: wsUpdate,
      win: winBatchUpdate,
    }
  },

  APPLY_NEXT: () => {
    if (appHistory.ptr >= appHistory.snapshots.length - 1) return { ws: {}, win: [] }

    appHistory.ptr += 1
    const snapshot = appHistory.snapshots[appHistory.ptr]

    const wsUpdate = snapshot.ws
    const winBatchUpdate: WindowMutation[] = []

    snapshot.winState.forEach((win) => {
      const { windowId, setWinElement, ...state } = win
      winBatchUpdate.push({
        winId: windowId!,
        patch: { ...state },
      })
    })

    return {
      ws: wsUpdate,
      win: winBatchUpdate,
    }
  },
  CLEAR_HISTORY: () => {
    appHistory.ptr = -1
    appHistory.snapshots = []

    return {
      ws: {},
      win: [],
    }
  },
}
