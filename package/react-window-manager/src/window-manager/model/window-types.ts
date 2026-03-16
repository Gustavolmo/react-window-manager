import { JSX } from 'react'
import { WindowLayoutProps } from '../internal/features/window-layout'
import { WindowButtonProps } from '../internal/features/window-button'
import { StoreApi, UseBoundStore } from 'zustand'

export type WindowRegistry = Record<string, UseBoundStore<StoreApi<WindowStore>>>
export type ResizeDirection = false | 's' | 'e' | 'n' | 'w' | 'se' | 'sw' | 'ne' | 'nw'
export type WindowStates = 'maximized' | 'demaximized'
export type Coord = { pointX: number; pointY: number }

export type WindowRegistration = {
  id: string
  store: UseBoundStore<StoreApi<WindowStore>>
  Window: (props: Omit<WindowLayoutProps, 'winId'>) => JSX.Element
  Button: (props: Omit<WindowButtonProps, 'winId'>) => JSX.Element
}

export type WindowStore = {
  setWinElement: (ref: HTMLDivElement | null) => void
  winElement: HTMLDivElement | null | undefined
  windowId: string
  resetFlag: boolean

  zIndex: number
  winCoord: Coord
  winVisualState: WindowStates

  isActive: boolean
  isDragging: boolean
  isWindowClosed: boolean
  resizeAction: ResizeDirection

  winWidth: number
  winHeight: number

  WIN_MIN_WIDTH: number
  WIN_MIN_HEIGHT: number
}
