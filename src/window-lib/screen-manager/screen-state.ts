import { create } from 'zustand'

/** @Note
 *The word SCREEN is being used to distinguish between the
 * window feature in this library and the real browser window
 * SCREEN == BROWSER REAL WINDOW
 */
type ScreenState = {
  x: number
  y: number
  setX: (x: number) => void
  setY: (y: number) => void
}

export const useScreenState = create<ScreenState>((set) => ({
  x: 10,
  y: 10,
  setX: (newX: number) => set({ x: newX }),
  setY: (newY: number) => set({ y: newY }),
}))
