import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function Prpl({ children }: props) {
  return <span className='text-purple-400 font-mono'>{children}</span>
}
