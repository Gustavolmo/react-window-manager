import { CodeXml } from 'lucide-react'
import { usageWin } from '../../../../rwm/init-rwm'
import WindowBody from '../content-structure/window-body'
import WindowMain from '../content-structure/window-main'
import WindowArticle from '../content-structure/window-article'
import ArticleHeader from '../content-structure/article-header'
import ArticleSection from '../content-structure/article-section'
import WindowFooter from '../content-structure/window-footer'
import InlineCode from '../../shared/syntax-components/inline-code'
import CodeSnippet from '../../shared/syntax-components/code-snippet'
import Yllw from '../../shared/syntax-components/colors/yllw'
import Tab from '../../shared/syntax-components/tab'
import Teal from '../../shared/syntax-components/colors/teal'
import Prpl from '../../shared/syntax-components/colors/prpl'
import Wht from '../../shared/syntax-components/colors/wht'
import Blue from '../../shared/syntax-components/colors/blue'
import Strg from '../../shared/syntax-components/strg'
import Cmnt from '../../shared/syntax-components/comment'

export default function UsageWindow() {
  return (
    <usageWin.Window
      windowName={<CodeXml className="h-4 w-4" />}
      defaultDock="left"
    >
      <WindowBody>
        <WindowMain>
          <WindowArticle>
            <ArticleHeader>Components</ArticleHeader>
            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">1. Window</h3>
              <p>
                Thse window component, accessed via the return object of{' '}
                <InlineCode>createWindowStore()</InlineCode>, has the
                following properties:
              </p>
              <CodeSnippet>
                <Yllw>{'{'}</Yllw>
                <br />
                <Tab tabs={1} />
                children: <Teal>ReactNode</Teal> <br />
                <Tab tabs={1} />
                windowName: <Teal>ReactNode</Teal> <br />
                <Tab tabs={1} />
                navbarChildren?: <Teal>ReactNode</Teal> <br />
                <Tab tabs={1} />
                className?: <Teal>string</Teal> <br />
                <Tab tabs={1} />
                navbarClassName?: <Teal>string</Teal> <br />
                <Tab tabs={1} />
                defaultDock?: <Teal>DockPosition</Teal> <br />
                <Tab tabs={1} />
                style?: <Prpl>{'{'}</Prpl>
                <br />
                <Tab tabs={2} />
                navBackgroundColor?: <Teal>string</Teal> <br />
                <Tab tabs={2} />
                windowBackgroundColor?: <Teal>string</Teal> <br />
                <Tab tabs={2} />
                navControlsColor?: <Teal>string</Teal> <br />
                <Tab tabs={1} />
                <Prpl>{'}'}</Prpl>
                <br />
                <Yllw>{'}'}</Yllw>
              </CodeSnippet>

              <InlineCode>windowName: ReactNode</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── It will place the string or element in the left end of the
                navbar. Use empty string to keep it empty.
              </p>

              <InlineCode>navbarChildren?: ReactNode</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── It will place your elements immediately after the
                windowName. You may use the space for additional functionality
                such as menus or tabs.
              </p>

              <InlineCode>className?: string</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Overide the default window styles
              </p>
              <p className="text-zinc-400 text-xs">└── Default ──┐</p>
              <CodeSnippet>
                <Wht>className=</Wht>
                <Blue>
                  {'{'}
                  <Strg>`</Strg>
                  <br />
                  <Cmnt> // Overriding fixed will break the window</Cmnt>
                  <br />
                </Blue>
                <Tab tabs={1} />
                <Strg>fixed overflow-hidden</Strg>
                <br />
                <Tab tabs={1} />
                <Blue>{'${'}</Blue>
                <Wht>className ? className : </Wht>
                <Strg>
                  'bg-white shadow-lg border border-zinc-600 rounded-sm'
                </Strg>
                <Blue>{'}'}</Blue>
                <br />
                <Strg>`</Strg>
                <Blue>{'}'}</Blue>
              </CodeSnippet>

              <InlineCode>navbarClassName?: string</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Overide the default navbar styles
              </p>
              <p className="text-zinc-400 text-xs">└── Default ──┐</p>
              <CodeSnippet>
                <Wht>className=</Wht>
                <Blue>
                  {'{'}
                  <Strg>`</Strg>
                  <br />
                  <Cmnt>
                    {' '}
                    // Overriding h-[32px] will break the window (Will be made
                    adjustable in the future)
                  </Cmnt>
                  <br />
                  <Tab tabs={1} />
                </Blue>
                <Strg>h-[32px] w-full flex items-center</Strg>
                <br />
                <Tab tabs={1} />
                <Blue>{'${'}</Blue>
                <Wht>
                  navbarClassName
                  <br />
                  <Tab tabs={2} />? navbarClassName <br />
                  <Tab tabs={2} />:{' '}
                </Wht>
                <Strg>`bg-neutral-800</Strg>
                <Blue>{' ${'}</Blue>
                <Wht>isActive ? </Wht>
                <Strg>'brightness-100'</Strg>
                <Wht> : </Wht>
                <Strg>'brightness-150'</Strg>
                <Blue>{'}'}</Blue>

                <Strg>`</Strg>
                <br />
                <Tab tabs={1} />
                <Blue>{'}'}</Blue>
                <br />
                <Strg>`</Strg>
                <Blue>{'}'}</Blue>
              </CodeSnippet>

              <InlineCode>defaultDock?:</InlineCode>
              <InlineCode>
                'right' | 'left' | 'full' | 'top' | 'bottom' | 'top-right' |
                'top-left' | 'bottom-right' | 'bottom-left' | 'default'
              </InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Defines the the default window position or dock when
                starting the app
              </p>

              <InlineCode>Style?:</InlineCode>
              <InlineCode>{`{ navBackgroundColor?: string }`}</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── CSS only property for overriding the navbar background color
              </p>

              <InlineCode>{`{ windowBackgroundColor?: string }`}</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── CSS only property for overriding the window background color
              </p>

              <InlineCode>{`{ navControlsColor?: string} `}</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── CSS only property for overriding the stroke color of the
                navbar buttons
              </p>
            </ArticleSection>

            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">2. Button</h3>
              <p>
                Thse button component, accessed via the return object of{' '}
                <InlineCode>createWindowStore()</InlineCode>, has the
                following properties:
              </p>
              <InlineCode>className?: string</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Adds styles to your button. Empty by default
              </p>

              <InlineCode>
                isClosedClassName?: string
                <br />
                isOpenClassName?: string
                <br />
                isActiveClassName?: string
              </InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Overides the default styles for when the window is open,
                closed and active
              </p>
              <p className="text-zinc-400 text-xs">└── Default ──┐</p>
              <CodeSnippet>
                <Wht>className=</Wht>
                <Blue>{'{'}</Blue>
                <Strg>`</Strg>
                <br />
                <Tab tabs={1} />
                <Blue>{'${'}</Blue>className<Blue>{'}'}</Blue>{' '}
                <Cmnt>// ""</Cmnt>
                <br />
                <Tab tabs={1} />
                <Blue>{'${'}</Blue>isWindowClosed
                <br />
                <Tab tabs={2} />? isClosedClassName{' '}
                <Cmnt>
                  // "brightness-[85%] border-t-2 border-t-transparent"
                </Cmnt>{' '}
                <br />
                <Tab tabs={2} />: isActive <br />
                <Tab tabs={3} />? isActiveClassName{' '}
                <Cmnt>
                  // "brightness-150 border-t-2 border-zinc-400 bg-zinc-50/10"
                </Cmnt>{' '}
                <br />
                <Tab tabs={3} />: isOpenClassName <Blue>{'}'}</Blue>
                <Cmnt>
                  {' '}
                  // "brightness-150 border-t-2 border-t-transparent"
                </Cmnt>
                <br />
                <Strg>`</Strg>
                <Blue>{'}'}</Blue>
              </CodeSnippet>
            </ArticleSection>

            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">
                3. Workspace Layout
              </h3>
              <InlineCode>className?: string</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Overides the default workspace style
              </p>
              <p className="text-zinc-400 text-xs">└── Default ──┐</p>
              <CodeSnippet>
                <Wht>className=</Wht>
                <Blue>
                  {'{'}
                  <Strg>`</Strg>
                  <br />
                </Blue>
                <Tab tabs={1} />
                <Tab tabs={1} />
                <Blue>{'${'}</Blue>
                <Wht>className ? className : </Wht>
                <Strg>
                  'fixed overflow-hidden h-full w-full touch-none -z-50'
                </Strg>
                <Blue>{'}'}</Blue>
                <br />
                <Strg>`</Strg>
                <Blue>{'}'}</Blue>
              </CodeSnippet>
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>States</ArticleHeader>
            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">
                1. Workspace Store
              </h3>
              <p>
                The <InlineCode>workspaceStore</InlineCode>, accessible via the{' '}
                <InlineCode>rwm</InlineCode> object, exposes the zustand hook
                containing the workspace state store.
              </p>
              <CodeSnippet>
                <Blue>{'{'}</Blue>
                <br />
                <Tab tabs={1} />
                isBelowBreakPoint: <Teal>boolean</Teal>
                <Cmnt>
                  {' '}
                  // true if the workspace width is less than responsiveBreak
                </Cmnt>
                <br />
                <Tab tabs={1} />
                isGridEnabled: <Teal>boolean</Teal>
                <Cmnt>
                  {' '}
                  // deafult true. Disable grid behavior via rwm.workspaceApi
                </Cmnt>
                <br />
                <Tab tabs={1} />
                isDockPannelEnabled: <Teal>boolean</Teal>
                <Cmnt>
                  {' '}
                  // deafult true. Disable the docking pannel via
                  rwm.workspaceApi
                </Cmnt>
                <br />
                <Tab tabs={1} />
                responsiveBreak: <Teal>ResponsiveSizes</Teal>
                <Cmnt>
                  {' '}
                  // deafult 'sm' (640px). Change it via rwm.workspaceApi
                </Cmnt>
                <br />
                <br />
                <Tab tabs={1} />
                activeWindowId: <Teal>string</Teal>
                <Cmnt>
                  {' '}
                  // Always points to the front most window in the satck
                </Cmnt>
                <br />
                <br />
                <Tab tabs={1} />
                wsRect: <Teal>WorkspaceRect</Teal>
                <Cmnt>
                  {' '}
                  // Keeps track of the current dimensions of the workspace
                  element
                </Cmnt>
                <br />
                <Blue>{'}'}</Blue>
              </CodeSnippet>
              <InlineCode>activeWindowId: string</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── You may combine the active windowId with the workspaceRegistry to create actions specific to the currently active window
              </p>
              <p className="text-zinc-400 text-xs">└── Example ──┐</p>
              <CodeSnippet>
                <Cmnt>// Inside a component:</Cmnt><br/>
                <Blue>const</Blue><Yllw>{' { '}</Yllw>activeWindowId<Yllw>{' } '}</Yllw>= <Yllw>workspaceStore</Yllw>()<br/>
                <Blue>const</Blue><Yllw>{' { '}</Yllw>someState<Yllw>{' } '}</Yllw>= windowRegistry[activeWindowId]()
              </CodeSnippet>
                <p className="text-zinc-400 text-xs">└── Or ──┐</p>
              <CodeSnippet>
                <Cmnt>// Inside a function:</Cmnt><br/>
                <Blue>const </Blue>activeWindowId = workspaceStore.<Yllw>getState</Yllw>().activeWindowId<br/>
                rwm.dockApi.<Yllw>dockWindowLeft</Yllw>(activeWindowId)
              </CodeSnippet>
            </ArticleSection>
            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">
                2. Window Registry
              </h3>
              <p>
                The <InlineCode>windowRegistry</InlineCode>, accessible via the{' '}
                <InlineCode>rwm</InlineCode> object, contains a record of every
                window's zustand state store
              </p>
              <CodeSnippet>
                <Teal>Record</Teal>
                {'<'}
                <Teal>windowId, WindowStore</Teal>
                {'>'}
              </CodeSnippet>
              <p>
                Every <InlineCode>windowStore</InlineCode> store contains the
                following shape:
              </p>
              <CodeSnippet>
                <Blue>{'{'}</Blue>
                <br />
                <Tab tabs={1} />
                windowId: <Teal>string</Teal>
                <br />
                <Tab tabs={1} />
                zIndex: <Teal>umber</Teal>
                <br />
                <br />
                <Tab tabs={1} />
                winCoord: <Teal>Coord</Teal>
                <br />
                <Tab tabs={1} />
                winVisualState: <Teal>WindowState</Teal>
                <br />
                <br />
                <Tab tabs={1} />
                isActive: <Teal>boolean</Teal>
                <br />
                <Tab tabs={1} />
                isDragging: <Teal>boolean</Teal>
                <br />
                <Tab tabs={1} />
                isWindowClosed: <Teal>boolean</Teal>
                <br />
                <Tab tabs={1} />
                resizeAction: <Teal>ResizeDirection</Teal>
                <br />
                <br />
                <Tab tabs={1} />
                winWidth: <Teal>number</Teal>
                <br />
                <Tab tabs={1} />
                winHeight: <Teal>number</Teal>
                <br />
                <br />
                <Tab tabs={1} />
                WIN_MIN_WIDTH: <Teal>number</Teal>
                <br />
                <Tab tabs={1} />
                WIN_MIN_HEIGHT: <Teal>number</Teal>
                <br />
                <Blue>{'}'}</Blue>
              </CodeSnippet>
            </ArticleSection>
          </WindowArticle>
        </WindowMain>

        <WindowFooter />
      </WindowBody>
    </usageWin.Window>
  )
}
