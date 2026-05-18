# 8. 배포 깊이 들어가기

> 본 수업 7번에서 HTML 변환과 두 가지 배포(로컬·외부 호스팅)를 다뤘어요. 이번 추가 실습은 그 다음 단계 — **회사 시스템 배포, 디자이너 응용, 키 발급, 파크시스템스 TW 팀 실제 사례**를 본인 페이스로 진행하실 수 있게 정리한 자료예요.

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

## [참고] Semantic Scholar API 더 많이 쓰려면 — 무료 키 발급

본 수업 6번에서 키 없이도 Semantic Scholar API를 썼어요. 무명 사용은 분당 1000 요청까지 가능하지만, 본업에서 자주 쓰시려면 **무료 키 발급**하는 게 좋아요.

### Step 1. 키 발급

**1.** https://www.semanticscholar.org/product/api 접속.

**2.** "Request an API Key" 클릭 → 양식 작성 (이메일·사용 목적 한 줄).

**3.** 며칠 안에 이메일로 키 발급.

> 💡 **포인트**: 학술·연구 목적이면 보통 승인. 상업적 사용도 양식에 명시.

### Step 2. 키를 클로드에게 알려주기

발급받은 키는 안전하게 보관해야 해요. CLAUDE.md에 직접 적지 말고 환경 변수로:

**Windows PowerShell:**
```
[Environment]::SetEnvironmentVariable("SEMANTIC_SCHOLAR_API_KEY", "발급받은_키", "User")
```

**Mac/Linux:**
```
echo 'export SEMANTIC_SCHOLAR_API_KEY="발급받은_키"' >> ~/.zshrc
source ~/.zshrc
```

### Step 3. 슬래시 커맨드에 키 사용 안내 추가

`.claude/commands/find-evidence.md` 를 클로드에게 수정해달라고:

📝 **프롬프트 입력**

```
.claude/commands/find-evidence.md 를 수정해서,
환경 변수 SEMANTIC_SCHOLAR_API_KEY 가 있으면
HTTP 헤더 "x-api-key: [그 값]" 을 포함해서 호출하게 해줘.
```

→ 이제 같은 `/find-evidence` 명령이 키와 함께 호출돼 더 안정적이고 더 많은 요청 처리 가능.

## [사례] 파크시스템스 TW 팀의 매뉴얼 배포 흐름

참고로 파크시스템스 TW 팀은 평소 매뉴얼을 이런 7단계 흐름으로 배포해요. 본인 회사에 적용할 때 참고하세요.

| 단계 | 내용 |
|---|---|
| 1 | **SharePoint에 업로드** — PDF 또는 PPT 형식 (웹에서 읽기 + 원본 다운로드 모두 가능) |
| 2 | **매뉴얼 내용 요약 페이지** 만들기 — 주요 내용을 이미지 형식으로 Highlight |
| 3 | **Revision History 기록** — 변경 이력 |
| 4 | **평가·댓글·조회수** 활성화 — 사용자 피드백 수집 |
| 5 | **공지 메일 발송** — 정해진 양식의 메일 |
| 6 | 메일 본문 안 **이미지 클릭 시 SharePoint 페이지로 이동** |
| 7 | 메일 본문 = **고정 양식에 날짜·문서명·Summary·Contributors만 매번 바꿔서 발송** |

### 이 흐름을 클로드 코드로 자동화하려면?

매뉴얼 배포할 때마다 손으로 7단계 거치는 건 시간이 많이 들어요. 클로드 코드에 슬래시 커맨드를 만들어두면 자동화 가능해요. 예:

| 슬래시 커맨드 | 하는 일 |
|---|---|
| `/release-summary [매뉴얼.pdf]` | 매뉴얼에서 주요 내용을 자동 요약 → 요약 페이지(이미지 + 텍스트) 생성 |
| `/update-revision [매뉴얼.pdf]` | Revision History 항목 자동 추가 |
| `/release-mail [매뉴얼.pdf]` | 메일 본문 양식에 날짜·문서명·Summary·Contributors 자동 채워 작성 |
| `/full-release [매뉴얼.pdf]` | 위 3개를 한 번에 실행 (전체 배포 준비) |

> 💡 **포인트**: 본 수업 4번·6번·7번에서 만든 패턴(`.claude/agents/`, `.claude/commands/`)을 그대로 응용하면 됩니다. 회사 SharePoint 자동 업로드는 IT팀과 별도 협의 필요.

---

## [체크포인트]

- [ ] 본인 회사 시스템(SharePoint·Confluence·인트라넷) 중 어디에 배포할지 결정함
- [ ] (디자이너) 회사 디자인 가이드 학습시켜 디자인 적용 HTML 만들어봄
- [ ] (선택) Semantic Scholar 무료 키 발급해서 환경 변수로 등록
- [ ] 파크시스템스 TW 팀 7단계 흐름을 본인 회사에 맞게 응용할 계획이 섰음
