import { WindowStore } from "../../../model/window-types"
import { windowRegistry } from "../../../registration/window-registry"
import { useWorkspaceState } from "../../features/workspace/workspace-state"
import { WindowMutation } from "../rwm-runtime"

export type DragCommands = 'ENABLE_DRAG' | 'DISABLE_DRAG'

type DragResolver = Record<DragCommands, (targetWinId: string) => WindowMutation[]>
export const DragCommandResolver: DragResolver = {
  ENABLE_DRAG: (targetWinId: string) => {
    const { wsRect } = useWorkspaceState.getState()
    const { winVisualState } = windowRegistry[targetWinId].getState()

    const patch: Partial<WindowStore> =
      winVisualState === 'maximized'
        ? {
            winCoord: { pointX: wsRect.left + 16, pointY: wsRect.top + 4 },
            winWidth: wsRect.innerWidth * 0.95,
            winHeight: wsRect.innerHeight * 0.75,
            winVisualState: 'demaximized',
            isDragging: true,
          }
        : { isDragging: true }

    return [
      {
        winId: targetWinId,
        patch: patch,
      },
    ]
  },
  DISABLE_DRAG: (targetWinId: string) => {
    return [
      {
        winId: targetWinId,
        patch: {
          isDragging: false,
        },
      },
    ]
  },
}

export const isDragAllowed = (): boolean => {
  return !useWorkspaceState.getState().isBelowBreakPoint()
}
