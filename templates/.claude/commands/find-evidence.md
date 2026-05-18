---
description: 키워드를 받아서 arXiv API로 학술 프리프린트 5개를 찾고 한 줄씩 요약하기
---

사용자가 키워드를 주면, arXiv API를 호출해서 관련 학술 프리프린트를 5개 찾아줘.

API 엔드포인트: http://export.arxiv.org/api/query
파라미터: search_query=all:[키워드], max_results=5, sortBy=relevance

응답: Atom XML 형식. 각 <entry> 안:
- <title>: 제목
- <author><name>: 저자 (여러 명, 첫 저자만 사용)
- <published>: 발행일 (YYYY-MM-DD... — 연도만 추출)
- <summary>: 초록
- <id>: arXiv URL

**중요 — API 호출 규칙**:
- curl 또는 WebFetch로 **바로 호출** (sleep 명령 사용 금지 — Claude Code 안전 정책 차단)
- 한 번에 성공해야 함. 실패 시 사용자에게 알리고 중단

각 결과를 다음 형식으로 정리해줘:

1. [제목] ([첫 저자] et al., [연도])
   - URL: [arXiv URL]
   - 초록 핵심을 한 줄로 요약
   - 매뉴얼 본문에 어떻게 인용 가능한지 1줄 코멘트

마지막에 BibTeX 형식의 참고문헌 목록도 함께 정리해줘.
