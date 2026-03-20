import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function Teal({ children }: props) {
  return <span className='text-teal-300 font-mono'>{children}</span>
}
