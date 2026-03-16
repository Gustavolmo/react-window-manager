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

  wsRect: WorkspaceRect
  setWsRect: (rect: WorkspaceRect) => void

  /**
   * Always relative to the WorkspaceLayout dimensions. Use `wsApi.setWsResponsiveBreak` to modify the value
   * @default 'sm'
   * @param sm uses mobile format at 640px
   * @param md uses mobile format at 768px
   * @param lg uses mobile format at 1024px
   * @param xl uses mobile format at 1280px
   * @param never never uses mobile format
   * @param always always uses mobile format
   * @param number set custom break point value in px */
  isBelowBreakPoint: boolean
  responsiveBreak: ResponsiveSizes
}
