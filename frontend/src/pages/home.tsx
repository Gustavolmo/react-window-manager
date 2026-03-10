import { ArrowDownToLine, CodeXml, Github, Unplug } from 'lucide-react'
import ReadMe from '../components/read-me'
import { WorkspaceLayout } from '@gustavolmo/react-window-manager'
import { apiReferece, usage, install } from '../window-registration/register-rwm'

export default function Home() {
  const { isActive: installActive } = install.store()
  const { isActive: usageActive } = usage.store()
  const { isActive: apiActive } = apiReferece.store()

  return (
    <section className="fixed w-full h-full flex flex-col">
      <WorkspaceLayout className="h-full w-full grow">
        <div className="p-8 w-full h-full flex flex-col items-center mb-32 desktop-background">
          <h1 className="font-mono w-full text-white text-2xl uppercase tracking-[0.4em] mb-0 block opacity-50 max-w-xl text-center">
            React Window Manager
          </h1>
        </div>

        <install.Window windowName={'Install'}>
          <ReadMe />
        </install.Window>

        <apiReferece.Window windowName={'Api'}>
          <p>Api</p>
        </apiReferece.Window>

        <usage.Window windowName={'Usage'}>
          <p>Usage</p>
        </usage.Window>
      </WorkspaceLayout>

      <nav className="w-full h-12 bg-neutral-900 flex gap-2 px-4 justify-between z-50">
        <div className="flex gap-2 items-center overflow-x-auto overflow-y-hidden">
          <install.Button
            isOpenClassName={`brightness-150 ${installActive ? 'border border-zinc-600' : 'border-none'}`}
            isClosedClassName={`brightness-[80%]`}
            className={`px-2 w-16 py-0 rounded-sm h-full`}
          >
            <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
              <ArrowDownToLine className="h-4 w-4" />
              Install
            </p>
          </install.Button>
          <usage.Button
            isOpenClassName={`brightness-150 ${usageActive ? 'border border-zinc-600' : 'border-none'}`}
            isClosedClassName={`brightness-[80%]`}
            className={`px-2 w-16 py-0 rounded-sm h-full`}
          >
            <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
              <CodeXml className="h-4 w-4" /> Usage
            </p>
          </usage.Button>
          <apiReferece.Button
            isOpenClassName={`brightness-150 ${apiActive ? 'border border-zinc-600' : 'border-none'}`}
            isClosedClassName={`brightness-[80%]`}
            className={`px-2 w-16 py-0 rounded-sm h-full `}
          >
            <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
              <Unplug className="h-4 w-4" /> Api
            </p>
          </apiReferece.Button>
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
