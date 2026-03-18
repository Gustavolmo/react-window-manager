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

/* FIND ME:
 * Propagation based orchestration, needs refinement, but the core conept is good
 */
const attachAdjacentGridBehavior = (winId: string) => {
  console.log('ORCHESTRATING WINDOW ->', winId)
  const thisWin = windowRegistry[winId].getState()
  const currentResize = thisWin.resizeAction

  for (const key of Object.keys(windowRegistry)) {
    const remoteWin = windowRegistry[key].getState()
    if (remoteWin.windowId === thisWin.windowId) continue
    if (remoteWin.isWindowClosed) continue
    if (remoteWin.resizeAction) continue

    const dependencies = buildDependencies(thisWin, remoteWin)

    /* thisWin right edge <::::> remoteWin left edge || remoteWin is stacked up or down */
    if (currentResize === 'e') {
      resizeCase.whenDraggingEast(dependencies)
      attachAdjacentGridBehavior(remoteWin.windowId)
    }

    /* thisWin left edge <::::> remoteWin right edge || remoteWin is stacked up or down */
    if (currentResize === 'w') {
      resizeCase.whenDragginWest(dependencies)
      attachAdjacentGridBehavior(remoteWin.windowId)
    }

    /* thisWin top edge <::::> remoteWin bottom edge || remoteWin is stacked left or right */
    if (currentResize === 'n') {
      resizeCase.whenDragginNorth(dependencies)
      attachAdjacentGridBehavior(remoteWin.windowId)
    }

    /* thisWin bottom edge <::::> remoteWin top edge || remoteWin is stacked left or right */
    if (currentResize === 's') {
      resizeCase.whenDraggingSouth(dependencies)
      attachAdjacentGridBehavior(remoteWin.windowId)
    }
  }
}

const resizeCase = {
  whenDraggingEast: (d: resizeCaseDependencies) => {
    const isEdgeAlignedOnXAxis = Math.abs(d.thisWinEndX - d.remoteWinStartX) <= tolerance
    const isOverlapOnYAxis =
      d.thisWinStartY <= d.remoteWinEndY && d.thisWinEndY >= d.remoteWinStartY

    const isEdgeResize = isEdgeAlignedOnXAxis && isOverlapOnYAxis

    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 'w')
      return
    }

    const isRemoteOnSameLane =
      Math.abs(d.thisWinEndX - d.remoteWinEndX) < tolerance &&
      Math.abs(d.thisWinStartX - d.remoteWinStartX) < tolerance

    const isRemoteEdgeConnected =
      Math.abs(d.thisWinEndY - d.remoteWinStartY) < tolerance ||
      Math.abs(d.thisWinStartY - d.remoteWinEndY) < tolerance

    const isStackResize = isRemoteOnSameLane && isRemoteEdgeConnected

    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 'e')
      return
    }
  },

  whenDragginWest: (d: resizeCaseDependencies) => {
    const isEdgeAlignedOnXAxis = Math.abs(d.thisWinStartX - d.remoteWinEndX) <= tolerance
    const isOverlapOnYAxis =
      d.thisWinStartY <= d.remoteWinEndY && d.thisWinEndY >= d.remoteWinStartY

    const isEdgeResize = isEdgeAlignedOnXAxis && isOverlapOnYAxis

    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 'e')
      return
    }

    const isRemoteOnSameLane =
      Math.abs(d.thisWinEndX - d.remoteWinEndX) < tolerance &&
      Math.abs(d.thisWinStartX - d.remoteWinStartX) < tolerance

    const isRemoteEdgeConnected =
      Math.abs(d.thisWinEndY - d.remoteWinStartY) < tolerance ||
      Math.abs(d.thisWinStartY - d.remoteWinEndY) < tolerance

    const isStackResize = isRemoteOnSameLane && isRemoteEdgeConnected

    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 'w')
    }
  },

  whenDragginNorth: (d: resizeCaseDependencies) => {
    const isEdgeAlignedOnYAxis = Math.abs(d.thisWinStartY - d.remoteWinEndY) <= tolerance
    const isOverlapOnXAxis =
      d.thisWinStartX <= d.remoteWinEndX && d.thisWinEndX >= d.remoteWinStartX

    const isEdgeResize = isEdgeAlignedOnYAxis && isOverlapOnXAxis

    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 's')
    }

    const isRemoteOnSameLane =
      Math.abs(d.thisWinEndY - d.remoteWinEndY) < tolerance &&
      Math.abs(d.thisWinStartY - d.remoteWinStartY) < tolerance

    const isRemoteEdgeConnected =
      Math.abs(d.thisWinEndX - d.remoteWinStartX) < tolerance ||
      Math.abs(d.thisWinStartX - d.remoteWinEndX) < tolerance

    const isStackResize = isRemoteOnSameLane && isRemoteEdgeConnected

    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 'n')
    }
  },

  whenDraggingSouth: (d: resizeCaseDependencies) => {
    const isEdgeAlignedOnYAxis = Math.abs(d.thisWinEndY - d.remoteWinStartY) <= tolerance
    const isOverlapOnXAxis =
      d.thisWinStartX <= d.remoteWinEndX && d.thisWinEndX >= d.remoteWinStartX

    const isEdgeResize = isEdgeAlignedOnYAxis && isOverlapOnXAxis

    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 'n')
    }

    const isRemoteOnSameLane =
      Math.abs(d.thisWinEndY - d.remoteWinEndY) < tolerance &&
      Math.abs(d.thisWinStartY - d.remoteWinStartY) < tolerance

    const isRemoteEdgeConnected =
      Math.abs(d.thisWinEndX - d.remoteWinStartX) < tolerance ||
      Math.abs(d.thisWinStartX - d.remoteWinEndX) < tolerance

    const isStackResize = isRemoteOnSameLane && isRemoteEdgeConnected

    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 's')
    }
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
