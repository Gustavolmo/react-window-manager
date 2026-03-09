import { windowRegistry } from '../../registration/window-store-factory'

export const stopAllDragAndResize = () => {
  for (const key of Object.keys(windowRegistry)) {
    windowRegistry[key].getState().isDragging = false
    windowRegistry[key].getState().resizeAction = false
  }
}

export const resetAllWindows = () => {
  for (const key of Object.keys(windowRegistry)) {
    windowRegistry[key].getState().reset()
  }
}

export const bringTargetWindowToFront = (targetId: string) => {
  const targetWindow = windowRegistry[targetId].getState()

  for (const key of Object.keys(windowRegistry)) {
    const window = windowRegistry[key].getState()

    if (window.windowId === targetWindow.windowId) {
      continue
    }

    window.setIsActive(false)
    if (window.zIndex >= targetWindow.zIndex) {
      window.setZIndex(window.zIndex - 1)
    }
  }

  targetWindow.setZIndex(Object.keys(windowRegistry).length)
  targetWindow.setIsActive(true)
}

export const getOpenedWindowCount = () => {
  let openWnidowCount = 0

  for (const key of Object.keys(windowRegistry)) {
    if (!windowRegistry[key].getState().isWindowClosed) openWnidowCount++
  }

  return openWnidowCount
}

/**
 * @FixMe
 * This code tried to maintain the proportions of opened windows when resizing.
 * Should consider using the workspace as a reference in a state as well - major change.
 * */
// type ViewportSize = {
//   width: number
//   height: number
// }
// export const adjustAllWindowsToViewport = (
//   prevViewport: ViewportSize,
//   nextViewport: ViewportSize,
//   bottomOffsetPx: number
// ) => {
//   for (const key of Object.keys(windowRegistry)) {
//     const store = windowRegistry[key]
//     const state = store.getState()

//     const { winCoord, winWidth, winHeight, WIN_MIN_WIDTH, WIN_MIN_HEIGHT, winVisualState } = state

//     if (winVisualState === 'maximized') {
//       store.setState({
//         winCoord: { pointX: 0, pointY: 0 },
//         winWidth: nextViewport.width,
//         winHeight: nextViewport.height - bottomOffsetPx,
//       })
//       continue
//     }

//     const leftRatio = winCoord.pointX / prevViewport.width
//     const topRatio = winCoord.pointY / prevViewport.height
//     const widthRatio = winWidth / prevViewport.width
//     const heightRatio = winHeight / prevViewport.height

//     const nextWidth = widthRatio * nextViewport.width
//     const nextHeight = heightRatio * nextViewport.height
//     const nextX = leftRatio * nextViewport.width
//     const nextY = topRatio * nextViewport.height

//     const usableHeight = nextViewport.height - bottomOffsetPx

//     if (nextWidth < WIN_MIN_WIDTH || nextHeight < WIN_MIN_HEIGHT) {
//       state.reset()
//       continue
//     }

//     const clampedWidth = Math.min(nextWidth, nextViewport.width)
//     const clampedHeight = Math.min(nextHeight, usableHeight)

//     const clampedX = Math.max(0, Math.min(nextX, nextViewport.width - clampedWidth))
//     const clampedY = Math.max(0, Math.min(nextY, usableHeight - clampedHeight))

//     store.setState({
//       winCoord: {
//         pointX: clampedX,
//         pointY: clampedY,
//       },
//       winWidth: clampedWidth,
//       winHeight: clampedHeight,
//     })
//   }
// }
