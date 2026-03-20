import { Unplug } from 'lucide-react'
import { apiRefereceWin } from '../../../../rwm/init-rwm'
import WindowFooter from '../content-structure/window-footer'
import WindowBody from '../content-structure/window-body'
import WindowMain from '../content-structure/window-main'
import WindowArticle from '../content-structure/window-article'
import ArticleHeader from '../content-structure/article-header'
import ArticleSection from '../content-structure/article-section'

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
            <ArticleSection>TBD...</ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Dock Api</ArticleHeader>
            <ArticleSection>TBD...</ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Focus Api</ArticleHeader>
            <ArticleSection>TBD...</ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Stack Api</ArticleHeader>
            <ArticleSection>TBD...</ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Workspace Api</ArticleHeader>
            <ArticleSection>TBD...</ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Workspace Store</ArticleHeader>
            <ArticleSection>TBD...</ArticleSection>
          </WindowArticle>

          <WindowArticle>
            <ArticleHeader>Window Registry</ArticleHeader>
            <ArticleSection>TBD...</ArticleSection>
          </WindowArticle>
        </WindowMain>

        <WindowFooter />
      </WindowBody>
    </apiRefereceWin.Window>
  )
}
