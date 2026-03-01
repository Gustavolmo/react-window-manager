import ScreenListeners from '../screen-manager/screen-listeners'
import { stopAllDragAndResize } from './window-global-actions'

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
