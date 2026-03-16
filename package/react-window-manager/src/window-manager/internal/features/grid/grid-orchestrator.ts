import { WindowStore } from '../../../model/window-types'
import { windowRegistry } from '../../../registration/window-registry'
import { resizeApi } from '../resizing/resizing-api'
import { useWorkspaceState } from '../workspace/workspace-state'

const tolerance = 4

type resizeCaseDependencies = {
  remoteId: string
  allowDistantResize: boolean
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
  attachGridBehavior: (winId: string) => {
    if (!useWorkspaceState.getState().isGridEnabled) return

    if (getDraggingWinCount() < 1)
      throw new Error(`Grid orchestration initalized but no window is currently resizing`)

    attachGridBehavior(winId)
  },
}

const attachGridBehavior = (winId: string) => {
  const thisWin = windowRegistry[winId].getState()
  const currentResize = thisWin.resizeAction

  for (const key of Object.keys(windowRegistry)) {
    const remoteWin = windowRegistry[key].getState()
    if (remoteWin.windowId === thisWin.windowId) continue
    if (remoteWin.resizeAction) continue

    const dependencies = buildDependencies(thisWin, remoteWin)

    /* thisWin right edge <::::> remoteWin left edge || remoteWin is stacked */
    if (currentResize === 'e') {
      resizeCase.whenDraggingEast(dependencies)
    }

    /* thisWin left edge <::::> remoteWin right edge || remoteWin is stacked */
    if (currentResize === 'w') {
      resizeCase.whenDragginWest(dependencies)
    }

    /* thisWin top edge <::::> remoteWin bottom edge || remoteWin is stacked */
    if (currentResize === 'n') {
      resizeCase.whenDragginNorth(dependencies)
    }

    /* thisWin bottom edge <::::> remoteWin top edge || remoteWin is stacked */
    if (currentResize === 's') {
      resizeCase.whenDraggingSouth(dependencies)
    }
  }
}

const resizeCase = {
  whenDraggingEast: (d: resizeCaseDependencies) => {
    const isEdgeAlignedOnXAxis = Math.abs(d.thisWinEndX - d.remoteWinStartX) <= tolerance
    const isOverlapOnYAxis =
      d.thisWinStartY <= d.remoteWinEndY && d.thisWinEndY >= d.remoteWinStartY

    const isEdgeResize = d.allowDistantResize
      ? isEdgeAlignedOnXAxis
      : isEdgeAlignedOnXAxis && isOverlapOnYAxis

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

    const isStackResize = d.allowDistantResize
      ? isRemoteOnSameLane && d.isRemoteOutside
      : isRemoteOnSameLane && isRemoteEdgeConnected

    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 'e')
      return
    }
  },

  whenDragginWest: (d: resizeCaseDependencies) => {
    const isEdgeAlignedOnXAxis = Math.abs(d.thisWinStartX - d.remoteWinEndX) <= tolerance
    const isOverlapOnYAxis =
      d.thisWinStartY <= d.remoteWinEndY && d.thisWinEndY >= d.remoteWinStartY

    const isEdgeResize = d.allowDistantResize
      ? isEdgeAlignedOnXAxis
      : isEdgeAlignedOnXAxis && isOverlapOnYAxis

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

    const isStackResize = d.allowDistantResize
      ? isRemoteOnSameLane && d.isRemoteOutside
      : isRemoteOnSameLane && isRemoteEdgeConnected

    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 'w')
    }
  },

  whenDragginNorth: (d: resizeCaseDependencies) => {
    const isEdgeAlignedOnYAxis = Math.abs(d.thisWinStartY - d.remoteWinEndY) <= tolerance
    const isOverlapOnXAxis =
      d.thisWinStartX <= d.remoteWinEndX && d.thisWinEndX >= d.remoteWinStartX

    const isEdgeResize = d.allowDistantResize
      ? isEdgeAlignedOnYAxis
      : isEdgeAlignedOnYAxis && isOverlapOnXAxis

    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 's')
    }

    const isRemoteOnSameLane =
      Math.abs(d.thisWinEndY - d.remoteWinEndY) < tolerance &&
      Math.abs(d.thisWinStartY - d.remoteWinStartY) < tolerance

    const isRemoteEdgeConnected =
      Math.abs(d.thisWinEndX - d.remoteWinStartX) < tolerance ||
      Math.abs(d.thisWinStartX - d.remoteWinEndX) < tolerance

    const isStackResize = d.allowDistantResize
      ? isRemoteOnSameLane && d.isRemoteOutside
      : isRemoteOnSameLane && isRemoteEdgeConnected

    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 'n')
    }
  },

  whenDraggingSouth: (d: resizeCaseDependencies) => {
    const isEdgeAlignedOnYAxis = Math.abs(d.thisWinEndY - d.remoteWinStartY) <= tolerance
    const isOverlapOnXAxis =
      d.thisWinStartX <= d.remoteWinEndX && d.thisWinEndX >= d.remoteWinStartX

    const isEdgeResize = d.allowDistantResize
      ? isEdgeAlignedOnYAxis
      : isEdgeAlignedOnYAxis && isOverlapOnXAxis

    if (isEdgeResize) {
      resizeApi.startResize(d.remoteId, 'n')
    }

    const isRemoteOnSameLane =
      Math.abs(d.thisWinEndY - d.remoteWinEndY) < tolerance &&
      Math.abs(d.thisWinStartY - d.remoteWinStartY) < tolerance

    const isRemoteEdgeConnected =
      Math.abs(d.thisWinEndX - d.remoteWinStartX) < tolerance ||
      Math.abs(d.thisWinStartX - d.remoteWinEndX) < tolerance

    const isStackResize = d.allowDistantResize
      ? isRemoteOnSameLane && d.isRemoteOutside
      : isRemoteOnSameLane && isRemoteEdgeConnected

    if (isStackResize) {
      resizeApi.startResize(d.remoteId, 's')
    }
  },
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

  const allowDistantResize = getOpenWinCount() >= 3

  return {
    remoteId: remoteWin.windowId,
    allowDistantResize: allowDistantResize,
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
