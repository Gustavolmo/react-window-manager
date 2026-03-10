import { ResizeState } from '../../../model/window-types'
import { useCursorState } from '../cursor/cursor-state'
import { useEffect } from 'react'
import { windowRegistry } from '../../../registration/window-registry'
import { resizeApi } from './resizing-api'
import { gridApi } from '../grid/grid-api'

type Props = {
  winId: string
}

export default function ResizingControls({ winId }: Props) {
  const { x, y } = useCursorState()
  const { winCoord, winWidth, winHeight, resizeAction } = windowRegistry[winId]()

  useEffect(() => {
    resizeApi.dispatchResizeAction(winId)
  }, [resizeAction, x, y])

  const handleResizeClick = (resizeAction: ResizeState) => {
    resizeApi.setResizeAction(winId, resizeAction)
    gridApi.orchestrateGridResize(winId)
  }

  return (
    <>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('e')}
        id="win-resize-right-width"
        className="fixed w-2 opacity-60 cursor-w-resize z-10"
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX + winWidth - 4}px`,
          height: `${winHeight}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('w')}
        id="win-resize-left-width"
        className="fixed w-2 opacity-60 cursor-w-resize z-10"
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX - 4}px`,
          height: `${winHeight}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('s')}
        id="win-resize-bottom-height"
        className="fixed h-2 opacity-60 cursor-s-resize z-10"
        style={{
          top: `${winCoord.pointY + winHeight - 6}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('n')}
        id="win-resize-top-height"
        className="fixed h-2 opacity-60 cursor-s-resize z-10"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('se')}
        id="win-resize-bottom-right-all"
        className="fixed h-3 w-3 opacity-60 cursor-se-resize z-20"
        style={{
          top: `${winCoord.pointY + winHeight - 8}px`,
          left: `${winCoord.pointX + winWidth - 8}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('sw')}
        id="win-resize-bottom-left-all"
        className="fixed h-3 w-3 opacity-60 cursor-sw-resize z-20"
        style={{
          top: `${winCoord.pointY + winHeight - 8}px`,
          left: `${winCoord.pointX - 8}px`,
        }}
      ></span>

      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('ne')}
        id="win-resize-top-right-all"
        className="fixed h-3 w-3 opacity-60 cursor-ne-resize z-20"
        style={{
          top: `${winCoord.pointY - 6}px`,
          left: `${winCoord.pointX + winWidth - 6}px`,
        }}
      ></span>
      <span
        onMouseUp={() => handleResizeClick(false)}
        onMouseDown={() => handleResizeClick('nw')}
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
