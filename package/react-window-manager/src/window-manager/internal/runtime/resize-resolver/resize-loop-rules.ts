import { ResizeDirection } from '../../../model/window-types'
import { windowRegistry } from '../../../registration/window-registry'

export const resolveNeighbourResizeLimit = (activeWinId: string, direction: ResizeDirection) => {
  switch (direction) {
    case 'e':
      return neighbourResizeLimit.e(activeWinId)
    case 'w':
      return neighbourResizeLimit.w(activeWinId)
    case 'n':
      return neighbourResizeLimit.n(activeWinId)
    case 's':
      return neighbourResizeLimit.s(activeWinId)

    default:
      return undefined
  }
}

const neighbourResizeLimit = {
  e: (activeWinId: string) => {
    let leftMostXAtMinWidth = undefined

    for (const key of Object.keys(windowRegistry)) {
      const neighbourWin = windowRegistry[key].getState()
      if (key === activeWinId) continue
      if (neighbourWin.resizeAction !== 'w') continue
      if (neighbourWin.isWindowClosed) continue

      const winBox = neighbourWin.winElement?.getBoundingClientRect()
      if (!winBox) continue

      const xAtMinWidth = winBox.right - neighbourWin.WIN_MIN_WIDTH

      if (leftMostXAtMinWidth === undefined) leftMostXAtMinWidth = xAtMinWidth
      if (leftMostXAtMinWidth > xAtMinWidth) leftMostXAtMinWidth = xAtMinWidth
    }

    return leftMostXAtMinWidth
  },

  w: (activeWinId: string) => {
    let rightMostXAtMinWidth = undefined

    for (const key of Object.keys(windowRegistry)) {
      const neighbourWin = windowRegistry[key].getState()
      if (key === activeWinId) continue
      if (neighbourWin.resizeAction !== 'e') continue
      if (neighbourWin.isWindowClosed) continue

      const winBox = neighbourWin.winElement?.getBoundingClientRect()
      if (!winBox) continue

      const xAtMinWidth = winBox.left + neighbourWin.WIN_MIN_WIDTH

      if (rightMostXAtMinWidth === undefined) rightMostXAtMinWidth = xAtMinWidth
      if (rightMostXAtMinWidth < xAtMinWidth) rightMostXAtMinWidth = xAtMinWidth
    }

    return rightMostXAtMinWidth
  },

  n: (currentWinId: string) => {
    let bottomMostYAtMinWidth = undefined

    for (const key of Object.keys(windowRegistry)) {
      const remoteWin = windowRegistry[key].getState()
      if (key === currentWinId) continue
      if (remoteWin.resizeAction !== 's') continue
      if (remoteWin.isWindowClosed) continue

      const winBox = remoteWin.winElement?.getBoundingClientRect()
      if (!winBox) continue

      const yAtMinWidth = winBox.top + remoteWin.WIN_MIN_HEIGHT

      if (bottomMostYAtMinWidth === undefined) bottomMostYAtMinWidth = yAtMinWidth
      if (bottomMostYAtMinWidth < yAtMinWidth) bottomMostYAtMinWidth = yAtMinWidth
    }

    return bottomMostYAtMinWidth
  },

  s: (currentWinId: string) => {
    let topMostYAtMinWidth = undefined

    for (const key of Object.keys(windowRegistry)) {
      const remoteWin = windowRegistry[key].getState()
      if (key === currentWinId) continue
      if (remoteWin.resizeAction !== 'n') continue
      if (remoteWin.isWindowClosed) continue

      const winBox = remoteWin.winElement?.getBoundingClientRect()
      if (!winBox) continue

      const yAtMinWidth = winBox.bottom - remoteWin.WIN_MIN_HEIGHT

      if (topMostYAtMinWidth === undefined) topMostYAtMinWidth = yAtMinWidth
      if (topMostYAtMinWidth > yAtMinWidth) topMostYAtMinWidth = yAtMinWidth
    }

    return topMostYAtMinWidth
  },
}
