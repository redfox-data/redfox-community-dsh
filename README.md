# redfox-community-dsh

红狐社区技能的 DSH（DeepSeek Harness）官方 bundle 插件包：100+ 社媒数据技能（抖音 / 小红书 / 快手 / B站 / 公众号 / 视频号 / 微博 / YouTube / TikTok 等），以原生 DSH skill 形式一键安装。

## 安装

```sh
dsh plugin --profile web add github:redfox-data/redfox-community-dsh
dsh --profile web
```

仓库根以官方 bundle 技能包格式发布（`package.json` 声明 `dsh.bundle.patch`，`index.mjs` 用官方 `FileSystemSkillProvider` 把 `skills/` 注册为包内技能根，只挂载包内目录，不重扫用户/项目技能根）。安装后重启 dsh web 生效。

## 仓库分工（重要）

| 仓库 | 职责 | 谁改 |
|------|------|------|
| [redfox-community](https://github.com/redfox-data/redfox-community)（hub） | 唯一权威的 `SKILL.md` 技能正文 | 日常改技能只改这里 |
| redfox-community-dsh（本仓） | dsh 包装代码 + 从 hub **单向镜像**过来的 `skills/` | 只改插件代码；`skills/` 交给机器人同步 |

数据流：

```text
redfox-community  --(CI 单向同步 skills/)-->  redfox-community-dsh
redfox-community-dsh  --(绝不回写)--------->  redfox-community
```

**维护约定：**

- 技能正文（`skills/**/SKILL.md` 及其资源）**只在 hub 仓维护**，本仓 `skills/` 是只读镜像；只改 `skills/` 的 PR 会被拒绝，下次同步也会被覆盖。
- 本仓只维护 dsh 包装：`package.json` / `cordis.patch.yml` / `index.mjs` / `.github/workflows/`。
- dsh 专属说明写在本 README 或 `docs/`，不写进 hub 的 `SKILL.md`（除非两边都适用）。
- 内容变更（skills 同步外的包装改动）请 bump `package.json` 的 `version`，让市场能检出更新。

## 同步机制

- `.github/workflows/sync-skills.yml` 每小时整点拉取 hub 最新 `skills/` 覆盖本仓（也支持 Actions 页手动触发）。
- 若 hub 仓配置了 `notify-dsh.yml`（push 到 `skills/**` 时发 `repository_dispatch`），则 hub 一更新本仓即时跟随。
- hub 仓为私有时：在本仓 Settings → Secrets 配置 `HUB_READ_TOKEN`（对 hub 有读权限的 PAT），并在 workflow 中启用对应行。

## 目录结构

```text
package.json              官方 bundle 声明（dsh.bundle.patch / marketplace 信息）
index.mjs                 bundle 入口：FileSystemSkillProvider 注册 skills/
cordis.patch.yml          层栈 insert 行（id = index.mjs 的 name，name = 包名）
skills/                   从 hub 单向同步的技能镜像（勿手改）
.github/workflows/        sync-skills.yml 单向同步流水线
```

## 钉版本

需要固定版本时，按 commit 或 release tag 安装：

```sh
dsh plugin --profile web add 'github:redfox-data/redfox-community-dsh#<commit>'
```

版权：MIT（与 hub 仓一致）。
