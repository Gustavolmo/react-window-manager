// import { WindowStore } from '../model/window-types'
// import { WorkspaceRect } from '../model/workspace-types'
// import { windowRegistry } from '../registration/window-registry'
// import { useWorkspaceState } from './features/workspace/workspace-state'

// type Dispatch = { winId: string; subsystem: 'DOCK'; cmd: DockCommands }
// //   | { winId: string; subsystem: 'WORKSPACE'; cmd: WorkspaceCommands }

// export const rwmRuntime = {
//   dispatch: ({ subsystem, cmd, winId }: Dispatch) => {
//     switch (subsystem) {
//       case 'DOCK': {
//         const patch = dockCommands[cmd]()
//         if (patch) commitToWindow(winId, patch)
//         break
//       }
//     }
//   },
// }

// type DockCommands =
//   | 'DOCK_WINDOW_RIGHT'
//   | 'DOCK_WINDOW_LEFT'
//   | 'DOCK_WINDOW_TOP'
//   | 'DOCK_WINDOW_BOTTOM'
//   | 'DOCK_WINDOW_BOTTOM_RIGHT'
//   | 'DOCK_WINDOW_TOP_RIGHT'
//   | 'DOCK_WINDOW_BOTTOM_LEFT'
//   | 'DOCK_WINDOW_TOP_LEFT'
//   | 'MAXIMIZE_WINDOW'
//   | 'DEMAXIMIZE_WINDOW'
//   | 'CLOSE_WINDOW'
//   | 'OPEN_WINDOW'
// const dockCommands: Record<DockCommands, () => Partial<WindowStore>> = {
//   DOCK_WINDOW_RIGHT: () => {
//     const wsRect = useWorkspaceState.getState().wsRect
//     return {
//       winCoord: { pointX: wsRect.centerX, pointY: wsRect.top },
//       winWidth: wsRect.innerWidth / 2,
//       winHeight: wsRect.innerHeight,
//       winVisualState: 'demaximized',
//     }
//   },
//   DOCK_WINDOW_LEFT: () => {},
//   DOCK_WINDOW_TOP: () => {},
//   DOCK_WINDOW_BOTTOM: () => {},
//   DOCK_WINDOW_BOTTOM_RIGHT: () => {},
//   DOCK_WINDOW_TOP_RIGHT: () => {},
//   DOCK_WINDOW_BOTTOM_LEFT: () => {},
//   DOCK_WINDOW_TOP_LEFT: () => {},
//   MAXIMIZE_WINDOW: () => {},
//   DEMAXIMIZE_WINDOW: () => {},
//   CLOSE_WINDOW: () => {},
//   OPEN_WINDOW: () => {},
// }

// function commitToWindow(winId: string, patch: Partial<WindowStore>) {
//   windowRegistry[winId].setState(patch)
// }

// function commitToWorkspace(patch: Partial<WindowStore>) {}