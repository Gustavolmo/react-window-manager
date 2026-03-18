import { ArrowDownToLine, CodeXml, Github, Unplug } from 'lucide-react'
import ReadMe from '../components/read-me'
import { WorkspaceLayout } from '@gustavolmo/react-window-manager'
import {
  apiRefereceWin,
  usageWin,
  installWin,
  test_1,
  test_2,
  test_3,
  test_4,
} from '../window-registration/register-rwm'

export default function Home() {
  const { isActive: installActive } = installWin.store()
  const { isActive: usageActive } = usageWin.store()
  const { isActive: apiActive } = apiRefereceWin.store()

  return (
    <section className="fixed w-full h-full flex flex-col">
      <WorkspaceLayout className="h-full w-full grow">
        <div className="p-8 w-full h-full flex flex-col items-center mb-32 desktop-background">
          <h1 className="font-mono w-full text-white text-2xl uppercase tracking-[0.4em] mb-0 block opacity-50 max-w-xl text-center">
            React Window Manager
          </h1>
        </div>

        <installWin.Window windowName={'Install'} navbarChildren={installWin.id}>
          <ReadMe />
        </installWin.Window>

        <apiRefereceWin.Window windowName={'Api ' + apiRefereceWin.id}>
          <p>Api</p>
        </apiRefereceWin.Window>

        <usageWin.Window windowName={'Usage ' + usageWin.id}>
          <p>Usage</p>
        </usageWin.Window>

        <test_1.Window windowName="test_1">test_1</test_1.Window>
        <test_2.Window windowName="test_2">test_2</test_2.Window>
        <test_3.Window windowName="test_3">test_3</test_3.Window>
        <test_4.Window windowName="test_4">test_4</test_4.Window>
      </WorkspaceLayout>

      <nav className="w-full h-12 bg-neutral-900 flex gap-2 px-4 justify-between z-50">
        <div className="flex gap-2 items-center overflow-x-auto overflow-y-hidden">
          <installWin.Button
            isOpenClassName={`brightness-150 border-t-2  ${installActive ? 'border-zinc-400 bg-zinc-50/10' : 'border-neutral-900'}`}
            isClosedClassName={`brightness-[80%]`}
            className={`px-2 w-16 py-0 rounded-sm h-full`}
          >
            <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
              <ArrowDownToLine className="h-4 w-4" />
              Install
            </p>
          </installWin.Button>
          <usageWin.Button
            isOpenClassName={`brightness-150 border-t-2  ${usageActive ? 'border-zinc-400 bg-zinc-50/10' : 'border-neutral-900'}`}
            isClosedClassName={`brightness-[80%]`}
            className={`px-2 w-16 py-0 rounded-sm h-full`}
          >
            <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
              <CodeXml className="h-4 w-4" /> Usage
            </p>
          </usageWin.Button>
          <apiRefereceWin.Button
            isOpenClassName={`brightness-150 border-t-2  ${apiActive ? 'border-zinc-400 bg-zinc-50/10' : 'border-neutral-900'}`}
            isClosedClassName={`brightness-[80%]`}
            className={`px-2 w-16 py-0 rounded-sm h-full `}
          >
            <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
              <Unplug className="h-4 w-4" /> Api
            </p>
          </apiRefereceWin.Button>

          <test_1.Button className='text-zinc-400 px-2'>test_1</test_1.Button>
          <test_2.Button className='text-zinc-400 px-2'>test_2</test_2.Button>
          <test_3.Button className='text-zinc-400 px-2'>test_3</test_3.Button>
          <test_4.Button className='text-zinc-400 px-2'>test_4</test_4.Button>
        </div>

        <div className="flex gap-4 items-center">
          <a target="_blank" href="https://github.com/Gustavolmo/react-window-manager">
            <Github className="text-zinc-400 hover:text-zinc-50" />
          </a>
        </div>
      </nav>
    </section>
  )
}
