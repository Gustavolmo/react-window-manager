import { ResponsiveSizes } from '../../../model/workspace-types'
import { useWorkspaceState } from './workspace-state'

export const wsApi = {
  updateWsRect: () => {
    const rect = useWorkspaceState.getState().wsElement?.getBoundingClientRect()

    const top = rect?.top ?? 0
    const left = rect?.left ?? 0
    const innerHeight = rect?.height ?? 0
    const innerWidth = rect?.width ?? 0

    const bottom = top + innerHeight
    const right = left + innerWidth

    const centerX = left + innerWidth / 2
    const centerY = top + innerHeight / 2

    useWorkspaceState.setState({
      wsRect: {
        top: top,
        left: left,
        innerHeight: innerHeight,
        innerWidth: innerWidth,
        bottom: bottom,
        right: right,
        centerX: centerX,
        centerY: centerY,
      },
    })
  },
}

