import { useEffect } from 'react'
import { useWorkspaceState } from './workspace-state'
import { wsApi } from './workspace-api'

export default function WorkspaceResizeListener() {
  const { wsElement } = useWorkspaceState()

  useEffect(() => {
    if (!wsElement) return

    const onResize = () => {
      wsApi.updateWsSize()
    }

    onResize()
    const observer = new ResizeObserver(onResize)

    observer.observe(wsElement)
    return () => observer.disconnect()
  }, [wsElement])

  return <></>
}
