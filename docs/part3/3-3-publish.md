# 8. 배포 깊이 들어가기

> 본 수업 7번에서 HTML 변환과 두 가지 배포(로컬·외부 호스팅)를 다뤘어요. 이번 추가 실습은 그 다음 단계 — **회사 시스템 배포, 디자이너 응용, 키 발급 팁**을 본인 페이스로 진행하실 수 있게 정리한 자료예요.

---

## [옵션 C] 사내 시스템 — 회사 매뉴얼은 여기

회사 매뉴얼·기획 자료는 회사 인프라에 올리는 게 안전해요. 회사가 어떤 도구를 쓰는지에 따라 다르게 진행.

### C-1. SharePoint (Microsoft 365 회사)

대부분 OneDrive 동기화 폴더를 갖고 있어요.

**Step 1.** 본인 PC에서 OneDrive로 동기화된 회사 폴더 위치 확인 (예: `C:\Users\USER\Park Systems\Documents`).

**Step 2.** HTML 파일을 그 폴더에 저장.

**Step 3.** 자동으로 SharePoint에 업로드됨. 회사 동료와 공유 가능.

### C-2. Confluence

**Step 1.** Confluence 페이지 만들기.

**Step 2.** "Insert" → "HTML Macro" 또는 "Source Editor"에 HTML 붙여넣기.

> 💡 **포인트**: 회사 관리자 설정에 따라 HTML 매크로가 비활성일 수 있음. IT 팀에 문의.

### C-3. 사내 인트라넷 / Wiki

회사마다 다르지만 대부분 HTML 업로드 또는 임베딩 지원. IT 팀에게 "정적 HTML 페이지 호스팅하려면 어디에 두면 되나요?" 한 줄 물어보면 안내받을 수 있어요.

## [옵션 D] 디자이너 응용

디자이너 분이라면 회사 디자인 가이드를 매뉴얼 HTML에 적용해보세요.

### Step 1. 디자인 가이드 학습시키기

회사 디자인 가이드 PDF·이미지를 준비.

📝 **프롬프트 입력**

```
[디자인 가이드 폴더]의 자료를 분석해서
.claude/agents/Design-Applier.md 라는 에이전트를 만들어줘.

내용:
- 회사 컬러 팔레트 (HEX 코드)
- 폰트 패밀리 (heading·body 구분)
- 헤더 스타일
- 표·박스 스타일
- 여백·줄간격 가이드
```

### Step 2. 디자인 적용한 HTML 생성

📝 **프롬프트 입력**

```
Design-Applier 에이전트에게 우리 디자인 가이드대로
output/Chapter1_Intro.md 를 디자인된 HTML 페이지로 만들어달라고 해줘.
```

→ 본인 회사 톤·디자인 그대로의 매뉴얼이 손에 들어와요.

## [참고] Vercel — 외부 호스팅 더 깊이

본 수업 7번에서 Netlify Drop을 봤어요. Vercel도 비슷한 무료 외부 호스팅이지만 디자이너·1인 빌더에게 더 친숙해요.

**Step 1.** https://vercel.com 가입 (이메일 또는 구글).

**Step 2.** "Add New Project" → 파일 드래그 또는 폴더 선택.

**Step 3.** Deploy 클릭 → URL 자동 생성.

> 💡 **포인트**: Vercel CLI(`vercel deploy` 명령)로 클로드 코드에서 직접 배포 가능. 슬래시 커맨드와 결합하면 워크북 톤과 자연스럽게 이어져요.

## [참고] arXiv API 활용 팁 — 키 불필요, 즉시 사용

본 수업 6번에서 쓴 **arXiv API는 키 발급이 필요 없어요**. 누구나 즉시 호출 가능하고, rate limit도 너그러워서(초당 1회 권장) 본업에서도 그대로 쓸 수 있어요.

### 검색 품질 끌어올리는 팁

기본 호출은 `search_query=all:[키워드]` 형식인데, 필드를 한정하면 더 정밀한 결과를 얻을 수 있어요.

| 필드 prefix | 의미 | 예시 |
|---|---|---|
| `all:` | 전체 검색 (기본) | `all:AFM+metrology` |
| `ti:` | 제목만 | `ti:White+Light+Interferometry` |
| `abs:` | 초록만 | `abs:sub-nm+surface` |
| `au:` | 저자명 | `au:Smith` |
| `cat:` | 카테고리 | `cat:physics.ins-det` (Instrumentation) |

### 정렬 옵션

- `sortBy=relevance` — 관련도 순 (기본, 워크숍에서 사용)
- `sortBy=submittedDate&sortOrder=descending` — 최신 발행순 (최근 동향 파악)
- `sortBy=lastUpdatedDate&sortOrder=descending` — 최근 업데이트순

### 슬래시 커맨드 응용

`.claude/commands/find-evidence.md` 를 분야별로 복제해서 카테고리를 미리 박아두면 편해요. 예:

📝 **프롬프트 입력**

```
.claude/commands/find-evidence-instrument.md 를 새로 만들어줘.
기존 find-evidence.md와 같은데, search_query에
"cat:physics.ins-det AND all:[키워드]" 형식으로 측정·계측 분야로
한정해서 검색하게 해줘.
```

→ `/find-evidence-instrument` 한 번이면 측정·계측 분야 프리프린트만 골라 정리.

---

## [체크포인트]

- [ ] 본인 회사 시스템(SharePoint·Confluence·인트라넷) 중 어디에 배포할지 결정함
- [ ] (디자이너) 회사 디자인 가이드 학습시켜 디자인 적용 HTML 만들어봄
- [ ] (선택) arXiv API의 필드 한정·정렬 옵션을 본인 분야에 맞게 활용 (예: `cat:` prefix로 카테고리 한정)
