import { windowRegistry } from './window-store-factory'

export const stopAllDragAndResize = () => {
  for (const key of Object.keys(windowRegistry)) {
    windowRegistry[key].getState().stopDragAndResize()
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
