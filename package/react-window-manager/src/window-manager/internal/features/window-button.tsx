import { windowRegistry } from '../../registration/window-registry'
import { focusApi } from './focus/focus-api'

export type WindowButtonProps = {
  children: React.ReactNode
  winId: string
  className?: string

  /** @default 'brightness-[85%] border-t-2 border-t-transparent' */
  isClosedClassName?: string

  /** @default 'brightness-150 border-t-2 border-t-transparent' */
  isOpenClassName?: string

  /** @default 'brightness-150 border-t-2 border-zinc-400 bg-zinc-50/10' */
  isActiveClassName?: string
}

export default function WindowButton({
  children,
  winId,
  className,
  isClosedClassName = 'brightness-[85%] border-t-2 border-t-transparent',
  isOpenClassName = 'brightness-150 border-t-2 border-t-transparent',
  isActiveClassName = 'brightness-150 border-t-2 border-zinc-400 bg-zinc-50/10',
}: WindowButtonProps) {
  const { isWindowClosed, windowId, isActive } = windowRegistry[winId]()

  const handleOpenCloseWin = () => {
    if (!isWindowClosed && isActive) {
      focusApi.closeWindowAndRefocus(windowId)
    } else {
      focusApi.bringWindowToFocus(windowId)
    }
  }

  return (
    <button
      id={`${windowId}_button`}
      onClick={handleOpenCloseWin}
      className={`
        ${className} 
        ${isWindowClosed ? isClosedClassName : isActive ? isActiveClassName : isOpenClassName}
      `}
    >
      {children}
    </button>
  )
}
