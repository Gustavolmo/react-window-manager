import { WindowStore } from '../../../model/window-types'
import { WorkspaceStore } from '../../../model/workspace-types'
import { windowRegistry } from '../../../registration/window-registry'
import { useWorkspaceState } from '../../features/workspace/workspace-state'

export const MAX_HISTORY = 100
const excludedCommands = [
  'UPDATE_WORKSPACE_SIZE',

  'APPLY_PREVIOUS',
  'APPLY_NEXT',

  'ENABLE_DRAG',
  'DISABLE_DRAG',

  'ENABLE_RESIZE',
  'DISABLE_RESIZE',
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
  if (appHistory.ptr < appHistory.snapshots.length - 1) {
    appHistory.snapshots = appHistory.snapshots.slice(0, appHistory.ptr + 1)
  }

  const snapshot = getSnapshot()

  appHistory.snapshots.push(snapshot)

  if (appHistory.snapshots.length > MAX_HISTORY) {
    appHistory.snapshots.shift()
  }

  appHistory.ptr = appHistory.snapshots.length - 1
}

const getSnapshot = () => {
  const { wsRect, wsElement, setWsElement, ...ws } = useWorkspaceState.getState()
  const wsUpdate = structuredClone(ws)

  const winStateUpdate: Partial<WindowStore>[] = []
  for (const key of Object.keys(windowRegistry)) {
    const { setWinElement, winElement, isDragging, resizeAction, ...windowState } =
      windowRegistry[key].getState()

    winStateUpdate.push(structuredClone(windowState))
  }

  return {
    ws: wsUpdate,
    winState: winStateUpdate,
  }
}
