import { create } from 'zustand'
import { WorkspaceStore } from '../../../model/workspace-types'

export const useWorkspaceState = create<WorkspaceStore>((set, get) => ({
  wsElement: null,
  setWsElement: (el: HTMLElement | null) => set({ wsElement: el }),

  responsiveBreak: 'sm',
  isBelowBreakPoint: false,
  isGridEnabled: true,
  activeWindowId: 'react-dynamic-window-instance0',
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
}))
