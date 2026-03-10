import { windowRegistry } from '../../../registration/window-store-factory'

// IN PROGRESS
export const resizeApi = {
  stopAllDragAndResize: () => {
    for (const key of Object.keys(windowRegistry)) {
      windowRegistry[key].getState().isDragging = false
      windowRegistry[key].getState().resizeAction = false
    }
  },
}