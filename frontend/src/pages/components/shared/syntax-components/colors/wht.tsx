import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function Wht({ children }: props) {
  return <span className='text-zinc-100 font-mono'>{children}</span>
}
