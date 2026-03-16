import { WindowStore } from '../../model/window-types'
import { WorkspaceStore } from '../../model/workspace-types'
import { windowRegistry } from '../../registration/window-registry'
import { useCursorState } from '../features/cursor/cursor-state'
import { useWorkspaceState } from '../features/workspace/workspace-state'

export type DispatchMessage =
  | { targetWinId: string; subsystem: 'DOCK'; cmd: DockCommands }
  | { targetWinId?: string; subsystem: 'WORKSPACE'; cmd: WorkspaceCommands }
  | { targetWinId: string; subsystem: 'FOCUS'; cmd: FocusCommands }
  | { targetWinId?: string; subsystem: 'STACK'; cmd: StackCommands }
  | { targetWinId: string; subsystem: 'DRAG'; cmd: DragCommands }

//   | { targetWinId: string; subsystem: 'GRID'; cmd: GridCommands }
//   | { targetWinId: string; subsystem: 'RESIZE'; cmd: ResizeCommands }

export const rwmRuntime = {
  dispatch: ({ subsystem, cmd, targetWinId }: DispatchMessage): void => {
    switch (subsystem) {
      case 'WORKSPACE': {
        const stagedChanges = workspaceCommandResolver[cmd](targetWinId)
        commitToWorkspace(stagedChanges)
        break
      }
      case 'DRAG': {
        const stagedChanges = DragCommandResolver[cmd](targetWinId)
        commitToWindow(stagedChanges)
        break
      }
      case 'DOCK': {
        const stagedChanges = dockCommandResolver[cmd](targetWinId)
        commitToWindow(stagedChanges)
        break
      }
      case 'STACK': {
        const stagedChanges = stackCommandResolver[cmd](targetWinId)
        commitToWindow(stagedChanges)
        break
      }
      case 'FOCUS': {
        const stagedChanges = FocusCommandResolver[cmd](targetWinId)
        commitBatch(stagedChanges)
        break
      }
    }
  },
}

export type DispatchAnimation = { targetWinId: string; subsystem: 'RAF_DRAG'; cmd: RafDragCommands }
// | { targetWinId: string; subsystem: 'RAF_RESIZE'; cmd: RafResizeCommands }

export const rafAnimation = {
  dispatch: ({ subsystem, cmd, targetWinId }: DispatchAnimation): void => {
    switch (subsystem) {
      case 'RAF_DRAG': {
        rafDragCommandResolver[cmd](targetWinId, commitToWindow)
        break
      }
    }
  },
}

type BatchMutation = { ws: WorkspaceMutation; win: WindowMutation[] }
function commitBatch(batch: BatchMutation) {
  if (batch.ws) useWorkspaceState.setState(batch.ws)
  if (batch.win.length)
    batch.win.forEach(({ winId, patch }) => windowRegistry[winId].setState(patch))
}

type WindowMutation = { winId: string; patch: Partial<WindowStore> }
function commitToWindow(patchStack: WindowMutation[]) {
  if (patchStack.length)
    patchStack.forEach(({ winId, patch }) => windowRegistry[winId].setState(patch))
}

type WorkspaceMutation = Partial<WorkspaceStore>
function commitToWorkspace(patch: WorkspaceMutation) {
  if (patch) useWorkspaceState.setState(patch)
}

/* ==========
 * RESIZE
 * ==========
 */

/* ==========
 * RAF_RESIZE
 * ==========
 */

/* ==========
 * GRID - maybe an orchestrator, not a runtime
 * ==========
 */

/* ==========
 * RAF_DRAG
 * ==========
 */
type RafDragCommands = 'LOOP_DRAG'
type RafResolver = Record<
  RafDragCommands,
  (targetWinId: string, commitCb: (patchStack: WindowMutation[]) => void) => void
>
const rafDragCommandResolver: RafResolver = {
  LOOP_DRAG: (targetWinId: string, commit: (patchStack: WindowMutation[]) => void) => {
    const { x, y } = useCursorState.getState()
    const { winCoord, isDragging, windowId } = windowRegistry[targetWinId].getState()

    if (!isDragging)
      throw new Error(`INIT_DRAG_LOOP called with disabled animation for winId: ${windowId}`)

    const pointerOffset = {
      left: x - winCoord.pointX,
      top: y - winCoord.pointY,
    }

    const dragLoop = () => {
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

      requestAnimationFrame(dragLoop)
    }

    requestAnimationFrame(dragLoop)
  },
}

/* ==========
 * DRAG
 * ==========
 */
type DragCommands = 'ENABLE_DRAG' | 'DISABLE_DRAG'
type DragResolver = Record<DragCommands, (targetWinId: string) => WindowMutation[]>
const DragCommandResolver: DragResolver = {
  ENABLE_DRAG: (targetWinId: string) => {
    const { wsRect } = useWorkspaceState.getState()
    const patch: Partial<WindowStore> =
      windowRegistry[targetWinId].getState().winVisualState === 'maximized'
        ? {
            winCoord: { pointX: wsRect.left + 16, pointY: wsRect.top + 16 },
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

/* ==========
 * FOCUS
 * ==========
 */
type FocusCommands = 'FOCUS_WINDOW' | 'CLOSE_WINDOW_AND_REFOCUS'
type FocusResolver = Record<FocusCommands, (targetWinId: string) => BatchMutation>
const FocusCommandResolver: FocusResolver = {
  FOCUS_WINDOW: (targetWinId: string) => {
    const targetWin = windowRegistry[targetWinId].getState()
    if (targetWin.isActive && !targetWin.isWindowClosed) return { win: [], ws: {} }

    const newStackOrderUpdate: WindowMutation[] = []
    const workspaceUpdate: WorkspaceMutation = { activeWindowId: targetWinId }

    for (const key of Object.keys(windowRegistry)) {
      const otherWin = windowRegistry[key].getState()
      if (otherWin.windowId === targetWin.windowId) continue

      const adjustedIndex =
        otherWin.zIndex >= targetWin.zIndex ? otherWin.zIndex - 1 : otherWin.zIndex

      newStackOrderUpdate.push({
        winId: otherWin.windowId,
        patch: {
          isActive: false,
          zIndex: adjustedIndex,
        },
      })
    }

    newStackOrderUpdate.push({
      winId: targetWin.windowId,
      patch: {
        isWindowClosed: false,
        isActive: true,
        zIndex: newStackOrderUpdate.length + 1,
      },
    })

    return {
      win: newStackOrderUpdate,
      ws: workspaceUpdate,
    }
  },
  CLOSE_WINDOW_AND_REFOCUS: (targetWinId: string) => {
    const isTargetWinClosed = windowRegistry[targetWinId].getState().isWindowClosed
    if (isTargetWinClosed) return { win: [], ws: {} }

    let prevIndex = 0
    let highestIndexWinId: string | undefined = undefined

    for (const key of Object.keys(windowRegistry)) {
      const { zIndex, windowId, isWindowClosed } = windowRegistry[key].getState()
      if (windowId === targetWinId) continue
      if (isWindowClosed) continue

      if (zIndex > prevIndex) {
        prevIndex = zIndex
        highestIndexWinId = windowId
      }
    }

    return !highestIndexWinId
      ? {
          ws: {},
          win: [
            {
              winId: targetWinId,
              patch: { isActive: false, isWindowClosed: true },
            },
          ],
        }
      : {
          ws: { activeWindowId: highestIndexWinId },
          win: [
            {
              winId: highestIndexWinId,
              patch: { isActive: true },
            },
            {
              winId: targetWinId,
              patch: { isActive: false, isWindowClosed: true },
            },
          ],
        }
  },
}

/* ==========
 * WORKSPACE
 * ==========
 */
type WorkspaceCommands = 'UPDATE_WORKSPACE_RECT'
type WorkspaceResolver = Record<WorkspaceCommands, (targetWinId?: string) => WorkspaceMutation>
const workspaceCommandResolver: WorkspaceResolver = {
  UPDATE_WORKSPACE_RECT: (_?: string) => {
    const rect = useWorkspaceState.getState().wsElement?.getBoundingClientRect()
    const top = rect?.top ?? 0
    const left = rect?.left ?? 0
    const innerHeight = rect?.height ?? 0
    const innerWidth = rect?.width ?? 0
    const bottom = top + innerHeight
    const right = left + innerWidth
    const centerX = left + innerWidth / 2
    const centerY = top + innerHeight / 2

    return {
      wsRect: {
        top: top,
        left: left,
        innerHeight: innerHeight,
        innerWidth: innerWidth,
        bottom: bottom,
        right: right,
        centerX: centerX,
        centerY: centerY,
      },
    }
  },
}

/* ==========
 * DOCK
 * ==========
 */
type DockCommands =
  | 'DOCK_WINDOW_RIGHT'
  | 'DOCK_WINDOW_LEFT'
  | 'DOCK_WINDOW_TOP'
  | 'DOCK_WINDOW_BOTTOM'
  | 'DOCK_WINDOW_BOTTOM_RIGHT'
  | 'DOCK_WINDOW_TOP_RIGHT'
  | 'DOCK_WINDOW_BOTTOM_LEFT'
  | 'DOCK_WINDOW_TOP_LEFT'
  | 'MAXIMIZE_WINDOW'
  | 'DEMAXIMIZE_WINDOW'
type DockResolver = Record<DockCommands, (targetWinId: string) => WindowMutation[]>
const dockCommandResolver: DockResolver = {
  DOCK_WINDOW_RIGHT: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.centerX, pointY: wsRect.top },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
  DOCK_WINDOW_LEFT: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.top },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
  DOCK_WINDOW_TOP: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.top },
          winWidth: wsRect.innerWidth,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
  DOCK_WINDOW_BOTTOM: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.centerY },
          winWidth: wsRect.innerWidth,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
  DOCK_WINDOW_BOTTOM_RIGHT: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: {
            pointX: wsRect.centerX,
            pointY: wsRect.centerY,
          },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
  DOCK_WINDOW_TOP_RIGHT: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.centerX, pointY: wsRect.top },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
  DOCK_WINDOW_BOTTOM_LEFT: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.centerY },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
  DOCK_WINDOW_TOP_LEFT: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.top },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
  MAXIMIZE_WINDOW: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.top },
          winHeight: wsRect.innerHeight,
          winWidth: wsRect.innerWidth,
          winVisualState: 'maximized',
        },
      },
    ]
  },
  DEMAXIMIZE_WINDOW: (targetWinId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left + 16, pointY: wsRect.top + 16 },
          winWidth: wsRect.innerWidth * 0.95,
          winHeight: wsRect.innerHeight * 0.75,
          winVisualState: 'demaximized',
        },
      },
    ]
  },
}

/* ==========
 * STACK
 * ==========
 */
type StackCommands = 'RESET_STACK'
type StackResolver = Record<StackCommands, (targetWinId?: string) => WindowMutation[]>
const stackCommandResolver: StackResolver = {
  RESET_STACK: () => {
    const batchUpdate: WindowMutation[] = []
    for (const key of Object.keys(windowRegistry)) {
      const { resetFlag } = windowRegistry[key].getState()
      batchUpdate.push({
        winId: key,
        patch: {
          resetFlag: !resetFlag, // FIND ME: reset flag is anti-pattern
          isWindowClosed: true,
          isActive: false,
        },
      })
    }

    return batchUpdate
  },
}
