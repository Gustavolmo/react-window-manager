import { CodeXml } from 'lucide-react'
import { usageWin } from '../../../../rwm/init-rwm'
import WindowBody from '../content-structure/window-body'
import WindowMain from '../content-structure/window-main'
import WindowArticle from '../content-structure/window-article'
import ArticleHeader from '../content-structure/article-header'
import ArticleSection from '../content-structure/article-section'
import WindowFooter from '../content-structure/window-footer'
import InlineCode from '../../shared/syntax-components/inline-code'

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
              <p>Props:</p>
              <InlineCode>windowName: ReactNode</InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>navbarChildren?: string</InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>navbarClassName?: string</InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>className?: string</InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>defaultDock?:</InlineCode>
              <InlineCode>
                'right' | 'left' | 'full' | 'top' | 'bottom' | 'top-right' |
                'top-left' | 'bottom-right' | 'bottom-left' | 'default'
              </InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>Style?:</InlineCode>
              <InlineCode>{`{ navBackgroundColor?: string }`}</InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>{`{ windowBackgroundColor?: string }`}</InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>{`{ navControlsColor?: string} `}</InlineCode>
              <p>TBD...</p>
            </ArticleSection>

            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">2. Button</h3>
              <p>Props:</p>
              <InlineCode>className?: string</InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>isClosedClassName?: string</InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>isOpenClassName?: string</InlineCode>
              <p>TBD...</p>
              <br />
              <InlineCode>isActiveClassName?: string</InlineCode>
              <p>TBD...</p>
            </ArticleSection>

            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">
                3. Workspace Layout
              </h3>
              <p>Props:</p>
              <InlineCode>className?: string</InlineCode>
              <p>TBD...</p>
            </ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>States</ArticleHeader>
            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">
                1. Workspace Store
              </h3>
            </ArticleSection>
            <ArticleSection>
              <h3 className="font-semibold text-zinc-800">2. Window Store</h3>
            </ArticleSection>
          </WindowArticle>
        </WindowMain>

        <WindowFooter />
      </WindowBody>
    </usageWin.Window>
  )
}
