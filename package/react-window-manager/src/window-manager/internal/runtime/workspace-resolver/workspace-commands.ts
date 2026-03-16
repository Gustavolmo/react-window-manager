import { useWorkspaceState } from "../../features/workspace/workspace-state"
import { WorkspaceMutation } from "../rwm-runtime"

export type WorkspaceCommands = 'UPDATE_WORKSPACE_RECT'

type WorkspaceResolver = Record<WorkspaceCommands, (targetWinId?: string) => WorkspaceMutation>
export const workspaceCommandResolver: WorkspaceResolver = {
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