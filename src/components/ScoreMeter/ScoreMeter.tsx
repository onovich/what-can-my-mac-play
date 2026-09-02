import { useLocale } from '../../i18n/locale'

export function ScoreMeter({
  label,
  title,
  value,
  tone = 'compatibility',
}: {
  label: string
  title: string
  value: number | null
  tone?: 'compatibility' | 'confidence'
}) {
  const { messages } = useLocale()
  const displayValue = value ?? 0

  return (
    <div className={`score score--${tone}`}>
      <span>{label}</span>
      <strong>{value ?? '—'}<small>{value === null ? '' : '/100'}</small></strong>
      <meter
        min={0}
        max={100}
        low={40}
        high={75}
        optimum={100}
        value={displayValue}
        aria-label={messages.explorer.scoreLabel(label, title, value)}
      />
    </div>
  )
}
