import { ArrowDownToLine, CodeXml, Github, Unplug } from 'lucide-react'
import ReadMe from '../components/read-me'
import { WorkspaceLayout } from '@gustavolmo/react-window-manager'
import { apiRefereceWin, usageWin, installWin } from '../window-registration/register-rwm'

export default function Home() {
  return (
    <section className="fixed w-full h-full flex flex-col">
      <WorkspaceLayout className="h-full w-full grow">
        <div className="p-8 w-full h-full flex flex-col items-center mb-32 desktop-background">
          <h1 className="font-mono w-full text-white text-2xl uppercase tracking-[0.4em] mb-0 block opacity-50 max-w-xl text-center">
            React Window Manager
          </h1>
        </div>

        <installWin.Window windowName={'Install'} defaultDock="left">
          <ReadMe />
        </installWin.Window>

        <apiRefereceWin.Window windowName={'Api'} defaultDock="full">
          <p>Api</p>
        </apiRefereceWin.Window>

        <usageWin.Window windowName={'Usage'} defaultDock="right">
          <p>Usage</p>
        </usageWin.Window>
      </WorkspaceLayout>

      <nav className="w-full h-12 bg-neutral-900 flex gap-2 px-4 justify-between z-50">
        <div className="flex gap-2 items-center overflow-x-auto overflow-y-hidden">
          <installWin.Button className={`px-2 w-16 py-0 rounded-sm h-full`}>
            <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
              <ArrowDownToLine className="h-4 w-4" />
              Install
            </p>
          </installWin.Button>
          <usageWin.Button className={`px-2 w-16 py-0 rounded-sm h-full`}>
            <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
              <CodeXml className="h-4 w-4" /> Usage
            </p>
          </usageWin.Button>
          <apiRefereceWin.Button className={`px-2 w-16 py-0 rounded-sm h-full `}>
            <p className="text-xs font-mono text-zinc-400 hover:text-zinc-50 flex flex-col items-center">
              <Unplug className="h-4 w-4" /> Api
            </p>
          </apiRefereceWin.Button>
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
