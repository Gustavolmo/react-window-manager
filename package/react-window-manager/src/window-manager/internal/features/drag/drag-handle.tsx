import { useEffect, useState } from 'react'
import { dockApi } from '../docking/docking-api'
import { wsApi } from '../workspace/workspace-api'
import { windowRegistry } from '../../../registration/window-registry'
import { Coord } from '../../../model/window-types'
import { useCursorState } from '../cursor/cursor-state'
import { useWorkspaceState } from '../workspace/workspace-state'

type Props = {
  winId: string
}

export default function DragHandle({ winId }: Props) {
  const { x, y } = useCursorState()
  const { wsRect } = useWorkspaceState()
  const { winVisualState, isDragging, winCoord, setWinCoord, setIsDragging } =
    windowRegistry[winId]()

  const [dragClickOffset, setDragClickOffset] = useState<Coord>({
    pointX: wsRect.left,
    pointY: wsRect.top,
  })

  useEffect(() => {
    if (wsApi.isBelowBreakPoint()) return
    if (!isDragging) return

    if (winVisualState === 'maximized') dockApi.demaximizeWindow(winId)

    let adjustedX = x - dragClickOffset.pointX
    if (x > wsRect.right || x < wsRect.left) adjustedX = winCoord.pointX

    let adjustedY = y - dragClickOffset.pointY
    if (y > wsRect.bottom || y < wsRect.top) adjustedY = winCoord.pointY

    setWinCoord({ pointX: adjustedX, pointY: adjustedY })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, x, y])

  const startDrag = (isDragging: boolean) => {
    setDragClickOffset({ pointX: x - winCoord.pointX, pointY: y - winCoord.pointY })
    setIsDragging(isDragging)
  }

  return (
    <div
      onMouseDown={() => startDrag(true)}
      onMouseUp={() => startDrag(false)}
      onDoubleClick={() => dockApi.maximizeWindow(winId)}
      className="grow min-w-8 h-8 px-2 text-white flex items-center text-sm bg-white bg-opacity-0 hover:bg-opacity-5 mix-blend-difference"
    ></div>
  )
}
