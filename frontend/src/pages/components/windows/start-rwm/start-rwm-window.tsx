/* eslint-disable max-len */
import { ArrowDownToLine, CodeXml, Terminal, Unplug } from 'lucide-react'
import CodeSnippet from '../../shared/syntax-components/code-snippet'
import { apiRefereceWin, startRwmWin, usageWin } from '../../../../rwm/init-rwm'
import Blue from '../../shared/syntax-components/colors/blue'
import Wht from '../../shared/syntax-components/colors/wht'
import Yllw from '../../shared/syntax-components/colors/yllw'
import Tab from '../../shared/syntax-components/tab'
import Comment from '../../shared/syntax-components/comment'
import Prpl from '../../shared/syntax-components/colors/prpl'
import Strg from '../../shared/syntax-components/strg'
import { useState } from 'react'
import InlineCode from '../../shared/syntax-components/inline-code'
import Tag from '../../shared/syntax-components/tag'

export default function StartRwmWindow() {
  const [pkgManagerText, setPkgManangerText] = useState<
    'pnpm add' | 'yarn add' | 'npm install'
  >('pnpm add')

  return (
    <startRwmWin.Window
      defaultDock="right"
      windowName={<ArrowDownToLine className="h-4 w-4" />}
    >
      <div className="w-full h-full p-6 md:p-10 flex justify-center">
        <div className="max-w-4xl w-full flex flex-col gap-12">
          <section className="p-2 pt-8 rounded-lg flex flex-col gap-8">
            <article className="flex flex-col gap-6 text-zinc-600 text-sm leading-relaxed">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Terminal size={14} className="shrink-0" /> INSTALL RWM (React
                Window Manager)
              </h2>

              <section className="flex flex-col gap-2">
                <h3 className="font-semibold text-zinc-800">
                  1. Install Dependencies
                </h3>
                <p>
                  Install React Window Mananger, React and React-dom. React and
                  React-dom 19+ are peer dependencies
                </p>
                <div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPkgManangerText('pnpm add')}
                      className={`font-bold px-4 py-0.5 rounded-t-xl border border-b-0 mx-1 border-zinc-300 ${pkgManagerText === 'pnpm add' ? 'bg-zinc-800 text-zinc-200' : 'bg-none text-zinc-600'}`}
                    >
                      pnpm
                    </button>
                    <button
                      onClick={() => setPkgManangerText('npm install')}
                      className={`font-bold px-4 py-0.5 rounded-t-xl border border-b-0 mx-1 border-zinc-300 ${pkgManagerText === 'npm install' ? 'bg-zinc-800 text-zinc-200' : 'bg-none text-zinc-600'}`}
                    >
                      npm
                    </button>
                    <button
                      onClick={() => setPkgManangerText('yarn add')}
                      className={`font-bold px-4 py-0.5 rounded-t-xl border border-b-0 mx-1 border-zinc-300 ${pkgManagerText === 'yarn add' ? 'bg-zinc-800 text-zinc-200' : 'bg-none text-zinc-600'}`}
                    >
                      yarn
                    </button>
                  </div>
                  <CodeSnippet>
                    {pkgManagerText} @gustavolmo/react-window-manager
                    <br />
                    {pkgManagerText} react react-dom
                  </CodeSnippet>
                </div>
              </section>

              <section className="flex flex-col gap-2">
                <h3 className="font-semibold text-zinc-800">
                  2. Import default styles
                </h3>
                <p>
                  This library ships with its own compiled CSS. Import the
                  stylesheet once at your application root:
                </p>
                <CodeSnippet>
                  <Prpl>import</Prpl>{' '}
                  <Strg>"@gustavolmo/react-window-manager/index.css"</Strg>
                </CodeSnippet>
              </section>
            </article>

            <article className="flex flex-col gap-6 text-zinc-600 text-sm leading-relaxed">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2 border-t border-zinc-200 mt-8 pt-4">
                <Terminal className="shrink-0" size={14} /> QUICK START
              </h2>
              <section className="flex flex-col gap-2">
                <h3 className="font-semibold text-zinc-800">
                  1. Create a Window
                </h3>
                <p>
                  Call <InlineCode>createWindowStore()</InlineCode> to register
                  a new window instance. The return object contains everything
                  you need to register the window as we will see next.
                </p>
                <CodeSnippet>
                  <Blue>const</Blue> <Wht>myWindow1 =</Wht>{' '}
                  <Yllw>createWindowStore</Yllw>()
                  <br />
                  <Blue>const</Blue> <Wht>myWindow2 =</Wht>{' '}
                  <Yllw>createWindowStore</Yllw>()
                </CodeSnippet>
              </section>

              <section className="flex flex-col gap-2">
                <h3 className="font-semibold text-zinc-800">
                  2. Render the Window
                </h3>
                <p>
                  Your window instances are dependent on{' '}
                  <InlineCode>WorkspaceLayout</InlineCode> being rendered in
                  order to work properly. All windows are relative to the
                  position and dimensions of the workspace layout component.
                </p>
                <p>
                  The workspace layout acts as the rendering surface and
                  stacking context for all windows. To access the window we
                  created above, we will use the return from{' '}
                  <InlineCode>createWindowStore()</InlineCode> and access the
                  property <InlineCode>.Window</InlineCode>:
                </p>
                <CodeSnippet>
                  <Prpl>{'import'} </Prpl>
                  <Yllw>{'{ '}</Yllw>WorkspaceLayout<Yllw>{' }'}</Yllw>{' '}
                  <Prpl>from</Prpl>{' '}
                  <Strg>"@gustavolmo/react-window-manager"</Strg>
                  <br />
                  <br />
                  <Comment>// ...</Comment>
                  <br />
                  <br />
                  <Tag s={'<'} e={'>'} type="component">
                    WorkspaceLayout
                  </Tag>
                  <br />
                  <Tab tabs={1} />
                  <Comment>{'// any valid code'}</Comment>
                  <br />
                  <br />
                  <Tab tabs={1} />
                  <Tag s={'<'} e={'>'} type="component">
                    myWindow1.Window
                  </Tag>
                  <br />
                  <Tab tabs={2} />
                  <Comment>{'// any valid code'}</Comment>
                  <br />
                  <Tab tabs={1} />
                  <Tag s={'</'} e={'>'} type="component">
                    myWindow1.Window
                  </Tag>
                  <br />
                  <br />
                  <Tab tabs={1} />
                  <Tag s={'<'} e={'>'} type="component">
                    myWindow2.Window
                  </Tag>
                  <br />
                  <Tab tabs={2} />
                  <Comment>{'// any valid code'}</Comment>
                  <br />
                  <Tab tabs={1} />
                  <Tag s={'</'} e={'>'} type="component">
                    myWindow2.Window
                  </Tag>
                  <br />
                  <Tag s={'</'} e={'>'} type="component">
                    WorkspaceLayout
                  </Tag>
                </CodeSnippet>
              </section>

              <section className="flex flex-col gap-2">
                <h3 className="font-semibold text-zinc-800">
                  3. Adjusting the Workspace Layout
                </h3>
                <p>
                  By deafult the workspace layout is fixed with full width and
                  full height, you may override the defult using{' '}
                  <InlineCode>className</InlineCode>. All windows will adjust
                  their coordinates accordingly. In order to avoid visible
                  overflow outside the worskpace layout, elements places outside
                  the must have a z-index greater than the total number of
                  windows created.
                </p>
                <p>
                  For example, to create a navigation component below the
                  workspace you may do something like this:
                </p>
                <CodeSnippet>
                  <Comment>
                    {'// Example with Tailwind, css classes are also valid'}
                  </Comment>
                  <br />
                  <br />
                  <Tag
                    s={'<'}
                    e={'>'}
                    className='"fixed w-full h-full flex flex-col"'
                  >
                    section
                  </Tag>
                  <br />
                  <Tab tabs={1} />
                  <Tag
                    s={'<'}
                    e={'>'}
                    type="component"
                    className='"h-full w-full grow"'
                  >
                    WorkspaceLayout
                  </Tag>
                  <br />
                  <Tab tabs={2} />
                  <Comment>{'// any valid code'}</Comment>
                  <br />
                  <br />
                  <Tab tabs={1} />
                  <Tag s={'</'} e={'>'} type="component">
                    WorkspaceLayout
                  </Tag>
                  <br />
                  <br />
                  <Tab tabs={1} />
                  <Tag
                    s={'<'}
                    e={'>'}
                    className='"w-full h-12 bg-neutral-900 flex gap-2 px-4 z-50"'
                  >
                    nav
                  </Tag>
                  <br />
                  <Tab tabs={2} />
                  <Comment>{'// any valid code'}</Comment>
                  <br />
                  <Tab tabs={1} />
                  <Tag s={'</'} e={'>'}>
                    nav
                  </Tag>
                  <br />
                  <Tag s={'</'} e={'>'}>
                    section
                  </Tag>
                </CodeSnippet>
              </section>

              <section className="flex flex-col gap-2">
                <h3 className="font-semibold text-zinc-800">
                  3. Control the Window
                </h3>
                <p>
                  To open and close the window, we will also use the return from{' '}
                  <InlineCode>createWindowStore()</InlineCode> and this time
                  access the property <InlineCode>.Button</InlineCode>. Buttons
                  can be placed anywhere and can control the same window from
                  multiple locations.
                </p>
                <CodeSnippet>
                  <Tag type="component" s="<" e=">">
                    myWindow1.Button
                  </Tag>
                  <br />
                  <Tab tabs={1} />
                  <Comment>// any valid code</Comment>
                  <br />
                  <Tag type="component" s="</" e=">">
                    myWindow1.Button
                  </Tag>
                </CodeSnippet>
              </section>

              <section className="flex flex-col gap-2">
                <h3 className="font-semibold text-zinc-800">4. That's it</h3>
                <p>
                  This is the simplest way to use the library. All defaults are
                  enabled, such as styling, the docking pannel and edge
                  detection when resizing windows whose edges are next to each
                  other.
                </p>
              </section>
            </article>

            <article className="flex flex-col gap-6 text-zinc-600 text-sm leading-relaxed">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2 border-t border-zinc-200 mt-8 pt-4">
                <Terminal size={14} className="shrink-0" /> Further Reading
              </h2>

              <section className="flex flex-col gap-2">
                <p>
                  For ways to control windows remotely and advanced usage
                  patterns check:
                </p>
                <div className="flex gap-4">
                  <apiRefereceWin.Button
                    isOpenClassName="none"
                    isClosedClassName="none"
                    isActiveClassName="none"
                  >
                    <div className="flex gap-2 items-center px-4 py-2 bg-slate-600 text-zinc-50 rounded-sm">
                      <Unplug className="h-4 w-4" /> RWM Api Reference
                    </div>
                  </apiRefereceWin.Button>
                  <usageWin.Button
                    isOpenClassName="none"
                    isClosedClassName="none"
                    isActiveClassName="none"
                  >
                    <div className="flex gap-2 items-center px-4 py-2 bg-slate-600 text-zinc-50 rounded-sm">
                      <CodeXml className="h-4 w-4" /> Usage
                    </div>
                  </usageWin.Button>
                </div>
              </section>
            </article>
          </section>

          {/* Footer Info */}
          <footer className="mt-auto pt-8 pb-4 text-[10px] text-zinc-400 uppercase tracking-widest flex justify-between items-center">
            <span>Last Updated: Mar 2026</span>
            <div className="flex gap-4">
              <a
                target="_blank"
                href="https://github.com/Gustavolmo/react-window-manager"
                className="hover:text-zinc-900"
              >
                GitHub
              </a>
            </div>
          </footer>
        </div>
      </div>
    </startRwmWin.Window>
  )
}
