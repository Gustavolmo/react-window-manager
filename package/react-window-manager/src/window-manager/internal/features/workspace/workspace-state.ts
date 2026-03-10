import { create } from 'zustand'
import { ResponsiveSizes, WorkspaceStore } from '../../../model/workspace-types'

export const useWorkspaceState = create<WorkspaceStore>((set) => ({
  ref: null,
  setRef: (newRef: HTMLElement | null) => set({ ref: newRef }),

  activeWindowId: 'react-dynamic-window-instance0',
  setActiveWindowId: (newId: string) => set({ activeWindowId: newId }),

  responsiveBreak: 'sm',
  setResponsiveBreak: (breakPoint: ResponsiveSizes) => set({ responsiveBreak: breakPoint }),
}))
