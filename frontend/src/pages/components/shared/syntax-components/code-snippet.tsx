import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function CodeSnippet({ children }: Props) {
  return (
    <pre className="bg-zinc-800 text-zinc-100 border-b-4 border-slate-400 p-3 rounded-md overflow-x-auto text-xs selection:bg-zinc-500 mb-4">
      <code className='font-mono'>{children}</code>
    </pre>
  )
}
