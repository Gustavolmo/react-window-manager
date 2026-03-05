import { CodeXml, Github, Linkedin } from 'lucide-react'
import ReadMe from '../components/read-me'
import { createWindowStore, WindowButton, WindowLayout, WorkspaceLayout } from '@gustavolmo/react-window-manager'

const bottomOffsetPx = 48
const readMe = createWindowStore('read-me', bottomOffsetPx)
const otherWindow = createWindowStore('other-window', bottomOffsetPx)

export default function Home() {
  return (
    <>
      <WorkspaceLayout>
        <div className="p-8 w-full h-full flex flex-col items-center mb-32 desktop-background">
          <h1 className="font-mono w-full text-white text-2xl uppercase tracking-[0.4em] mb-0 block opacity-50 max-w-xl text-center">
            Reactive Window Manager
          </h1>
        </div>

        <WindowLayout useWindowStore={readMe} windowName={'README'}>
          <ReadMe />
        </WindowLayout>

        <WindowLayout useWindowStore={otherWindow} windowName={'OTHER'}>
          <p>OTHER</p>
        </WindowLayout>
      </WorkspaceLayout>

      <nav className="fixed bottom-0 left-0 w-full h-12 bg-neutral-900 flex gap-2 py-2 px-4 justify-between z-50">
        <div className="flex gap-2 items-center">
          <WindowButton useWindowStore={readMe} styles="p-2 rounded-md">
            <CodeXml className="text-zinc-400 hover:text-zinc-50" />
          </WindowButton>
          <WindowButton useWindowStore={otherWindow} styles="p-2 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">OTHER</p>
          </WindowButton>
        </div>

        <div className="flex gap-4 items-center">
          <a target="_blank" href="https://www.linkedin.com/in/gustavo-l-m-de-oliveira-037243108/">
            <Linkedin className="text-zinc-400 hover:text-zinc-50" />
          </a>
          <a target="_blank" href="https://github.com/Gustavolmo/portfolio-v2">
            <Github className="text-zinc-400 hover:text-zinc-50" />
          </a>
        </div>
      </nav>
    </>
  )
}
