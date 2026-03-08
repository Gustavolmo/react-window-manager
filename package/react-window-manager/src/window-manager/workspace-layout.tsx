import ScreenListeners from './internal/event-listeners/screen-listeners'
import { stopAllDragAndResize } from './internal/shared/window-actions'

type Props = {
  children: React.ReactNode
}

export default function WorkspaceLayout({ children }: Props) {
  return (
    <main
      onMouseLeave={stopAllDragAndResize}
      onMouseUp={stopAllDragAndResize}
      className="absolute overflow-hidden h-full w-full touch-none"
    >
      <ScreenListeners />
      {children}
    </main>
  )
}
