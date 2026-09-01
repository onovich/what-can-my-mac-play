import { useLocale } from '../../i18n/locale'

export function Method() {
  const { messages } = useLocale()

  return (
    <section className="method shell" id="method" aria-labelledby="method-title">
      <div className="method__intro">
        <p className="eyebrow">{messages.method.eyebrow}</p>
        <h2 id="method-title">{messages.method.title}</h2>
        <p>{messages.method.intro}</p>
      </div>

      <ol className="method__steps">
        {messages.method.steps.map((step, index) => (
          <li key={step.token}>
            <span className="method__number">{String(index + 1).padStart(2, '0')}</span>
            <p className="utility-label">{step.token}</p>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
