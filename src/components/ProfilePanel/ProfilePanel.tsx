import { useState } from 'react'
import { useLocale } from '../../i18n/locale'

export function ProfilePanel() {
  const { messages } = useLocale()
  const [chip, setChip] = useState(0)
  const [memory, setMemory] = useState(0)
  const [runner, setRunner] = useState(0)

  return (
    <aside className="profile-panel" aria-labelledby="profile-title">
      <div className="profile-panel__heading">
        <div>
          <p className="utility-label">{messages.profile.label}</p>
          <h2 id="profile-title">{messages.profile.title}</h2>
        </div>
        <span className="profile-panel__index" aria-hidden="true">
          01
        </span>
      </div>

      <div className="profile-panel__fields">
        <label>
          {messages.profile.chip}
          <select value={chip} onChange={(event) => setChip(Number(event.target.value))}>
            {messages.profile.chips.map((option, index) => (
              <option key={index} value={index}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          {messages.profile.memory}
          <select value={memory} onChange={(event) => setMemory(Number(event.target.value))}>
            {messages.profile.memories.map((option, index) => (
              <option key={index} value={index}>{option}</option>
            ))}
          </select>
        </label>
        <label className="profile-panel__wide-field">
          {messages.profile.runner}
          <select value={runner} onChange={(event) => setRunner(Number(event.target.value))}>
            {messages.profile.runners.map((option, index) => (
              <option key={index} value={index}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="profile-panel__output" aria-live="polite">
        <span className="signal-dot" aria-hidden="true" />
        <p>{messages.profile.preview(
          messages.profile.chips[chip] ?? messages.profile.chips[0],
          messages.profile.memories[memory] ?? messages.profile.memories[0],
          messages.profile.runners[runner] ?? messages.profile.runners[0],
        )}</p>
      </div>
      <p className="profile-panel__privacy">{messages.profile.privacy}</p>
    </aside>
  )
}
