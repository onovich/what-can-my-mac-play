# What Can My Mac Play?

[English](README.md)

这是一个重视证据的 Mac 游戏兼容性决策原型。它希望帮助玩家判断哪些游戏最可能在自己的 Mac 上运行，并解释判断依据，而不是把单一兼容评级当作保证。

[打开在线 MVP](https://macplay.onovich.com)

![What Can My Mac Play? social preview](docs/social-preview.png)

## 项目目标

- 将玩家的 Steam 游戏库与现有 Mac 兼容性证据进行匹配。
- 记录每份报告对应的 Apple silicon、macOS、CrossOver 和图形后端等环境信息。
- 分别展示可玩性与可信度，让证据稀少或互相冲突的情况保持可见。
- 在保留来源链接、日期和结论边界的前提下，提炼可复现配置。
- 存在更简单且受支持的原生 Mac 版本时，优先推荐原生路径。

## 当前状态

仓库目前处于**交互式 MVP 与数据可行性验证阶段**。已部署的 Vite/React 原型包含浏览器语言检测与语言选择记忆、本地 Mac 画像选择、可搜索的证据样本、稳定的游戏详情 URL、覆盖三种状态的 My Library 交互预览、明确的来源链接和自动化测试。

样本目录仍来自仓库内的时点调研，属于静态数据。Cloudflare Worker 已包含经过测试的 Steam 应用列表边界，以及带短周期滥用防护和强一致每日 80,000 次硬预算、默认关闭的游戏库查询边界。线上游戏库功能会继续关闭，直到生产密钥、获准测试账号与最终隐私说明准备完成。项目目前没有用户账户系统，也没有自动兼容性数据接入管线。

## 本地运行

环境要求：Node.js 22.12 或更新版本，以及 pnpm 11.7 或更新版本。

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

开发服务器会输出本地访问地址。`VITE_SITE_URL` 用于配置生产 canonical URL，默认值为 `https://macplay.onovich.com`。

运行完整检查：

```sh
pnpm check
```

## 仓库内容

- [`WHAT_CAN_MY_MAC_PLAY_HANDOFF.md`](WHAT_CAN_MY_MAC_PLAY_HANDOFF.md) — 产品定义、证据模型、MVP 范围、风险与分阶段交付计划。
- [`steam-crossover-research.md`](steam-crossover-research.md) — 一份本机时点调研，用于说明版本、环境和证据新鲜度为什么重要。
- [`src/`](src/) — 响应式 React 原型、样本证据数据与组件测试。
- [`worker/`](worker/) — 具有数据量边界的 Steam 服务端连接器和路由测试；Web API Key 只保存在 Worker Secret 中。
- [`sources.yml`](sources.yml) — 各调研来源的允许字段、保留规则、归因方式与授权状态。
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

技术上能够访问数据，并不代表可以缓存或再次发布。生产接入前，每个来源都必须具备有记录的许可或获批使用路径。本项目绝不索取 Steam 密码；未来的 SteamID 查询必须由用户主动发起，并且不得持久化该标识符或原始响应。

## 文档

详细的[项目交接文档](WHAT_CAN_MY_MAC_PLAY_HANDOFF.md)记录了产品决策、证据边界和路线图。[应用列表](docs/steam-app-list-connector.md)和[游戏库查询](docs/steam-owned-games-connector.md)文档记录了连接器的安全边界。MVP 先使用 `macplay.onovich.com`，之后再决定是否迁移到独立域名。

## 许可证

此仓库目前未包含开源许可证。
