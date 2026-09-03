import { runtimeEvidenceGaps, type RuntimeEvidence } from '../../domain/runtimeEvidence'
import { useLocale } from '../../i18n/locale'

const copy = {
  en: {
    title: 'First-hand source reports', unknown: 'Not reported',
    boundary: 'Reported by the linked author, not tested by this project. These records are not added to the research scores or treated as sufficient evidence to recommend a purchase.',
    none: 'No first-hand test record has been curated for this route and game yet.',
    edition: 'Reported store edition', steam: 'Steam', gog: 'GOG',
    mismatch: 'Different store edition — not evidence for this Steam edition.',
    unknownEdition: 'Store edition not identified — Steam applicability is unverified.',
    chip: 'Mac chip / model', memoryGb: 'Memory (GB)', macOs: 'macOS',
    runnerVersion: 'Runner version', backend: 'Graphics backend', gameVersion: 'Game build',
    testedAt: 'Test date', publishedAt: 'Publication date', observedAt: 'Checked by this project',
    details: 'Reported environment and dates', source: 'Read the first-hand source',
    gaps: 'Unreported fields',
  },
  'zh-CN': {
    title: '第一手来源记录', unknown: '未提供',
    boundary: '以下是来源作者的报告，不是本项目实测。这些记录不叠加到研究评分，也不足以据此建议购买。',
    none: '暂未收录这款游戏在此方案下的第一手测试记录。',
    edition: '报告对应的商店版本', steam: 'Steam', gog: 'GOG',
    mismatch: '商店版本不同，不能作为此 Steam 版本的验证。',
    unknownEdition: '来源未明确商店版本，是否适用于 Steam 尚未验证。',
    chip: 'Mac 芯片 / 机型', memoryGb: '内存（GB）', macOs: 'macOS',
    runnerVersion: '运行器版本', backend: '图形后端', gameVersion: '游戏构建版本',
    testedAt: '测试日期', publishedAt: '原文发布日期', observedAt: '本项目核对日期',
    details: '查看报告环境与日期', source: '查看第一手来源',
    gaps: '缺失字段',
  },
}

export function RuntimeEvidenceList({ reports }: { reports: readonly RuntimeEvidence[] }) {
  const { locale } = useLocale()
  const text = copy[locale]
  return (
    <div className="runtime-evidence">
      <h3>{text.title}</h3>
      {reports.length === 0 ? <p>{text.none}</p> : <>
        <p>{text.boundary}</p>
        <ul className="purchase-facts">
          {reports.map((report) => (
            <li key={report.id}>
              <strong>{report.author[locale]}</strong>
              <p><small>{text.publishedAt}: {report.publishedAt ?? text.unknown}</small></p>
              <p>{report.finding[locale]}</p>
              <p>{report.limits[locale]}</p>
              <p><strong>{text.edition}: {report.edition === 'unknown' ? text.unknown : text[report.edition]}</strong></p>
              {report.edition !== 'steam' && <p>{report.edition === 'unknown' ? text.unknownEdition : text.mismatch}</p>}
              {runtimeEvidenceGaps(report).length > 0 && <p>{text.gaps}: {runtimeEvidenceGaps(report).map((field) => text[field]).join(' · ')}</p>}
              <details>
                <summary>{text.details}</summary>
                <dl className="game-detail__facts">
                  {Object.entries(report.environment).map(([field, value]) => (
                    <div key={field}><dt>{text[field as keyof typeof report.environment]}</dt><dd>{value ?? text.unknown}</dd></div>
                  ))}
                  {(['testedAt', 'publishedAt', 'observedAt'] as const).map((field) => (
                    <div key={field}><dt>{text[field]}</dt><dd>{report[field] ? <time dateTime={report[field]}>{report[field]}</time> : text.unknown}</dd></div>
                  ))}
                </dl>
              </details>
              <a href={report.sourceUrl} target="_blank" rel="noreferrer">{text.source} ↗</a>
            </li>
          ))}
        </ul>
      </>}
    </div>
  )
}
