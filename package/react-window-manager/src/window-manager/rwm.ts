import { dockApi } from './internal/features/docking/docking-api'
import { focusApi } from './internal/features/focus/focus-api'
import { stackApi } from './internal/features/stack/stack-api'
import { wsApi } from './internal/features/workspace/workspace-api'
import { useWorkspaceState } from './internal/features/workspace/workspace-state'
import { windowRegistry } from './registration/window-registry'

const { updateWsRect, ...publicWsApi } = wsApi

const rwm = {
  dockApi: dockApi,
  focusApi: focusApi,
  stackApi: stackApi,
  workspaceApi: publicWsApi,

  /**
   * @about
   * Zustand hook, can be used to access the current state of the workspace by either
   * calling `const { <someState> } = worskpaceState()` inside a component or by calling
   * `worskpaceState.getState()` anywhere.
   *
   * @note
   * The hook also exposes the `setState()` method, however, this is highly discouraged. Prefer calling
   * the exposed apis in rwm for state mutation.
   */
  worskpaceState: useWorkspaceState,

  /**
   * @about
   * use the syntax `const { <someState> } = windowRegistry[<winId>]()` inside a component to access
   * the zustand hook or `windowRegistry[<winId>].getState()` to get the current state of a window anywhere
   *
   * @note
   * Each hook also exposes the `setState()` method, however, this is highly discouraged. Prefer calling
   * the exposed apis in rwm for state mutation.
   */
  windowRegistry: windowRegistry,
}

export default rwm
