import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { unreportedRuntimeChecks } from '../../domain/runtimeEvidence'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import { RuntimeCheckCoverage } from './RuntimeCheckCoverage'

describe('runtime feature coverage', () => {
  it('does not turn gameplay into save, completion, multiplayer or anti-cheat support', () => {
    render(<LocaleProvider initialLocale="en"><RuntimeCheckCoverage checks={{ ...unreportedRuntimeChecks, gameplay: 'reported-working' }} /></LocaleProvider>)
    expect(screen.getAllByText('Author reports working')).toHaveLength(1)
    expect(screen.getAllByText('Not reported')).toHaveLength(5)
    for (const name of ['Save / load', 'Full playthrough', 'Multiplayer', 'Anti-cheat']) {
      expect(screen.getByText(name).nextElementSibling).toHaveTextContent('Not reported')
    }
  })
  it('distinguishes reported failure from unknown in Chinese without color alone', () => {
    render(<LocaleProvider initialLocale="zh-CN"><RuntimeCheckCoverage checks={{ ...unreportedRuntimeChecks, launch: 'reported-failing' }} /></LocaleProvider>)
    expect(screen.getByText('启动').nextElementSibling).toHaveTextContent('作者报告失败')
    expect(screen.getByText('进入游戏 / 游玩').nextElementSibling).toHaveTextContent('未报告')
    expect(screen.getByText(/不是本项目验证/)).toBeInTheDocument()
  })
  it('does not label a report with known issues as fully working', () => {
    render(<LocaleProvider initialLocale="en"><RuntimeCheckCoverage checks={{ ...unreportedRuntimeChecks, gameplay: 'reported-with-issues' }} /></LocaleProvider>)
    expect(screen.getByText('Gameplay').nextElementSibling).toHaveTextContent('Author reports issues')
    expect(screen.queryByText('Author reports working')).not.toBeInTheDocument()
  })
})
