import { ResizeDirection, WindowStore } from '../../model/window-types'
import { windowRegistry } from '../../registration/window-registry'
import { useWorkspaceState } from '../features/workspace/workspace-state'
import { dockCommandResolver, DockCommands } from './dock-resolver/dock-commands'
import { rafDragLoopResolver, RafDragCommands } from './drag-resolver/drag-loop'
import { dragCommandResolver, DragCommands } from './drag-resolver/drag-commands'
import { focusCommandResolver, FocusCommands } from './focus-resolver/focus-commands'
import {
  workspaceCommandResolver,
  WorkspaceCommands,
  WorkspaceCtx,
} from './workspace-resolver/workspace-commands'
import { resizeCommandResolver, ResizeCommands } from './resize-resolver/resize-commands'
import { RafResizeCommands, rafResizeLoopResolver } from './resize-resolver/resize-loop'
import { WorkspaceStore } from '../../model/workspace-types'

/**
 * FIND ME:
 * 
 * Subsystem structure needs formalization
  => getDependencies
  => policy
  => stageChanges
  => commitChanges
 */

type rwmMessage =
  | { targetWinId: string; subsystem: 'DOCK'; cmd: DockCommands; ctx?: undefined }
  | { targetWinId: string; subsystem: 'DRAG'; cmd: DragCommands; ctx?: undefined }
  | { targetWinId: string; subsystem: 'FOCUS'; cmd: FocusCommands; ctx?: undefined }
  | { targetWinId: string; subsystem: 'RESIZE'; cmd: ResizeCommands; ctx: ResizeDirection }
  | { targetWinId?: string; subsystem: 'WORKSPACE'; cmd: WorkspaceCommands; ctx?: WorkspaceCtx }

export const rwmRuntime = {
  dispatch: ({ subsystem, cmd, targetWinId, ctx }: rwmMessage): void => {
    switch (subsystem) {
      case 'WORKSPACE': {
        const stagedChanges = workspaceCommandResolver[cmd](targetWinId, ctx)
        commitBatch(stagedChanges)
        break
      }
      case 'DRAG': {
        if (useWorkspaceState.getState().isBelowBreakPoint) return
        const stagedChanges = dragCommandResolver[cmd](targetWinId)
        commitToWindow(stagedChanges)
        break
      }
      case 'DOCK': {
        const { wsRect } = useWorkspaceState.getState()
        const stagedChanges = dockCommandResolver[cmd](targetWinId, wsRect)
        commitToWindow(stagedChanges)
        break
      }
      case 'RESIZE': {
        const stagedChanges = resizeCommandResolver[cmd](targetWinId, ctx)
        commitToWindow(stagedChanges)
        break
      }
      case 'FOCUS': {
        const stagedChanges = focusCommandResolver[cmd](targetWinId)
        commitBatch(stagedChanges)
        break
      }

      default:
        throw new Error(
          `Unregistered rwmRuntime subsystem called: ${{ subsystem, cmd, targetWinId, ctx }}`
        )
    }
  },
}

type rafMessage =
  | { targetWinId: string; subsystem: 'RAF_DRAG'; cmd: RafDragCommands }
  | { targetWinId: string; subsystem: 'RAF_RESIZE'; cmd: RafResizeCommands }

export const rafRuntime = {
  dispatch: ({ subsystem, cmd, targetWinId }: rafMessage): void => {
    switch (subsystem) {
      case 'RAF_DRAG': {
        if (useWorkspaceState.getState().isBelowBreakPoint) return
        rafDragLoopResolver[cmd](targetWinId, commitToWindow)
        break
      }
      case 'RAF_RESIZE': {
        rafResizeLoopResolver[cmd](targetWinId, commitToWindow)
        break
      }

      default:
        throw new Error(
          `Unregistered rafRuntime subsystem called: ${{ subsystem, cmd, targetWinId }}`
        )
    }
  },
}

export type BatchMutation = { ws: WorkspaceMutation; win: WindowMutation[] }
function commitBatch({ win, ws }: BatchMutation) {
  commitToWorkspace(ws)
  commitToWindow(win)
}

export type WindowMutation = { winId: string; patch: Partial<WindowStore> }
function commitToWindow(patchStack: WindowMutation[]) {
  patchStack.forEach(({ winId, patch }) => {
    windowRegistry[winId].setState(patch)
  })
}

export type WorkspaceMutation = Partial<WorkspaceStore>
function commitToWorkspace(patch: WorkspaceMutation) {
  if (patch) {
    useWorkspaceState.setState(patch)
  }
}

/* FIND ME: Would be cool to add ctrl+z and ctrl+shift+z */
// type AppMoment =  { ws: WorkspaceStore; win: WindowRegistry }
// export const appHistory: { ws: WorkspaceStore; win: WindowRegistry } = []
