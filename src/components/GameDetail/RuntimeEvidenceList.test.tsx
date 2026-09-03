import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '../../i18n/LocaleProvider'
import type { RuntimeEvidence } from '../../domain/runtimeEvidence'
import { RuntimeEvidenceList } from './RuntimeEvidenceList'

const report: RuntimeEvidence = {
  id: 'fixture', appId: 881100, runner: 'porting-kit', edition: 'gog',
  sourceUrl: 'https://example.com/firsthand', publishedAt: '2023-08-12', observedAt: '2026-09-04', testedAt: null,
  environment: { chip: null, memoryGb: null, macOs: null, runnerVersion: null, backend: null, gameVersion: null },
  author: { en: 'Fixture author', 'zh-CN': '示例作者' },
  finding: { en: 'Brief gameplay reported', 'zh-CN': '作者报告短时游玩' },
  limits: { en: 'Full playthrough not reported', 'zh-CN': '未提供通关测试' },
}

describe('first-hand source reports', () => {
  it('shows storefront mismatch, dates and missing fields without claiming current support', () => {
    render(<LocaleProvider initialLocale="en"><RuntimeEvidenceList reports={[report]} /></LocaleProvider>)
    expect(screen.getByText(/Different store edition/)).toBeInTheDocument()
    expect(screen.getByText(/not tested by this project/)).toBeInTheDocument()
    expect(screen.getByText(/Unreported fields:.*Test date/)).toBeInTheDocument()
    expect(screen.getByText(/Publication date: 2023-08-12/)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Reported environment and dates'))
    expect(screen.getByText('Reported environment and dates').closest('details')).toHaveAttribute('open')
    expect(screen.getByRole('link', { name: /Read the first-hand source/ })).toHaveAttribute('href', report.sourceUrl)
  })
  it('shows an honest localized empty state', () => {
    render(<LocaleProvider initialLocale="zh-CN"><RuntimeEvidenceList reports={[]} /></LocaleProvider>)
    expect(screen.getByText(/暂未收录这款游戏/)).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
  it('keeps an unknown store edition distinct from Steam', () => {
    render(<LocaleProvider initialLocale="zh-CN"><RuntimeEvidenceList reports={[{ ...report, edition: 'unknown' }]} /></LocaleProvider>)
    expect(screen.getByText(/来源未明确商店版本/)).toBeInTheDocument()
  })
})
