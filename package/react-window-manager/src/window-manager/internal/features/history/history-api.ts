import { rwmRuntime } from '../../runtime/rwm-runtime'

export const appHistoryApi = {
  moveToPreviousSnapshot: () => {
    rwmRuntime.dispatch({ subsystem: 'HISTORY', cmd: 'APPLY_PREVIOUS' })
  },

  moveToNextSnapshot: () => {
    rwmRuntime.dispatch({ subsystem: 'HISTORY', cmd: 'APPLY_NEXT' })
  },

  clearHistory: () => {
    rwmRuntime.dispatch({ subsystem: 'HISTORY', cmd: 'CLEAR_HISTORY' })
  },
}
