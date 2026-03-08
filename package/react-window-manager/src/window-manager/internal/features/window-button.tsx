import { bringTargetWindowToFront } from '../shared/window-actions'
import { windowRegistry } from '../../registration/window-store-factory'

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
  const { openWindow, minimizeWindow, isWinMinimized, windowId, isActive } = windowRegistry[winId]()

  const handleOpenCloseWin = () => {
    if (isWinMinimized) {
      bringTargetWindowToFront(windowId)
      openWindow()
      return
    }

    if (isActive) {
      minimizeWindow()
    }

    bringTargetWindowToFront(windowId)
  }

  return (
    <button
      id={`${windowId}_button`}
      onClick={handleOpenCloseWin}
      className={`
        ${className} 
        ${isWinMinimized ? isClosedClassName : isOpenClassName}`}
    >
      {children}
    </button>
  )
}
