import { windowRegistry } from '../../../registration/window-store-factory'
import { stackApi } from '../stack/stack-api'

export const gridApi = {
  orchestrateGridResize: (winId: string) => orchestrationGridResize(winId),
}

/**
 * @FixMe Most complex feature:
 * this function is a nice feature, needs to be written in a clearer way.
 * Multi-window tiling can be brittle
 * - isRemoteOutside needs refinement
 * - needs a stop if the other window stops moving
 * - stack should detect alignment
 * */
const orchestrationGridResize = (winId: string) => {
  const tolerance = 4
  const allowDistantResize = stackApi.getOpenedWindowCount() >= 3
  const thisWin = windowRegistry[winId].getState()
  const currentResize = thisWin.resizeAction

  for (const key of Object.keys(windowRegistry)) {
    const remoteWin = windowRegistry[key].getState()

    if (remoteWin.windowId === thisWin.windowId) {
      continue
    }

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
    /*
     * thisWin right edge <::::> remoteWin left edge || remoteWin is stacked */
    if (currentResize === 'right-width') {
      const isEdgeAlignedOnXAxis = Math.abs(thisWinEndX - remoteWinStartX) <= tolerance
      const isOverlapOnYAxis = thisWinStartY <= remoteWinEndY && thisWinEndY >= remoteWinStartY

      const isEdgeResize = allowDistantResize
        ? isEdgeAlignedOnXAxis
        : isEdgeAlignedOnXAxis && isOverlapOnYAxis
      if (isEdgeResize) {
        remoteWin.setResizeAction('left-width')
      }

      const isRemoteOnSameLane =
        Math.abs(thisWinEndX - remoteWinEndX) < tolerance &&
        Math.abs(thisWinStartX - remoteWinStartX) < tolerance
      const isRemoteEdgeConnected =
        Math.abs(thisWinEndY - remoteWinStartY) < tolerance ||
        Math.abs(thisWinStartY - remoteWinEndY) < tolerance

      const isStackResize = allowDistantResize
        ? isRemoteOnSameLane && isRemoteOutside
        : isRemoteOnSameLane && isRemoteEdgeConnected
      if (isStackResize) {
        remoteWin.setResizeAction('right-width')
      }
    }

    /*
     * thisWin left edge <::::> remoteWin right edge || remoteWin is stacked */
    if (currentResize === 'left-width') {
      const isEdgeAlignedOnXAxis = Math.abs(thisWinStartX - remoteWinEndX) <= tolerance
      const isOverlapOnYAxis = thisWinStartY <= remoteWinEndY && thisWinEndY >= remoteWinStartY

      const isEdgeResize = allowDistantResize
        ? isEdgeAlignedOnXAxis
        : isEdgeAlignedOnXAxis && isOverlapOnYAxis
      if (isEdgeResize) {
        remoteWin.setResizeAction('right-width')
      }

      const isRemoteOnSameLane =
        Math.abs(thisWinEndX - remoteWinEndX) < tolerance &&
        Math.abs(thisWinStartX - remoteWinStartX) < tolerance
      const isRemoteEdgeConnected =
        Math.abs(thisWinEndY - remoteWinStartY) < tolerance ||
        Math.abs(thisWinStartY - remoteWinEndY) < tolerance

      const isStackResize = allowDistantResize
        ? isRemoteOnSameLane && isRemoteOutside
        : isRemoteOnSameLane && isRemoteEdgeConnected
      if (isStackResize) {
        remoteWin.setResizeAction('left-width')
      }
    }

    /*
     * thisWin top edge <::::> remoteWin bottom edge || remoteWin is stacked */
    if (currentResize === 'top-height') {
      const isEdgeAlignedOnYAxis = Math.abs(thisWinStartY - remoteWinEndY) <= tolerance
      const isOverlapOnXAxis = thisWinStartX <= remoteWinEndX && thisWinEndX >= remoteWinStartX

      const isEdgeResize = allowDistantResize
        ? isEdgeAlignedOnYAxis
        : isEdgeAlignedOnYAxis && isOverlapOnXAxis
      if (isEdgeResize) {
        remoteWin.setResizeAction('bottom-height')
      }

      const isRemoteOnSameLane =
        Math.abs(thisWinEndY - remoteWinEndY) < tolerance &&
        Math.abs(thisWinStartY - remoteWinStartY) < tolerance
      const isRemoteEdgeConnected =
        Math.abs(thisWinEndX - remoteWinStartX) < tolerance ||
        Math.abs(thisWinStartX - remoteWinEndX) < tolerance

      const isStackResize = allowDistantResize
        ? isRemoteOnSameLane && isRemoteOutside
        : isRemoteOnSameLane && isRemoteEdgeConnected
      if (isStackResize) {
        remoteWin.setResizeAction('top-height')
      }
    }

    /*
     * thisWin bottom edge <::::> remoteWin top edge || remoteWin is stacked */
    if (currentResize === 'bottom-height') {
      const isEdgeAlignedOnYAxis = Math.abs(thisWinEndY - remoteWinStartY) <= tolerance
      const isOverlapOnXAxis = thisWinStartX <= remoteWinEndX && thisWinEndX >= remoteWinStartX

      const isEdgeResize = allowDistantResize
        ? isEdgeAlignedOnYAxis
        : isEdgeAlignedOnYAxis && isOverlapOnXAxis
      if (isEdgeResize) {
        remoteWin.setResizeAction('top-height')
      }

      const isRemoteOnSameLane =
        Math.abs(thisWinEndY - remoteWinEndY) < tolerance &&
        Math.abs(thisWinStartY - remoteWinStartY) < tolerance
      const isRemoteEdgeConnected =
        Math.abs(thisWinEndX - remoteWinStartX) < tolerance ||
        Math.abs(thisWinStartX - remoteWinEndX) < tolerance

      const isStackResize = allowDistantResize
        ? isRemoteOnSameLane && isRemoteOutside
        : isRemoteOnSameLane && isRemoteEdgeConnected
      if (isStackResize) {
        remoteWin.setResizeAction('bottom-height')
      }
    }
  }
}
