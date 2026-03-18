import { ResizeDirection } from '../../../model/window-types'
import { windowRegistry } from '../../../registration/window-registry'
import { resizeApi } from './resizing-api'
import { gridOrchestrator } from '../grid/grid-orchestrator'
import { useWorkspaceState } from '../workspace/workspace-state'

type Props = {
  winId: string
}

export default function ResizingControls({ winId }: Props) {
  const { winCoord, winWidth, winHeight, resizeAction } = windowRegistry[winId]()

  const startResize = (direction: ResizeDirection) => {
    resizeApi.startResize(winId, direction)
    gridOrchestrator.attachAdjacentGridBehavior(winId)
  }

  const stopResize = () => {
    resizeApi.stopResize(winId)
  }

  return (
    <>
      <span
        onPointerUp={stopResize}
        onPointerDown={() => startResize('e')}
        id="win-resize-right-width"
        className={`fixed w-2 ${resizeAction === 'e' ? 'opacity-50' : ''} opacity-0 mix-blend-difference cursor-w-resize z-10 flex-col flex justify-center items-center overflow-hidden`}
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX + winWidth - 4}px`,
          height: `${winHeight}px`,
        }}
      >
        <div className={`w-1 h-full bg-zinc-50`}></div>
      </span>
      <span
        onPointerUp={stopResize}
        onPointerDown={() => startResize('w')}
        id="win-resize-left-width"
        className={`fixed w-2 ${resizeAction === 'w' ? 'opacity-50' : ''} opacity-0 mix-blend-difference cursor-w-resize z-10 flex-col flex justify-center items-center`}
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX - 4}px`,
          height: `${winHeight}px`,
        }}
      >
        <div className={`w-1 h-full bg-zinc-50`}></div>
      </span>
      <span
        onPointerUp={stopResize}
        onPointerDown={() => startResize('s')}
        id="win-resize-bottom-height"
        className={`fixed h-2 ${resizeAction === 's' ? 'opacity-50' : ''} opacity-0 mix-blend-difference cursor-s-resize z-10 flex justify-center items-center`}
        style={{
          top: `${winCoord.pointY + winHeight - 4}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
        }}
      >
        <div className={`w-full h-1 bg-zinc-50`}></div>
      </span>
      <span
        onPointerUp={stopResize}
        onPointerDown={() => startResize('n')}
        id="win-resize-top-height"
        className={`fixed h-2 ${resizeAction === 'n' ? 'opacity-50' : ''} opacity-0 mix-blend-difference cursor-s-resize z-10 flex justify-center items-center`}
        style={{
          top: `${winCoord.pointY - 4}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
        }}
      >
        <div className={`w-full h-1 bg-zinc-50`}></div>
      </span>
      <span
        onPointerUp={stopResize}
        onPointerDown={() => startResize('se')}
        id="win-resize-bottom-right-all"
        className="fixed h-3 w-3 opacity-60 cursor-se-resize z-20"
        style={{
          top: `${winCoord.pointY + winHeight - 8}px`,
          left: `${winCoord.pointX + winWidth - 8}px`,
        }}
      ></span>
      <span
        onPointerUp={stopResize}
        onPointerDown={() => startResize('sw')}
        id="win-resize-bottom-left-all"
        className="fixed h-3 w-3 opacity-60 cursor-sw-resize z-20"
        style={{
          top: `${winCoord.pointY + winHeight - 8}px`,
          left: `${winCoord.pointX - 8}px`,
        }}
      ></span>

      <span
        onPointerUp={stopResize}
        onPointerDown={() => startResize('ne')}
        id="win-resize-top-right-all"
        className="fixed h-3 w-3 opacity-60 cursor-ne-resize z-20"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX + winWidth - 6}px`,
        }}
      ></span>
      <span
        onPointerUp={stopResize}
        onPointerDown={() => startResize('nw')}
        id="win-resize-top-left-all"
        className="fixed h-3 w-3 opacity-60 cursor-nw-resize z-20"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX - 6}px`,
        }}
      ></span>
    </>
  )
}
