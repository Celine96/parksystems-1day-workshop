import { defineConfig } from 'vitepress'
import chapters from './data/chapters.json' with { type: 'json' }

// chapters.json의 groups → VitePress sidebar 구조로 변환
// (drift 방지: 챕터 추가/변경 시 chapters.json만 수정)
const sidebar = chapters.groups.map(g => ({
  text: g.label,
  items: g.items.map(({ text, link }) => ({ text, link }))
}))

export default defineConfig({
  lang: 'ko-KR',
  title: "파크시스템스 AX 바이브코딩",
  description: 'with 클로드 코드 — 비개발자를 위한 업무 자동화 1day 워크숍',
  base: '/parksystems-1day-workshop/',
  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      { text: '시작', link: '/part1/1-1-intro' },
      { text: '메인', link: '/part2/2-1-files' },
      { text: '추가 실습', link: '/part3/3-3-publish' },
      { text: '부록', link: '/part3/3-1-commands' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Celine96/parksystems-1day-workshop' }
    ],
    outline: {
      level: [2, 3],
      label: '목차'
    },
    search: {
      provider: 'local'
    }
  }
})
