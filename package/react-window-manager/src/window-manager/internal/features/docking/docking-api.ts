import { windowRegistry } from '../../../registration/window-registry'
import { rwmRuntime } from '../../runtime/rwm-runtime'

export const dockApi = {
  dockWindowRight: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_RIGHT',
    }),

  dockWindowLeft: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_LEFT',
    }),

  dockWindowTop: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_TOP',
    }),

  dockWindowBottom: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_BOTTOM',
    }),

  dockWindowBottomRight: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_BOTTOM_RIGHT',
    }),

  dockWindowTopRight: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_TOP_RIGHT',
    }),

  dockWindowBottomLeft: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_BOTTOM_LEFT',
    }),

  dockWindowTopLeft: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DOCK_WINDOW_TOP_LEFT',
    }),

  maximizeWindow: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'MAXIMIZE_WINDOW',
    }),

  maximizeAllWindows: () =>
    rwmRuntime.dispatch({
      targetWinId: '_',
      subsystem: 'DOCK',
      cmd: 'MAXIMIZE_ALL_WINDOWS',
    }),

  demaximizeWindow: (winId: string) =>
    rwmRuntime.dispatch({
      targetWinId: winId,
      subsystem: 'DOCK',
      cmd: 'DEMAXIMIZE_WINDOW',
    }),
}
