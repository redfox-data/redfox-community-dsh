#!/usr/bin/env node
// scripts/validate.mjs — Skill directory structure validator.
// Called by .github/workflows/validate.yml on every push / PR.
// Also runnable locally:  node scripts/validate.mjs

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { exit } from 'node:process'

const SKILLS_DIR = new URL('../skills', import.meta.url).pathname

// ── helpers ────────────────────────────────────────────────
let errors = 0
let warnings = 0

function error(msg) { errors++; console.error(`  ✗ ${msg}`) }
function warn(msg)  { warnings++; console.warn(`  ⚠ ${msg}`) }
function ok(msg)    { console.log(`  ✓ ${msg}`) }

/** Extract YAML frontmatter block between the first two "---" lines. */
function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return match ? match[1] : null
}

/** Minimal YAML key check — no parser needed, just top-level "key: value". */
function hasFrontmatterKey(fm, key) {
  return new RegExp(`^${key}\\s*:`, 'm').test(fm)
}

// ── stale file patterns (should never be committed) ───────
// Keep in sync with .gitignore "Skill runtime artifacts" section.
const STALE_NAMES = new Set([
  '_user_meta.json',
  'subscriptions.json',
  '__pycache__',
  'cache',
  '.DS_Store',
  'Thumbs.db',
])

function isStale(name) {
  if (STALE_NAMES.has(name)) return true
  if (/\.pyc$/.test(name)) return true
  if (/^test_.*\.json$/.test(name)) return true
  if (/.*_test_result\.json$/.test(name)) return true
  return false
}

function findStaleFiles(dir) {
  const found = []
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (isStale(entry.name)) {
          found.push(full.replace(SKILLS_DIR + '/', '') + '/')
        } else {
          found.push(...findStaleFiles(full))
        }
      } else if (isStale(entry.name)) {
        found.push(full.replace(SKILLS_DIR + '/', ''))
      }
    }
  } catch { /* permission errors etc. */ }
  return found
}

// ── main ──────────────────────────────────────────────────
console.log(`\nValidating skills in ${SKILLS_DIR}\n`)

const dirs = readdirSync(SKILLS_DIR).filter(name => {
  const full = join(SKILLS_DIR, name)
  return statSync(full).isDirectory() && !name.startsWith('.')
})

console.log(`Found ${dirs.length} skill directories\n`)

for (const dir of dirs.sort()) {
  const skillPath = join(SKILLS_DIR, dir)
  console.log(`[${dir}]`)

  // 1. SKILL.md must exist
  const skillMd = join(skillPath, 'SKILL.md')
  if (!existsSync(skillMd)) {
    error(`${dir}: missing SKILL.md`)
    continue
  }
  ok('SKILL.md exists')

  // 2. Frontmatter must have name + description
  const content = readFileSync(skillMd, 'utf8')
  const fm = extractFrontmatter(content)
  if (!fm) {
    error(`${dir}/SKILL.md: no YAML frontmatter found`)
  } else {
    if (!hasFrontmatterKey(fm, 'name'))
      error(`${dir}/SKILL.md: frontmatter missing "name"`)
    if (!hasFrontmatterKey(fm, 'description'))
      error(`${dir}/SKILL.md: frontmatter missing "description"`)
    if (fm) ok('frontmatter has name & description')
  }

  // 3. README.md + README.en.md should both exist
  if (!existsSync(join(skillPath, 'README.md')))
    warn(`${dir}: missing README.md`)
  if (!existsSync(join(skillPath, 'README.en.md')))
    warn(`${dir}: missing README.en.md`)
  if (existsSync(join(skillPath, 'README.md')) &&
      existsSync(join(skillPath, 'README.en.md')))
    ok('README.md + README.en.md present')

  // 4. Stale runtime files (warn only — skills/ is synced from hub repo,
  //    so stale files may originate upstream; flag them but don't block CI)
  const stale = findStaleFiles(skillPath)
  if (stale.length) {
    for (const f of stale) warn(`stale file (upstream?): ${f}`)
  } else {
    ok('no stale runtime files')
  }

  console.log()
}

// ── summary ───────────────────────────────────────────────
console.log('─'.repeat(50))
console.log(`Skills: ${dirs.length}  |  Errors: ${errors}  |  Warnings: ${warnings}`)

if (errors > 0) {
  console.error(`\n✗ Validation failed with ${errors} error(s)\n`)
  exit(1)
}
console.log('\n✓ All checks passed\n')
