import { rwmRuntime } from '../../runtime/rwm-runtime'

export const dockApi = {
  dockWindowRight: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_RIGHT',
      ctx: null,
    }),

  dockWindowLeft: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_LEFT',
      ctx: null,
    }),

  dockWindowTop: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_TOP',
      ctx: null,
    }),

  dockWindowBottom: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_BOTTOM',
      ctx: null,
    }),

  dockWindowBottomRight: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_BOTTOM_RIGHT',
      ctx: null,
    }),

  dockWindowTopRight: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_TOP_RIGHT',
      ctx: null,
    }),

  dockWindowBottomLeft: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_BOTTOM_LEFT',
      ctx: null,
    }),

  dockWindowTopLeft: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_TOP_LEFT',
      ctx: null,
    }),

  maximizeWindow: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'MAXIMIZE_WINDOW',
      ctx: null,
    }),

  demaximizeWindow: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DEMAXIMIZE_WINDOW',
      ctx: null,
    }),
}
