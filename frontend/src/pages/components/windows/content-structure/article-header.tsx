import { Terminal } from 'lucide-react'
import { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function ArticleHeader({ children }: props) {
  return (
    <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2 border-t border-zinc-200 pt-4">
      <Terminal size={14} className="shrink-0" /> {children}
    </h2>
  )
}
