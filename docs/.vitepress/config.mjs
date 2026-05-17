import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: "파크시스템스 AX 바이브코딩 연수",
  description: 'with 클로드 코드 — 비개발자를 위한 업무 자동화 1day 워크숍',
  base: '/parksystems-1day-workshop/',
  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      { text: '0교시', link: '/part1/1-1-intro' },
      { text: '본 수업', link: '/part2/2-1-files' },
      { text: '부록', link: '/part3/3-1-commands' },
    ],
    sidebar: [
      {
        text: '워크북 소개',
        items: [
          { text: '시작하기', link: '/' },
        ]
      },
      {
        text: '0교시: 입문',
        items: [
          { text: '1.1 클로드 vs 클로드 코드', link: '/part1/1-1-intro' },
          { text: '1.2 설치 및 첫 실행', link: '/part1/1-2-install' },
        ]
      },
      {
        text: '본 수업',
        items: [
          { text: '2.1 파일 정리 (1교시)', link: '/part2/2-1-files' },
          { text: '2.2 PM 에이전트 (2교시)', link: '/part2/2-2-pm-agent' },
          { text: '2.3 사내 문체 매뉴얼 자동 생성 (3교시 전반)', link: '/part2/2-3-manual' },
          { text: '2.4 외부 근거 자동 수집 (3교시 후반)', link: '/part2/2-4-api' },
        ]
      },
      {
        text: '부록',
        items: [
          { text: '3.1 슬래시 명령어 레퍼런스', link: '/part3/3-1-commands' },
          { text: '3.2 에이전트 & 하네스 깊이', link: '/part3/3-2-agents-harness' },
          { text: '3.3 추가 실습 — HTML 변환 & 배포', link: '/part3/3-3-publish' },
          { text: '3.4 PRD — AI에게 줄 지시서', link: '/part3/3-4-prd' },
        ]
      }
    ],
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
