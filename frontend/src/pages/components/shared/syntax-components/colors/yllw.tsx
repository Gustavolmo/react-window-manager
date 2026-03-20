import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function Yllw({ children }: props) {
  return <span className='text-amber-300 font-mono'>{children}</span>
}
