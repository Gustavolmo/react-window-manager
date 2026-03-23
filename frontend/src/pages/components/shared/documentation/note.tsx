import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function Note({ children }: props) {
  return (
    <div className="my-1 leading-5 bg-zinc-200 border border-zinc-300 text-zinc-500 rounded-md px-4 py-2">
      <span className="font-bold">Note:</span>{' '}
      <span className="italic">{children}</span>
    </div>
  )
}
