import { ResizeDirection } from '../../../model/window-types'
import { windowRegistry } from '../../../registration/window-registry'
import { rafRuntime, rwmRuntime } from '../../runtime/rwm-runtime'

export const resizeApi = {
  startResize: (winId: string, direction: ResizeDirection) => {
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'RESIZE',
      cmd: 'ENABLE_RESIZE',
      ctx: direction,
    })
    rafRuntime.dispatch({ targetWinId: winId, subsystem: 'RAF_RESIZE', cmd: 'LOOP_RESIZE' })
  },

  stopResize: (winId: string) => {
    const isNotResizing = !windowRegistry[winId].getState().resizeAction
    if (isNotResizing) return

    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'RESIZE',
      cmd: 'DISABLE_RESIZE',
      ctx: false,
    })
  },
}
