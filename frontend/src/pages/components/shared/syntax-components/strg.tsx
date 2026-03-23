import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function Strg({ children }: props) {
  return <span className="text-orange-300 font-mono">{children}</span>
}
