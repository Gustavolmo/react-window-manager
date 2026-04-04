import { windowRegistry } from '../../../registration/window-registry'
import { WindowMutation } from '../rwm-runtime'

export type StackCommands = 'RESET_STACK'

type StackResolver = Record<StackCommands, (targetWinId?: string) => WindowMutation[]>

/* FIND ME: This should become a close all, open all functionality, REMOVE RESET_STACK */
export const stackCommandResolver: StackResolver = {
  RESET_STACK: () => {
    const batchUpdate: WindowMutation[] = []
    for (const key of Object.keys(windowRegistry)) {
      // const { resetFlag } = windowRegistry[key].getState()
      batchUpdate.push({
        winId: key,
        patch: {
          // resetFlag: !resetFlag, // FIND ME: reset flag is anti-pattern
          // isWindowClosed: true,
          // isActive: false,
        },
      })
    }

    return batchUpdate
  },
}
