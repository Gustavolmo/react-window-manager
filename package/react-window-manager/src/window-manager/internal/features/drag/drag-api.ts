import { rafAnimation, rwmRuntime } from '../../runtime/runtime'

export const dragApi = {
  startDrag: (targetWinId: string) => {
    rwmRuntime.dispatch({ targetWinId: targetWinId, subsystem: 'DRAG', cmd: 'ENABLE_DRAG' })
    rafAnimation.dispatch({ targetWinId: targetWinId, subsystem: 'RAF_DRAG', cmd: 'LOOP_DRAG' })
  },

  stopDrag: (targetWinId: string) => {
    rwmRuntime.dispatch({ targetWinId: targetWinId, subsystem: 'DRAG', cmd: 'DISABLE_DRAG' })
  },
}
