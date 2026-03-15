import { create } from 'zustand'
import { ResponsiveSizes, WorkspaceRect, WorkspaceStore } from '../../../model/workspace-types'

export const useWorkspaceState = create<WorkspaceStore>((set, get) => ({
  wsElement: null,
  setWsElement: (el: HTMLElement | null) => set({ wsElement: el }),

  activeWindowId: 'react-dynamic-window-instance0',
  setActiveWindowId: (newId: string) => set({ activeWindowId: newId }),

  responsiveBreak: 'sm',
  isBelowBreakPoint: () => get().wsRect.innerWidth < responsiveBreakInPx(get().responsiveBreak),
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

const responsiveBreakInPx = (breakPoint: ResponsiveSizes): number => {
  switch (breakPoint) {
    case 'sm':
      return 640
    case 'md':
      return 768
    case 'lg':
      return 1024
    case 'xl':
      return 1280
    case 'never':
      return 0
    case 'always':
      return Infinity
    default:
      return breakPoint
  }
}
