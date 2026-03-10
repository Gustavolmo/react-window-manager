import { windowRegistry } from '../../../registration/window-registry'

export const stackApi = {
  bringTargetWindowToFront: (targetId: string) => {
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
  },

  getOpenedWindowCount: () => {
    let openWnidowCount = 0
    for (const key of Object.keys(windowRegistry))
      if (!windowRegistry[key].getState().isWindowClosed) openWnidowCount++

    return openWnidowCount
  },

  resetStack: () => {
    for (const key of Object.keys(windowRegistry)) {
      windowRegistry[key].getState().reset()
    }
  },
}
