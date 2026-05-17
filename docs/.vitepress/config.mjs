import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: "파크시스템스 AX 바이브코딩 연수",
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
    sidebar: [
      {
        text: '워크북 소개',
        items: [
          { text: '시작하기', link: '/' },
        ]
      },
      {
        text: '시작 (30분)',
        items: [
          { text: '1. 클로드 vs 클로드 코드', link: '/part1/1-1-intro' },
          { text: '2. 설치 및 첫 실행', link: '/part1/1-2-install' },
        ]
      },
      {
        text: '메인 — 본 수업 (195분)',
        items: [
          { text: '3. 파일 정리', link: '/part2/2-1-files' },
          { text: '4. PM 에이전트', link: '/part2/2-2-pm-agent' },
          { text: '5. 사내 문체 매뉴얼 자동 생성', link: '/part2/2-3-manual' },
          { text: '6. 외부 근거 자동 수집', link: '/part2/2-4-api' },
          { text: '7. HTML 변환', link: '/part2/2-5-html' },
        ]
      },
      {
        text: '추가 실습 (워크숍 후)',
        items: [
          { text: '8. 배포 깊이 들어가기', link: '/part3/3-3-publish' },
        ]
      },
      {
        text: '부록 (본업 적용 참고)',
        items: [
          { text: '9. 슬래시 명령어 레퍼런스', link: '/part3/3-1-commands' },
          { text: '10. 에이전트 & 하네스 깊이', link: '/part3/3-2-agents-harness' },
          { text: '11. PRD — AI에게 줄 지시서', link: '/part3/3-4-prd' },
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
