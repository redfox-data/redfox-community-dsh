// redfox-community-dsh - bundle entry.
// Registers the packaged skills/ tree (mirrored one-way from the
// redfox-community hub repo by CI) as a skill provider, reusing the
// official filesystem provider so skills load exactly like user-level
// skills (frontmatter parsing, watcher, ranks, resourceBase).
//
// Note: @deepseek-ai/dsh-skill-filesystem is NOT declared in dependencies -
// official packages are injected by the profile's pnpm closure at install
// time (declaring them fails on public npm).
//
// This bundle intentionally mounts only the packaged skills/ directory
// (includeDefaultRoots: false), so installing it never re-discovers the
// app's own bundled or user skills under a second provider name.
// skills/ is mounted as a single skill root: every first-level
// subdirectory containing a SKILL.md is discovered automatically, so
// newly synced skills from the hub repo require no change to this file.

import { fileURLToPath } from 'node:url'
import { FileSystemSkillProvider } from '@deepseek-ai/dsh-skill-filesystem'

export const name = 'redfox-community-dsh'
export const inject = ['skills']

export function apply(ctx) {
  const bundledSkillDir = fileURLToPath(new URL('./skills', import.meta.url))
  ctx.skills.registerProvider((control) =>
    new FileSystemSkillProvider(ctx, control, {
      providerName: 'redfox-community-dsh',
      includeDefaultRoots: false,
      bundledSkillDir,
    }),
  )
}
