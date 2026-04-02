import { create } from 'zustand'

type CursorState = {
  x: number
  y: number
  setXY: (x: number, y: number) => void
}

/* FIND ME: make this a regular object, ui should not update from cursor movment */
export const useCursorState = create<CursorState>((set) => ({
  x: 10,
  y: 10,
  setXY: (x: number, y: number) => set({ x: x, y: y }),
}))
