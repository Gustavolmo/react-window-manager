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
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  coord: { pointX: 0, pointY: 0 },

  setInnerWidth: (width: number) => set({ innerWidth: width }),
  setInnerHeight: (height: number) => set({ innerHeight: height }),
  setCoord: (newCoord: Coord) => set({ coord: newCoord }),
}))
