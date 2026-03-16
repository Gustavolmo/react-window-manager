import { dockApi } from '../docking/docking-api'
import { dragApi } from './drag-api'

type Props = {
  winId: string
}

export default function DragHandle({ winId }: Props) {
  return (
    <div
      onPointerDown={() => dragApi.startDrag(winId)}
      onPointerUp={() => dragApi.stopDrag(winId)}
      onDoubleClick={() => dockApi.maximizeWindow(winId)}
      className={`
        grow min-w-8 h-8 px-2 text-white flex items-center text-sm bg-white bg-opacity-0 
        hover:bg-opacity-5 mix-blend-difference`}
    ></div>
  )
}
