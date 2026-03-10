import { JSX, RefObject } from 'react'
import { WindowLayoutProps } from '../internal/features/window-layout'
import { WindowButtonProps } from '../internal/features/window-button'
import { StoreApi, UseBoundStore } from 'zustand'

export type ResizeState = false | 's' | 'e' | 'n' | 'w' | 'se' | 'sw' | 'ne' | 'nw'
export type WindowStates = 'maximized' | 'demaximized'
export type Coord = { pointX: number; pointY: number }

export type WindowRegistration = {
  id: string
  store: UseBoundStore<StoreApi<WindowStore>>
  Window: (props: Omit<WindowLayoutProps, 'winId'>) => JSX.Element
  Button: (props: Omit<WindowButtonProps, 'winId'>) => JSX.Element
}

export type WindowStore = {
  windowId: string

  isActive: boolean
  setIsActive: (isActive: boolean) => void

  resetFlag: boolean
  reset: () => void

  zIndex: number
  setZIndex: (newIndex: number) => void

  self: RefObject<HTMLDivElement | null> | undefined
  setSelf: (ref: RefObject<HTMLDivElement | null>) => void

  winVisualState: WindowStates
  setWinVisualState: (newState: WindowStates) => void

  isWindowClosed: boolean
  setisWindowClosed: (isMini: boolean) => void

  isDragging: boolean
  setIsDragging: (updatedIsDragging: boolean) => void

  winCoord: Coord
  setWinCoord: (newWinCoord: Coord) => void

  resizeAction: ResizeState
  setResizeAction: (updatedIsResizing: ResizeState) => void

  winWidth: number
  setWinWidth: (newWinWidth: number) => void

  winHeight: number
  setWinHeight: (newWinHeight: number) => void

  /* constants */
  WIN_MIN_WIDTH: number
  WIN_MIN_HEIGHT: number
  setWIN_MIN_WIDTH: (w: number) => void
  setWIN_MIN_HEIGHT: (h: number) => void
}
