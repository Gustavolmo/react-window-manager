import { ReactNode } from 'react'
import Strg from './strg'
import Wht from './colors/wht'
import Blue from './colors/blue'
import Teal from './colors/teal'

type props = {
  s: string
  e: string
  type?: 'component' | 'html'
  className?: string
  children: ReactNode
}

export default function Tag({
  children,
  type = 'html',
  s,
  e,
  className,
}: props) {
  return (
    <>
      <Wht>
        <span className="font-light text-zinc-400">{s}</span>
        {type === 'component' ? (
          <Teal>{children}</Teal>
        ) : (
          <Blue>{children}</Blue>
        )}
        {className && ' className='}
        <Strg>{className ? `${className}` : ''}</Strg>
        <span className="font-light text-zinc-400">{e}</span>
      </Wht>
    </>
  )
}
