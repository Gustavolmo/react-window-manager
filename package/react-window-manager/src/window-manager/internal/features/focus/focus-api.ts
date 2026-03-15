import { rwmRuntime } from '../../runtime/runtime'

export const focusApi = {
  bringWindowToFocus: (targetId: string) => {
    rwmRuntime.dispatch({ targetWinId: targetId, subsystem: 'FOCUS', cmd: 'FOCUS_WINDOW' })
  },

  closeWindowAndRefocus: (targetId: string) => {
    rwmRuntime.dispatch({
      targetWinId: targetId,
      subsystem: 'FOCUS',
      cmd: 'CLOSE_WINDOW_AND_REFOCUS',
    })
  },
}
