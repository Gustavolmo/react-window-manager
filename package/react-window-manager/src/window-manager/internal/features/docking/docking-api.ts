import { windowRegistry } from '../../../registration/window-store-factory'
import { getWSRect } from '../../../workspace-state'

export const dockApi = {
  dockWindowRight: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: getWSRect().centerX, pointY: getWSRect().top },
      winWidth: getWSRect().innerWidth / 2,
      winHeight: getWSRect().innerHeight,
      winVisualState: 'demaximized',
    })
  },

  dockWindowLeft: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: getWSRect().left, pointY: getWSRect().top },
      winWidth: getWSRect().innerWidth / 2,
      winHeight: getWSRect().innerHeight,
      winVisualState: 'demaximized',
    })
  },

  dockWindowTop: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: getWSRect().left, pointY: getWSRect().top },
      winWidth: getWSRect().innerWidth,
      winHeight: getWSRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowBottom: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: getWSRect().left, pointY: getWSRect().centerY },
      winWidth: getWSRect().innerWidth,
      winHeight: getWSRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowBottomRight: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: {
        pointX: getWSRect().centerX,
        pointY: getWSRect().centerY,
      },
      winWidth: getWSRect().innerWidth / 2,
      winHeight: getWSRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowTopRight: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: getWSRect().centerX, pointY: getWSRect().top },
      winWidth: getWSRect().innerWidth / 2,
      winHeight: getWSRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowBottomLeft: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: getWSRect().left, pointY: getWSRect().centerY },
      winWidth: getWSRect().innerWidth / 2,
      winHeight: getWSRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  dockWindowTopLeft: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: getWSRect().left, pointY: getWSRect().top },
      winWidth: getWSRect().innerWidth / 2,
      winHeight: getWSRect().innerHeight / 2,
      winVisualState: 'demaximized',
    })
  },

  maximizeWindow: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: getWSRect().left, pointY: getWSRect().top },
      winHeight: getWSRect().innerHeight,
      winWidth: getWSRect().innerWidth,
      winVisualState: 'maximized',
    })
  },

  demaximizeWindow: (winId: string) => {
    windowRegistry[winId].setState({
      winCoord: { pointX: getWSRect().left + 16, pointY: getWSRect().top + 16 },
      winWidth: getWSRect().innerWidth * 0.95,
      winHeight: getWSRect().innerHeight * 0.75,
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
