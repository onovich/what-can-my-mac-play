import { useLocale } from '../../i18n/locale'

export function LibraryPage() {
  const { locale } = useLocale()
  return (
    <article className="library-unavailable shell" aria-labelledby="library-title">
      <h1 id="library-title">{locale === 'zh-CN' ? 'Steam 游戏库暂未开放' : 'Steam library connection is not available yet'}</h1>
      <a className="button button--primary" href="/#sample-library">{locale === 'zh-CN' ? '查找游戏' : 'Find a game'} →</a>
    </article>
  )
}
