# 12. 본업 적용 팁 — CLAUDE.md & 즉시 쓰는 프롬프트

> 워크숍 후 본업에서 클로드 코드를 빠르게 활용할 두 가지 팁이에요.

---

## [응용] CLAUDE.md — 매번 자동으로 적용되는 "헌법"

PRD나 에이전트 정의를 만들었다면, 매번 클로드한테 "이 PRD 봐줘" 라고 할 필요 없어요. **CLAUDE.md** 라는 파일을 프로젝트 루트에 두면 클로드 코드가 폴더에 들어올 때마다 자동으로 읽어요.

> 🏛️ **헌법 비유** — CLAUDE.md는 프로젝트의 "헌법"이에요. 개별 프롬프트보다 우선 적용되고, 명시적으로 수정하지 않는 한 계속 유지돼요.

**CLAUDE.md 없이**: "이 매뉴얼은 격식 톤이야" 같은 약속을 매번 반복 입력
**CLAUDE.md 있으면**: 클로드가 폴더에 들어오는 순간 자동 인식, 바로 작업 시작

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">📌 CLAUDE.md에 적으면 좋은 것 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 프로젝트 전반에 항상 적용될 규칙</span></p>

> - **프로젝트 개요와 목적** — 이 폴더가 무슨 작업의 공간인지
> - **PRD·에이전트 정보** — 어떤 PRD·에이전트가 있고 언제 호출할지
> - **용어 규칙** — 예: "TW 팀 = Technical Writing", "RFM = Revision File Manager"
> - **톤·매너** — 격식·문장 길이·표현 스타일
> - **금지 사항** — 예: "고객사명 직접 명시 X", "가격 정보 포함 X"

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">📌 .md 파일 3종 정리 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 헷갈리지 않게 위치별 구분</span></p>

> | 파일 | 위치 | 역할 |
> |---|---|---|
> | **`CLAUDE.md`** | 프로젝트 **루트** | 프로젝트 전체에 적용되는 헌법 (자동 로드) |
> | **`.claude/agents/*.md`** | `.claude/agents/` | 개별 에이전트 정의 (PRD 위치) |
> | **`.claude/commands/*.md`** | `.claude/commands/` | 슬래시 커맨드 정의 |

> 💡 **참고**: `.claude/agents/` 파일명과 frontmatter `name:` 필드는 분리할 수 있어요. 예: 파일은 `PM.md` (폴더에서 역할로 식별), 호출명은 `JARVIS` (frontmatter `name: JARVIS`). 본 수업에서도 이 패턴을 썼어요.

**만드는 방법**: 클로드한테 한 줄로 부탁하면 끝.

```
지금까지 우리의 약속·규칙·톤을 CLAUDE.md에 정리해서 프로젝트 루트에 저장해줘.
```

> 💡 **포인트**: 본 워크숍 zip 안에도 이미 `CLAUDE.md` 가 들어있어요. 학습자가 의식하지 않아도 클로드가 자동으로 워크숍 폴더 맥락을 인식하고 있었던 거예요.

## [실무] 본업에 바로 쓰는 프롬프트

좋은 프롬프트의 공통 패턴:

> **"[역할]로서 [작업 대상]을 [동사]. [구체적인 산출물]을 [정렬 기준]으로 정리."**

이 패턴만 익히면 본업 어느 영역에도 응용 가능해요. 아래는 직군별 예시지만 **[역할]·[작업 대상]만 바꾸면** 변호사·마케팅·영업·기획 어디든 쓸 수 있어요.

### 매뉴얼·기술 글쓰기 직군 (4가지)

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">① 매뉴얼 톤이 어색할 때 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 1차 리뷰·외주 번역본 점검</span></p>

```
10년차 테크니컬 라이터로서 이 매뉴얼 초안의 톤과 문장 흐름을 평가해.
어색한 부분을 찾고, 개선안을 우선순위와 근거를 붙여서 제안해.
```

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">② 뭘 먼저 손볼지 모를 때 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 마감 임박·우선순위 재정렬</span></p>

```
TW 팀장으로서 매뉴얼 작업 초기 기획안과 비교해 목표·필수 섹션이
반영되었는지 확인해. 지금 당장 손봐야 할 항목 3가지를 임팩트 순으로 뽑아.
```

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">③ 자료가 정리 안 됐을 때 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 인수인계 전·작업장 정리</span></p>

```
시니어 PM으로서 RFM 폴더를 리뷰해. 중복·누락·구조 문제를
진단하고 정리 계획을 잡아.
```

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">④ 배포 전 불안할 때 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 고객사 배포·외부 공유 최종 리뷰</span></p>

```
매뉴얼 리뷰어로서 이 매뉴얼을 최종 점검해. 엣지 케이스, 누락된
안전 정보, 톤 깨짐을 심각도 순으로 정리해.
```

### 제품·코드 개발 직군 (3가지)

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">⑤ 코드가 지저분해졌을 때 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 성능·중복·접근성 진단 + 리팩토링 계획</span></p>

```
시니어 엔지니어로서 코드베이스를 리뷰해. 성능 병목, 중복, 접근성 이슈를
진단하고 리팩토링 계획을 잡아.
```

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">⑥ 출시 전 불안할 때 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 제품 QA 최종 점검</span></p>

```
QA 리드로서 이 제품을 테스트해. 엣지 케이스, 에러 처리 누락,
UI 깨짐을 심각도 순으로 정리해.
```

<p style="font-size: 1.2em; font-weight: 700; color: var(--vp-c-brand-1); margin: 24px 0 8px;">⑦ 뭘 먼저 고쳐야 할지 모를 때 <span style="color: var(--vp-c-text-2); font-weight: 400; font-size: 0.85em;">— 고객 피드백·이탈률 기반 우선순위</span></p>

```
이 제품의 PM으로서 아래 고객 피드백과 이탈률 데이터를 분석해.
지금 당장 손봐야 할 항목 3가지를 임팩트 순으로 뽑아.
```

> 💡 **포인트**: [역할] 부분만 바꾸면 무한 응용 가능. 변호사 = 판례 리뷰어, 마케팅 = 캠페인 PM, 영업 = 고객 응대 전문가, 기획 = 시니어 PM.

---

## [체크포인트]

- [ ] CLAUDE.md를 프로젝트 루트에 두면 자동 로드되는 "헌법"임을 이해함
- [ ] .md 파일 3종 (CLAUDE.md / agents / commands) 의 위치·역할 차이를 구분함
- [ ] 좋은 프롬프트 패턴 "[역할] + [작업] + [구체적 산출물 + 정렬 기준]" 을 이해함
- [ ] 본인 업무에 적용할 프롬프트 1개를 만들어봄

---

> 부록 끝. 🎉
>
> **본 수업 + 부록 모두 마쳤습니다.** 워크숍에서 만든 두 에이전트(PM 에이전트 JARVIS · 에디터 에이전트 Editor)는 여러분 컴퓨터 안에 살아있어요. 본업으로 돌아가셔서 자유롭게 부려보세요.
>
> 막힌 부분 있으시면 후속 1:1 응용 지원으로 함께 풀어드릴게요.
