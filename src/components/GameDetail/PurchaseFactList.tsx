import type { PurchaseFact } from '../../domain/purchase'
import { useLocale } from '../../i18n/locale'

const copy = {
  en: { source: 'Source', checked: 'Checked', published: 'Originally published', steam: 'Steam edition', gog: 'GOG edition', 'store-requirements': 'Store requirements', 'installation-recipe': 'Installation recipe · not a performance test' },
  'zh-CN': { source: '查看来源', checked: '核对日期', published: '原文发布', steam: 'Steam 版本', gog: 'GOG 版本', 'store-requirements': '商店要求', 'installation-recipe': '安装配方 · 不等于运行实测' },
}

export function PurchaseFactList({ facts }: { facts: readonly PurchaseFact[] }) {
  const { locale } = useLocale()
  const text = copy[locale]
  return (
    <ul className="purchase-facts">
      {facts.map((fact) => (
        <li key={`${fact.sourceUrl}:${fact.edition}`}>
          <strong>{text[fact.kind]} · {text[fact.edition]}</strong>
          <p>{fact.summary[locale]}</p>
          <small>
            <a href={fact.sourceUrl} target="_blank" rel="noreferrer">{text.source} ↗</a>
            {' · '}{text.checked}: <time dateTime={fact.checkedAt}>{fact.checkedAt}</time>
            {fact.sourcePublishedAt && <> · {text.published}: <time dateTime={fact.sourcePublishedAt}>{fact.sourcePublishedAt}</time></>}
          </small>
        </li>
      ))}
    </ul>
  )
}
