import { create } from 'zustand'

type CursorState = {
  x: number
  y: number
  setXY: (x: number, y: number) => void
}

export const useCursorState = create<CursorState>((set) => ({
  x: 10,
  y: 10,
  setXY: (x: number, y: number) => set({ x: x, y: y }),
}))
