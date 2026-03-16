import { windowRegistry } from '../../../registration/window-registry'
import { useCursorState } from '../../features/cursor/cursor-state'
import { useWorkspaceState } from '../../features/workspace/workspace-state'
import { WindowMutation } from '../rwm-runtime'

export type RafDragCommands = 'LOOP_DRAG'

type RafDragResolver = Record<
  RafDragCommands,
  (targetWinId: string, commitCb: (patchStack: WindowMutation[]) => void) => void
>
export const rafDragLoopResolver: RafDragResolver = {
  LOOP_DRAG: (targetWinId: string, commit: (patchStack: WindowMutation[]) => void) => {
    const { x, y } = useCursorState.getState()
    const { winCoord, isDragging, windowId } = windowRegistry[targetWinId].getState()

    if (!isDragging)
      throw new Error(`INIT_DRAG_LOOP called with isDragging false for winId: ${windowId}`)

    const pointerOffset = {
      left: x - winCoord.pointX,
      top: y - winCoord.pointY,
    }

    requestAnimationFrame(() => dragLoop(targetWinId, pointerOffset, commit))
  },
}

type PointerOffset = { left: number; top: number }
const dragLoop = (
  targetWinId: string,
  pointerOffset: PointerOffset,
  commit: (patchStack: WindowMutation[]) => void
) => {
  const { winCoord, isDragging } = windowRegistry[targetWinId].getState()
  const { wsRect } = useWorkspaceState.getState()
  const { x, y } = useCursorState.getState()
  if (!isDragging) return

  let adjustedX = x - pointerOffset.left
  if (x > wsRect.right || x < wsRect.left) adjustedX = winCoord.pointX
  let adjustedY = y - pointerOffset.top
  if (y > wsRect.bottom || y < wsRect.top) adjustedY = winCoord.pointY

  if (adjustedX !== winCoord.pointX || adjustedY !== winCoord.pointY) {
    commit([
      {
        winId: targetWinId,
        patch: { winCoord: { pointX: adjustedX, pointY: adjustedY } },
      },
    ])
  }

  requestAnimationFrame(() => dragLoop(targetWinId, pointerOffset, commit))
}
