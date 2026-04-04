import { JSX } from 'react'
import { WindowLayoutProps } from '../internal/features/window-layout'
import { WindowButtonProps } from '../internal/features/window-button'
import { StoreApi, UseBoundStore } from 'zustand'

export type RwmWindowProps = Omit<WindowLayoutProps, 'winId'>
export type RwmButtonProps = Omit<WindowButtonProps, 'winId'>

export type DockPosition =
  | 'right'
  | 'left'
  | 'full'
  | 'top'
  | 'bottom'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'default'

export type WindowRegistry = Record<string, UseBoundStore<StoreApi<WindowStore>>>
export type ResizeDirection = false | 's' | 'e' | 'n' | 'w' | 'se' | 'sw' | 'ne' | 'nw'
export type WindowStates = 'maximized' | 'demaximized'
export type Point = { pointX: number; pointY: number }

export type WindowRegistration = {
  id: string
  store: UseBoundStore<StoreApi<WindowStore>>
  Window: (props: RwmWindowProps) => JSX.Element
  Button: (props: RwmButtonProps) => JSX.Element
}

export type WindowStore = {
  setWinElement: (ref: HTMLDivElement | null) => void
  winElement: HTMLDivElement | null | undefined
  windowId: string

  zIndex: number

  winCoord: Point
  winWidth: number
  winHeight: number
  
  isActive: boolean
  isDragging: boolean
  isWindowClosed: boolean
  resizeAction: ResizeDirection
  winVisualState: WindowStates
  

  WIN_MIN_WIDTH: number
  WIN_MIN_HEIGHT: number
}

// lastWinRect
// winRect