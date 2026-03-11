import { rwmRuntime } from '../../runtime'

export const dockApi = {
  dockWindowRight: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'DOCK_WINDOW_RIGHT' }),

  dockWindowLeft: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'DOCK_WINDOW_LEFT' }),

  dockWindowTop: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'DOCK_WINDOW_TOP' }),

  dockWindowBottom: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'DOCK_WINDOW_BOTTOM' }),

  dockWindowBottomRight: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'DOCK_WINDOW_BOTTOM_RIGHT' }),

  dockWindowTopRight: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'DOCK_WINDOW_TOP_RIGHT' }),

  dockWindowBottomLeft: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'DOCK_WINDOW_BOTTOM_LEFT' }),

  dockWindowTopLeft: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'DOCK_WINDOW_TOP_LEFT' }),

  maximizeWindow: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'MAXIMIZE_WINDOW' }),

  demaximizeWindow: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'DEMAXIMIZE_WINDOW' }),

  closeWindow: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'CLOSE_WINDOW' }),

  openWindow: (winId: string) =>
    rwmRuntime.dispatch({ winId: winId, subsystem: 'DOCK', cmd: 'OPEN_WINDOW' }),
}
