import { rafRuntime, rwmRuntime } from '../../runtime/rwm-runtime'

export const dragApi = {
  startDrag: (targetWinId: string) => {
    rwmRuntime.dispatch({
      targetWinId: targetWinId,
      subsystem: 'DRAG',
      cmd: 'ENABLE_DRAG',
    })
    rafRuntime.dispatch({ targetWinId: targetWinId, subsystem: 'RAF_DRAG', cmd: 'LOOP_DRAG' })
  },

  stopDrag: (targetWinId: string) => {
    rwmRuntime.dispatch({
      targetWinId: targetWinId,
      subsystem: 'DRAG',
      cmd: 'DISABLE_DRAG',
    })
  },
}
