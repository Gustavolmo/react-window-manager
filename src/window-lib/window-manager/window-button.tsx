import { StoreApi, UseBoundStore } from 'zustand'
import { WindowStore } from './window-types'
import { bringTargetWindowToFront } from './window-global-actions'

type StoreProp = {
  children: React.ReactNode
  useWindowStore: UseBoundStore<StoreApi<WindowStore>>
  styles?: string
  activeStyle?: string
  innactiveStyle?: string
}

export default function WindowButton({
  children,
  useWindowStore,
  styles,
  activeStyle = 'brightness-150',
  innactiveStyle = 'brightness-[85%]',
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
        ${!isWinMinimized ? activeStyle : innactiveStyle}`}
    >
      {children}
    </button>
  )
}
