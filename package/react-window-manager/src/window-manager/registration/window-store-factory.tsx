import { create, StoreApi, UseBoundStore } from 'zustand'
import { RefObject } from 'react'
import {
  Coord,
  ResizeState,
  WindowRegistration,
  WindowStates,
  WindowStore,
} from '../model/window-types'
import WindowLayout, { WindowLayoutProps } from '../internal/features/window-layout'
import WindowButton, { WindowButtonProps } from '../internal/features/window-button'
import { useWorkspaceState } from '../internal/features/workspace/workspace-state'
import { windowRegistry } from './window-registry'

const windownMinWidth = 232
const windownMinHeight = 128

/**
 * @return `id` auto generated id at the root of the window component.`id` can be used in `windowRegistry` to access the state store associated to this window instnace
 * @return
 * `store` zustand state store associated to this window instnace
 * @return
 * `window` JSX component representing an interactive window
 * @return
 * `button` JSX component that control this window */
export const createWindowStore = (): WindowRegistration => {
  const zIndexAtLaunch = Object.keys(windowRegistry).length + 1
  const windowInstanceId = `react-dynamic-window-instance${Object.keys(windowRegistry).length}`

  const storeInstance = create<WindowStore>((set, get) => ({
    windowId: windowInstanceId,

    winElement: undefined,
    setWinElement: (ref: HTMLDivElement | null) => set({ winElement: ref }),

    WIN_MIN_WIDTH: windownMinWidth,
    setWIN_MIN_WIDTH: (w: number) => set({ WIN_MIN_WIDTH: w }),

    WIN_MIN_HEIGHT: windownMinHeight,
    setWIN_MIN_HEIGHT: (h: number) => set({ WIN_MIN_HEIGHT: h }),

    isActive: false,
    setIsActive: (isActive: boolean) => {
      useWorkspaceState.getState().setActiveWindowId(get().windowId)
      set({ isActive: isActive })
    },

    resetFlag: false,
    reset: () => set({ resetFlag: !get().resetFlag, isWindowClosed: true }),

    zIndex: zIndexAtLaunch,
    setZIndex: (newIndex: number) => set({ zIndex: newIndex }),

    winVisualState: 'demaximized',
    setWinVisualState: (newState: WindowStates) => set({ winVisualState: newState }),

    isWindowClosed: true,
    setisWindowClosed: (isClosed: boolean) => set({ isWindowClosed: isClosed }),

    winCoord: { pointX: 40, pointY: 40 },
    setWinCoord: (newWinCoord: Coord) =>
      set({ winCoord: { pointX: newWinCoord.pointX, pointY: newWinCoord.pointY } }),

    winWidth: windownMinWidth,
    setWinWidth: (newWinWidth: number) => set({ winWidth: newWinWidth }),

    winHeight: windownMinHeight,
    setWinHeight: (newWinHeight: number) => set({ winHeight: newWinHeight }),

    resizeAction: false,
    setResizeAction: (updatedIsResizing: ResizeState) => set({ resizeAction: updatedIsResizing }),

    isDragging: false,
    setIsDragging: (updatedIsDragging: boolean) => set({ isDragging: updatedIsDragging }),
  }))

  windowRegistry[windowInstanceId] = storeInstance

  return {
    id: storeInstance.getState().windowId,

    store: storeInstance,

    Window: (props: Omit<WindowLayoutProps, 'winId'>) => (
      <WindowLayout {...props} winId={windowInstanceId} />
    ),

    Button: (props: Omit<WindowButtonProps, 'winId'>) => (
      <WindowButton {...props} winId={windowInstanceId} />
    ),
  }
}
