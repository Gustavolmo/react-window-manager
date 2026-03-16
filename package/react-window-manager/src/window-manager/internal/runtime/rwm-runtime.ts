import { ResizeDirection, WindowStore } from '../../model/window-types'
import { windowRegistry } from '../../registration/window-registry'
import { useWorkspaceState } from '../features/workspace/workspace-state'
import {
  dockCommandResolver,
  DockCommands,
  getDockDependencies,
} from './dock-resolver/dock-commands'
import { rafDragLoopResolver, RafDragCommands } from './drag-resolver/drag-loop'
import { DragCommandResolver, DragCommands, isDragAllowed } from './drag-resolver/drag-commands'
import { FocusCommandResolver, FocusCommands } from './focus-resolver/focus-commands'
import { stackCommandResolver, StackCommands } from './stack-resolver/stack-commands'
import {
  workspaceCommandResolver,
  WorkspaceCommands,
} from './workspace-resolver/workspace-commands'
import { ResizeCommandResolver, ResizeCommands } from './resize-resolver/resize-commands'
import { RafResizeCommands, rafResizeLoopResolver } from './resize-resolver/resize-loop'
import { ResponsiveSizes, WorkspaceStore } from '../../model/workspace-types'

/* 
  SUBSYSTEM
  - POLICY?
  - CTX?
  - STAGING
  - COMMIT
  */

type rwmMessage =
  | { targetWinId: string; subsystem: 'DOCK'; cmd: DockCommands; ctx?: undefined }
  | { targetWinId: string; subsystem: 'DRAG'; cmd: DragCommands; ctx?: undefined }
  | { targetWinId: string; subsystem: 'FOCUS'; cmd: FocusCommands; ctx?: undefined }
  | { targetWinId: string; subsystem: 'RESIZE'; cmd: ResizeCommands; ctx: ResizeDirection }
  | { targetWinId?: string; subsystem: 'STACK'; cmd: StackCommands; ctx?: undefined }
  | { targetWinId?: string; subsystem: 'WORKSPACE'; cmd: WorkspaceCommands; ctx?: ResponsiveSizes }

export const rwmRuntime = {
  dispatch: ({ subsystem, cmd, targetWinId, ctx }: rwmMessage): void => {
    switch (subsystem) {
      case 'WORKSPACE': {
        const stagedChanges = workspaceCommandResolver[cmd](targetWinId, ctx)
        commitToWorkspace(stagedChanges)
        break
      }
      case 'DRAG': {
        if (!isDragAllowed()) return
        const stagedChanges = DragCommandResolver[cmd](targetWinId)
        commitToWindow(stagedChanges)
        break
      }
      case 'DOCK': {
        const { wsRect } = getDockDependencies()
        const stagedChanges = dockCommandResolver[cmd](targetWinId, wsRect)
        commitToWindow(stagedChanges)
        break
      }
      case 'RESIZE': {
        const stagedChanges = ResizeCommandResolver[cmd](targetWinId, ctx)
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

type rafMessage =
  | { targetWinId: string; subsystem: 'RAF_DRAG'; cmd: RafDragCommands }
  | { targetWinId: string; subsystem: 'RAF_RESIZE'; cmd: RafResizeCommands }

export const rafRuntime = {
  dispatch: ({ subsystem, cmd, targetWinId }: rafMessage): void => {
    switch (subsystem) {
      case 'RAF_DRAG': {
        if (!isDragAllowed()) return
        rafDragLoopResolver[cmd](targetWinId, commitToWindow)
        break
      }
      case 'RAF_RESIZE': {
        rafResizeLoopResolver[cmd](targetWinId, commitToWindow)
        break
      }
    }
  },
}

export type BatchMutation = { ws: WorkspaceMutation; win: WindowMutation[] }
function commitBatch({ win, ws }: BatchMutation) {
  if (ws) useWorkspaceState.setState(ws)
  if (win.length) win.forEach(({ winId, patch }) => windowRegistry[winId].setState(patch))
}

export type WindowMutation = { winId: string; patch: Partial<WindowStore> }
function commitToWindow(patchStack: WindowMutation[]) {
  if (patchStack.length)
    patchStack.forEach(({ winId, patch }) => windowRegistry[winId].setState(patch))
}

export type WorkspaceMutation = Partial<WorkspaceStore>
function commitToWorkspace(patch: WorkspaceMutation) {
  if (patch) useWorkspaceState.setState(patch)
}
