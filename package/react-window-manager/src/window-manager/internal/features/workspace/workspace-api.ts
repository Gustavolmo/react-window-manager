import { ResponsiveSizes, WorkspaceRect } from '../../../model/workspace-types'
import { useWorkspaceState } from './workspace-state'

export const wsApi = {
  getRect: (): WorkspaceRect => {
    const rect = useWorkspaceState.getState().ref?.getBoundingClientRect()

    const top = rect?.top ?? 0
    const left = rect?.left ?? 0
    const innerHeight = rect?.height ?? 0
    const innerWidth = rect?.width ?? 0

    const bottom = top + innerHeight
    const right = left + innerWidth

    const centerX = left + innerWidth / 2
    const centerY = top + innerHeight / 2

    const wsWindow = {
      top: top,
      left: left,
      innerHeight: innerHeight,
      innerWidth: innerWidth,
      bottom: bottom,
      right: right,
      centerX: centerX,
      centerY: centerY,
    }

    return wsWindow
  },

  isBelowBreakPoint: (): boolean => {
    const wSpace = wsApi.getRect()
    const breakPoint = useWorkspaceState.getState().responsiveBreak
    return wSpace.innerWidth < responsiveBreakInPx(breakPoint)
  },
}

const responsiveBreakInPx = (breakPoint: ResponsiveSizes): number => {
  switch (breakPoint) {
    case 'sm':
      return 640
    case 'md':
      return 768
    case 'lg':
      return 1024
    case 'xl':
      return 1280
    case 'never':
      return 0
    case 'always':
      return Infinity
    default:
      return breakPoint
  }
}
