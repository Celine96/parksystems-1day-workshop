# 6. 프로젝트 4 : 학술 근거 자동 수집 (MCP 활용)

> 매뉴얼 본문에 학술 근거가 필요할 때 — 사람이 30분 검색할 일을 클로드 코드가 30초에 끝내는 패턴을 체험합니다.

---

## [도입] 학술 근거를 자동으로 가져온다는 것

매뉴얼이나 기술 문서를 쓰다 보면 자주 마주치는 순간이 있어요.

> *"이 기술에 대한 학술 자료를 본문에 인용하고 싶은데..."*
> *"이 측정 원리의 학술적 근거가 있나?"*
> *"경쟁사·표준 단체가 이 영역에서 뭐라고 발표했지?"*

평소 흐름:

<SectionTitle icon="📌" title="직접하면 4단계" sub="상당히 오래 걸리는 일" />

> 1. Google Scholar 또는 학술 사이트 검색
> 2. 논문 클릭 → 초록 읽기
> 3. 인용할 만한 것 5개 정도 골라서 정리
> 4. 내 작업에 반영하기

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

## [개념] 어떻게 가능한 일인가요? — MCP 한 줄로

**MCP** (Model Context Protocol) 라는 단어가 자주 보일 거예요. 어렵게 들리지만 풀어쓰면:

> **MCP = 클로드가 외부 도구를 쓰는 표준 약속**
> Anthropic이 만든 규약. 학술 검색·Slack·GitHub·구글 드라이브 등 다양한 도구를 클로드가 직접 쓸 수 있게 해줘요.

오늘 우리는 **arxiv-mcp-server**라는 MCP를 써요. 클로드가 arXiv 학술 자료를 직접 검색·요약할 수 있게 해주는 무료 도구예요.

<SectionTitle icon="🔎" title="arxiv-mcp-server" sub="클로드가 arXiv 학술 검색을 직접 수행" />

> - **arXiv**: Cornell University 운영. 240만 편 학술 프리프린트, 1991년부터. 물리·CS·수학·통계 등 학술 핵심 분야
> - **무료 / 가입 불필요 / 키 발급 불필요 / 너그러운 rate limit**
> - **arxiv-mcp-server**: 오픈소스 — https://github.com/blazickjp/arxiv-mcp-server

> 💡 **포인트**: 본업 영역에 맞는 MCP를 찾으면 같은 패턴으로 자동화 가능. Slack·GitHub·구글 드라이브 등 다양한 MCP가 있어요.

## [실습] arxiv-mcp-server 설치

### Step 1. 클로드한테 셋업 부탁

명령어 외울 필요 없어요. 클로드한테 그냥 부탁하면 알아서 본인 OS 확인하고, 설치하고, 다음에 뭘 해야 하는지까지 안내해줘요.

📝 **프롬프트 입력**

```
arxiv 학술 검색을 위해 arxiv-mcp-server를 설치하고 싶어.
참고: https://github.com/blazickjp/arxiv-mcp-server

내 OS 자동 확인하고, 필요하면 uv(Python 도구 매니저)도 같이 설치해줘.
설치 진행 상황을 단계별로 알려주고, 끝나면 다음에 뭘 해야 하는지 안내해줘.
```

클로드가 알아서:
- 본인 OS 확인 (Mac / Windows / Linux)
- uv 설치 (없으면)
- arxiv-mcp-server 설치
- **다음 단계 안내** (등록 명령어 한 줄 + 재시작 방법)

> 💡 **권한 에러가 뜨면** 클로드한테 "이 에러가 떴어. 어떻게 해결해?"라고 그대로 붙여넣어 물어보세요.

<SectionTitle icon="💬" title="클로드 코드의 진행 과정" sub="강사 샘플 — Windows 11 환경" spacious />

```
● OS는 Windows 11이에요. 단계별로 진행할게요.

1단계: 현재 환경 확인 — uv / python / 기존 MCP 설정 점검
● uv 0.10.6 / Python 3.13 이미 설치돼 있어요. 설치 단계는 건너뛰고 MCP 등록만 하면 돼요.

2단계: arxiv-mcp-server 등록 상태 확인
● arxiv-mcp-server는 아직 등록 안 됐어요. 진행할게요.

3단계: arxiv-mcp-server 설치 (uv tool 방식)
● 설치 성공 (PowerShell stderr 처리에서 경고가 떴지만 마지막 줄
  "Installed 1 executable: arxiv-mcp-server" 확인).

4단계: 논문 저장 폴더 만들고 Claude Code MCP에 등록
● 등록은 됐는데 project scope가 RFM 하위 폴더로 잡혔어요. 워크숍 루트로 옮길게요.

● 완료! 등록 + 연결 확인됐어요.
```

| 항목 | 상태 |
|---|---|
| OS | Windows 11 |
| uv | 0.10.6 (이미 설치돼 있어 스킵) |
| Python | 3.13 (이미 설치) |
| arxiv-mcp-server | ✓ uv tool install로 설치 |
| 논문 저장 폴더 | `6_학술근거/arxiv-papers/` 생성 |
| Claude Code MCP 등록 | ✓ user scope, Connected |

> 💡 본인 OS·환경에 따라 단계가 살짝 달라질 수 있어요. 큰 흐름(환경 확인 → 설치 → 등록 → 연결 확인)만 같으면 정상이에요.

### Step 2. Claude Code 재시작

클로드가 안내한 등록 명령을 일반 PowerShell에서 실행한 다음, 새 MCP 도구를 인식시키려면 **Claude Code를 한 번 재시작**해야 해요.

<SectionTitle icon="🔄" title="재시작 방법" sub="2단계로 끝" />

> **1) 지금 세션 종료**
>
> - 터미널에서 `Ctrl + C` 두 번 누르거나
> - `/exit` 입력
>
> **2) 같은 폴더에서 다시 실행**
>
> - PowerShell 열어서 워크숍 폴더로 이동 후 `claude` 입력
> - 또는 이전에 쓰던 터미널 창에서 `claude` 다시 입력

### Step 3. 등록 확인

대화창에서:

```
/mcp
```

설치가 완료되면 아래 화면처럼 `/arxiv-mcp-server:` 로 시작하는 도구 목록이 보여요.

![/mcp 명령으로 arxiv-mcp-server 등록 확인](/images/mcp-installed.png)

→ `arxiv-mcp-server` 관련 도구(`search_papers`, `summarize_paper`, `literature_review` 등)가 보이면 셋업 완료. 다음 단계로.

## [실습] 학술 근거 수집 슬래시 커맨드 만들기

### Step 5. find-evidence.md 만들기

대화창에 입력:

📝 **프롬프트 입력**

```
.claude/commands/find-evidence.md 파일을 새로 만들어줘.

내용은 이렇게:

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
- MCP 서버 미등록 시 사용자에게 "워크북 6 챕터 Step 1~3 (클로드한테 셋업 부탁 → 받은 명령어 일반 터미널에서 실행 → claude 재시작 후 /mcp 확인) 진행 필요" 안내
```

> 💡 이 파일은 zip에 미리 들어 있어요. 위 프롬프트는 학습 흐름 이해용으로만 보고, 실행 없이 다음 단계로 넘어가세요.

**(참고)** 직접 실행하면 `.claude/commands/find-evidence.md` 파일이 만들어져요.

## [실습] 학술 근거 수집 — 첫 호출

### Step 6. /find-evidence 호출

이제 `/find-evidence` 커맨드를 쓸 수 있어요. 호출해봅시다.

대화창에 입력:

📝 **프롬프트 입력**

```
/find-evidence

키워드: White Light Interferometry AFM integration metrology
```

클로드가 일하는 모습을 보세요.

<SectionTitle icon="🤖" title="클로드 코드가 알아서 하는 일" sub="커맨드 → MCP 도구 호출 → 결과 정리" />

> 1. 우리가 만든 `.claude/commands/find-evidence.md` 를 읽음
> 2. arxiv MCP 서버의 `search_papers` 도구 호출
> 3. 결과 5개를 정해준 형식으로 정리
> 4. BibTeX 참고문헌까지 함께 출력

<SectionTitle icon="💬" title="클로드 코드는 이렇게 답해요" sub="학술 자료 + 매뉴얼 인용 코멘트" />

```
1. Hybrid Metrology Combining AFM and White Light Interferometry
   for Sub-nm Surface Characterization (Smith et al., 2023)
   - URL: https://arxiv.org/abs/2306.12345
   - WLI의 대면적 측정과 AFM의 sub-nm 정밀도를 결합한 시스템 사례
   - 매뉴얼 인용: Park's NX-Interferom의 기술적 배경 강화 가능

2. ...
```

> 💡 **포인트**: 오래 걸리는 일이 30초. 그것도 인용 형식까지 정리됨.

## [실습] 매뉴얼에 근거 통합

### Step 7. 매뉴얼에 근거 끼워넣기

5번에서 만든 Chapter 1 Introduction에 학술 근거를 더해봅시다.

📝 **프롬프트 입력**

```
5번에서 만든 output/Chapter1_Intro.md 의 본문에
방금 /find-evidence 로 찾은 학술 자료 중 가장 관련 있는 2개를
자연스럽게 인용 형식으로 추가해줘.

문장 끝에 [1], [2] 식의 참조 표시를 넣고,
파일 끝에 References 섹션을 추가해서 인용한 자료 정리.
```

`Chapter1_Intro.md` 파일이 업데이트되었습니다. **본문에 학술 인용이 자연스럽게 녹아든 매뉴얼**이 손에 들어와요.

## [마무리] 본인 업무 응용 가이드

본인 업무에 적용하고 싶다면:

📝 **프롬프트 입력**

```
[본인 키워드]에 대한 학술 자료를 arxiv에서 찾아서 정리해줘.
```

→ 어떤 분야든 키워드만 바꾸면 됩니다. 변호사 = 판례·법률 자료(다른 MCP) / 마케팅 = 시장조사(다른 MCP) / 캠페인 = 트렌드(다른 MCP).

> 💡 **포인트**: MCP는 도메인별로 다양해요. Slack MCP·GitHub MCP·구글 드라이브 MCP 등. 본업 영역의 MCP를 찾아 같은 패턴으로 슬래시 커맨드를 만들면 즉시 자동화 가능.

---

## [체크포인트]

- [ ] **MCP = 클로드가 외부 도구를 안전하게 쓰는 표준** 이라는 점을 이해함
- [ ] arxiv-mcp-server 설치 + `claude mcp add --scope user`로 등록 + `/mcp` 에서 connected 확인
- [ ] 슬래시 커맨드 정의(`.claude/commands/find-evidence.md`)를 보고 어떻게 만드는지 이해함
- [ ] `/find-evidence` 한 번으로 학술 자료 5개 + BibTeX가 정리되는 걸 직접 봄
- [ ] 매뉴얼 본문에 학술 인용이 자연스럽게 통합되는 걸 확인함

---

> 다음은 **7. HTML 변환** — 우리가 만든 매뉴얼을 누구나 볼 수 있는 웹페이지로 만들어볼 거예요.
