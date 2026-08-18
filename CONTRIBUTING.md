# Contributing to redfox-community-dsh

Thank you for your interest in contributing! This document explains how this repository works and where to direct your contributions.

## Repository Architecture

This repository is a **DSH bundle package** — it is a distribution channel, not the source of truth for skill content.

```
redfox-community (hub)          redfox-community-dsh (this repo)
┌─────────────────────┐         ┌──────────────────────────┐
│  skills/  ◄──────── source of truth                       │
│    ├── skill-a/     │ ──CI──► │  skills/  ◄── synced     │
│    ├── skill-b/     │         │    ├── skill-a/          │
│    └── ...          │         │    ├── skill-b/          │
│                     │         │    └── ...               │
│                     │         │  index.mjs    ◄── bundle entry
│                     │         │  cordis.patch.yml        │
│                     │         │  package.json            │
└─────────────────────┘         └──────────────────────────┘
```

**Key rule:** the `skills/` directory is maintained exclusively in the [redfox-community](https://github.com/redfox-data/redfox-community) hub repo and synced here via CI (`sync-skills.yml`). **Never edit `skills/` directly in this repository** — your changes will be overwritten on the next sync.

## Where to Contribute

| I want to … | Go to |
|---|---|
| Create or edit a skill (SKILL.md, scripts, README) | [redfox-community](https://github.com/redfox-data/redfox-community) |
| Improve the bundle entry, CI, docs, or packaging | **This repo** (open a PR) |
| Report a skill bug or request a new skill | [redfox-community](https://github.com/redfox-data/redfox-community) issues |
| Report a bundle installation or DSH integration issue | **This repo** issues |

## Contributing to This Repo

### Prerequisites

- Node.js ≥ 20
- No `npm install` needed — this repo has zero runtime dependencies (the DSH profile injects `@deepseek-ai/dsh-skill-filesystem` at install time).

### Local Validation

Before opening a PR, run the skill structure validator:

```sh
node scripts/validate.mjs
```

This checks that every skill directory contains a valid `SKILL.md` with required frontmatter fields, bilingual READMEs, and no stale runtime artifacts.

### File Structure

```
redfox-community-dsh/
├── .github/workflows/
│   ├── sync-skills.yml      # hourly sync from hub
│   └── validate.yml         # CI quality gate
├── scripts/
│   └── validate.mjs         # structure validator
├── skills/                  # ⚠️ synced from hub — do not edit
├── index.mjs                # bundle entry (Cordis plugin)
├── cordis.patch.yml         # DSH profile patch (MCP bridge config)
├── package.json             # npm metadata & DSH bundle config
└── README.md / README.zh.md
```

### Commit Conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(scope): description

feat:     new capability (e.g. new MCP tool in cordis.patch.yml)
fix:      bug fix (e.g. sync workflow, validation logic)
docs:     documentation only (README, CONTRIBUTING, etc.)
ci:       CI workflow changes
chore:    maintenance (dependency bumps, cleanup)
```

Examples:
```
feat: add timeout config for video generation MCP tools
fix(validate): detect stale cache directories
ci: add Node.js setup step to validate workflow
docs: add CONTRIBUTING.md
```

### PR Checklist

- [ ] `node scripts/validate.mjs` passes locally
- [ ] Changes do not touch `skills/` (those changes belong in the hub repo)
- [ ] Bump `version` in `package.json` if the change affects the published bundle
- [ ] Update README / README.zh if user-facing behavior changes

## Skill Structure Reference

For contributors who also develop skills in the hub repo, each skill directory must contain:

```
skills/my-skill/
├── SKILL.md          # required — YAML frontmatter (name, description) + instructions
├── README.md         # required — Chinese user-facing documentation
├── README.en.md      # required — English user-facing documentation
├── scripts/          # optional — helper scripts (Python / shell)
├── references/       # optional — reference docs the skill reads
└── assets/           # optional — templates, configs, images
```

**SKILL.md frontmatter** (minimum):

```yaml
---
name: my-skill
description: One-line description with trigger keywords.
---
```

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

# 参与贡献 redfox-community-dsh

感谢你对本项目的关注！本文档说明仓库的运作方式以及贡献方向。

## 仓库架构

本仓库是一个 **DSH bundle 分发包** —— 它是技能内容的分发渠道，而非技能内容的源头。

```
redfox-community (hub)          redfox-community-dsh (this repo)
┌─────────────────────┐         ┌──────────────────────────┐
│  skills/  ◄──────── source of truth                       │
│    ├── skill-a/     │ ──CI──► │  skills/  ◄── synced     │
│    ├── skill-b/     │         │    ├── skill-a/          │
│    └── ...          │         │    ├── skill-b/          │
│                     │         │    └── ...               │
│                     │         │  index.mjs    ◄── bundle entry
│                     │         │  cordis.patch.yml        │
│                     │         │  package.json            │
└─────────────────────┘         └──────────────────────────┘
```

**核心规则：** `skills/` 目录的内容仅在 [redfox-community](https://github.com/redfox-data/redfox-community) hub 仓库维护，通过 CI（`sync-skills.yml`）单向同步到本仓。**请勿在本仓库直接编辑 `skills/`** —— 你的修改会在下次同步时被覆盖。

## 贡献方向指引

| 我想 … | 去哪里 |
|---|---|
| 创建或编辑技能（SKILL.md、脚本、README） | [redfox-community](https://github.com/redfox-data/redfox-community) |
| 改进 bundle 入口、CI、文档或打包配置 | **本仓库**（提交 PR） |
| 报告技能 bug 或请求新技能 | [redfox-community](https://github.com/redfox-data/redfox-community) issues |
| 报告 bundle 安装或 DSH 集成问题 | **本仓库** issues |

## 在本仓库贡献

### 环境要求

- Node.js ≥ 20
- 无需 `npm install` —— 本仓库零运行时依赖（`@deepseek-ai/dsh-skill-filesystem` 由 DSH profile 安装时注入）

### 本地验证

提交 PR 前，请运行技能结构验证脚本：

```sh
node scripts/validate.mjs
```

该脚本检查每个技能目录是否包含有效的 `SKILL.md`（必需 frontmatter 字段）、双语 README，以及是否混入了运行时残留文件。

### 文件结构

```
redfox-community-dsh/
├── .github/workflows/
│   ├── sync-skills.yml      # 每小时从 hub 同步
│   └── validate.yml         # CI 质量门禁
├── scripts/
│   └── validate.mjs         # 结构验证脚本
├── skills/                  # ⚠️ 从 hub 同步 — 禁止编辑
├── index.mjs                # bundle 入口（Cordis 插件）
├── cordis.patch.yml         # DSH profile 补丁（MCP 桥配置）
├── package.json             # npm 元数据 & DSH bundle 配置
└── README.md / README.zh.md
```

### 提交规范

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(scope): description

feat:     新功能（如 cordis.patch.yml 新增 MCP 工具）
fix:      修复 bug（如修复同步流程、验证逻辑）
docs:     仅文档变更（README、CONTRIBUTING 等）
ci:       CI workflow 变更
chore:    维护性工作（依赖升级、清理）
```

示例：
```
feat: add timeout config for video generation MCP tools
fix(validate): detect stale cache directories
ci: add Node.js setup step to validate workflow
docs: add CONTRIBUTING.md
```

### PR 检查清单

- [ ] 本地运行 `node scripts/validate.mjs` 通过
- [ ] 变更不涉及 `skills/`（技能变更属于 hub 仓库）
- [ ] 如果变更影响已发布的 bundle，需 bump `package.json` 的 `version`
- [ ] 如有用户可见的行为变更，需同步更新 README / README.zh

## 技能结构参考

对于同时在 hub 仓库开发技能的贡献者，每个技能目录应包含：

```
skills/my-skill/
├── SKILL.md          # 必需 — YAML frontmatter (name, description) + 技能指令
├── README.md         # 必需 — 中文用户文档
├── README.en.md      # 必需 — 英文用户文档
├── scripts/          # 可选 — 辅助脚本（Python / shell）
├── references/       # 可选 — 技能读取的参考文档
└── assets/           # 可选 — 模板、配置、图片
```

**SKILL.md frontmatter**（最低要求）：

```yaml
---
name: my-skill
description: 一行描述，包含触发关键词。
---
```

## 许可证

提交贡献即表示你同意你的贡献以 [MIT 许可证](LICENSE) 授权。
