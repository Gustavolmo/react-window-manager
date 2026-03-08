import { create, StoreApi, UseBoundStore } from 'zustand'
import { RefObject } from 'react'
import { Coord, ResizeState, WindowApi, WindowStates, WindowStore } from '../model/window-types'
import WindowLayout, { WindowLayoutProps } from '../internal/features/window-layout'
import WindowButton, { WindowButtonProps } from '../internal/features/window-button'

/** @howToUse use the syntax `windowRegistry[<winId>]()` to access a store outside of */
export const windowRegistry: Record<string, UseBoundStore<StoreApi<WindowStore>>> = {}

/**
 * @return `id` auto generated id at the root of the window component. `id` can be used in `windowRegistry` to access the window state store
 * @return `window` JSX component representing an interactive window
 * @return `button` JSX component that control this window */
export const createWindowStore = (bottomOffsetPx: number): WindowApi => {
  const zIndexAtLaunch = Object.keys(windowRegistry).length + 1
  const windowInstanceId = `react-dynamic-window-instance${Object.keys(windowRegistry).length}`

  const storeInstance = create<WindowStore>((set, get) => ({
    windowId: windowInstanceId,

    isActive: false,
    setIsActive: (isActive: boolean) => set({ isActive: isActive }),

    resetFlag: false,
    reset: () => set({ resetFlag: !get().resetFlag, isWindowClosed: true }),

    zIndex: zIndexAtLaunch,
    setZIndex: (newIndex: number) => set({ zIndex: newIndex }),

    self: undefined,
    setSelf: (ref: RefObject<HTMLDivElement | null>) => set({ self: ref }),

    winVisualState: 'demaximized',
    setWinVisualState: (newState: WindowStates) => set({ winVisualState: newState }),

    isWindowClosed: true,
    setisWindowClosed: (isMini: boolean) => set({ isWindowClosed: isMini }),

    isDragging: false,
    setIsDragging: (updatedIsDragging: boolean) => set({ isDragging: updatedIsDragging }),

    winCoord: { pointX: 40, pointY: 40 },
    setWinCoord: (newWinCoord: Coord) =>
      set({ winCoord: { pointX: newWinCoord.pointX, pointY: newWinCoord.pointY } }),

    resizeAction: false,
    setResizeAction: (updatedIsResizing: ResizeState) => set({ resizeAction: updatedIsResizing }),

    winWidth: window.innerWidth * 0.95,
    setWinWidth: (newWinWidth: number) => set({ winWidth: newWinWidth }),

    winHeight: window.innerHeight * 0.75,
    setWinHeight: (newWinHeight: number) => set({ winHeight: newWinHeight }),

    WIN_MIN_WIDTH: 232,
    WIN_MIN_HEIGHT: 128,
    setWIN_MIN_WIDTH: (w: number) => set({ WIN_MIN_WIDTH: w }),
    setWIN_MIN_HEIGHT: (h: number) => set({ WIN_MIN_HEIGHT: h }),

    /* NON WINDOW ESSENTIAL -- POSSIBLE SEPARATION LAYER */
    //dockingApi
    //resizeApi
    //positionApi
    maximizeWindow: () => {
      set({
        winCoord: { pointX: 0, pointY: 0 },
        winHeight: window.innerHeight - bottomOffsetPx,
        winWidth: window.innerWidth,
        winVisualState: 'maximized',
      })
    },
    demaximizeWindow: () => {
      set({
        winCoord: { pointX: window.innerWidth * 0.2, pointY: 40 },
        winWidth: window.innerWidth * 0.6,
        winHeight: window.innerHeight * 0.75,
        winVisualState: 'demaximized',
      })
    },

    closeWindow: () => set({ isWindowClosed: true }),
    openWindow: () => {
      const winRef = get().self
      if (get().isWindowClosed && winRef?.current) {
        set({ isWindowClosed: false })
        winRef.current.style.transform = 'translate(0, 0) scale(1)'
      }
    },

    dockWindowRight: () => {
      set({
        winCoord: { pointX: window.innerWidth / 2, pointY: 0 },
        winWidth: window.innerWidth / 2,
        winHeight: window.innerHeight - bottomOffsetPx,
        winVisualState: 'demaximized',
      })
    },
    dockWindowLeft: () => {
      set({
        winCoord: { pointX: 0, pointY: 0 },
        winWidth: window.innerWidth / 2,
        winHeight: window.innerHeight - bottomOffsetPx,
        winVisualState: 'demaximized',
      })
    },

    dockWindowTop: () => {
      set({
        winCoord: { pointX: 0, pointY: 0 },
        winWidth: window.innerWidth,
        winHeight: window.innerHeight / 2 - bottomOffsetPx / 2,
        winVisualState: 'demaximized',
      })
    },
    dockWindowBottom: () => {
      set({
        winCoord: { pointX: 0, pointY: window.innerHeight / 2 - bottomOffsetPx / 2 },
        winWidth: window.innerWidth,
        winHeight: window.innerHeight / 2 - bottomOffsetPx / 2,
        winVisualState: 'demaximized',
      })
    },

    dockWindowBottomRight: () =>
      set({
        winCoord: {
          pointX: window.innerWidth / 2,
          pointY: window.innerHeight / 2 - bottomOffsetPx / 2,
        },
        winWidth: window.innerWidth / 2,
        winHeight: window.innerHeight / 2 - bottomOffsetPx / 2,
        winVisualState: 'demaximized',
      }),
    dockWindowTopRight: () =>
      set({
        winCoord: { pointX: window.innerWidth / 2, pointY: 0 },
        winWidth: window.innerWidth / 2,
        winHeight: window.innerHeight / 2 - bottomOffsetPx / 2,
        winVisualState: 'demaximized',
      }),

    dockWindowBottomLeft: () =>
      set({
        winCoord: { pointX: 0, pointY: window.innerHeight / 2 - bottomOffsetPx / 2 },
        winWidth: window.innerWidth / 2,
        winHeight: window.innerHeight / 2 - bottomOffsetPx / 2,
        winVisualState: 'demaximized',
      }),
    dockWindowTopLeft: () =>
      set({
        winCoord: { pointX: 0, pointY: 0 },
        winWidth: window.innerWidth / 2,
        winHeight: window.innerHeight / 2 - bottomOffsetPx / 2,
        winVisualState: 'demaximized',
      }),
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
