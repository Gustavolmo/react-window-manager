import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function InlineCode({ children }: Props) {
  return <code className="inline-flex leading-5 font-mono bg-zinc-200 border-b border-b-zinc-300 px-1 rounded-sm text-zinc-800 w-fit">{children}</code>
}
