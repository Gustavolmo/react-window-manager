import { useEffect } from 'react'
import { useWorkspaceState } from './workspace-state'
import { wsApi } from './workspace-api'
import { stackApi } from '../stack/stack-api'

export default function WorkspaceResizeListener() {
  const { self } = useWorkspaceState()

  useEffect(() => {
    if (!self) return

    const onResize = () => {
      wsApi.updateWsRect()
      stackApi.resetStack() // Reset should not be needed once we figure out how to maintain proportions
    }

    onResize()
    const observer = new ResizeObserver(onResize)

    observer.observe(self)
    return () => observer.disconnect()
  }, [self])

  return <></>
}
