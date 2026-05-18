# 6. 프로젝트 #4.1 : 외부 근거 자동 수집

> 매뉴얼 본문에 학술 근거가 필요할 때 — 사람이 30분 검색할 일을 클로드 코드가 30초에 끝내는 패턴을 체험합니다.

---

## [도입] 외부 근거를 자동으로 가져온다는 것

매뉴얼이나 기술 문서를 쓰다 보면 자주 마주치는 순간이 있어요.

> *"이 기술에 대한 학술 자료를 본문에 인용하고 싶은데..."*
> *"이 측정 원리의 학술적 근거가 있나?"*
> *"경쟁사·표준 단체가 이 영역에서 뭐라고 발표했지?"*

평소 흐름:

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">📌 손으로 하면 4단계 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 손으로 하면 오래 걸리는 일</span></p>

> 1. Google Scholar 또는 학술 사이트 검색
> 2. 논문 클릭 → 초록 읽기
> 3. 인용할 만한 것 5개 정도 골라서 정리
> 4. 메모장에 옮기기

**꽤 긴 작업.** 키워드 1~2개 따라 더 길어지죠.

### 클로드 코드라면

```
You: NX-Interferom 관련해서 White Light Interferometry + AFM 통합 메트롤로지
    최신 학술 자료 5개 찾아서 각각 한 줄로 요약해줘.

클로드 코드:
1. [논문 제목] (저자, 연도) - 핵심 한 줄 요약
2. [논문 제목] (저자, 연도) - 핵심 한 줄 요약
...
```

**30초.** 인용 가능한 자료들이 정리된 형태로 손에 들어와요.

## [개념] 어떻게 가능한 일인가요? — API 한 줄로

**API** 라는 단어를 한 번은 들어보셨을 거예요. 어렵게 들리지만 풀어쓰면:

> **API = 다른 서비스와 약속된 창구**
> "내가 키워드를 던지면, 너는 그 키워드와 관련된 자료를 정해진 형식으로 돌려줘" 라는 약속이에요.

오늘 우리는 **Semantic Scholar** 라는 학술 자료 검색 서비스의 API를 사용해요.

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">🔎 Semantic Scholar <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 오늘 사용할 무료 학술 API</span></p>

> - **Semantic Scholar** — Allen Institute for AI가 운영하는 무료 학술 검색 서비스
> - **약 2억 편 이상의 논문 데이터** 보유 (Google Scholar와 유사한 커버리지)
> - **API 무료 / 가입 불필요 / 키 발급 불필요**

> 💡 **포인트**: Google Scholar는 공식 API가 없어요. (있는 건 유료 third-party만 — 월 $75~) Semantic Scholar는 학술계가 표준처럼 쓰는 무료 대체재예요. 결과 품질도 좋아요.

## [실습] 학술 근거 수집 에이전트 만들기

### Step 1. 작업 폴더에서 시작

`5_매뉴얼` 폴더에서 계속 작업해요. (5번에서 만든 에디터 에이전트가 살고 있는 곳)

```
cd ~/Desktop/parksystems-workshop/5_매뉴얼
```

### Step 2. 학술 근거 수집 슬래시 커맨드 만들기

대화창에 입력:

```
.claude/commands/find-evidence.md 파일을 새로 만들어줘.

내용은 이렇게:

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
```

Nimbalyst에서 `.claude/commands/find-evidence.md` 파일이 생기는 걸 보세요.

### Step 3. 학술 근거 수집 — 첫 호출

이제 `/find-evidence` 커맨드를 쓸 수 있어요. 호출해봅시다.

대화창에 입력:

```
/find-evidence

키워드: White Light Interferometry AFM integration metrology
```

클로드가 일하는 모습을 보세요.

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">🤖 클로드 코드가 알아서 하는 일 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 커맨드 → API 호출 → 결과 정리</span></p>

> 1. 우리가 만든 `.claude/commands/find-evidence.md` 를 읽음
> 2. Semantic Scholar API 호출 (실제로 인터넷으로 검색)
> 3. 결과 5개를 정해준 형식으로 정리
> 4. BibTeX 참고문헌까지 함께 출력

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">💬 클로드 코드는 이렇게 답해요 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 학술 자료 + 매뉴얼 인용 코멘트</span></p>

```
1. Hybrid Metrology Combining AFM and White Light Interferometry
   for Sub-nm Surface Characterization (Smith et al., 2023)
   - WLI의 대면적 측정과 AFM의 sub-nm 정밀도를 결합한 시스템 사례
   - 매뉴얼 인용: Park's NX-Interferom의 기술적 배경 강화 가능

2. ...
```

> 💡 **포인트**: 오래 걸리는 일이 30초. 그것도 인용 형식까지 정리됨.

## [실습] 매뉴얼에 근거 통합

### Step 4. 매뉴얼에 근거 끼워넣기

5번에서 만든 Chapter 1 Introduction에 학술 근거를 더해봅시다.

```
5번에서 만든 output/Chapter1_Intro.md 의 본문에
방금 /find-evidence 로 찾은 학술 자료 중 가장 관련 있는 2개를
자연스럽게 인용 형식으로 추가해줘.

문장 끝에 [1], [2] 식의 참조 표시를 넣고,
파일 끝에 References 섹션을 추가해서 인용한 자료 정리.
```

Nimbalyst에서 `Chapter1_Intro.md` 파일이 업데이트되는 걸 확인하세요. **본문에 학술 인용이 자연스럽게 녹아든 매뉴얼**이 손에 들어와요.

## [마무리] 본인 업무 응용 가이드

본인 업무에 적용하고 싶다면:

```
[본인 키워드]에 대한 학술 자료 / 산업 표준 / 경쟁사 발표 자료를
Semantic Scholar API로 찾아서 정리해줘.
```

→ 어떤 분야든 키워드만 바꾸면 됩니다. 변호사 = 판례·법률 자료 / 마케팅 = 시장조사 / 캠페인 = 트렌드 자료.

> 💡 **포인트**: Semantic Scholar는 학술 자료에 특화되어 있어요. 비학술 자료(뉴스·블로그·트렌드)는 별도 검색이 필요해요.

---

## [체크포인트]

- [ ] **API = 다른 서비스와의 약속된 창구** 라는 점을 이해함
- [ ] `.claude/commands/find-evidence.md` 슬래시 커맨드를 만들었음
- [ ] `/find-evidence` 한 번으로 학술 자료 5개 + BibTeX가 정리되는 걸 직접 봄
- [ ] 매뉴얼 본문에 학술 인용이 자연스럽게 통합되는 걸 확인함

---

> 다음은 **7. HTML 변환** — 우리가 만든 매뉴얼을 누구나 볼 수 있는 웹페이지로 만들어볼 거예요.
