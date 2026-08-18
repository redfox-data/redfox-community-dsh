#!/usr/bin/env node
// scripts/stats.mjs — Skill inventory statistics.
// Outputs a structured summary of the skills/ directory:
//   - platform / category distribution
//   - file-type counts
//   - frontmatter field coverage
//   - stale-file audit
//
// Usage:  node scripts/stats.mjs          (human-readable)
//         node scripts/stats.mjs --json   (machine-readable)

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SKILLS_DIR = new URL('../skills', import.meta.url).pathname
const jsonMode = process.argv.includes('--json')

// ── platform / category mapping (order matters: first match wins) ───
const CATEGORIES = [
  ['douyin',      /^douyin-/],
  ['xiaohongshu', /^xiaohongshu-/],
  ['wechat',      /^wechat-|^gzh-/],
  ['bilibili',    /^bili(bili)?-/],
  ['kuaishou',    /^kuaishou-|^ks-/],
  ['weibo',       /^weibo-/],
  ['youtube',     /^youtube-/],
  ['tiktok',      /^tiktok-/],
  ['twitter',     /^twitter-/],
  ['instagram',   /^instagram-/],
  ['toutiao',     /^toutiao-/],
  ['zhihu',       /^zhihu-/],
  ['cross-platform', /^multi-|^cultural-tourism-|^playlet-|^video-downloader$|^account-video-downloader$|^overseas-/],
  ['trending',    /^trending-/],
  ['stock',       /^stock-|^cn-last30days$|^investor-|^ai-intelligence-/],
  ['ai-tools',    /^ai-|^image-|^seed|^video-prompt-|^pdf-|^visual-|^deepseek-|^doubao-|^kimi-|^geo-/],
  ['dev-tools',   /^redfox-|^optimize-|^unclecheng-/],
]

function categorize(name) {
  for (const [cat, re] of CATEGORIES) {
    if (re.test(name)) return cat
  }
  return 'other'
}

// ── helpers ──────────────────────────────────────────────────────────
function extractFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return m ? m[1] : ''
}

function countFiles(dir, ext) {
  let n = 0
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) n += countFiles(join(dir, e.name), ext)
    else if (e.name.endsWith(ext)) n++
  }
  return n
}

const STALE_NAMES = new Set([
  '_user_meta.json', 'subscriptions.json',
  '__pycache__', 'cache', '.DS_Store', 'Thumbs.db',
])

function isStale(name) {
  if (STALE_NAMES.has(name)) return true
  if (/\.pyc$/.test(name)) return true
  if (/^test_.*\.json$/.test(name)) return true
  if (/.*_test_result\.json$/.test(name)) return true
  return false
}

function findStale(dir) {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      if (isStale(e.name)) out.push(full.replace(SKILLS_DIR + '/', '') + '/')
      else out.push(...findStale(full))
    } else if (isStale(e.name)) {
      out.push(full.replace(SKILLS_DIR + '/', ''))
    }
  }
  return out
}

// ── collect data ─────────────────────────────────────────────────────
const dirs = readdirSync(SKILLS_DIR)
  .filter(n => statSync(join(SKILLS_DIR, n)).isDirectory() && !n.startsWith('.'))
  .sort()

const catCounts = {}
let totalPy = 0, totalMd = 0, totalSh = 0
let hasReadme = 0, hasReadmeEn = 0, hasScripts = 0, hasRefs = 0, hasAssets = 0
const fmFieldCounts = {}
const staleFiles = []
const missingSkillMd = []

for (const name of dirs) {
  const skillPath = join(SKILLS_DIR, name)

  // category
  const cat = categorize(name)
  catCounts[cat] = (catCounts[cat] || 0) + 1

  // file types
  totalPy += countFiles(skillPath, '.py')
  totalMd += countFiles(skillPath, '.md')
  totalSh += countFiles(skillPath, '.sh')

  // sub-directories
  if (existsSync(join(skillPath, 'scripts')))  hasScripts++
  if (existsSync(join(skillPath, 'references'))) hasRefs++
  if (existsSync(join(skillPath, 'assets')))   hasAssets++
  if (existsSync(join(skillPath, 'README.md')))    hasReadme++
  if (existsSync(join(skillPath, 'README.en.md'))) hasReadmeEn++

  // frontmatter fields
  const skillMd = join(skillPath, 'SKILL.md')
  if (existsSync(skillMd)) {
    const fm = extractFrontmatter(readFileSync(skillMd, 'utf8'))
    for (const line of fm.split('\n')) {
      const m = line.match(/^(\w+)\s*:/)
      if (m) fmFieldCounts[m[1]] = (fmFieldCounts[m[1]] || 0) + 1
    }
  } else {
    missingSkillMd.push(name)
  }

  // stale files
  staleFiles.push(...findStale(skillPath))
}

// ── output ───────────────────────────────────────────────────────────
if (jsonMode) {
  const result = {
    totalSkills: dirs.length,
    categories: catCounts,
    files: { python: totalPy, markdown: totalMd, shell: totalSh },
    coverage: {
      readme: hasReadme,
      readmeEn: hasReadmeEn,
      scripts: hasScripts,
      references: hasRefs,
      assets: hasAssets,
    },
    frontmatterFields: fmFieldCounts,
    staleFiles,
    missingSkillMd,
  }
  console.log(JSON.stringify(result, null, 2))
  process.exit(0)
}

// ── human-readable ──────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n)
const bar = (n, max) => '█'.repeat(Math.round(n / max * 20))

console.log(`
┌─────────────────────────────────────────────────────────────┐
│  redfox-community-dsh  ·  Skill Inventory Stats             │
├─────────────────────────────────────────────────────────────┤
│  Total skills:  ${dirs.length}                                                  │
│  Python scripts: ${totalPy}                                                │
│  Markdown files: ${totalMd}                                               │
│  Shell scripts:  ${totalSh}                                                  │
└─────────────────────────────────────────────────────────────┘
`)

// category breakdown
const maxCat = Math.max(...Object.values(catCounts))
console.log('  Platform / Category Distribution')
console.log('  ' + '─'.repeat(52))
for (const [cat, count] of Object.entries(catCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${pad(cat, 18)} ${pad(count, 4)} ${bar(count, maxCat)}`)
}

// coverage
console.log(`
  README Coverage`)
console.log('  ' + '─'.repeat(52))
console.log(`  README.md        ${hasReadme}/${dirs.length}`)
console.log(`  README.en.md     ${hasReadmeEn}/${dirs.length}`)
console.log(`  scripts/         ${hasScripts}/${dirs.length}`)
console.log(`  references/      ${hasRefs}/${dirs.length}`)
console.log(`  assets/          ${hasAssets}/${dirs.length}`)

// frontmatter
console.log(`
  Frontmatter Field Coverage`)
console.log('  ' + '─'.repeat(52))
for (const [field, count] of Object.entries(fmFieldCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${pad(field, 18)} ${count}/${dirs.length}`)
}

// issues
if (missingSkillMd.length || staleFiles.length) {
  console.log(`
  Issues`)
  console.log('  ' + '─'.repeat(52))
  for (const s of missingSkillMd) console.log(`  ✗ missing SKILL.md: ${s}`)
  for (const f of staleFiles)     console.log(`  ⚠ stale file: ${f}`)
}

console.log()
