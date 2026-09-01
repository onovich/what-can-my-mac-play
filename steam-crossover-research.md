# Steam 游戏库 × CrossOver macOS 候选调研

更新日期：2026-09-02（Asia/Shanghai）

## 结论

我可以读取这台 Mac 上 Steam 客户端已经缓存的库信息，但这不等同于通过 Steam 账号 API 获取一份绝对完整、实时的账号清单。本次在本机 Steam 缓存中确认了下列游戏，并检查了原生 Steam 与 CrossOver 的 `appmanifest`：它们当前均未安装。筛选条件是：

- Steam 本机缓存的全部评价好评率不低于 90%；
- CodeWeavers Compatibility Center 的 macOS 评级至少为 **Runs Well**；
- 优先保留近期 CrossOver 版本仍有测试记录的游戏；
- 排除已经安装的游戏，再按“兼容性把握、评价、潜在坑点”综合排序。

当前安装的是 **CrossOver 25.0**。CodeWeavers 页面上的总评级取最新一次测试，不应直接理解为对 25.0 的承诺；表中另列了 25.x 是否有测试记录。

## 推荐清单

| 推荐 | 游戏 | Steam 全部评价（本机缓存） | CodeWeavers macOS | 最新测试 | 与 CrossOver 25.0 的关系 | 备注 |
|---:|---|---:|---|---|---|---|
| 1 | [Noita（Steam）](https://store.steampowered.com/app/881100/) | 95% | [Runs Great](https://www.codeweavers.com/compatibility/crossover/noita) | 26.3.0 | 页面有 25.0.0、25.0.1 及后续连续记录 | 体量不大，兼容记录连续，最适合先试装。 |
| 2 | [ANIMAL WELL（Steam）](https://store.steampowered.com/app/813230/) | 95% | [Runs Great](https://www.codeweavers.com/compatibility/crossover/ANIMAL_WELL) | 26.3.0 | 页面有 25.0.0、25.0.1 及后续记录 | 低硬件压力；适合作为 CrossOver 图形链路的低风险验证。 |
| 3 | [The Witcher 3: Wild Hunt（Steam）](https://store.steampowered.com/app/292030/) | 96% | [Runs Great](https://www.codeweavers.com/compatibility/crossover/the-witcher-3-wild-hunt) | 26.3.0（9 份） | 页面有 25.0.0/25.0.1；后续报告较多 | CodeWeavers 的 25.1.1 示例明确使用 DX11；优先 DX11，不建议先试 DX12。 |
| 4 | [Sekiro: Shadows Die Twice（Steam）](https://store.steampowered.com/app/814380/) | 95% | [Runs Great](https://www.codeweavers.com/compatibility/crossover/sekiro-shadows-die-twice) | 26.3.0（3 份） | 页面有 25.0.0/25.0.1 及后续记录 | 3D 动作游戏中证据较强；仍应先从 1080p 窗口模式开始。 |
| 5 | [Hotline Miami 2: Wrong Number（Steam）](https://store.steampowered.com/app/274170/) | 94% | [Runs Great](https://www.codeweavers.com/compatibility/crossover/hotline-miami-2-wrong-number) | 25.1.1 | 页面明确有 25.0.0 与 25.1.1 | 与当前 25.0 距离最近，硬件负担也很低。 |
| 6 | [Death's Door（Steam）](https://store.steampowered.com/app/894020/) | 93% | [Runs Great](https://www.codeweavers.com/compatibility/crossover/deaths-door) | 26.3.0 | 最新总评级很好，但 25.0 细分证据不如前五项清晰 | 可作为中等规模 3D 游戏候选。 |
| 7 | [Portal 2（Steam）](https://store.steampowered.com/app/620/) | 98% | [Runs Well](https://www.codeweavers.com/compatibility/crossover/portal-2) | 26.3.0（7 份） | 页面有 25.0.0/25.0.1 及后续记录 | 评价最高、测试样本多；评级是 Runs Well 而非 Runs Great。 |
| 8 | [Ori and the Will of the Wisps（Steam）](https://store.steampowered.com/app/1057090/) | 96% | [Runs Well](https://www.codeweavers.com/compatibility/crossover/ori-and-the-will-of-the-wisps) | 26.3.0 | 25.x 最早列到 25.0.1，没有明确列 25.0.0 | 建议至少升级到 25.0.1/25.1.1 后再装。 |
| 9 | [Dark Souls III（Steam）](https://store.steampowered.com/app/374320/) | 94% | [Runs Well](https://www.codeweavers.com/compatibility/crossover/dark-souls-iii) | 26.2.0（3 份） | 页面有 25.0.0/25.0.1 记录 | 可玩把握尚可，但优先级低于被评为 Runs Great 的 Sekiro。 |
| 10 | [Elden Ring（Steam）](https://store.steampowered.com/app/1245620/) | 约 93–94% | [Runs Great](https://www.codeweavers.com/compatibility/crossover/elden-ring) | 26.3.0（9 份） | 页面有 25.0.0/25.0.1 及后续记录 | 单机本体兼容评价高，但 Easy Anti-Cheat 令联网功能存在额外不确定性；不应把 Runs Great 当作在线模式保证。 |

## 安装顺序建议

若目标是以最低下载与排障成本验证当前环境，建议依次尝试：

1. **Noita** 或 **ANIMAL WELL**；
2. **Hotline Miami 2**；
3. **The Witcher 3（DX11）** 或 **Sekiro**；
4. 最后才考虑 **Elden Ring**。

鉴于这次《NieR Replicant》出现了独占全屏交换链死循环，新游戏第一次启动建议统一采用：独立 bottle、1920×1080 或更低、窗口/无边框窗口、关闭独占全屏。确认能稳定进菜单和存档后，再逐项提高分辨率或切换图形后端。不要一次同时改变后端、分辨率和全屏模式，否则很难判断是哪一项造成问题。

## 如何理解证据

- **Steam 百分比**来自本机 Steam 的 `appinfo.vdf`/library cache，属于 Steam 客户端缓存的“全部评价”百分比；商店评价会随时间变化。
- **CrossOver 评级**来自 CodeWeavers Compatibility Center。它由测试报告汇总，硬件、macOS、CrossOver 小版本、图形后端和游戏更新都可能改变结果。
- “页面存在 25.0.0 测试记录”只说明该版本有人测试过；网页当前显示的 **Runs Great / Runs Well** 是最新汇总结果，而不是逐版本结果的逐字保证。
- 本次只进行了只读检查；没有安装、卸载或修改 Steam/CrossOver/游戏配置。

## 数据范围与来源

- 本机 CrossOver Steam 用户缓存（账号标识已省略）。
- CrossOver：本机 `/Applications/CrossOver.app`，版本 25.0。
- 安装状态来源：macOS Steam 与 `CrossSteam` bottle 的 `steamapps/appmanifest_*.acf`。
- 兼容性评级口径与每个游戏的版本记录：[CodeWeavers Compatibility Center](https://www.codeweavers.com/compatibility/)。
- Steam 商店与评价入口已在表中逐项链接。
