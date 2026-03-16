import { rwmRuntime } from '../../runtime/rwm-runtime'

export const wsApi = {
  updateWsRect: () =>
    rwmRuntime.dispatch({ subsystem: 'WORKSPACE', cmd: 'UPDATE_WORKSPACE_RECT', ctx: null }),
}
