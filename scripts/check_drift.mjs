#!/usr/bin/env node
// chapters.json ↔ docs/index.md frontmatter features 정합성 검증.
//
// 목적: 챕터 추가/변경 시 한 곳(chapters.json)만 바꾸고 index.md를 잊는 drift를 잡는다.
// VitePress home layout이 frontmatter 전용이라 index.md는 동적화 불가 → 검증으로 보완.
//
// 사용:  node scripts/check_drift.mjs
// 종료 코드: 0 정합 / 1 drift 발견

import chapters from '../docs/.vitepress/data/chapters.json' with { type: 'json' }
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const indexMdPath = path.join(repoRoot, 'docs', 'index.md')

// 1) chapters.json에서 "num이 있는 챕터" 목록 (1~12번)
const numberedChapters = []
for (const group of chapters.groups) {
  for (const item of group.items) {
    if (typeof item.num === 'number') {
      numberedChapters.push({
        num: item.num,
        title: item.text,
        link: item.link,
      })
    }
  }
}

// 2) index.md frontmatter features에서 link 목록 추출
const indexMd = fs.readFileSync(indexMdPath, 'utf-8')
const fmMatch = indexMd.match(/^---\r?\n([\s\S]*?)\r?\n---/)
if (!fmMatch) {
  console.error('[FAIL] docs/index.md frontmatter를 찾을 수 없습니다.')
  process.exit(1)
}
const fm = fmMatch[1]

// features 블록 안의 link: 값을 모두 뽑기 (간단·견고한 라인 단위 파싱)
const featuresIdx = fm.indexOf('features:')
if (featuresIdx === -1) {
  console.error('[FAIL] docs/index.md frontmatter에 features: 블록이 없습니다.')
  process.exit(1)
}
const featuresBlock = fm.slice(featuresIdx)
const linkMatches = [...featuresBlock.matchAll(/^\s*link:\s*(\S+)\s*$/gm)].map(m => m[1])
const indexLinks = new Set(linkMatches)

// 3) 비교: chapters.json의 numbered 챕터 link가 모두 index.md features에 있는지
const missing = numberedChapters.filter(c => !indexLinks.has(c.link))
// 부록(9~12)은 index.md에서는 "부록 — 4개 보기" 한 카드로 묶이므로 누락 처리에서 제외.
// 정책: index.md에는 1~8번 + 부록 묶음 카드만 노출. 부록 카드 link는 9번(/part3/3-1-commands).
const APPENDIX_NUMS = new Set([9, 10, 11, 12])
const realMissing = missing.filter(c => !APPENDIX_NUMS.has(c.num))

// 부록 묶음 카드는 9번 link를 사용해야 함
const appendixCard = chapters.appendix_features_card
const appendixLinkPresent = appendixCard && indexLinks.has(appendixCard.link)

// 4) 역방향: index.md에 있지만 chapters.json에 없는 link
const chapterLinks = new Set(numberedChapters.map(c => c.link))
const extra = [...indexLinks].filter(link => !chapterLinks.has(link))

// 5) 카운트 검증: index.md features 개수 = 메인+시작+추가실습 챕터 수 + 부록 묶음 카드 1
const expectedCount = numberedChapters.filter(c => !APPENDIX_NUMS.has(c.num)).length + 1
const actualCount = linkMatches.length

let hasDrift = false

console.log('--- chapters.json ↔ index.md drift 검증 ---')
console.log(`chapters.json numbered 챕터: ${numberedChapters.length}개 (부록 ${APPENDIX_NUMS.size}개 포함)`)
console.log(`index.md features 카드: ${actualCount}개 (기대: ${expectedCount} = 비-부록 챕터 + 부록 묶음 카드 1)`)

if (realMissing.length > 0) {
  hasDrift = true
  console.error('\n[DRIFT] chapters.json에는 있지만 index.md features에 누락된 챕터:')
  for (const c of realMissing) {
    console.error(`  - ${c.num}. ${c.title} (${c.link})`)
  }
}

if (!appendixLinkPresent) {
  hasDrift = true
  console.error(`\n[DRIFT] 부록 묶음 카드(link: ${appendixCard?.link})가 index.md features에 없습니다.`)
}

if (extra.length > 0) {
  hasDrift = true
  console.error('\n[DRIFT] index.md features에는 있지만 chapters.json에 없는 link:')
  for (const link of extra) {
    if (appendixCard && link === appendixCard.link) continue // 부록 카드는 정상
    console.error(`  - ${link}`)
  }
}

if (actualCount !== expectedCount) {
  hasDrift = true
  console.error(`\n[DRIFT] features 카드 수 불일치: 실제 ${actualCount} vs 기대 ${expectedCount}`)
}

if (hasDrift) {
  console.error('\n결과: DRIFT 발견. chapters.json과 docs/index.md를 동기화하세요.')
  process.exit(1)
} else {
  console.log('\n결과: PASS (정합)')
  process.exit(0)
}
