import { WindowStore } from '../../../model/window-types'
import { windowRegistry } from '../../../registration/window-registry'
import { resizeApi } from '../resizing/resizing-api'
import { useWorkspaceState } from '../workspace/workspace-state'

const tolerance = 4

type resizeCaseDependencies = {
  remoteId: string
  thisWinStartY: number
  thisWinEndY: number
  remoteWinStartY: number
  remoteWinEndY: number
  thisWinStartX: number
  thisWinEndX: number
  remoteWinStartX: number
  remoteWinEndX: number
  isRemoteOutside: boolean
}

export const gridOrchestrator = {
  attachAdjacentGridBehavior: (winId: string) => {
    if (!useWorkspaceState.getState().isGridEnabled) return

    if (getOpenWinCount() < 1)
      throw new Error(`gridOrchestrator initalized but all windows are closed`)

    if (getDraggingWinCount() < 1)
      throw new Error(`gridOrchestrator initalized but no window is currently resizing`)

    attachAdjacentGridBehavior(winId)
  },
}
/* FIND ME: Idea, if a remote window gets below minWidth or minHeight, close, else, open again */
const attachAdjacentGridBehavior = (winId: string, visited = new Set<string>()) => {
  if (visited.has(winId)) return
  else visited.add(winId)

  const thisWin = windowRegistry[winId].getState()
  const currentResize = thisWin.resizeAction

  for (const key of Object.keys(windowRegistry)) {
    const remoteWin = windowRegistry[key].getState()
    if (remoteWin.windowId === thisWin.windowId) continue
    if (remoteWin.isWindowClosed) continue
    if (remoteWin.resizeAction) continue
    if (visited.has(remoteWin.windowId)) continue

    const dependencies = buildDependencies(thisWin, remoteWin)

    /* thisWin right edge <::::> remoteWin left edge || remoteWin is stacked up or down */
    if (currentResize === 'e') {
      const isRemoteConneted = resizeCase.whenDraggingEast(dependencies)
      if (isRemoteConneted) attachAdjacentGridBehavior(remoteWin.windowId, visited)
    }

    /* thisWin left edge <::::> remoteWin right edge || remoteWin is stacked up or down */
    if (currentResize === 'w') {
      const isRemoteConneted = resizeCase.whenDragginWest(dependencies)
      if (isRemoteConneted) attachAdjacentGridBehavior(remoteWin.windowId, visited)
    }

    /* thisWin top edge <::::> remoteWin bottom edge || remoteWin is stacked left or right */
    if (currentResize === 'n') {
      const isRemoteConneted = resizeCase.whenDragginNorth(dependencies)
      if (isRemoteConneted) attachAdjacentGridBehavior(remoteWin.windowId, visited)
    }

    /* thisWin bottom edge <::::> remoteWin top edge || remoteWin is stacked left or right */
    if (currentResize === 's') {
      const isRemoteConneted = resizeCase.whenDraggingSouth(dependencies)
      if (isRemoteConneted) attachAdjacentGridBehavior(remoteWin.windowId, visited)
    }
  }
}

const resizeCase = {
  whenDraggingEast: (d: resizeCaseDependencies): boolean => {
    const isOppositeEdgeAlignedOnXAxis = Math.abs(d.thisWinEndX - d.remoteWinStartX) <= tolerance
    const isOverlapOnYAxis =
      d.thisWinStartY <= d.remoteWinEndY && d.thisWinEndY >= d.remoteWinStartY

    const isEdgeResize = isOppositeEdgeAlignedOnXAxis && isOverlapOnYAxis
    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 'w')
      return true
    }

    const isSameEdgeAlignedOnXAxis = Math.abs(d.thisWinEndX - d.remoteWinEndX) <= tolerance
    const isRemoteNorthOrSouthEdgeConnected =
      Math.abs(d.thisWinEndY - d.remoteWinStartY) < tolerance ||
      Math.abs(d.thisWinStartY - d.remoteWinEndY) < tolerance

    const isStackResize = isSameEdgeAlignedOnXAxis && isRemoteNorthOrSouthEdgeConnected
    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 'e')
      return true
    }

    return false
  },

  whenDragginWest: (d: resizeCaseDependencies): boolean => {
    const isOppositeEdgeAlignedOnXAxis = Math.abs(d.thisWinStartX - d.remoteWinEndX) <= tolerance
    const isOverlapOnYAxis =
      d.thisWinStartY <= d.remoteWinEndY && d.thisWinEndY >= d.remoteWinStartY

    const isEdgeResize = isOppositeEdgeAlignedOnXAxis && isOverlapOnYAxis
    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 'e')
      return true
    }

    const isSameEdgeAlignedOnXAxis = Math.abs(d.thisWinStartX - d.remoteWinStartX) <= tolerance
    const isRemoteNorthOrSouthEdgeConnected =
      Math.abs(d.thisWinEndY - d.remoteWinStartY) < tolerance ||
      Math.abs(d.thisWinStartY - d.remoteWinEndY) < tolerance

    const isStackResize = isSameEdgeAlignedOnXAxis && isRemoteNorthOrSouthEdgeConnected
    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 'w')
      return true
    }

    return false
  },

  whenDragginNorth: (d: resizeCaseDependencies): boolean => {
    const isOppositeEdgeAlignedOnYAxis = Math.abs(d.thisWinStartY - d.remoteWinEndY) <= tolerance
    const isOverlapOnXAxis =
      d.thisWinStartX <= d.remoteWinEndX && d.thisWinEndX >= d.remoteWinStartX

    const isEdgeResize = isOppositeEdgeAlignedOnYAxis && isOverlapOnXAxis
    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 's')
      return true
    }

    const isSameEdgeAlignedOnYAxis = Math.abs(d.thisWinStartY - d.remoteWinStartY) <= tolerance
    const isRemoteEastOrWestEdgeConnected =
      Math.abs(d.thisWinEndX - d.remoteWinStartX) < tolerance ||
      Math.abs(d.thisWinStartX - d.remoteWinEndX) < tolerance

    const isStackResize = isSameEdgeAlignedOnYAxis && isRemoteEastOrWestEdgeConnected
    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 'n')
      return true
    }

    return false
  },

  whenDraggingSouth: (d: resizeCaseDependencies): boolean => {
    const isOppositeEdgeAlignedOnYAxis = Math.abs(d.thisWinEndY - d.remoteWinStartY) <= tolerance
    const isOverlapOnXAxis =
      d.thisWinStartX <= d.remoteWinEndX && d.thisWinEndX >= d.remoteWinStartX

    const isEdgeResize = isOppositeEdgeAlignedOnYAxis && isOverlapOnXAxis
    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 'n')
      return true
    }

    const isSameEdgeAlignedOnYAxis = Math.abs(d.thisWinEndY - d.remoteWinEndY) <= tolerance
    const isRemoteEastOrWestEdgeConnected =
      Math.abs(d.thisWinEndX - d.remoteWinStartX) < tolerance ||
      Math.abs(d.thisWinStartX - d.remoteWinEndX) < tolerance

    const isStackResize = isSameEdgeAlignedOnYAxis && isRemoteEastOrWestEdgeConnected
    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 's')
      return true
    }

    return false
  },
}

const buildDependencies = (thisWin: WindowStore, remoteWin: WindowStore) => {
  const thisWinStartY = thisWin.winCoord.pointY
  const thisWinEndY = thisWin.winCoord.pointY + thisWin.winHeight

  const remoteWinStartY = remoteWin.winCoord.pointY
  const remoteWinEndY = remoteWin.winCoord.pointY + remoteWin.winHeight

  const thisWinStartX = thisWin.winCoord.pointX
  const thisWinEndX = thisWin.winCoord.pointX + thisWin.winWidth

  const remoteWinStartX = remoteWin.winCoord.pointX
  const remoteWinEndX = remoteWin.winCoord.pointX + remoteWin.winWidth

  const isRemoteOutside =
    remoteWinEndY !== thisWinEndY ||
    remoteWinEndX !== thisWinEndX ||
    remoteWinStartY !== thisWinStartY ||
    remoteWinStartX !== thisWinStartX

  return {
    remoteId: remoteWin.windowId,
    thisWinStartY: thisWinStartY,
    thisWinEndY: thisWinEndY,
    remoteWinStartY: remoteWinStartY,
    remoteWinEndY: remoteWinEndY,
    thisWinStartX: thisWinStartX,
    thisWinEndX: thisWinEndX,
    remoteWinStartX: remoteWinStartX,
    remoteWinEndX: remoteWinEndX,
    isRemoteOutside: isRemoteOutside,
  }
}

const getDraggingWinCount = () => {
  let isWindowResizingCount = 0
  for (const key of Object.keys(windowRegistry))
    if (windowRegistry[key].getState().resizeAction) isWindowResizingCount++

  return isWindowResizingCount
}

const getOpenWinCount = () => {
  let openWnidowCount = 0
  for (const key of Object.keys(windowRegistry))
    if (!windowRegistry[key].getState().isWindowClosed) openWnidowCount++

  return openWnidowCount
}
