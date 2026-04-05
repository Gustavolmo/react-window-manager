import { ResponsiveSizes } from '../../../model/workspace-types'
import { rwmRuntime } from '../../runtime/rwm-runtime'
import { WorkspaceCtx } from '../../runtime/workspace-resolver/workspace-commands'

export const wsApi = {
  /**
   * Always relative to the WorkspaceLayout dimensions. Use `wsApi.setWsResponsiveBreak` to modify the value
   * @default 'sm'
   * @param sm uses mobile format at 640px
   * @param md uses mobile format at 768px
   * @param lg uses mobile format at 1024px
   * @param xl uses mobile format at 1280px
   * @param never never uses mobile format
   * @param always always uses mobile format
   * @param number set custom break point value in px */
  setWsResponsiveBreak: (breakPoint: ResponsiveSizes) => {
    rwmRuntime.dispatch({
      subsystem: 'WORKSPACE',
      cmd: 'SET_RESPONSIVE_BREAK',
      ctx: { responsiveBreak: breakPoint },
    })
  },

  setWsFeatures: ({ isDockPanelEnabled = true, isGridEnabled = true }: WorkspaceCtx) => {
    rwmRuntime.dispatch({
      subsystem: 'WORKSPACE',
      cmd: 'SET_WORKSPACE_FEATURES',
      ctx: { isDockPanelEnabled: isDockPanelEnabled, isGridEnabled: isGridEnabled },
    })
  },

  updateWsSize: () => {
    rwmRuntime.dispatch({ subsystem: 'WORKSPACE', cmd: 'UPDATE_WORKSPACE_SIZE' })
  },
}
