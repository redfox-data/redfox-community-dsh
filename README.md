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

The official DSH (DeepSeek Harness) bundle of RedFoxHub skills: 100+ social-media data skills (Douyin / Xiaohongshu / Kuaishou / Bilibili / WeChat Official Accounts / WeChat Channels / Weibo / YouTube / TikTok and more), installable as native DSH skills with one command.

## Highlights

- **112 skills, ready to use**: content search, hot-trend tracking, comment analysis, video downloading, copywriting, account diagnostics, daily digest subscriptions and more
- **Full platform coverage**: Douyin, Xiaohongshu, Kuaishou, Bilibili, WeChat Official Accounts, WeChat Channels, Weibo, Zhihu, Toutiao, plus overseas platforms like YouTube, TikTok, Instagram and X (Twitter)
- **Native experience**: published in the official bundle skill-package format — once installed, skills appear directly in the session skill directory and support the `/skill-name` gesture for precise invocation
- **Continuously updated**: the skill library keeps growing and improving; the bundle follows automatically, and reinstalling pulls the latest version

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
