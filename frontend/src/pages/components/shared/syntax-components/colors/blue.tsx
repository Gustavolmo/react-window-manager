import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function Blue({ children }: props) {
  return <span className='text-blue-400 font-mono'>{children}</span>
}
