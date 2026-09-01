const steps = [
  {
    number: '01',
    title: 'Match the environment',
    body: 'A result belongs to a chip, macOS version, runner, graphics backend, and moment in time—not just a game title.',
    token: 'DEVICE × RUNNER',
  },
  {
    number: '02',
    title: 'Keep the evidence attached',
    body: 'Ratings, configuration notes, and feature failures retain their source URL and observation date.',
    token: 'SOURCE + DATE',
  },
  {
    number: '03',
    title: 'Separate fit from certainty',
    body: 'Compatibility describes how well a game appears to run. Confidence describes how much evidence supports that judgment.',
    token: 'FIT ≠ CERTAINTY',
  },
]

export function Method() {
  return (
    <section className="method shell" id="method" aria-labelledby="method-title">
      <div className="method__intro">
        <p className="eyebrow">The decision model</p>
        <h2 id="method-title">“Works on Mac” is the start of the question.</h2>
        <p>
          The MVP is built around a traceable path from a real machine profile to an
          appropriately cautious answer.
        </p>
      </div>

      <ol className="method__steps">
        {steps.map((step) => (
          <li key={step.number}>
            <span className="method__number">{step.number}</span>
            <p className="utility-label">{step.token}</p>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
