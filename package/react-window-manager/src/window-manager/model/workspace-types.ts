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

export type WorkspaceStore = {
  wsElement: HTMLElement | null
  setWsElement: (newRef: HTMLElement | null) => void

  activeWindowId: string
  setActiveWindowId: (newId: string) => void

  responsiveBreak: ResponsiveSizes
  setResponsiveBreak: (breakPoint: ResponsiveSizes) => void
  isBelowBreakPoint: () => boolean

  wsRect: WorkspaceRect
  setWsRect: (rect: WorkspaceRect) => void
}
