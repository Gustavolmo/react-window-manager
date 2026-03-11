import { create } from 'zustand'
import { ResponsiveSizes, WorkspaceRect, WorkspaceStore } from '../../../model/workspace-types'

export const useWorkspaceState = create<WorkspaceStore>((set) => ({
  wsElement: null,
  setWsElement: (el: HTMLElement | null) => set({ wsElement: el }),

  activeWindowId: 'react-dynamic-window-instance0',
  setActiveWindowId: (newId: string) => set({ activeWindowId: newId }),

  responsiveBreak: 'sm',
  setResponsiveBreak: (breakPoint: ResponsiveSizes) => set({ responsiveBreak: breakPoint }),

  wsRect: {
    top: 0,
    left: 0,
    innerHeight: 0,
    innerWidth: 0,
    bottom: 0,
    right: 0,
    centerX: 0,
    centerY: 0,
  },
  setWsRect: (rect: WorkspaceRect) => set({ wsRect: rect }),
}))
