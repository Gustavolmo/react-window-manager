import { WorkspaceRect } from '../../../model/workspace-types'
import { useWorkspaceState } from '../../features/workspace/workspace-state'
import { WindowMutation } from '../rwm-runtime'

export type DockCommands =
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

type DockResolver = Record<
  DockCommands,
  (targetWinId: string, wsRect: WorkspaceRect) => WindowMutation[]
>
export const dockCommandResolver: DockResolver = {
  DOCK_WINDOW_RIGHT: (targetWinId: string, wsRect: WorkspaceRect) => {
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.centerX, pointY: wsRect.top },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight,
          winVisualState: 'demaximized',
          isDragging: false,
        },
      },
    ]
  },
  DOCK_WINDOW_LEFT: (targetWinId: string, wsRect: WorkspaceRect) => {
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.top },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight,
          winVisualState: 'demaximized',
          isDragging: false,
        },
      },
    ]
  },
  DOCK_WINDOW_TOP: (targetWinId: string, wsRect: WorkspaceRect) => {
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.top },
          winWidth: wsRect.innerWidth,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
          isDragging: false,
        },
      },
    ]
  },
  DOCK_WINDOW_BOTTOM: (targetWinId: string, wsRect: WorkspaceRect) => {
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.centerY },
          winWidth: wsRect.innerWidth,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
          isDragging: false,
        },
      },
    ]
  },
  DOCK_WINDOW_BOTTOM_RIGHT: (targetWinId: string, wsRect: WorkspaceRect) => {
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
          isDragging: false,
        },
      },
    ]
  },
  DOCK_WINDOW_TOP_RIGHT: (targetWinId: string, wsRect: WorkspaceRect) => {
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.centerX, pointY: wsRect.top },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
          isDragging: false,
        },
      },
    ]
  },
  DOCK_WINDOW_BOTTOM_LEFT: (targetWinId: string, wsRect: WorkspaceRect) => {
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.centerY },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
          isDragging: false,
        },
      },
    ]
  },
  DOCK_WINDOW_TOP_LEFT: (targetWinId: string, wsRect: WorkspaceRect) => {
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.top },
          winWidth: wsRect.innerWidth / 2,
          winHeight: wsRect.innerHeight / 2,
          winVisualState: 'demaximized',
          isDragging: false,
        },
      },
    ]
  },
  MAXIMIZE_WINDOW: (targetWinId: string, wsRect: WorkspaceRect) => {
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left, pointY: wsRect.top },
          winHeight: wsRect.innerHeight,
          winWidth: wsRect.innerWidth,
          winVisualState: 'maximized',
          isDragging: false,
        },
      },
    ]
  },
  DEMAXIMIZE_WINDOW: (targetWinId: string, wsRect: WorkspaceRect) => {
    return [
      {
        winId: targetWinId,
        patch: {
          winCoord: { pointX: wsRect.left + 16, pointY: wsRect.top + 16 },
          winWidth: wsRect.innerWidth * 0.95,
          winHeight: wsRect.innerHeight * 0.75,
          winVisualState: 'demaximized',
          isDragging: false,
        },
      },
    ]
  },
}

export const getDockDependencies = () => {
  const { wsRect } = useWorkspaceState.getState()
  return { wsRect }
}
