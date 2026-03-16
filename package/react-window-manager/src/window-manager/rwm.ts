import { dockApi } from './internal/features/docking/docking-api'
import { focusApi } from './internal/features/focus/focus-api'
import { stackApi } from './internal/features/stack/stack-api'
import { wsApi } from './internal/features/workspace/workspace-api'
import { useWorkspaceState } from './internal/features/workspace/workspace-state'
import { windowRegistry } from './registration/window-registry'

const rwm = {
  dockApi: dockApi,
  focusApi: focusApi,
  stackApi: stackApi,
  workspaceApi: { setWsResponsiveBreak: wsApi.setWsResponsiveBreak },
  worskpaceState: useWorkspaceState,
  windowRegistry: windowRegistry,
}

export default rwm
