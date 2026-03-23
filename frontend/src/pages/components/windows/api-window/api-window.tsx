import { CodeXml, Unplug } from 'lucide-react'
import { apiRefereceWin, usageWin } from '../../../../rwm/init-rwm'
import WindowFooter from '../content-structure/window-footer'
import WindowBody from '../content-structure/window-body'
import WindowMain from '../content-structure/window-main'
import WindowArticle from '../content-structure/window-article'
import ArticleHeader from '../content-structure/article-header'
import ArticleSection from '../content-structure/article-section'
import InlineCode from '../../shared/syntax-components/inline-code'
import CodeSnippet from '../../shared/syntax-components/code-snippet'
import Blue from '../../shared/syntax-components/colors/blue'
import Wht from '../../shared/syntax-components/colors/wht'
import Yllw from '../../shared/syntax-components/colors/yllw'
import Tab from '../../shared/syntax-components/tab'
import Cmnt from '../../shared/syntax-components/comment'

export default function ApiWindow() {
  return (
    <apiRefereceWin.Window
      windowName={<Unplug className="h-4 w-4" />}
      defaultDock="left"
    >
      <WindowBody>
        <WindowMain>
          <WindowArticle>
            <ArticleHeader>Summary</ArticleHeader>
            <ArticleSection>
              <p>
                To access all of the available utilities in React Window Manager
                you can use the <InlineCode>rwm</InlineCode> object, which
                contains the following utilities
              </p>

              <CodeSnippet>
                <Blue>const</Blue> <Wht>rwm =</Wht>
                <Yllw>{' {'}</Yllw>
                <br />
                <Tab tabs={1} />
                <Wht>dockApi,</Wht>
                <br />
                <Tab tabs={1} />
                <Wht>focusApi,</Wht>
                <br />
                <Tab tabs={1} />
                <Wht>stackApi,</Wht>
                <br />
                <Tab tabs={1} />
                <Wht>workspaceApi,</Wht>
                <br />
                <Tab tabs={1} />
                <Wht>worskpaceState,</Wht>
                <br />
                <Tab tabs={1} />
                <Wht>windowRegistry,</Wht>
                <br />
                <Yllw>{'}'}</Yllw>
                <br />
              </CodeSnippet>
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Dock Api</ArticleHeader>
            <ArticleSection>
              <p>
                The <InlineCode>dockApi</InlineCode> exposes all available
                methods for docking windows in predefined positions.
              </p>
              <p>
                To target which window to dock, you will need to pass the
                respective window ID, which is generated when calling the{' '}
                <InlineCode>createWindowStore()</InlineCode> method.
              </p>
              <p className="font-semibold text-zinc-800">For example:</p>
              <CodeSnippet>
                <Blue>const</Blue> <Wht>myWindow = </Wht>
                <Yllw>createdWindowStore</Yllw>
                <Wht>()</Wht>
                <br />
                <br />
                <Wht>rwm.dockApi.</Wht>
                <Yllw>dockWindowTopRight</Yllw>
                <Wht>(myWindow.windowId)</Wht>
              </CodeSnippet>
            </ArticleSection>

            <ArticleSection>
              <p className="font-semibold text-zinc-800">Available methods:</p>
              <InlineCode>
                maximizeWindow: {'(winId: string) => Void'}
              </InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Fully covers the worskpace
              </p>
              <InlineCode>
                demaximizeWindow: {'(winId: string) => Void'}
              </InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Covers most of the workspace without touching its edges
              </p>
              <InlineCode>
                dockWindowRight: {'(winId: string) => Void'}
              </InlineCode>
              <InlineCode>
                dockWindowLeft: {'(winId: string) => Void'}
              </InlineCode>
              <InlineCode>
                dockWindowTop: {'(winId: string) => Void'}
              </InlineCode>

              <InlineCode>
                dockWindowBottom: {'(winId: string) => Void'}
              </InlineCode>

              <InlineCode>
                dockWindowBottomRight: {'(winId: string) => Void'}
              </InlineCode>

              <InlineCode>
                dockWindowTopRight: {'(winId: string) => Void'}
              </InlineCode>

              <InlineCode>
                dockWindowBottomLeft: {'(winId: string) => Void'}
              </InlineCode>

              <InlineCode>
                dockWindowTopLeft: {'(winId: string) => Void'}
              </InlineCode>
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Focus Api</ArticleHeader>
            <ArticleSection>
              <p>
                The <InlineCode>focus api</InlineCode> controls which window is
                active, closed or opened.
              </p>

              <p>
                To target which to control via the docus api, you will need to
                pass the respective window ID, which is generated when calling
                the <InlineCode>createWindowStore()</InlineCode> method.
              </p>
              <p className="font-semibold text-zinc-800">For example:</p>
              <CodeSnippet>
                <Blue>const</Blue> <Wht>myWindow = </Wht>
                <Yllw>createdWindowStore</Yllw>
                <Wht>()</Wht>
                <br />
                <br />
                <Cmnt>
                  // Closes the target window and activates the front most
                  opened window in the stack, if any
                </Cmnt>{' '}
                <br />
                <Wht>rwm.focusApi.</Wht>
                <Yllw>closeWindowAndRefocus</Yllw>
                <Wht>(myWindow.windowId)</Wht>
              </CodeSnippet>
            </ArticleSection>
            <ArticleSection>
              <p className="font-semibold text-zinc-800">Available methods:</p>
              <InlineCode>
                bringWindowToFocus: {'(winId: string) => Void'}
              </InlineCode>
              <p className="text-zinc-400 text-xs">
                └── If target window is closed, it will open the window and
                bring it to focus, otherwise it will only bring it to focus
              </p>
              <InlineCode>
                closeWindowAndRefocus: {'(winId: string) => Void'}
              </InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Closes the target window and activates the front most opened
                window in the stack, if any
              </p>
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Stack Api</ArticleHeader>
            <ArticleSection>
              <p>
                The <InlineCode>stackApi</InlineCode> is a small utility for
                resetting all windows to their initial state.
              </p>
            </ArticleSection>
            <ArticleSection>
              <p className="font-semibold text-zinc-800">Available methods:</p>
              <InlineCode>resetStack: {'() => Void'}</InlineCode>
              <p className="text-zinc-400 text-xs">
                └── It will close all windows and reset them to their initial
                position
              </p>
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Workspace Api</ArticleHeader>
            <ArticleSection>
              <p>
                Use the <InlineCode>WorkspaceApi</InlineCode> to alter default
                workspace behavior.
              </p>
            </ArticleSection>
            <ArticleSection>
              <p className="font-semibold text-zinc-800">Available methods:</p>
              <InlineCode>
                setWsResponsiveBreak:{' '}
                {
                  '(breakPoint: number | "sm" | "md" | "lg" | "xl" | "never" | "always") => Void'
                }
              </InlineCode>
              <p className="text-zinc-400 text-xs">
                └── (deafult = sm) uses mobile format at 640px. Mobile format
                disables resize and dock, every window becomes fullscreen
              </p>

              <InlineCode>
                setWsFeatures:{' '}
                {
                  '({ isDockPannelEnabled = true, isGridEnabled = true }) => Void'
                }
              </InlineCode>
              <p className="text-zinc-400 text-xs">
                └── Set isDockPannelEnabled to false to remove the workspace
                docking pannel
              </p>
              <p className="text-zinc-400 text-xs">
                └── Set isGridEnabled to false to stop windows from connecting
                edges during size
              </p>
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Workspace Store</ArticleHeader>
            <ArticleSection>
              <p>
                Using <InlineCode>WorkspaceStore</InlineCode> gives access to
                the workspace state store, useful for keeping track of current
                states. We highly discourage using the{' '}
                <InlineCode>.setState()</InlineCode> method, use it at your own
                risk. The safest way to mutate any is state is to use exposed
                api methods.
              </p>
              <p>You may access the store by:</p>
              <CodeSnippet>
                <Cmnt>// get the current state </Cmnt>
                <br />
                <Blue>const </Blue>
                <Wht>state = </Wht>
                <Wht>workspaceStore.</Wht>
                <Yllw>getState</Yllw>
                <Wht>()</Wht>
                <br />
                <br />
                <Cmnt>// or get the state as a hook inside a component</Cmnt>
                <br />
                <Blue>const </Blue>
                <Wht>{'{ someState }'} = </Wht>
                <Yllw>workspaceStore</Yllw>
                <Wht>()</Wht>
              </CodeSnippet>
            </ArticleSection>
            <ArticleSection>
              <p>
                For usage example and tips checkout the{' '}
                <InlineCode>States</InlineCode> section in:
              </p>
              <usageWin.Button
                isOpenClassName="none"
                isClosedClassName="none"
                isActiveClassName="none"
              >
                <div className="flex gap-2 items-center px-4 py-2 bg-zinc-800 text-zinc-50 rounded-sm w-fit">
                  <CodeXml className="h-4 w-4" /> Usage Patterns
                </div>
              </usageWin.Button>
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Window Registry</ArticleHeader>
            <ArticleSection>
              <p>
                The <InlineCode>windowRegistry</InlineCode> is a record of every
                window state store. We highly discourage using the{' '}
                <InlineCode>.setState()</InlineCode> method, use it at your own
                risk. The safest way to mutate any is state is to use exposed
                api methods.
              </p>
              <p>You may access any specific window state store by calling:</p>
              <CodeSnippet>
                <Cmnt>// get the current state </Cmnt>
                <br />
                <Blue>const </Blue>
                <Wht>state = </Wht>
                <Wht>windowRegistry</Wht>[windowId].
                <Yllw>getState</Yllw>
                <Wht>()</Wht>
                <br />
                <br />
                <Cmnt>// or get the state as a hook inside a component</Cmnt>
                <br />
                <Blue>const </Blue>
                <Wht>{'{ someState }'} = </Wht>
                <Yllw>windowRegistry</Yllw>[windowId]
                <Wht>()</Wht>
              </CodeSnippet>
            </ArticleSection>
            <ArticleSection>
              <p>
                For usage example and tips checkout the{' '}
                <InlineCode>States</InlineCode> section in:
              </p>
              <usageWin.Button
                isOpenClassName="none"
                isClosedClassName="none"
                isActiveClassName="none"
              >
                <div className="flex gap-2 items-center px-4 py-2 bg-zinc-800 text-zinc-50 rounded-sm w-fit">
                  <CodeXml className="h-4 w-4" /> Usage Patterns
                </div>
              </usageWin.Button>
            </ArticleSection>
          </WindowArticle>
        </WindowMain>

        <WindowFooter />
      </WindowBody>
    </apiRefereceWin.Window>
  )
}
