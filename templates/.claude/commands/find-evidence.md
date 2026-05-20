---
description: arxiv MCP 도구로 학술 프리프린트 5개를 찾고 한 줄씩 요약하기
---

사용자가 키워드를 주면, arxiv MCP 서버의 `search_papers` 도구를 호출해서 관련 학술 프리프린트를 5개 찾아줘.

도구: `search_papers` (arxiv-mcp-server)
파라미터:
- query: [사용자 키워드]
- max_results: 5

각 결과를 다음 형식으로 정리해줘:

1. [제목] ([첫 저자] et al., [연도])
   - URL: [arXiv URL — paper id로 https://arxiv.org/abs/{id} 구성]
   - 초록 핵심을 한 줄로 요약
   - 매뉴얼 본문에 어떻게 인용 가능한지 1줄 코멘트

마지막에 BibTeX 형식의 참고문헌 목록도 함께 정리해줘.

**중요 — 호출 규칙**:
- 도구를 **한 번에 바로 호출** (sleep 명령 사용 금지)
- MCP 서버 미등록 시 사용자에게 "워크북 6 챕터 Step 1~4 (uv tool install → claude mcp add --scope user → claude 재시작 → /mcp 확인) 진행 필요" 안내
