import { Github } from 'lucide-react'
import { WorkspaceLayout } from '@gustavolmo/react-window-manager'
import StartRwmWindow from './components/windows/start-rwm-window/start-rwm-window'
import UsageWindow from './components/windows/usage-window/usage-window'
import ApiWindow from './components/windows/api-window/api-window'
import ApiButton from './components/windows/api-window/api-button'
import UsageButton from './components/windows/usage-window/usage-button'
import StartButton from './components/windows/start-rwm-window/start-rwm-button'

export default function Home() {

  return (
    <section className="fixed w-full h-full flex flex-col">
      <WorkspaceLayout className="h-full w-full grow">
        <StartRwmWindow />
        <UsageWindow />
        <ApiWindow />
        <div className="p-8 w-full h-full flex flex-col items-center mb-32 desktop-background">
          <h1 className="font-mono w-full text-white text-2xl uppercase tracking-[0.4em] mb-0 block opacity-50 max-w-xl text-center">
            React Window Manager
          </h1>
        </div>
      </WorkspaceLayout>

      <nav className="w-full h-12 bg-neutral-900 flex gap-2 px-4 justify-between z-50">
        <div className="flex gap-2 items-center overflow-x-auto overflow-y-hidden">
          <UsageButton />
          <ApiButton />
          <StartButton />
        </div>

        <div className="flex gap-4 items-center">
          <a
            target="_blank"
            href="https://github.com/Gustavolmo/react-window-manager"
          >
            <Github className="text-zinc-400 hover:text-zinc-50" />
          </a>
        </div>
      </nav>
    </section>
  )
}
