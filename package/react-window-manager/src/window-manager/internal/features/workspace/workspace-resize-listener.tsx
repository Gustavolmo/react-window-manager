import { useEffect } from 'react'
import { useWorkspaceState } from './workspace-state'
import { wsApi } from './workspace-api'
import { dockApi } from '../docking/docking-api'

export default function WorkspaceResizeListener() {
  const { wsElement } = useWorkspaceState()

  useEffect(() => {
    if (!wsElement) return

    /* FIND ME: we need to create the concept of previous dimensions before maximize */
    const onResize = () => {
      wsApi.updateWsSize()
      if (useWorkspaceState.getState().isBelowBreakPoint) dockApi.maximizeAllWindows()
    }

    onResize()
    const observer = new ResizeObserver(onResize)

    observer.observe(wsElement)
    return () => observer.disconnect()
  }, [wsElement])

  return <></>
}
