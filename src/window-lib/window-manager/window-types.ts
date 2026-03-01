import { RefObject } from 'react'

export type WindowStates = 'maximized' | 'demaximized'
export type Coord = { pointX: number; pointY: number }
export type ResizeState =
  | false
  | 'bottom-height'
  | 'right-width'
  | 'top-height'
  | 'left-width'
  | 'bottom-right-all'
  | 'bottom-left-all'

export type WindowStore = {
  /* Self */
  windowId: string

  isActive: boolean
  setIsActive: (isActive: boolean) => void

  resetFlag: boolean
  reset: () => void

  zIndex: number
  setZIndex: (newIndex: number) => void

  self: RefObject<HTMLDivElement | null> | undefined
  setSelf: (ref: RefObject<HTMLDivElement | null>) => void

  /* State handlers */
  winVisualState: WindowStates
  setWinVisualState: (newState: WindowStates) => void

  isWinMinimized: boolean
  setIsWinMinimized: (isMini: boolean) => void

  dragClickOffset: Coord
  setDragClickOffset: (newCoord: Coord) => void

  isDragging: boolean
  setIsDragging: (updatedIsDragging: boolean) => void

  winCoord: Coord
  setWinCoord: (newWinCoord: Coord) => void

  isResizing: ResizeState
  setIsResizing: (updatedIsResizing: ResizeState) => void

  winWidth: number
  setWinWidth: (newWinWidth: number) => void

  winHeight: number
  setWinHeight: (newWinHeight: number) => void

  /* Logic handlers */
  stopDragAndResize: () => void

  openWindow: () => void
  minimizeWindow: () => void

  maximizeWindow: () => void
  demaximizeWindow: () => void

  dockWindowRight: () => void
  dockWindowLeft: () => void

  dockWindowBottomRight: () => void
  dockWindowTopRight: () => void

  dockWindowBottomLeft: () => void
  dockWindowTopLeft: () => void

  /* constants */
  WIN_MIN_WIDTH: number
  WIN_MIN_HEIGHT: number
  setWIN_MIN_WIDTH: (w: number) => void
  setWIN_MIN_HEIGHT: (h: number) => void
}
