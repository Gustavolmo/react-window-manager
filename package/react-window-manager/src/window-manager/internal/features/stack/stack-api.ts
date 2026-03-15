import { rwmRuntime } from '../../runtime/runtime'

export const stackApi = {
  resetStack: () => {
    rwmRuntime.dispatch({ subsystem: 'STACK', cmd: 'RESET_STACK' })
  },
}
