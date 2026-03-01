import { create, StoreApi, UseBoundStore } from 'zustand'
import { RefObject } from 'react'
import { Coord, ResizeState, WindowStates, WindowStore } from './window-types'

export const windowRegistry: Record<string, UseBoundStore<StoreApi<WindowStore>>> = {}

export const createWindowStore = (windowId: string, bottomOffsetPx: number) => {
  if (windowRegistry[windowId]) throw new Error('This store ID is already in use: ' + windowId)

  const zIndexAtLaunch = Object.keys(windowRegistry).length + 1

  const storeInstance = create<WindowStore>((set, get) => ({
    windowId: windowId,

    isActive: false,
    setIsActive: (isActive: boolean) => set({ isActive: isActive }),

    resetFlag: false,
    reset: () => set({ resetFlag: !get().resetFlag, isWinMinimized: true }),

    zIndex: zIndexAtLaunch,
    setZIndex: (newIndex: number) => set({ zIndex: newIndex }),

    self: undefined,
    setSelf: (ref: RefObject<HTMLDivElement | null>) => set({ self: ref }),

    winVisualState: 'demaximized',
    setWinVisualState: (newState: WindowStates) => set({ winVisualState: newState }),

    isWinMinimized: true,
    setIsWinMinimized: (isMini: boolean) => set({ isWinMinimized: isMini }),

    dragClickOffset: { pointX: 0, pointY: 0 },
    setDragClickOffset: (newCoord: Coord) =>
      set({ dragClickOffset: { pointX: newCoord.pointX, pointY: newCoord.pointY } }),

    isDragging: false,
    setIsDragging: (updatedIsDragging: boolean) => set({ isDragging: updatedIsDragging }),

    winCoord: { pointX: 40, pointY: 40 },
    setWinCoord: (newWinCoord: Coord) =>
      set({ winCoord: { pointX: newWinCoord.pointX, pointY: newWinCoord.pointY } }),

    isResizing: false,
    setIsResizing: (updatedIsResizing: ResizeState) => set({ isResizing: updatedIsResizing }),

    winWidth: window.innerWidth * 0.95,
    setWinWidth: (newWinWidth: number) => set({ winWidth: newWinWidth }),

    winHeight: window.innerHeight * 0.75,
    setWinHeight: (newWinHeight: number) => set({ winHeight: newWinHeight }),

    stopDragAndResize: () => set({ isDragging: false, isResizing: false }),

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
        winCoord: { pointX: 40, pointY: 40 },
        winWidth: window.innerWidth * 0.95,
        winHeight: window.innerHeight * 0.75,
        winVisualState: 'demaximized',
      })
    },

    minimizeWindow: () => set({ isWinMinimized: true }),
    openWindow: () => {
      const winRef = get().self
      if (get().isWinMinimized && winRef?.current) {
        set({ isWinMinimized: false })
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

    WIN_MIN_WIDTH: 360,
    WIN_MIN_HEIGHT: 240,
    setWIN_MIN_WIDTH: (w: number) => set({ WIN_MIN_WIDTH: w }),
    setWIN_MIN_HEIGHT: (h: number) => set({ WIN_MIN_HEIGHT: h }),
  }))

  windowRegistry[windowId] = storeInstance

  return storeInstance
}
