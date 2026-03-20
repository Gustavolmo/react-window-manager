import { ArrowDownToLine, CodeXml, Unplug } from 'lucide-react'
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
import WindowBody from '../content-structure/window-body'
import WindowFooter from '../content-structure/window-footer'
import WindowMain from '../content-structure/window-main'
import ArticleHeader from '../content-structure/article-header'
import WindowArticle from '../content-structure/window-article'
import ArticleSection from '../content-structure/article-section'

export default function StartRwmWindow() {
  const [pkgManagerText, setPkgManagerText] = useState<
    'pnpm add' | 'yarn add' | 'npm install'
  >('pnpm add')

  return (
    <startRwmWin.Window
      defaultDock="right"
      windowName={<ArrowDownToLine className="h-4 w-4" />}
    >
      <WindowBody>
        <WindowMain>
          <WindowArticle>
            <ArticleHeader>INSTALL RWM (React Window Manager)</ArticleHeader>

            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">
                1. Install Dependencies
              </h3>
              <p>
                Install React Window Manager, React and React-dom. React and
                React-dom 19+ are peer dependencies
              </p>
              <div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPkgManagerText('pnpm add')}
                    className={`font-bold px-4 py-0.5 rounded-t-xl border border-b-0 mx-1 border-zinc-300 ${pkgManagerText === 'pnpm add' ? 'bg-zinc-800 text-zinc-200' : 'bg-none text-zinc-600'}`}
                  >
                    pnpm
                  </button>
                  <button
                    onClick={() => setPkgManagerText('npm install')}
                    className={`font-bold px-4 py-0.5 rounded-t-xl border border-b-0 mx-1 border-zinc-300 ${pkgManagerText === 'npm install' ? 'bg-zinc-800 text-zinc-200' : 'bg-none text-zinc-600'}`}
                  >
                    npm
                  </button>
                  <button
                    onClick={() => setPkgManagerText('yarn add')}
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
            </ArticleSection>

            <ArticleSection>
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
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>QUICK START</ArticleHeader>
            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">
                1. Create a Window
              </h3>
              <p>
                Call <InlineCode>createWindowStore()</InlineCode> to register a
                new window instance. The return object contains everything you
                need to register the window as we will see next.
              </p>
              <CodeSnippet>
                <Blue>const</Blue> <Wht>myWindow1 =</Wht>{' '}
                <Yllw>createWindowStore</Yllw>()
                <br />
                <Blue>const</Blue> <Wht>myWindow2 =</Wht>{' '}
                <Yllw>createWindowStore</Yllw>()
              </CodeSnippet>
            </ArticleSection>

            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">
                2. Render the Window
              </h3>
              <p>
                Your window instances are dependent on{' '}
                <InlineCode>WorkspaceLayout</InlineCode> being rendered in order
                to work properly. All windows are relative to the position and
                dimensions of the workspace layout component.
              </p>
              <p>
                The workspace layout acts as the rendering surface and stacking
                context for all windows. To access the window we created above,
                we will use the return from{' '}
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
            </ArticleSection>

            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">
                3. Adjusting the Workspace Layout
              </h3>
              <p>
                By deafult the workspace layout is fixed with full width and
                full height, you may override the defult using{' '}
                <InlineCode>className</InlineCode>. All windows will adjust
                their coordinates accordingly. In order to avoid visible
                overflow outside the worskpace layout, elements placed outside
                must have a z-index greater than the total number of windows
                created.
              </p>
              <p>
                For example, to create a navigation component below the
                workspace layout you may do something like this:
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
            </ArticleSection>

            <ArticleSection>
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
            </ArticleSection>

            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">4. That's it</h3>
              <p>
                This is the simplest way to use the library. All defaults are
                enabled, such as styling, the docking pannel and resize edge
                detection.
              </p>
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Further Reading</ArticleHeader>
            <ArticleSection>
              <p>
                For ways to control windows remotely and advanced usage patterns
                check:
              </p>
              <div className="flex gap-4">
                <usageWin.Button
                  isOpenClassName="none"
                  isClosedClassName="none"
                  isActiveClassName="none"
                >
                  <div className="flex gap-2 items-center px-4 py-2 bg-zinc-800 text-zinc-50 rounded-sm">
                    <CodeXml className="h-4 w-4" /> Usage Patterns
                  </div>
                </usageWin.Button>
                <apiRefereceWin.Button
                  isOpenClassName="none"
                  isClosedClassName="none"
                  isActiveClassName="none"
                >
                  <div className="flex gap-2 items-center px-4 py-2 bg-zinc-800 text-zinc-50 rounded-sm">
                    <Unplug className="h-4 w-4" /> RWM Api Reference
                  </div>
                </apiRefereceWin.Button>
              </div>
            </ArticleSection>
          </WindowArticle>
        </WindowMain>

        <WindowFooter />
      </WindowBody>
    </startRwmWin.Window>
  )
}
