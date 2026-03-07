import { CodeXml, Github, Linkedin } from 'lucide-react'
import ReadMe from '../components/read-me'
import {
  createWindowStore,
  WindowButton,
  WindowLayout,
  WorkspaceLayout,
} from '@gustavolmo/react-window-manager'

const bottomOffsetPx = 48
const readMe = createWindowStore('read-me', bottomOffsetPx)
const test_1 = createWindowStore('test_1-window', bottomOffsetPx)
const test_2 = createWindowStore('test_2-window', bottomOffsetPx)
const test_3 = createWindowStore('test_3-window', bottomOffsetPx)

export default function Home() {
  return (
    <>
      <WorkspaceLayout>
        <div className="p-8 w-full h-full flex flex-col items-center mb-32 desktop-background">
          <h1 className="font-mono w-full text-white text-2xl uppercase tracking-[0.4em] mb-0 block opacity-50 max-w-xl text-center">
            React Window Manager
          </h1>
        </div>

        <WindowLayout
          style={{
            navBackgroundColor: undefined,
            windowBackgroundColor: undefined,
            navControlsColor: undefined,
          }}
          useWindowStore={readMe}
          windowName={<CodeXml className="text-zinc-400" />}
        >
          <ReadMe />
        </WindowLayout>

        <WindowLayout useWindowStore={test_1} windowName={'test_1'}>
          <p>test_1</p>
        </WindowLayout>

        <WindowLayout useWindowStore={test_2} windowName={'test_2'}>
          <p>test_2</p>
        </WindowLayout>

        <WindowLayout useWindowStore={test_3} windowName={'test_3'}>
          <p>test_3</p>
        </WindowLayout>
      </WorkspaceLayout>

      <nav className="fixed bottom-0 left-0 w-full h-12 bg-neutral-900 flex gap-2 py-2 px-4 justify-between z-50">
        <div className="flex gap-2 items-center">
          <WindowButton useWindowStore={readMe} styles="p-2 rounded-md">
            <CodeXml className="text-zinc-400 hover:text-zinc-50" />
          </WindowButton>
          <WindowButton useWindowStore={test_1} styles="p-2 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_1</p>
          </WindowButton>
          <WindowButton useWindowStore={test_2} styles="p-2 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_2</p>
          </WindowButton>
          <WindowButton useWindowStore={test_3} styles="p-2 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_3</p>
          </WindowButton>
        </div>

        <div className="flex gap-4 items-center">
          <a target="_blank" href="https://www.linkedin.com/in/gustavo-l-m-de-oliveira-037243108/">
            <Linkedin className="text-zinc-400 hover:text-zinc-50" />
          </a>
          <a target="_blank" href="https://github.com/Gustavolmo/react-window-manager">
            <Github className="text-zinc-400 hover:text-zinc-50" />
          </a>
        </div>
      </nav>
    </>
  )
}
