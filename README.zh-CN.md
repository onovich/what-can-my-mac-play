# What Can My Mac Play?

[English](README.md)

这是一个处于早期产品研究阶段的 Mac 游戏兼容性决策引擎项目。它希望帮助玩家判断哪些游戏最可能在自己的 Mac 上运行，并解释判断依据，而不是把单一兼容评级当作保证。

![What Can My Mac Play? social preview](docs/social-preview.png)

## 项目目标

- 将玩家的 Steam 游戏库与现有 Mac 兼容性证据进行匹配。
- 记录每份报告对应的 Apple silicon、macOS、CrossOver 和图形后端等环境信息。
- 分别展示可玩性与可信度，让证据稀少或互相冲突的情况保持可见。
- 在保留来源链接、日期和结论边界的前提下，提炼可复现配置。
- 存在更简单且受支持的原生 Mac 版本时，优先推荐原生路径。

## 当前状态

仓库目前处于**产品研究与可行性验证阶段**，已有内容包括产品范围、数据模型与评分方案草案、数据来源与授权分析，以及一份本机 Steam/CrossOver 时点调研。

项目尚未实现 Web 应用、API、数据管线、自动化测试或部署。下一道关卡是确认兼容性数据拥有合法、稳定的接入方式，再开始建设依赖大规模聚合的产品。

## 仓库内容

- [`WHAT_CAN_MY_MAC_PLAY_HANDOFF.md`](WHAT_CAN_MY_MAC_PLAY_HANDOFF.md) — 产品定义、证据模型、MVP 范围、风险与分阶段交付计划。
- [`steam-crossover-research.md`](steam-crossover-research.md) — 一份本机时点调研，用于说明版本、环境和证据新鲜度为什么重要。
- [`docs/social-preview-ledger.yml`](docs/social-preview-ledger.yml) — 仓库封面的证据与设计决策记录。

## 计划中的 MVP

MVP 计划聚焦 Apple silicon Mac、Steam 与 CrossOver：

1. 搜索和浏览具有可追溯证据的游戏兼容性页面。
2. 创建包含芯片、内存、macOS 和 CrossOver 信息的 Mac 设备画像。
3. 在用户授权后匹配其公开 Steam 游戏库。
4. 展示可玩性、可信度、已知阻塞、近期证据和来源链接。
5. 解释相互冲突或已经陈旧的报告，而不是用单一分数掩盖它们。

项目会先用 50 款代表性游戏验证方案，再构建覆盖 100–200 款游戏的内部原型。是否扩展到 500–1,000 个公开页面，取决于数据授权和证据质量。

## 数据与准确性边界

产品计划聚合并引用第三方报告，并非独立测试实验室。实际兼容性会受到硬件、macOS、运行器版本、图形后端、游戏更新、启动器、DRM 和反作弊系统影响。

技术上能够访问数据，并不代表可以缓存或再次发布。生产接入前，每个来源都必须具备有记录的许可或获批使用路径。本项目不得收集或存储 Steam 密码。

## 文档

详细的[项目交接文档](WHAT_CAN_MY_MAC_PLAY_HANDOFF.md)是当前产品决策和路线图的事实来源。

## 许可证

此仓库目前未包含开源许可证。
