import { describe, expect, it } from 'vitest'
import { runtimeEvidence } from './runtimeEvidence'
import { researchReplayCases } from './researchReplay'

describe('published runtime evidence', () => {
  it('has stable identities, dates, sources, and localized caveats', () => {
    expect(new Set(runtimeEvidence.map((report) => report.id)).size).toBe(runtimeEvidence.length)
    for (const report of runtimeEvidence) {
      expect(report.sourceUrl).toMatch(/^https:\/\//)
      expect(report.testedAt).toBeNull()
      expect(Date.parse(report.publishedAt!)).toBeLessThan(Date.parse(report.observedAt))
      expect(report.finding.en.length).toBeGreaterThan(20)
      expect(report.limits['zh-CN'].length).toBeGreaterThan(20)
      expect(['virtual-machine', 'whisky']).not.toContain(report.runner)
    }
  })
  it('does not merge two forum authors into a fabricated environment', () => {
    const [m1, intel] = runtimeEvidence
    expect(m1.environment.chip).toContain('M1')
    expect(m1.environment.macOs).toBeNull()
    expect(intel.environment.macOs).toBe('14.4')
    expect(intel.environment.memoryGb).toBeNull()
    expect(intel.edition).toBe('unknown')
  })
  it('does not count historical accounts as new scoring evidence', () => {
    const scoredIds = researchReplayCases.flatMap((entry) => entry.result.assessment.reportIds)
    for (const report of runtimeEvidence) expect(scoredIds).not.toContain(report.id)
  })
})
