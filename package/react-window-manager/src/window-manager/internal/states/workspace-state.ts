import { create } from 'zustand'
import { Coord } from '../../model/window-types'

type WorkspaceState = {
  innerWidth: number
  innerHeight: number
  coord: Coord

  setInnerWidth: (width: number) => void
  setInnerHeight: (height: number) => void
  setCoord: (newCoord: Coord) => void
}

export const useWorkspaceState = create<WorkspaceState>((set) => ({
  innerWidth: 0,
  innerHeight: 0,
  coord: { pointX: 0, pointY: 0 },

  setInnerWidth: (newWidth: number) => set({ innerWidth: newWidth }),
  setInnerHeight: (newHeight: number) => set({ innerHeight: newHeight }),
  setCoord: (newCoord: Coord) => set({ coord: newCoord }),
}))
