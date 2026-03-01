import { CodeXml, Cpu, Github, Globe, Linkedin, Terminal } from 'lucide-react'
import WindowButton from '../window-lib/window-manager/window-button'
import WindowLayout from '../window-lib/window-manager/window-layout'
import { createWindowStore } from '../window-lib/window-manager/window-store-factory'
import WorkspaceLayout from '../window-lib/window-manager/workspace-layout'
import profilePic from '../assets/profile-pic-circlewhite.png'

const bottomOffsetPx = 48
const myStackStore = createWindowStore('window-myStack', bottomOffsetPx)
const allverkStore = createWindowStore('window-allverk', bottomOffsetPx)
const offertAllverkStore = createWindowStore('window-offert-allverk', bottomOffsetPx)

export default function Home() {
  const { isResizing: isResizingOffert, isDragging: isDraggingOffert } = offertAllverkStore()
  const { isResizing: isResizingAllverk, isDragging: isDraggingAllverk } = allverkStore()
  return (
    <>
      <WorkspaceLayout>
        <div className="p-8 w-full h-full flex flex-col items-center mb-32 workspace-grid-background">
          <p className="font-mono w-full text-white text-2xl uppercase tracking-[0.4em] mb-0 block opacity-20 max-w-xl ">
            Full Stack Engineer
          </p>
          <p className="font-sans text-white opacity-80 font-thin mt-4 max-w-xl text-sm sm:text-base">
            Hi, my name is Gustavo. Most of my work contains organization sensitive data, which
            makes it hard to showcase my experience. Therefore, I wanted to create something simple
            and dynamic, this portfolio is an example of custom and simple tech that can make a
            browser experience more dynamic.
          </p>

          <div className="flex flex-col gap-4 items-center justify-center mt-8 sm:mt-16 max-w-xl w-full">
            <p className="font-mono w-full text-white text-2xl uppercase tracking-[0.4em] mb-0 block opacity-20">
              Case Studies
            </p>
            <div className="font-sans w-full text-white opacity-80 font-thin max-w-xl flex flex-col gap-2 mb-4">
              <WindowButton
                useWindowStore={allverkStore}
                styles="border border-neutral-600 bg-neutral-600 bg-opacity-50 hover:bg-opacity-80 px-4 py-1 w-fit"
              >
                allverk.se
              </WindowButton>{' '}
              <p className="text-sm opacity-80">
                Embeddings and AI powered vector search engine (React, Go and PgSQL)
              </p>
            </div>
            <div className="font-sans w-full text-white opacity-80 font-thin max-w-xl flex flex-col gap-2">
              <WindowButton
                useWindowStore={offertAllverkStore}
                styles="border border-neutral-600 bg-neutral-600 bg-opacity-50 hover:bg-opacity-80 px-4 py-1 w-fit"
              >
                offert.allverk.se
              </WindowButton>{' '}
              <p className="text-sm opacity-80">
                Multi-tenant application + google ads integration (RR7 and Go)
              </p>
            </div>
          </div>
        </div>

        <WindowLayout
          defaultDock={(() => (window.innerWidth < 800 ? 'full' : 'right'))()}
          useWindowStore={allverkStore}
          windowName={'allverk.se'}
        >
          <iframe
            className={`
              w-full h-full
              ${isResizingAllverk || isDraggingAllverk ? 'pointer-events-none' : 'pointer-events-auto'}
            `}
            src="https://www.allverk.se/all/all/all"
          ></iframe>
        </WindowLayout>

        <WindowLayout
          defaultDock={(() => (window.innerWidth < 800 ? 'full' : 'left'))()}
          useWindowStore={offertAllverkStore}
          windowName={'offert.allverk.se'}
        >
          <iframe
            className={`
              w-full h-full
              ${isResizingOffert || isDraggingOffert ? 'pointer-events-none' : 'pointer-events-auto'}
            `}
            src="https://offert.allverk.se/"
          ></iframe>
        </WindowLayout>

        <WindowLayout
          defaultDock="full"
          useWindowStore={myStackStore}
          windowName={<CodeXml className="text-zinc-400" />}
        >
          <div className="w-full h-full p-6 md:p-10 flex justify-center">
            <section className="max-w-xl w-full flex flex-col gap-12">
              {/* Profile Section */}
              <div className="flex flex-wrap items-start justify-between gap-8">
                <article className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-2xl blur opacity-25"></div>
                    <img
                      src={profilePic}
                      alt="profile-pic"
                      className="relative h-32 w-32 md:h-40 md:w-40 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-zinc-200"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </article>

                <article className="flex-1 min-w-[280px]">
                  <header className="mb-4">
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                      Gustavo Oliveira
                    </h1>
                    <p className="text-zinc-500 font-medium flex items-center gap-2 mt-1">
                      <Cpu size={16} />
                      Systems Architect & Full-Stack Engineer
                    </p>
                  </header>

                  <div className="space-y-4 text-zinc-600 leading-relaxed">
                    <p>
                      I build robust, scalable systems with a focus on performance and clean
                      architecture. Passionate about low-level optimizations and modern web
                      technologies.
                    </p>
                    <div className="flex items-center gap-4 text-zinc-400">
                      <span className="w-1 h-1 rounded-full bg-zinc-300" />
                      <span className="flex items-center gap-1 text-xs uppercase tracking-widest font-bold">
                        <Globe size={12} /> Remote / Stockholm
                      </span>
                    </div>
                  </div>
                </article>
              </div>

              {/* Skills Section */}
              <section className="border-t border-zinc-200 pt-8">
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Terminal size={14} /> Core Competencies
                </h2>

                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Go', color: 'bg-sky-100 text-sky-700 border-sky-200' },
                    { name: 'C#', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                    { name: 'TypeScript', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                    { name: 'React', color: 'bg-amber-100 text-amber-700 border-amber-200' },
                    { name: 'NextJs', color: 'bg-gray-200 text-gray-700 border-gray-300' },
                    {
                      name: 'PostgreSQL',
                      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                    },
                    { name: 'NoSQL', color: 'bg-green-100 text-green-700 border-green-200' },
                  ].map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border cursor-default ${skill.color}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>

              {/* Read me Section */}
              <section className="border-t border-zinc-200 pt-8">
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Terminal size={14} /> READ ME
                </h2>

                <div className="flex flex-col gap-6 text-zinc-600 text-sm leading-relaxed">
                  {/* Overview */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-zinc-800">React Window Manager</h3>
                    <p>
                      A lightweight window manager built with React and Zustand. Each window
                      instance is fully isolated, draggable, dockable, and externally controllable
                      via its own store.
                    </p>
                  </div>

                  {/* Step 1 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-zinc-800">1. Create a Window Store</h3>
                    <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
                      {`const myWindow = createWindowStore('window-my-id')`}
                    </pre>
                    <p>
                      The ID must be unique. The return value is a standard Zustand hook and is
                      automatically registered internally.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-zinc-800">2. Wrap with WorkspaceLayout</h3>
                    <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
{`<WorkspaceLayout>
  {/* WindowLayout components */}
</WorkspaceLayout>`}
                    </pre>
                    <p>
                      The workspace acts as the rendering surface and stacking context for all
                      windows.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-zinc-800">3. Render a Window</h3>
                    <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
{`<WindowLayout
  useWindowStore={myWindow}
  windowName="My Window"
  defaultDock="right"
>
  <div>Any content</div>
</WindowLayout>`}
                    </pre>
                    <p>
                      Windows accept arbitrary React content (apps, iframes, components). Supported
                      deafult docking: <span className="font-mono">left</span>,{' '}
                      <span className="font-mono">right</span>,{' '}
                      <span className="font-mono">full</span>.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-zinc-800">4. Control with WindowButton</h3>
                    <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
{`<WindowButton useWindowStore={myWindow}>
  <p>Open Window</p>
</WindowButton>`}
                    </pre>
                    <p>
                      Buttons can be placed anywhere and can control the same window from multiple
                      locations.
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-zinc-800">5. Access Window State</h3>
                    <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
                      {`const { isDragging, isResizing } = myWindow()`}
                    </pre>
                    <p>
                      Because the store is a standard Zustand hook, window state can be used for
                      conditional UI logic (e.g., disabling pointer events during drag).
                    </p>
                  </div>

                  {/* Architecture */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-zinc-800">Architecture</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-mono">createWindowStore(id)</span> - isolated state
                        per window
                      </li>
                      <li>
                        <span className="font-mono">WorkspaceLayout</span> - shared render surface
                      </li>
                      <li>
                        <span className="font-mono">WindowLayout</span> - draggable/dockable
                        container
                      </li>
                      <li>
                        <span className="font-mono">WindowButton</span> - external controller
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Footer Info */}
              <footer className="mt-auto pt-8 pb-4 text-[10px] text-zinc-400 uppercase tracking-widest flex justify-between items-center">
                <span>Last Updated: Feb 2026</span>
                <div className="flex gap-4">
                  <a
                    target="_blank"
                    href="https://github.com/Gustavolmo/portfolio-v2"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/gustavo-l-m-de-oliveira-037243108/"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </footer>
            </section>
          </div>
        </WindowLayout>
      </WorkspaceLayout>

      <nav className="fixed bottom-0 left-0 w-full h-12 bg-neutral-900 flex gap-2 py-2 px-4 justify-between z-50">
        <div className="flex gap-2 items-center">
          <WindowButton useWindowStore={myStackStore} styles="px-2">
            <CodeXml className="text-zinc-400 hover:text-zinc-50" />
          </WindowButton>
          <WindowButton useWindowStore={allverkStore} styles="px-2">
            <p className="font-mono text-zinc-400 hover:text-zinc-200 text-xs sm:text-base">
              Allverk
            </p>
          </WindowButton>
          <WindowButton useWindowStore={offertAllverkStore} styles="px-2">
            <p className="font-mono text-zinc-400 hover:text-zinc-200 text-xs sm:text-base">
              Offert.allverk
            </p>
          </WindowButton>
        </div>

        <div className="flex gap-4 items-center">
          <a target="_blank" href="https://www.linkedin.com/in/gustavo-l-m-de-oliveira-037243108/">
            <Linkedin className="text-zinc-400 hover:text-zinc-50" />
          </a>
          <a target="_blank" href="https://github.com/Gustavolmo">
            <Github className="text-zinc-400 hover:text-zinc-50" />
          </a>
        </div>
      </nav>
    </>
  )
}
