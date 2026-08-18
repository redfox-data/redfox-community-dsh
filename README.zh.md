<p align="center">
  <a href="https://redfox.hk/?source=github">
    <img src="https://lyy.redfox.hk/page/logo-redfox-name.png" alt="RedFox Logo" width="200">
  </a>
</p>

<p align="right">
  中文
  <a href="https://github.com/redfox-data/redfox-community-dsh/blob/main/README.md">English</a>
</p>

# redfox-community-dsh

红狐数据（RedFoxHub）的 DSH（DeepSeek Harness）官方 bundle 插件包：100+ 社媒数据技能（抖音 / 小红书 / 快手 / B站 / 公众号 / 视频号 / 微博 / YouTube / TikTok 等）+ 40 个原生 MCP 工具（数据 API、AI 搜索、AI 生成），一键安装。

## 功能亮点

- **112 枚技能即装即用**：覆盖内容搜索、热榜追踪、评论分析、视频下载、文案创作、账号诊断、日报订阅等场景
- **主流平台全覆盖**：抖音、小红书、快手、B站、公众号、视频号、微博、知乎、头条，以及 YouTube、TikTok、Instagram、X(Twitter) 等海外平台
- **原生体验**：以官方 bundle 技能包格式发布，安装后技能直接进入会话技能目录，支持 `/技能名` 手势精准调用
- **持续更新**：技能库不断扩充与修订，插件包自动跟进，重新安装即可获取最新版本
- **内置 40 个 MCP 工具**：平台数据 API（作品搜索、账号信息、作品详情）、AI 搜索（Kimi / 豆包 / DeepSeek）、AI 生成（GPT 图片、Seedream 图片、Seedance 视频），通过内置 MCP 桥注册为原生 `mcp__redfox__*` 工具

## 安装

```sh
dsh plugin --profile web add github:redfox-data/redfox-community-dsh
dsh --profile web
```

安装后重启 dsh web 生效。

## 使用

重启后，全部技能自动出现在技能目录中：

- 直接说出需求即可，Agent 会自动匹配技能，例如「搜一下小红书上最近的 AI 笔记」「分析这条抖音作品的评论」
- 也可以用 `/技能名` 手势精准调用，如 `/douyin-search`、`/xiaohongshu-write`

## MCP 工具

除技能外，本插件包还会通过 stdio 注册 [redfox-mcp](https://github.com/redfox-data/redfox-mcp) 服务，把 40 个红狐数据 API 暴露为原生工具，命名形如 `mcp__redfox__*`：

| 类别 | 工具 |
|---|---|
| 平台数据（26 个） | `douyin_*` / `xiaohongshu_*` / `wechat_*` / `bilibili_*` / `toutiao_*` / `tiktok_search_users`：作品搜索、账号搜索与信息、作品列表、作品详情、AI 作品流 |
| AI 搜索（3 个） | `ai_search_kimi`、`ai_search_doubao`、`ai_search_deepseek`：一次调用自动提交并等待完整答案 |
| AI 生成（4 个） | `gpt_image_generate`、`doubao_image_pro_generate`、`doubao_image_lite_generate`、`doubao_video_generate`：一次调用自动提交并等待；超时返回 `taskId` |
| 任务补查（7 个） | 对应的 `*_result` 工具：超时后凭 `taskId` 查询已完成任务 |

MCP 工具额外需要两个前置条件（仅用技能则不需要）：

- 通过 [uv](https://docs.astral.sh/uv/) 提供 Python ≥ 3.10 —— MCP 桥会自动拉起 `uvx redfox-mcp`
- 在 dsh 运行环境中设置 `REDFOX_API_KEY` —— 获取地址：<https://redfox.hk/settings/api-keys>

未配置 Key 时，每个工具都会返回结构化的获取指引，Agent 会直接把指引转告你。

## 技能一览

| 平台 / 领域 | 数量 | 代表技能 |
|-------------|------|----------|
| 小红书 | 17 | 笔记搜索 / 实时搜索、评论分析、封面设计、账号诊断、对标账号推荐、笔记创作、涨粉榜单 |
| 微信生态 | 19 | 公众号搜索 / 订阅、10w+ 热文推送、原创热文、视频号作品查询、爆款封面、AI 日报 |
| 抖音 | 14 | 作品搜索 / 实时搜索、热榜、日榜 / 飙升榜、评论分析、账号订阅、TOP 账号榜 |
| B站 | 7 | 视频搜索 / 下载、评论分析、关键词找账号 / 找作品、AI 日报 |
| 快手 | 6 | 作品搜索、评论分析、视频下载、AI 日报 |
| 微博 | 4 | 热搜榜、博文搜索、用户动态回采、评论分析 |
| 海外平台 | 9 | YouTube 下载 / 提文案 / 评论、TikTok 视频与主页下载、Instagram 下载、X 下载 / 评论 / 作品搜索 |
| 创作工具 | 10+ | 多平台文案改写、违禁词检测、AI 生图、AI 生视频、去 AI 味、视频提示词专家 |
| 信息聚合 | — | 7 平台热搜聚合、文旅 / 短剧行业信息源、A股舆情、跨平台话题研究 |

完整技能列表见 [skills/](skills) 目录。

## 更新与钉版本

技能库持续更新，重新执行安装命令即可拉取最新版：

```sh
dsh plugin --profile web add -w github:redfox-data/redfox-community-dsh
```

需要固定版本时，按 commit 或 release tag 安装：

```sh
dsh plugin --profile web add 'github:redfox-data/redfox-community-dsh#<commit>'
```

## 许可证

MIT
