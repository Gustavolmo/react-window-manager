import { dockApi } from "./internal/features/docking/docking-api"
import { resizeApi } from "./internal/features/resizing/resizing-api"
import { stackApi } from "./internal/features/stack/stack-api"
import { wsApi } from "./internal/features/workspace/workspace-api"
import { useWorkspaceState } from "./internal/features/workspace/workspace-state"

const rwm = {
    dockApi: dockApi,
    resizeApi: resizeApi,
    stackApi: stackApi,
    workspaceApi: wsApi,
    worskpaceState: useWorkspaceState
}

export default rwm