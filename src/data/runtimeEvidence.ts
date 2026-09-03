import type { RuntimeEvidence } from '../domain/runtimeEvidence'

// External, historical accounts. Never merged into researchReplay scoring.
// Reviewed sources and omitted fields: docs/research/sample-runtime-reports.md.
export const runtimeEvidence: readonly RuntimeEvidence[] = [
  {
    id: 'cw-elden-ring-pratik-20240331', appId: 1245620, runner: 'crossover', edition: 'steam',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/forum/elden-ring?msg=300967',
    observedAt: '2026-09-04', publishedAt: '2024-03-31', testedAt: null,
    environment: { chip: 'MacBook Air · M1', memoryGb: 8, macOs: null, runnerVersion: '24.0.0.1', backend: 'D3DMetal', gameVersion: null },
    author: { en: 'Pratik Nichite · CodeWeavers community post #2', 'zh-CN': 'Pratik Nichite · CodeWeavers 社区第 2 楼' },
    finding: {
      en: 'The author reports Steam gameplay after an initial launch failure, using an M1 MacBook Air with 8 GB RAM. The post lists D3DMetal and MSync enabled, DXVK and ESync disabled.',
      'zh-CN': '作者报告在 M1 MacBook Air、8 GB 内存上解决初次启动失败后进入 Steam 版游戏；文中列出启用 D3DMetal / MSync、关闭 DXVK / ESync。',
    },
    limits: {
      en: 'Historical community self-report, not CodeWeavers QA. No measured FPS, sustained test duration, save/completion or multiplayer validation. The missing macOS version must not be borrowed from the other author in this thread.',
      'zh-CN': '这是历史玩家自述，不是 CodeWeavers 官方质检。没有量化帧率、持续测试时长、存档/通关或联机验证；不能把同帖另一位作者的 macOS 版本填到这份记录里。',
    },
  },
  {
    id: 'cw-elden-ring-finley-20240321', appId: 1245620, runner: 'crossover', edition: 'unknown',
    sourceUrl: 'https://www.codeweavers.com/compatibility/crossover/forum/elden-ring?msg=300967',
    observedAt: '2026-09-04', publishedAt: '2024-03-21', testedAt: null,
    environment: { chip: 'MacBook Pro 2019 · Intel Core i7 2.6 GHz', memoryGb: null, macOs: '14.4', runnerVersion: '23.7.1', backend: null, gameVersion: null },
    author: { en: 'Finley · CodeWeavers community post #1', 'zh-CN': 'Finley · CodeWeavers 社区第 1 楼' },
    finding: {
      en: 'The author reports a white window followed by a Wine error on an Intel MacBook Pro, macOS 14.4 and CrossOver 23.7.1. Gameplay was not established.',
      'zh-CN': '作者报告在 Intel MacBook Pro、macOS 14.4、CrossOver 23.7.1 下出现白色窗口和 Wine 错误，没有建立可进入游戏的证据。',
    },
    limits: {
      en: 'Historical launch failure for this reported setup only. Store edition and GPU are unspecified. It does not prove failure on other Intel Macs or Apple silicon, and another author’s workaround is not a verified fix for this machine.',
      'zh-CN': '仅反映所述配置的历史启动失败。来源未明确商店版本与 GPU，不能推广成所有 Intel Mac 或 Apple silicon 都失败，也不能把另一位作者的配置当成此机型已验证的修复。',
    },
  },
  {
    id: 'paulthetall-noita-20230812', appId: 881100, runner: 'porting-kit', edition: 'gog',
    sourceUrl: 'https://www.paulthetall.com/noita-for-mac/',
    observedAt: '2026-09-04', publishedAt: '2023-08-12', testedAt: null,
    environment: { chip: 'MacBook Pro · Apple silicon (generation unspecified)', memoryGb: null, macOs: null, runnerVersion: null, backend: null, gameVersion: null },
    author: { en: 'paulthetall · Porting Kit maintainer', 'zh-CN': 'paulthetall · Porting Kit 维护者' },
    finding: {
      en: 'The maintainer describes a brief successful trial on an Apple silicon MacBook Pro. The article gives a GOG offline-installer recipe; the exact tested package is not identified.',
      'zh-CN': '维护者描述在 Apple silicon MacBook Pro 上短时尝试成功。文章提供 GOG 离线安装器配方，但没有明确实际测试的安装包版本。',
    },
    limits: {
      en: 'Historical brief trial, not a benchmark or Steam validation. Chip generation, engine version, saves and completion are unreported. This is the same source as the recipe above, not another independent confirmation.',
      'zh-CN': '属于历史短时尝试，不是性能基准或 Steam 验证。芯片代际、引擎版本、存档和通关情况未提供。这与上方安装配方来自同一篇文章，不是另一份独立验证。',
    },
  },
]
