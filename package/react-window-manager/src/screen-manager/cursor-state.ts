import { create } from 'zustand'

type CursorState = {
  x: number
  y: number
  setX: (x: number) => void
  setY: (y: number) => void
}

export const useCursorState = create<CursorState>((set) => ({
  x: 10,
  y: 10,
  setX: (newX: number) => set({ x: newX }),
  setY: (newY: number) => set({ y: newY }),
}))
