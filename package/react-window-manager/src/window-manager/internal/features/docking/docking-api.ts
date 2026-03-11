import { windowRegistry } from '../../../registration/window-registry'
import { wsApi } from '../workspace/workspace-api'
import { useWorkspaceState } from '../workspace/workspace-state'

export const dockApi = {
  dockWindowRight: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: { pointX: wsRect.centerX, pointY: wsRect.top },
      winWidth: wsRect.innerWidth / 2,
      winHeight: wsRect.innerHeight,
      winVisualState: 'demaximized',
    })
  },

  dockWindowLeft: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: { pointX: wsRect.left, pointY: wsRect.top },
      winWidth: wsRect.innerWidth / 2,
      winHeight: wsRect.innerHeight,
      winVisualState: 'demaximized',
    })
  },

  dockWindowTop: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: { pointX: wsRect.left, pointY: wsRect.top },
      winWidth: wsRect.innerWidth,
      winHeight: wsRect.innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowBottom: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: { pointX: wsRect.left, pointY: wsRect.centerY },
      winWidth: wsRect.innerWidth,
      winHeight: wsRect.innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowBottomRight: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: {
        pointX: wsRect.centerX,
        pointY: wsRect.centerY,
      },
      winWidth: wsRect.innerWidth / 2,
      winHeight: wsRect.innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowTopRight: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: { pointX: wsRect.centerX, pointY: wsRect.top },
      winWidth: wsRect.innerWidth / 2,
      winHeight: wsRect.innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowBottomLeft: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: { pointX: wsRect.left, pointY: wsRect.centerY },
      winWidth: wsRect.innerWidth / 2,
      winHeight: wsRect.innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowTopLeft: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: { pointX: wsRect.left, pointY: wsRect.top },
      winWidth: wsRect.innerWidth / 2,
      winHeight: wsRect.innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  maximizeWindow: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: { pointX: wsRect.left, pointY: wsRect.top },
      winHeight: wsRect.innerHeight,
      winWidth: wsRect.innerWidth,
      winVisualState: 'maximized',
    })
  },

  demaximizeWindow: (winId: string) => {
    const wsRect = useWorkspaceState.getState().wsRect
    windowRegistry[winId].setState({
      winCoord: { pointX: wsRect.left + 16, pointY: wsRect.top + 16 },
      winWidth: wsRect.innerWidth * 0.95,
      winHeight: wsRect.innerHeight * 0.75,
      winVisualState: 'demaximized',
    })
  },

  closeWindow: (winId: string) => {
    windowRegistry[winId].setState({ isWindowClosed: true })
  },

  openWindow: (winId: string) => {
    const winState = windowRegistry[winId].getState()
    const winRef = winState.self
    if (winState.isWindowClosed && winRef?.current) {
      windowRegistry[winId].setState({ isWindowClosed: false })
      winRef.current.style.transform = 'translate(0, 0) scale(1)'
    }
  },
}
