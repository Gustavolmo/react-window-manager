import { ResponsiveSizes } from '../../../model/workspace-types'
import { useWorkspaceState } from '../../features/workspace/workspace-state'
import { WorkspaceMutation } from '../rwm-runtime'

export type WorkspaceCommands =
  | 'UPDATE_WORKSPACE_RECT'
  | 'SET_RESPONSIVE_BREAK'
  | 'SET_WORKSPACE_FEATURES'

export type WorkspaceCtx = {
  responsiveBreak?: ResponsiveSizes
  isDockPanelEnabled?: boolean
  isGridEnabled?: boolean
}

type WorkspaceResolver = Record<
  WorkspaceCommands,
  (targetWinId?: string, ctx?: WorkspaceCtx) => WorkspaceMutation
>
export const workspaceCommandResolver: WorkspaceResolver = {
  UPDATE_WORKSPACE_RECT: () => {
    const rect = useWorkspaceState.getState().wsElement?.getBoundingClientRect()
    const top = rect?.top ?? 0
    const left = rect?.left ?? 0
    const innerHeight = rect?.height ?? 0
    const innerWidth = rect?.width ?? 0
    const bottom = top + innerHeight
    const right = left + innerWidth
    const centerX = left + innerWidth / 2
    const centerY = top + innerHeight / 2

    const breakPoint = useWorkspaceState.getState().responsiveBreak
    const isBelowBreakPoint = innerWidth < responsiveBreakInPx(breakPoint)

    return {
      isBelowBreakPoint: isBelowBreakPoint,
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

  SET_WORKSPACE_FEATURES: (_?: string, ctx?: WorkspaceCtx) => {
    if (ctx?.isGridEnabled === undefined || ctx?.isDockPanelEnabled === undefined)
      throw new Error(`SET_WORKSPACE_FEATURES called without a ctx value`)

    return {
      isGridEnabled: ctx.isGridEnabled,
      isDockPanelEnabled: ctx.isDockPanelEnabled,
    }
  },

  SET_RESPONSIVE_BREAK: (_?: string, ctx?: WorkspaceCtx) => {
    if (ctx?.responsiveBreak === undefined || ctx?.responsiveBreak === null)
      throw new Error(`SET_RESPONSIVE_BREAK called without a ctx value`)

    return {
      responsiveBreak: ctx.responsiveBreak,
    }
  },
}

const responsiveBreakInPx = (breakPoint: ResponsiveSizes): number => {
  switch (breakPoint) {
    case 'sm':
      return 640
    case 'md':
      return 768
    case 'lg':
      return 1024
    case 'xl':
      return 1280
    case 'never':
      return 0
    case 'always':
      return Infinity
    default:
      return breakPoint
  }
}
