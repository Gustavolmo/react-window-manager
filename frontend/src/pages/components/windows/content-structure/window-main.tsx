import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function WindowMain({ children }: props) {
  return (
    <section className="p-2 pt-8 rounded-lg flex flex-col gap-8">
      {children}
    </section>
  )
}
