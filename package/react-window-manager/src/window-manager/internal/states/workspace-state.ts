import { create } from 'zustand'

export type ResponsiveSizes = 'sm' | 'md' | 'lg' | 'xl' | 'never' | 'always' | number

type WorkspaceRect = {
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

export const getWSRect = (): WorkspaceRect => {
  const rect = useWorkspaceState.getState().ref?.getBoundingClientRect()

  const top = rect?.top ?? 0
  const left = rect?.left ?? 0
  const innerHeight = rect?.height ?? 0
  const innerWidth = rect?.width ?? 0

  const bottom = top + innerHeight
  const right = left + innerWidth

  const centerX = left + innerWidth / 2
  const centerY = top + innerHeight / 2

  const wsWindow = {
    top: top,
    left: left,
    innerHeight: innerHeight,
    innerWidth: innerWidth,
    bottom: bottom,
    right: right,
    centerX: centerX,
    centerY: centerY,
  }

  return wsWindow
}

export const isBelowBreakPoint = (responsiveBreak: ResponsiveSizes): boolean => {
  const wSpace = getWSRect()
  return wSpace.innerWidth < responsiveBreakInPx(responsiveBreak)
}

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
