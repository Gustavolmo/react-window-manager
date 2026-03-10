import { CodeXml, Github, Linkedin } from 'lucide-react'
import ReadMe from '../components/read-me'
import { createWindowStore, WorkspaceLayout } from '@gustavolmo/react-window-manager'

const readMe = createWindowStore()
const test_1 = createWindowStore()
const test_2 = createWindowStore()
const test_3 = createWindowStore()
const test_4 = createWindowStore()
const test_5 = createWindowStore()
const test_6 = createWindowStore()
const test_7 = createWindowStore()

export default function Home() {
  return (
    <section className="fixed w-full h-full flex flex-col p-10">
      <WorkspaceLayout className="h-full w-full grow">
        <div className="p-8 w-full h-full flex flex-col items-center mb-32 desktop-background">
          <h1 className="font-mono w-full text-white text-2xl uppercase tracking-[0.4em] mb-0 block opacity-50 max-w-xl text-center">
            React Window Manager
          </h1>
        </div>

        <readMe.Window windowName={<CodeXml className="text-zinc-400" />}>
          <ReadMe />
        </readMe.Window>

        <test_1.Window windowName={'test_1'}>
          <p>test_1</p>
        </test_1.Window>

        <test_2.Window windowName={'test_2'}>
          <p>test_2</p>
        </test_2.Window>

        <test_3.Window windowName={'test_3'}>
          <p>test_3</p>
        </test_3.Window>

        <test_4.Window windowName={'test_4'}>
          <p>test_4</p>
        </test_4.Window>

        <test_5.Window windowName={'test_5'}>
          <p>test_5</p>
        </test_5.Window>

        <test_6.Window windowName={'test_6'}>
          <p>test_6</p>
        </test_6.Window>
        <test_7.Window windowName={'test_7'}>
          <p>test_7</p>
        </test_7.Window>
      </WorkspaceLayout>

      <nav className="w-full h-12 bg-neutral-900 flex gap-2 py-2 px-4 justify-between z-50">
        <div className="flex gap-2 items-center overflow-x-auto overflow-y-hidden">
          <readMe.Button className="px-2 py-0 rounded-md">
            <CodeXml className="text-zinc-400 hover:text-zinc-50" />
          </readMe.Button>
          <test_1.Button className="px-2 py-0 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_1</p>
          </test_1.Button>
          <test_2.Button className="px-2 py-0 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_2</p>
          </test_2.Button>
          <test_3.Button className="px-2 py-0 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_3</p>
          </test_3.Button>

          <test_4.Button className="px-2 py-0 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_4</p>
          </test_4.Button>
          <test_5.Button className="px-2 py-0 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_5</p>
          </test_5.Button>
          <test_6.Button className="px-2 py-0 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_6</p>
          </test_6.Button>
          <test_7.Button className="px-2 py-0 rounded-md">
            <p className="text-zinc-400 hover:text-zinc-50">test_7</p>
          </test_7.Button>
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
    </section>
  )
}
