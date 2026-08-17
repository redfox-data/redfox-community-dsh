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

红狐数据（RedFoxHub）Skills的 DSH（DeepSeek Harness）官方 bundle 插件包：100+ 社媒数据技能（抖音 / 小红书 / 快手 / B站 / 公众号 / 视频号 / 微博 / YouTube / TikTok 等），以原生 DSH skill 形式一键安装。

## 功能亮点

- **112 枚技能即装即用**：覆盖内容搜索、热榜追踪、评论分析、视频下载、文案创作、账号诊断、日报订阅等场景
- **主流平台全覆盖**：抖音、小红书、快手、B站、公众号、视频号、微博、知乎、头条，以及 YouTube、TikTok、Instagram、X(Twitter) 等海外平台
- **原生体验**：以官方 bundle 技能包格式发布，安装后技能直接进入会话技能目录，支持 `/技能名` 手势精准调用
- **持续更新**：技能库不断扩充与修订，插件包自动跟进，重新安装即可获取最新版本

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
