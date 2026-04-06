import { WindowStore } from '../../../model/window-types'
import { WorkspaceStore } from '../../../model/workspace-types'
import { windowRegistry } from '../../../registration/window-registry'
import { useWorkspaceState } from '../../features/workspace/workspace-state'

export const MAX_HISTORY = 100
const excludedCommands = [
  'UPDATE_WORKSPACE_SIZE',
  'SET_RESPONSIVE_BREAK',
  'SET_WORKSPACE_FEATURES',

  'APPLY_PREVIOUS',
  'APPLY_NEXT',

  'ENABLE_DRAG',
  'ENABLE_RESIZE',
]

export type HistorySnapshot = {
  ws: Partial<WorkspaceStore>
  winState: Partial<WindowStore>[]
}

export const appHistory: {
  snapshots: HistorySnapshot[]
  ptr: number
} = {
  snapshots: [],
  ptr: -1,
}

export function saveSnapshot(cmd: string) {
  if (excludedCommands.includes(cmd)) return

  const snapshot = getSnapshot()
  if (!snapshot) return

  if (appHistory.ptr < appHistory.snapshots.length - 1) {
    appHistory.snapshots = appHistory.snapshots.slice(0, appHistory.ptr + 1)
  }

  appHistory.snapshots.push(snapshot)

  if (appHistory.snapshots.length > MAX_HISTORY) {
    appHistory.snapshots.shift()
  }

  appHistory.ptr = appHistory.snapshots.length - 1
}

const getSnapshot = (): HistorySnapshot | undefined => {
  const { wsElement, setWsElement, ...wsSnapshot } = useWorkspaceState.getState()
  const wsUpdate = structuredClone(wsSnapshot)

  const winStateSnapshots: Partial<WindowStore>[] = []
  for (const key of Object.keys(windowRegistry)) {
    const { winElement, setWinElement, isDragging, resizeAction, ...windowSnapshot } =
      windowRegistry[key].getState()

    winStateSnapshots.push(structuredClone(windowSnapshot))
  }

  if (!isValidSnapshot(winStateSnapshots)) {
    return
  }

  return {
    ws: wsUpdate,
    winState: winStateSnapshots,
  }
}

const isValidSnapshot = (winStateSnapshots: Partial<WindowStore>[]) => {
  if (appHistory.ptr < 0) return true
  const prevSnapshot = appHistory.snapshots[appHistory.ptr].winState

  for (const newWinState of winStateSnapshots) {
    for (const prevWinState of prevSnapshot) {
      if (newWinState.windowId !== prevWinState.windowId) continue

      if (
        newWinState.zIndex !== prevWinState.zIndex ||
        newWinState.winVisualState !== prevWinState.winVisualState ||
        newWinState.isWindowClosed !== prevWinState.isWindowClosed ||
        newWinState.winCoord?.pointX !== prevWinState.winCoord?.pointX ||
        newWinState.winCoord?.pointY !== prevWinState.winCoord?.pointY ||
        newWinState.winWidth !== prevWinState.winWidth ||
        newWinState.winHeight !== prevWinState.winHeight
      )
        return true
    }
  }

  return false
}
