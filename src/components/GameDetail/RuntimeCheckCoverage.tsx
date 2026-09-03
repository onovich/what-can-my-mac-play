import { runtimeChecks, type RuntimeEvidence } from '../../domain/runtimeEvidence'
import { useLocale } from '../../i18n/locale'

const copy = {
  en: {
    title: 'What did this author actually report?',
    note: 'Author-reported outcomes, not project verification. Unreported features remain unknown; gameplay alone does not establish saves, completion or online play.',
    launch: 'Launch', gameplay: 'Gameplay', save: 'Save / load', completion: 'Full playthrough', multiplayer: 'Multiplayer', anticheat: 'Anti-cheat',
    'reported-working': 'Author reports working', 'reported-failing': 'Author reports failure', 'not-reported': 'Not reported',
    'reported-with-issues': 'Author reports issues',
  },
  'zh-CN': {
    title: '这位作者实际报告了什么？',
    note: '这是作者自述，不是本项目验证。未报告的功能仍为未知；进入游戏不能证明存档、通关或联机正常。',
    launch: '启动', gameplay: '进入游戏 / 游玩', save: '存档 / 读档', completion: '完整通关', multiplayer: '联机', anticheat: '反作弊',
    'reported-working': '作者报告可用', 'reported-failing': '作者报告失败', 'not-reported': '未报告',
    'reported-with-issues': '作者报告存在问题',
  },
}

export function RuntimeCheckCoverage({ checks }: { checks: RuntimeEvidence['checks'] }) {
  const { locale } = useLocale()
  const text = copy[locale]
  return (
    <div className="runtime-coverage">
      <p><strong>{text.title}</strong></p>
      <dl className="runtime-coverage__grid">
        {runtimeChecks.map((check) => (
          <div key={check}>
            <dt>{text[check]}</dt>
            <dd data-status={checks[check]}>{text[checks[check]]}</dd>
          </div>
        ))}
      </dl>
      <p><small>{text.note}</small></p>
    </div>
  )
}
