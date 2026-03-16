import { ResizeDirection } from '../../../model/window-types'
import { windowRegistry } from '../../../registration/window-registry'
import { WindowMutation } from '../rwm-runtime'

export type ResizeCommands = 'ENABLE_RESIZE' | 'DISABLE_RESIZE'

type ResizeResolver = Record<
  ResizeCommands,
  (targetWinId: string, ctx: ResizeDirection) => WindowMutation[]
>
export const resizeCommandResolver: ResizeResolver = {
  ENABLE_RESIZE: (targetWinId: string, direction: ResizeDirection) => {
    return [
      {
        winId: targetWinId,
        patch: {
          resizeAction: direction,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
  DISABLE_RESIZE: (_: string) => {
    const patch: WindowMutation[] = []
    for (const key of Object.keys(windowRegistry))
      patch.push({
        winId: key,
        patch: {
          resizeAction: false,
        },
      })

    return patch
  },
}
