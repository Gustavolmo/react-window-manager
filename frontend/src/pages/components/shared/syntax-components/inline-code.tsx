import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function InlineCode({ children }: Props) {
  return <code className="font-mono bg-zinc-200 px-1 rounded-sm text-zinc-800 w-fit">{children}</code>
}
