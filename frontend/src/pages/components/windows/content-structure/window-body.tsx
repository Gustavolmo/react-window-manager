import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function WindowBody({ children }: props) {
  return (
    <div className="w-full h-full p-6 md:p-10 flex justify-center">
      <div className='max-w-4xl w-full flex flex-col gap-12'>
        {children}
      </div>
    </div>
  )
}
