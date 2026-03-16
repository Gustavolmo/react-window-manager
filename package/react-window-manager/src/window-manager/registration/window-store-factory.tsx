import { create } from 'zustand'
import { WindowRegistration, WindowStore } from '../model/window-types'
import WindowLayout, { WindowLayoutProps } from '../internal/features/window-layout'
import WindowButton, { WindowButtonProps } from '../internal/features/window-button'
import { windowRegistry } from './window-registry'

const defaultMinWidth = 232
const defaultMinHeight = 128

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
    setWinElement: (ref: HTMLDivElement | null) => set({ winElement: ref }),
    winElement: undefined,
    windowId: windowInstanceId,
    resetFlag: false,

    zIndex: zIndexAtLaunch,
    winCoord: { pointX: 40, pointY: 40 },
    winVisualState: 'demaximized',

    isActive: false,
    isDragging: false,
    isWindowClosed: true,
    resizeAction: false,

    winWidth: defaultMinWidth,
    winHeight: defaultMinHeight,

    WIN_MIN_WIDTH: defaultMinWidth,
    WIN_MIN_HEIGHT: defaultMinHeight,
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
