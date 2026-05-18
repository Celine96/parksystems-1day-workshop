---
description: 키워드를 받아서 Semantic Scholar API로 학술 자료 5개를 찾고 한 줄씩 요약하기
---

사용자가 키워드를 주면, Semantic Scholar API를 호출해서 관련 학술 자료를 5개 찾아줘.

API 엔드포인트: https://api.semanticscholar.org/graph/v1/paper/search
파라미터: query=[키워드], limit=5, fields=title,authors,year,abstract

각 결과를 다음 형식으로 정리해줘:

1. [제목] ([첫 저자], [연도])
   - 초록 핵심을 한 줄로 요약
   - 매뉴얼 본문에 어떻게 인용 가능한지 1줄 코멘트

마지막에 BibTeX 형식의 참고문헌 목록도 함께 정리해줘.
