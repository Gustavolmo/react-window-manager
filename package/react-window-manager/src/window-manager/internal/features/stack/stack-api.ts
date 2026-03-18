import { rwmRuntime } from '../../runtime/rwm-runtime'

export const stackApi = {
  resetStack: () => {
    rwmRuntime.dispatch({ subsystem: 'STACK', cmd: 'RESET_STACK' })
  },
}
