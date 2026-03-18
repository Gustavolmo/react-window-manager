import { useEffect } from 'react'
import { useWorkspaceState } from './workspace-state'
import { wsApi } from './workspace-api'
import { stackApi } from '../stack/stack-api'

export default function WorkspaceResizeListener() {
  const { wsElement } = useWorkspaceState()

  useEffect(() => {
    if (!wsElement) return

    const onResize = () => {
      wsApi.updateWsRect()
      stackApi.resetStack() // FIND ME: Reset should not be needed once we figure out how to maintain proportions
    }

    onResize()
    const observer = new ResizeObserver(onResize)

    observer.observe(wsElement)
    return () => observer.disconnect()
  }, [wsElement])

  return <></>
}
