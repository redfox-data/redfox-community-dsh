<p align="center">
  <a href="https://redfox.hk/?source=github">
    <img src="https://lyy.redfox.hk/page/logo-redfox-name.png" alt="RedFox Logo" width="200">
  </a>
</p>

<p align="right">
  <a href="https://github.com/redfox-data/redfox-community-dsh/blob/main/README.zh.md">中文</a>
  English
</p>

# redfox-community-dsh

The official DSH (DeepSeek Harness) bundle of RedFoxHub: 100+ social-media data skills (Douyin / Xiaohongshu / Kuaishou / Bilibili / WeChat Official Accounts / WeChat Channels / Weibo / YouTube / TikTok and more), plus 40 native MCP tools covering data APIs, AI search and AI generation — all installable with one command.

## Highlights

- **112 skills, ready to use**: content search, hot-trend tracking, comment analysis, video downloading, copywriting, account diagnostics, daily digest subscriptions and more
- **Full platform coverage**: Douyin, Xiaohongshu, Kuaishou, Bilibili, WeChat Official Accounts, WeChat Channels, Weibo, Zhihu, Toutiao, plus overseas platforms like YouTube, TikTok, Instagram and X (Twitter)
- **Native experience**: published in the official bundle skill-package format — once installed, skills appear directly in the session skill directory and support the `/skill-name` gesture for precise invocation
- **Continuously updated**: the skill library keeps growing and improving; the bundle follows automatically, and reinstalling pulls the latest version
- **40 MCP tools built in**: platform data APIs (work search, account info, work details), AI search (Kimi / Doubao / DeepSeek) and AI generation (GPT image, Seedream image, Seedance video) are registered as native `mcp__redfox__*` tools via the bundled MCP bridge

## Installation

```sh
dsh plugin --profile web add github:redfox-data/redfox-community-dsh
dsh --profile web
```

Restart dsh web after installation to take effect.

## Usage

After restarting, all skills appear in the skill directory automatically:

- Just describe what you need — the agent matches the right skill, e.g. "find recent AI notes on Xiaohongshu" or "analyze the comments on this Douyin video"
- Or invoke precisely with the `/skill-name` gesture, e.g. `/douyin-search`, `/xiaohongshu-write`

## MCP Tools

In addition to skills, this bundle registers the [redfox-mcp](https://github.com/redfox-data/redfox-mcp) server over stdio, exposing 40 RedFoxHub data APIs as native tools named `mcp__redfox__*`:

| Category | Tools |
|---|---|
| Platform data (26) | `douyin_*` / `xiaohongshu_*` / `wechat_*` / `bilibili_*` / `toutiao_*` / `tiktok_search_users` — work search, account search & info, work lists, work details, AI-work feeds |
| AI search (3) | `ai_search_kimi`, `ai_search_doubao`, `ai_search_deepseek` — one call submits the query and waits for the full answer |
| AI generation (4) | `gpt_image_generate`, `doubao_image_pro_generate`, `doubao_image_lite_generate`, `doubao_video_generate` — one call submits and waits; on timeout a `taskId` is returned |
| Task follow-up (7) | the matching `*_result` tools — fetch a finished task by `taskId` after a timeout |

MCP tools need two extra prerequisites (skills alone do not):

- Python ≥ 3.10 available via [uv](https://docs.astral.sh/uv/) — the bridge launches `uvx redfox-mcp` automatically
- `REDFOX_API_KEY` set in the environment where dsh runs — get one at <https://redfox.hk/settings/api-keys>

If the key is missing, every tool answers with a structured message explaining how to obtain one.

## Skill Overview

| Platform / Domain | Count | Representative Skills |
|-------------------|-------|-----------------------|
| Xiaohongshu | 17 | note search / realtime search, comment analysis, cover design, account diagnostics, benchmark account matching, note writing, follower-growth rankings |
| WeChat ecosystem | 19 | official-account search / subscription, 100k+ article feed, original hot articles, Channels video query, viral covers, AI daily digest |
| Douyin | 14 | video search / realtime search, hot trends, daily & surge rankings, comment analysis, account subscription, top-account rankings |
| Bilibili | 7 | video search / download, comment analysis, keyword-based account & video discovery, AI daily digest |
| Kuaishou | 6 | video search, comment analysis, video download, AI daily digest |
| Weibo | 4 | hot search, post search, user feed backtracking, comment analysis |
| Overseas platforms | 9 | YouTube download / transcript / comments, TikTok video & profile download, Instagram download, X download / comments / post search |
| Creation tools | 10+ | multi-platform copywriting rewrite, prohibited-word check, AI image generation, AI video generation, de-AI-flavor polishing, video prompt expert |
| Aggregated feeds | — | 7-platform hot-search hub, culture-tourism & short-drama industry feeds, A-share sentiment, cross-platform topic research |

See the [skills/](skills) directory for the full list.

## Updating & Version Pinning

The skill library is updated continuously. Re-run the install command to pull the latest version:

```sh
dsh plugin --profile web add -w github:redfox-data/redfox-community-dsh
```

To pin a specific version, install by commit or release tag:

```sh
dsh plugin --profile web add 'github:redfox-data/redfox-community-dsh#<commit>'
```

## License

MIT
