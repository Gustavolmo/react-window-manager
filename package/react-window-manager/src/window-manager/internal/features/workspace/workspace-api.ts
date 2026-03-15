import { rwmRuntime } from '../../runtime/runtime'

export const wsApi = {
  updateWsRect: () => rwmRuntime.dispatch({ subsystem: 'WORKSPACE', cmd: 'UPDATE_WORKSPACE_RECT' }),
}
