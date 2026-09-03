import { describe, expect, it } from 'vitest'
import { runtimeEvidenceGaps, selectRuntimeEvidence, type RuntimeEvidence } from './runtimeEvidence'

const report: RuntimeEvidence = {
  id: 'test-report', appId: 1245620, runner: 'crossover', edition: 'steam',
  sourceUrl: 'https://example.com/report', observedAt: '2026-09-04',
  publishedAt: '2024-03-31', testedAt: null,
  environment: { chip: 'M1', memoryGb: 8, macOs: null, runnerVersion: '24.0.0.1', backend: 'D3DMetal', gameVersion: null },
  author: { en: 'Test author', 'zh-CN': '测试作者' },
  finding: { en: 'Reported gameplay', 'zh-CN': '报告进入游戏' },
  limits: { en: 'Historical account, not project validation', 'zh-CN': '历史记录，非本项目验证' },
}

describe('runtime source selection', () => {
  it('never transfers evidence between games or runners', () => {
    expect(selectRuntimeEvidence([report], 1245620, 'crossover')).toEqual([report])
    expect(selectRuntimeEvidence([report], 620, 'crossover')).toEqual([])
    expect(selectRuntimeEvidence([report], 1245620, 'porting-kit')).toEqual([])
  })
  it('excludes virtual machines and historical-only runners', () => {
    for (const runner of ['virtual-machine', 'whisky'] as const) {
      expect(selectRuntimeEvidence([{ ...report, runner }], 1245620, runner)).toEqual([])
    }
  })
  it('does not use publication or observation dates to fill a missing test date', () => {
    expect(runtimeEvidenceGaps(report)).toEqual(['macOs', 'gameVersion', 'testedAt'])
    expect(runtimeEvidenceGaps({ ...report, edition: 'unknown' })).toContain('edition')
  })
})
