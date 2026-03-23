import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function ArticleSection({ children }: props) {
  return <section className="flex flex-col gap-2">{children}</section>
}
