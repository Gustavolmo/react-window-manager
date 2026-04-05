import { ResponsiveSizes } from '../../../model/workspace-types'
import { windowRegistry } from '../../../registration/window-registry'
import { useWorkspaceState } from '../../features/workspace/workspace-state'
import { BatchMutation, WindowMutation, WorkspaceMutation } from '../rwm-runtime'

export type WorkspaceCommands =
  | 'UPDATE_WORKSPACE_SIZE'
  | 'SET_RESPONSIVE_BREAK'
  | 'SET_WORKSPACE_FEATURES'

export type WorkspaceCtx = {
  responsiveBreak?: ResponsiveSizes
  isDockPanelEnabled?: boolean
  isGridEnabled?: boolean
}

type WorkspaceResolver = Record<
  WorkspaceCommands,
  (targetWinId?: string, ctx?: WorkspaceCtx) => BatchMutation
>
export const workspaceCommandResolver: WorkspaceResolver = {
  UPDATE_WORKSPACE_SIZE: () => {
    const prevRect = useWorkspaceState.getState().wsRect
    const rect = useWorkspaceState.getState().wsElement?.getBoundingClientRect()
    const breakPoint = useWorkspaceState.getState().responsiveBreak

    const top = rect?.top ?? 0
    const left = rect?.left ?? 0
    const innerHeight = rect?.height ?? 0
    const innerWidth = rect?.width ?? 0
    const bottom = top + innerHeight
    const right = left + innerWidth
    const centerX = left + innerWidth / 2
    const centerY = top + innerHeight / 2

    const workspaceUpdate: WorkspaceMutation = {
      isBelowBreakPoint: innerWidth < responsiveBreakInPx(breakPoint),
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

    const windowBatchUpdate: WindowMutation[] = []
    const { innerHeight: prevWsHeight, innerWidth: prevWsWidth } = prevRect
    const currWsHeight = innerHeight
    const currWsWidth = innerWidth

    const widthChangeRatio = currWsWidth / prevWsWidth
    const heightChangeRatio = currWsHeight / prevWsHeight

    for (const key of Object.keys(windowRegistry)) {
      const win = windowRegistry[key].getState()

      windowBatchUpdate.push({
        winId: key,
        patch: {
          winWidth: win.winWidth * widthChangeRatio,
          winHeight: win.winHeight * heightChangeRatio,
          winCoord: {
            pointX: win.winCoord.pointX * widthChangeRatio,
            pointY: win.winCoord.pointY * heightChangeRatio,
          },
        },
      })
    }

    return {
      win: windowBatchUpdate,
      ws: workspaceUpdate,
    }
  },

  SET_WORKSPACE_FEATURES: (_?: string, ctx?: WorkspaceCtx) => {
    if (ctx?.isGridEnabled === undefined || ctx?.isDockPanelEnabled === undefined)
      throw new Error(`SET_WORKSPACE_FEATURES called without a ctx value`)

    return {
      win: [],
      ws: {
        isGridEnabled: ctx.isGridEnabled,
        isDockPanelEnabled: ctx.isDockPanelEnabled,
      },
    }
  },

  SET_RESPONSIVE_BREAK: (_?: string, ctx?: WorkspaceCtx) => {
    if (ctx?.responsiveBreak === undefined || ctx?.responsiveBreak === null)
      throw new Error(`SET_RESPONSIVE_BREAK called without a ctx value`)

    return {
      win: [],
      ws: {
        responsiveBreak: ctx.responsiveBreak,
      },
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
