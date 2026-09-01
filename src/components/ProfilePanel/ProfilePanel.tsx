import { useState } from 'react'

const profileOptions = {
  chip: ['Apple silicon', 'M1 family', 'M2 family', 'M3 family', 'M4 family', 'Other'],
  memory: ['16 GB memory', '8 GB memory', '24 GB memory', '32 GB+ memory'],
  runner: ['CrossOver 25', 'CrossOver 26', 'Native Mac', 'Not decided'],
}

export function ProfilePanel() {
  const [chip, setChip] = useState(profileOptions.chip[0])
  const [memory, setMemory] = useState(profileOptions.memory[0])
  const [runner, setRunner] = useState(profileOptions.runner[0])

  return (
    <aside className="profile-panel" aria-labelledby="profile-title">
      <div className="profile-panel__heading">
        <div>
          <p className="utility-label">Your test profile</p>
          <h2 id="profile-title">Make the question specific.</h2>
        </div>
        <span className="profile-panel__index" aria-hidden="true">
          01
        </span>
      </div>

      <div className="profile-panel__fields">
        <label>
          Chip
          <select value={chip} onChange={(event) => setChip(event.target.value)}>
            {profileOptions.chip.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Memory
          <select value={memory} onChange={(event) => setMemory(event.target.value)}>
            {profileOptions.memory.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="profile-panel__wide-field">
          Preferred route
          <select value={runner} onChange={(event) => setRunner(event.target.value)}>
            {profileOptions.runner.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="profile-panel__output" aria-live="polite">
        <span className="signal-dot" aria-hidden="true" />
        <p>
          Previewing evidence for <strong>{chip}</strong>, <strong>{memory}</strong>, using{' '}
          <strong>{runner}</strong>.
        </p>
      </div>
      <p className="profile-panel__privacy">Prototype only. These selections are not stored.</p>
    </aside>
  )
}
