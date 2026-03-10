import { create } from 'zustand'

export type ResponsiveSizes = 'sm' | 'md' | 'lg' | 'xl' | 'never' | 'always' | number

export type WorkspaceRect = {
  top: number
  left: number
  innerHeight: number
  innerWidth: number
  bottom: number
  right: number
  centerX: number
  centerY: number
}

type WorkspaceStore = {
  ref: HTMLElement | null
  setRef: (newRef: HTMLElement | null) => void

  activeWindowId: string
  setActiveWindowId: (newId: string) => void

  responsiveBreak: ResponsiveSizes
  setResponsiveBreak: (breakPoint: ResponsiveSizes) => void
}

export const useWorkspaceState = create<WorkspaceStore>((set) => ({
  ref: null,
  setRef: (newRef: HTMLElement | null) => set({ ref: newRef }),

  activeWindowId: 'react-dynamic-window-instance0',
  setActiveWindowId: (newId: string) => set({ activeWindowId: newId }),

  responsiveBreak: 'sm',
  setResponsiveBreak: (breakPoint: ResponsiveSizes) => set({ responsiveBreak: breakPoint }),
}))
