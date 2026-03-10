import { windowRegistry } from '../../registration/window-registry'
import { dockApi } from './docking/docking-api'
import { stackApi } from './stack/stack-api'

export type WindowButtonProps = {
  children: React.ReactNode
  winId: string
  className?: string
  /** @default 'brightness-[85%]' */
  isClosedClassName?: string
  /** @default 'brightness-150' */
  isOpenClassName?: string
}

export default function WindowButton({
  children,
  winId,
  className,
  isClosedClassName = 'brightness-[85%]',
  isOpenClassName = 'brightness-150',
}: WindowButtonProps) {
  const { isWindowClosed, windowId, isActive } = windowRegistry[winId]()

  const handleOpenCloseWin = () => {
    if (isWindowClosed) {
      stackApi.bringTargetWindowToFront(windowId)
      dockApi.openWindow(winId)
      return
    }

    if (isActive) dockApi.closeWindow(winId)
    stackApi.bringTargetWindowToFront(windowId)
  }

  return (
    <button
      id={`${windowId}_button`}
      onClick={handleOpenCloseWin}
      className={`
        ${className} 
        ${isWindowClosed ? isClosedClassName : isOpenClassName}`}
    >
      {children}
    </button>
  )
}
