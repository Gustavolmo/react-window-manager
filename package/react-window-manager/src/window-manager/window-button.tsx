import { StoreApi, UseBoundStore } from 'zustand'
import { WindowStore } from './window-types'
import { bringTargetWindowToFront } from './global-actions/window-global-actions'

type Prop = {
  children: React.ReactNode
  useWindowStore: UseBoundStore<StoreApi<WindowStore>>
  className?: string
  /** @default 'brightness-[85%]' */
  isClosedClassName?: string
  /** @default 'brightness-150' */
  isOpenClassName?: string
}

export default function WindowButton({
  children,
  useWindowStore,
  className,
  isClosedClassName = 'brightness-[85%]',
  isOpenClassName = 'brightness-150',
}: Prop) {
  const { openWindow, minimizeWindow, isWinMinimized, windowId, isActive } = useWindowStore()

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
