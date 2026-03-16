import { create } from 'zustand'
import { WorkspaceRect, WorkspaceStore } from '../../../model/workspace-types'

export const useWorkspaceState = create<WorkspaceStore>((set, get) => ({
  wsElement: null,
  setWsElement: (el: HTMLElement | null) => set({ wsElement: el }),

  activeWindowId: 'react-dynamic-window-instance0',
  setActiveWindowId: (newId: string) => set({ activeWindowId: newId }),

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

  responsiveBreak: 'sm',
  isBelowBreakPoint: false
}))
