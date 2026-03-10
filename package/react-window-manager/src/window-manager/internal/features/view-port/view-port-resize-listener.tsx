import { useEffect } from 'react'
import { stackApi } from '../stack/stack-api'

export function ViewPortResizeListener() {
  useEffect(() => {
    window.addEventListener('resize', stackApi.resetStack)

    return () => window.removeEventListener('resize', stackApi.resetStack)
  }, [])

  return <></>
}
