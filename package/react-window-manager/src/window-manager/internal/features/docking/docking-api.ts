import { windowRegistry } from '../../../registration/window-store-factory'
import { wsApi } from '../workspace/workspace-api'

export const dockApi = {
  dockWindowRight: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: wsApi.getRect().centerX, pointY: wsApi.getRect().top },
      winWidth: wsApi.getRect().innerWidth / 2,
      winHeight: wsApi.getRect().innerHeight,
      winVisualState: 'demaximized',
    })
  },

  dockWindowLeft: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: wsApi.getRect().left, pointY: wsApi.getRect().top },
      winWidth: wsApi.getRect().innerWidth / 2,
      winHeight: wsApi.getRect().innerHeight,
      winVisualState: 'demaximized',
    })
  },

  dockWindowTop: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: wsApi.getRect().left, pointY: wsApi.getRect().top },
      winWidth: wsApi.getRect().innerWidth,
      winHeight: wsApi.getRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowBottom: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: wsApi.getRect().left, pointY: wsApi.getRect().centerY },
      winWidth: wsApi.getRect().innerWidth,
      winHeight: wsApi.getRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowBottomRight: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: {
        pointX: wsApi.getRect().centerX,
        pointY: wsApi.getRect().centerY,
      },
      winWidth: wsApi.getRect().innerWidth / 2,
      winHeight: wsApi.getRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowTopRight: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: wsApi.getRect().centerX, pointY: wsApi.getRect().top },
      winWidth: wsApi.getRect().innerWidth / 2,
      winHeight: wsApi.getRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowBottomLeft: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: wsApi.getRect().left, pointY: wsApi.getRect().centerY },
      winWidth: wsApi.getRect().innerWidth / 2,
      winHeight: wsApi.getRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowTopLeft: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: wsApi.getRect().left, pointY: wsApi.getRect().top },
      winWidth: wsApi.getRect().innerWidth / 2,
      winHeight: wsApi.getRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  maximizeWindow: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: wsApi.getRect().left, pointY: wsApi.getRect().top },
      winHeight: wsApi.getRect().innerHeight,
      winWidth: wsApi.getRect().innerWidth,
      winVisualState: 'maximized',
    })
  },

  demaximizeWindow: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: wsApi.getRect().left + 16, pointY: wsApi.getRect().top + 16 },
      winWidth: wsApi.getRect().innerWidth * 0.95,
      winHeight: wsApi.getRect().innerHeight * 0.75,
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
