import { ResizeDirection, WindowStore } from "../../../model/window-types"
import { WorkspaceRect } from "../../../model/workspace-types"
import { WindowMutation } from "../rwm-runtime"

export type ResizeContext = {
  wsRect: WorkspaceRect
  win: WindowStore
  winBox: DOMRect | undefined
  x: number
  y: number
}

export type ResizeCommands = 'ENABLE_RESIZE' | 'DISABLE_RESIZE'

type ResizeResolver = Record<
  ResizeCommands,
  (targetWinId: string, direction: ResizeDirection) => WindowMutation[]
>
export const ResizeCommandResolver: ResizeResolver = {
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
  DISABLE_RESIZE: (targetWinId: string) => {
    return [
      {
        winId: targetWinId,
        patch: {
          resizeAction: false,
        },
      },
    ]
  },
}
