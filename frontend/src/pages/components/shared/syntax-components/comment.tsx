import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function Comment({ children }: props) {
  return <span className="text-zinc-500 font-mono">{children}</span>
}
