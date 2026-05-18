# 5. 프로젝트 #3 : 사내 문체 매뉴얼 자동 생성

> 오늘 만들 두 번째 에이전트, **에디터 에이전트**의 시간이에요. **Introduction 한 페이지** 변환으로 시작합니다.

---

## [도입] 에디터 에이전트가 뭐예요?

### 회사 매뉴얼 = 형식이 정해져 있어요

회사에서 새 제품 매뉴얼을 쓸 때마다 매번 똑같은 형식·톤을 맞춰야 해요.

<SectionTitle icon="📌" title="매번 맞춰야 하는 형식" sub="매뉴얼 한 권에 들어가는 정형 요소" />

> - **Chapter 1 General Information** — 제품 개요는 어떤 톤으로
> - **Preface** — 매뉴얼 사용 안내는 어떤 구조로
> - **Spec 표** — 어떤 항목을 어떤 단위로
> - 페이지 하단 문서 번호, 발행일 형식 등...

**한 사람이 쓰면 일관되지만 여러 명이 쓰면 톤이 흩어져요.** 새 사람이 들어오면 "이전 매뉴얼 보면서 톤 맞춰주세요" 안내가 필요하고요.

### 에디터 에이전트가 있다면

회사 매뉴얼 몇 개를 학습시켜두면:

```
You: 이 raw data 가지고 NX-Hybrid WLI Chapter 1 형식으로 매뉴얼 써줘

에디터 에이전트:
[회사 톤·구조 그대로 매뉴얼 초안 생성]
```

처음부터 백지에서 쓰는 게 아니라, **회사 형식을 알고 있는 작가**가 raw data를 받아서 같은 톤으로 옮겨주는 거예요.

> 💡 **포인트**: 풀 매뉴얼 한 권을 자동 생성하지 않아요. **"이런 방향이 가능하다"** 를 **Introduction 한 페이지** 변환으로 체험하는 게 목표예요.

## [실습] 에디터 에이전트 만들기

### Step 1. 작업 폴더 확인

```
cd ~/Desktop/parksystems-workshop/5_매뉴얼
```
> Windows: `cd C:\Users\USER\Desktop\parksystems-workshop\5_매뉴얼`

폴더 구조:

```
5_매뉴얼/
  ├── 형식/                  ← 회사 매뉴얼 형식 자료 (이미지 4개)
  │     ├── 매뉴얼 형식_Intro.png
  │     ├── 매뉴얼 형식_Preface.png
  │     ├── PPT 형식.png
  │     └── Spec sheet.png
  ├── 실제_매뉴얼/           ← 회사 실제 매뉴얼 PDF (에이전트 학습 자료)
  │     ├── NXT1518-INI-EN.pdf
  │     ├── NXT1518-IN2-KO.pdf
  │     ├── NXT1518-MT2-KO.pdf
  │     └── NXT1518-OP2-KO.pdf
  └── raw_data/               ← 변환할 원본 자료
        └── NX-Interferom.txt
```

### Step 2. 에디터 에이전트 만들기

클로드에게 매뉴얼 형식 자료를 보고 에이전트를 만들어달라고 합니다.

대화창에 입력:

```
5_매뉴얼/형식/ 폴더의 이미지 4개와
5_매뉴얼/실제_매뉴얼/ 폴더의 PDF 4개를 모두 봐줘.
둘 다 우리 회사의 매뉴얼·문서 형식이야.

각각에서 다음을 분석해줘:

[형식 이미지 4개]
- 매뉴얼 형식_Intro.png → 챕터 시작 페이지 구조와 톤
- 매뉴얼 형식_Preface.png → Preface 페이지 구조와 톤
- PPT 형식.png → 제품 Overview PPT 슬라이드 구조
- Spec sheet.png → 사양 표 형식

[실제 매뉴얼 PDF 4개 — NXT1518 시리즈]
- 한국어·영어 매뉴얼 톤 모두 추출
- Installation/Maintenance/Operation 섹션 구성
- 실제 회사가 쓰는 문체·단어 선택

이 둘을 종합해서 .claude/agents/Editor.md 파일에 에디터 에이전트를 만들어줘.

에이전트가 알아야 할 것:
1. 매뉴얼 톤 (격식·문장 길이·표현 스타일)
2. 챕터 시작 페이지 구조 (제목·서브헤더·본문)
3. Preface 구조 (소개 → 챕터 안내 → 모델 안내 → 연락처)
4. Spec 표 양식 (항목·단위·Table 캡션 형식)
5. 페이지 하단 문서 번호·발행일 형식
```

Nimbalyst에서 `.claude/agents/Editor.md` 파일이 생성되는 걸 보세요.

<SectionTitle icon="💬" title="에디터 에이전트는 이렇게 답해요" sub="추출한 회사 형식 9개 섹션 보고" spacious />

```
● 완료했습니다. .claude/agents/Editor.md 생성됐고, 추출용 임시 폴더는 정리했어요.

  Editor 에이전트가 알게 된 것 (9개 섹션 구성):
  1. 톤 — 한국어 격식체 "~합니다", 영문 기술용어 원어 유지(AFM, TSH, Sample Chuck, Recipe…),
     영어는 능동·현재시제·약어 첫 등장 시 풀네임 병기
  2. 챕터 시작 페이지 — 좌측 좁은 사이드 헤더(Introduction) + 우측 본문 컬럼,
     Figure 캡션, 홀수 페이지 시작
  3. Preface 5단 구성 — 제품 소개 → 매뉴얼 목적(준수 표준 명시) → 챕터 안내
     → 모델 면책 정형 문구 → 영업팀·CS 연락 안내
  4. Spec 표 — Table 2.4 Specification of XY Stage 캡션 형식, 단위·범위·각주 규칙
  5. 푸터 형식 — NXT1518-IN2-C0.00-KO April 28, 2026 패턴,
     짝/홀수 페이지 레이아웃, PPT용 별도 푸터
  6. 백 매터 — Park Systems Resources and Services 정형 단락 통째 보존
  7. 매뉴얼별 섹션 구성 — IN/MT/OP 각각의 챕터 배치, MT의 체크리스트 표, OP의 Part I/II 구조
  8. 안전 신호어 5단계 — NOTE < NOTICE < CAUTION < WARNING < DANGER,
     Hazard Symbol/Label 표 번호 규칙
  9. 작업 순서 — 매뉴얼 종류 파악 → 레퍼런스 선택 → 작성 → output 저장 → 7항목 자가 점검

  이제 /agents 또는 다른 에이전트를 호출하는 슬래시 커맨드에서 Editor를 부를 수 있습니다.
```

> 💡 **포인트**: 클로드가 우리 회사 매뉴얼 4개를 한 번 보고 형식·톤을 추출해서, 에디터 에이전트가 두고두고 참고할 수 있게 만들어두었어요. **사람이 신입에게 "이 매뉴얼들 참고해서 톤 익혀주세요" 라고 1주일 걸려 가르치던 일**이 30초에 끝났어요.

생성된 `.claude/agents/Editor.md` 파일을 Nimbalyst에서 한번 열어보세요. 에이전트가 어떻게 우리 회사 톤을 정리했는지 보실 수 있어요.

### Step 3. raw data → Introduction 변환

이제 영문 raw data를 매뉴얼 톤으로 변환해볼게요.

대화창에 입력:

```
Editor 에이전트를 호출해서,
5_매뉴얼/raw_data/NX-Interferom.txt 의 내용을
NX-Interferom 매뉴얼의 Chapter 1 General Information / Introduction
형식으로 변환해줘.

조건:
- 매뉴얼 형식_Intro.png 와 같은 톤·구조
- 본문에서 raw data의 핵심 정보를 빠뜨리지 말 것
- Figure 캡션 자리는 비워두고 (Figure 1.1 NX-Interferom) 정도만
- 결과는 5_매뉴얼/output/Chapter1_Intro.md 로 저장
```

Nimbalyst를 보면 `5_매뉴얼/output/Chapter1_Intro.md` 파일이 새로 생기는 게 보일 거예요.

<SectionTitle icon="💬" title="에디터 에이전트는 이렇게 답해요" sub="회사 스타일로 변환된 결과" />

```markdown
# Chapter 1
## General Information

### Introduction

NX-Interferom is a multi-scale metrology system that integrates
Atomic Force Microscopy (AFM), Atomic Force Profiler (AFP), and
White Light Interferometry (WLI) on a single platform...

(NX-Hybrid WLI 매뉴얼의 Intro와 같은 톤·문장 흐름·기술 강조)

Figure 1.1 NX-Interferom
```

<SectionTitle icon="✅" title="확인 포인트" sub="결과물이 회사 톤과 맞는지" />

> - [ ] 영문 매뉴얼 톤이 형식 PNG와 비슷한가요?
> - [ ] raw data의 핵심 정보(AFM·AFP·WLI 통합, SEMI 표준 등)가 빠지지 않았나요?
> - [ ] 문장 흐름이 자연스럽나요?

**결과 파일 열어보기**: Nimbalyst에서 `5_매뉴얼/output/Chapter1_Intro.md`를 더블클릭하거나, 클로드 코드에 이렇게 물어보세요:

```
방금 만든 5_매뉴얼/output/Chapter1_Intro.md 파일을 열어서 보여줘.
```

## [마무리] 두 에이전트 정리

오늘 만든 두 에이전트를 정리해볼게요.

| 에이전트 | 파일 | 잘 하는 일 |
|---|---|---|
| **PM 에이전트 JARVIS** | `.claude/agents/PM.md` | 회사 폴더 들여다보고 진행 상황 보고 |
| **에디터 에이전트** | `.claude/agents/Editor.md` | 회사 매뉴얼 형식을 학습해서 같은 톤으로 새 매뉴얼 생성 |

두 에이전트 모두 같은 `.claude/agents/` 폴더에 살아요. 한 번 만들어두면 **이 폴더(parksystems-workshop)에서는 언제든 호출 가능**해요.

> 💡 **포인트**: 다음 사람이 이 폴더를 받아도 에이전트들이 그대로 살아있어요. 즉 **에이전트를 한 번 만드는 노력 = 팀 전체가 두고두고 쓰는 자산**이에요.

## [응용] 내 업무에 적용하려면?

매뉴얼만이 아니라 **"정해진 형식으로 반복 생성하는 모든 업무"** 에 같은 패턴을 쓸 수 있어요.

**Step 1.** 본인 업무의 **"형식이 정해진 자료" 2~3개**를 한 폴더에 모아둠 (PDF·PPT·Word·이미지 모두 OK).

**Step 2.** 클로드 코드에서:
```
[폴더]의 자료들을 분석해서, 우리 [업무 종류] 형식 에이전트를 만들어줘.
```

**Step 3.** raw data 주고 변환:
```
[에이전트 이름] 에이전트를 호출해서, [raw data 파일]을
우리 형식으로 변환해줘.
```

**업무별 적용 예시**:

| 업무 | 학습 자료 | raw data → 결과 |
|---|---|---|
| 매뉴얼 작성 | 기존 매뉴얼 3개 | spec 노트 → 신제품 매뉴얼 초안 |
| 주간 보고서 | 지난 보고서 5개 | 이번 주 메모 → 보고서 초안 |
| 고객 응대 이메일 | 잘 쓴 답변 10개 | 신규 문의 → 답변 초안 |
| 기술 기획안 | 통과한 기획안 3개 | 신규 아이디어 → 기획안 초안 |

**팁**: 자료가 많을수록 에이전트가 톤을 더 정확히 학습해요. 처음엔 2~3개로 시작하고, 결과 보면서 자료 추가하시면 됩니다.

---

## [체크포인트]

- [ ] `.claude/agents/Editor.md` 에디터 에이전트가 만들어짐
- [ ] NX-Interferom raw data가 Chapter 1 Introduction 형식으로 변환됨
- [ ] **PM 에이전트**와 **에디터 에이전트** 두 명이 같은 `.claude/agents/` 폴더에 살고 있다는 점을 확인함
- [ ] 내 업무에 적용하는 패턴을 이해함

---

> 다음은 6 — **외부 근거 자동 수집**.
> 매뉴얼 본문에 필요한 학술 근거를 외부 API로 자동 수집하는 패턴을 체험해볼 거예요. 마지막 5분엔 우리가 만든 매뉴얼을 **HTML 웹페이지로 변환**하는 미리보기도 있어요.
