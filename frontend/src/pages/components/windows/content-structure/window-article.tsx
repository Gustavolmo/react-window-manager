import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function WindowArticle({ children }: props) {
  return (
    <article className="flex flex-col gap-6 text-zinc-600 text-sm leading-relaxed mb-8">
      {children}
    </article>
  )
}
