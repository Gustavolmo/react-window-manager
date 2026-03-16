import { rwmRuntime } from '../../runtime/rwm-runtime'

export const focusApi = {
  bringWindowToFocus: (targetId: string) => {
    rwmRuntime.dispatch({
      targetWinId: targetId,
      subsystem: 'FOCUS',
      cmd: 'FOCUS_WINDOW',
      ctx: null,
    })
  },

  closeWindowAndRefocus: (targetId: string) => {
    rwmRuntime.dispatch({
      targetWinId: targetId,
      subsystem: 'FOCUS',
      cmd: 'CLOSE_WINDOW_AND_REFOCUS',
      ctx: null,
    })
  },
}
