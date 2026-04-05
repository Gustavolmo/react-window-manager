import { WindowRegistry } from '../model/window-types'

export const windowRegistry: WindowRegistry = {}

/* FIND ME:
 * Singletons like the registry and workspace should be scoped into instance based creation, allowing for a fully contained/scoped use of the library

    BASE IDEA:

    createWorkspace({ "maybe-config?" }) {
        const dependencies = get()
        const runtime = createRuntime(dependencies)
        const api = createApi(dependencies)

        return {
            workspaceElement(),
            createWindow(),
        }
    }
 */
