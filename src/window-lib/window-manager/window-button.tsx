import { StoreApi, UseBoundStore } from 'zustand'
import { WindowStore } from './window-types'
import { bringTargetWindowToFront } from './window-global-actions'

type StoreProp = {
  children: React.ReactNode
  useWindowStore: UseBoundStore<StoreApi<WindowStore>>
  styles?: string
  closedStyle?: string
  openStyle?: string
}

export default function WindowButton({
  children,
  useWindowStore,
  styles,
  closedStyle = 'brightness-[85%]',
  openStyle = 'brightness-150',
}: StoreProp) {
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
        ${styles} 
        ${isWinMinimized ? closedStyle : openStyle}`}
    >
      {children}
    </button>
  )
}
