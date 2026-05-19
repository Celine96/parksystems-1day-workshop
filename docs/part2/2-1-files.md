# 3. 프로젝트 #1 : 파일 정리

> 첫 번째 프로젝트예요. 흩어진 파일을 클로드 코드에게 정리시켜보면서 "AI에게 일을 시킨다"는 첫 감각을 잡아볼게요.

---

## [도입] 클로드 코드 첫 실습 — 자연어 기반 파일 시스템 작업

여기까지 클로드 코드 설치를 끝냈어요. 이제부터 본격적으로 **AI에게 일을 시켜볼 시간**이에요.

이 시간 동안 우리는 **흩어진 파일들을 폴더에 정리하는 일**을 클로드 코드에게 맡겨볼 거예요. 평소에 손으로 하면 한참 걸릴 일이 명령어 한 줄로 끝나는 걸 직접 보실 수 있어요.

## [준비] 실습 시작 전 — Nimbalyst 열어두기

클로드 코드는 검은 터미널 창에서 돌아가요. 거기서만 보면 "AI가 진짜 뭘 하는 건가?" 느낌이 들 수 있어요. 그래서 우리는 **클로드 코드 전용 시각화 도구**를 옆에 열어둘 거예요.

**🪟 Nimbalyst** (https://nimbalyst.com/) — 클로드 코드·코덱스 같은 AI 에이전트가 파일을 어떻게 바꿨는지 실시간으로 보여주는 무료 오픈소스 데스크톱 앱이에요.

- 가입·로그인 **불필요**
- 무료
- Windows/macOS/Linux 모두 지원
- 파일 변화를 diff 형태로 실시간 추적 (어떤 파일이 새로 생겼고, 무엇이 바뀌었는지)

**Step 1.** 워크숍 전 안내메일에서 다운로드 링크로 받으신 Nimbalyst를 실행해주세요.
> 다운로드 안 하신 분은 지금 https://nimbalyst.com/ 에서 본인 OS 버전을 받아주세요.

**Step 2.** Nimbalyst를 열고, **`parksystems-workshop` 폴더를 열어주세요**. (`File → Open Folder`)

**Step 3.** 화면 한쪽에 Nimbalyst, 다른 쪽에 터미널을 나란히 놓아주세요.

> 💡 **유레카 모먼트**: 터미널에서 클로드에게 명령하면, Nimbalyst에서 폴더가 살아 움직이듯 변해요. **파일이 새로 만들어지고·옮겨지고·삭제되는 모든 과정을 실시간으로** 보실 수 있어요. 이게 "AI가 내 컴퓨터에서 일하고 있다"는 첫 번째 시각적 증거예요.

**💡 Nimbalyst가 설치 안 되거나 안 열리면?** Fallback으로 Windows 파일 탐색기·Mac Finder·VS Code 같은 평소 쓰시는 폴더 보기 도구를 열어두셔도 OK. 다만 Nimbalyst만큼 변화가 명확히 보이지는 않아요.

## [실습] 더미 폴더 둘러보기

압축 해제한 `parksystems-workshop` 폴더 안에 `3_파일정리/raw_files/` 폴더가 있어요. 안을 한번 열어보세요.

> 📁 **`3_파일정리/raw_files/` 가 뭐예요?**
> 학습 실습을 위해 **임의로 만든 더미 폴더**예요. 정리 안 된 파일들이 흩어진 상황을 시뮬레이션하려고 미리 셋업해둔 자료라, 실제 회사 자료는 아니에요.

대략 이런 파일들이 무질서하게 흩어져 있을 거예요:

```
raw_files/
  ├── (S) NX-Interferom_v1.stp
  ├── (S) NX-Interferom_review.pdf
  ├── (B) Manual_update_raw.stp
  ├── (B) Manual_update_working.pdf
  ├── final_NX_S.pdf
  ├── final_Manual_B.pdf
  └── ... (10개 정도)
```

**이게 평소 작업하는 회사 폴더의 흔한 모습이에요.**

파일이 작업자(S, B)별로도 섞여 있고, 단계(raw data/working/feedback)별로도 섞여 있어요.

<SectionTitle icon="📊" title="매뉴얼 작업 5단계" sub="회사 진행 단계" />

> - **1단계** : 자료 취합, 교육/장비 확인, 일정/Scope 설정
> - **2단계** : 1st Draft 작업, 추가 필요 자료/협력 파악
> - **3단계** : Draft 보완 및 Review/Feedback/Revision Loop
> - **4단계** : Final Review (종료 또는 일정/Scope 조정)
> - **5단계** : Next Revision Plan & Data Backup & Release

<SectionTitle icon="📌" title="raw_files/ 파일 이름 패턴" sub="파일명 안에 단계가 어떻게 표시되는지" />

> **👤 누구 파일인지 (파일명)**
> - **`(S)` 또는 `(B)`** — 작업자 S 또는 B
>   예: `(S) NX-Interferom_v1.stp`
>
> **🔄 어느 단계인지 (파일명)**
> - **`raw` / `.stp`** — 1단계 원본 자료
>   예: `(B) Manual_update_raw.stp`
> - **`working` / `draft`** — 2~4단계 Draft pdf (1st Draft → Review·Feedback 보완 → Final Review 직전)
>   예: `(B) Manual_update_working.pdf`, `(S) NX-Interferom_draft_v2.pdf`
> - **`feedback` / `review`** — 3단계 리뷰 받은 자료
>   예: `(S) NX-Interferom_review.pdf`
> - **`final`** — 5단계 배포 완료 매뉴얼
>   예: `final_Manual_B.pdf`

손으로 정리하면? 2명 × 4단계 = 8개 폴더 만들고, 파일을 하나씩 옮겨야 해요. 오래 걸리는 일이죠.

## [실습] "정리해줘" 한 줄로 끝내기

이제 터미널 창으로 가서 클로드 코드를 실행하세요.

> ⚠️ **`parksystems-workshop` 폴더 찾아 들어가기** (가장 중요!)
>
> zip 압축 해제 도구·OS마다 결과가 달라요. **공통점: 어딘가에 `parksystems-workshop\` 폴더가 있어요.**
>
> 1. 파일 탐색기(Windows) 또는 Finder(Mac)에서 압축 푼 위치를 열어요
> 2. 안으로 한두 단계 들어가면 **`parksystems-workshop\` 폴더**가 보여요 (그 안에 `3_파일정리`, `4_PM에이전트`, `5_매뉴얼`, `.claude` 등이 있어야 정답)
> 3. **그 폴더에서 `claude` 를 실행**해야 워크북의 모든 파일 경로가 맞아요
>
> 💡 가장 쉬운 방법: 파일 탐색기에서 `parksystems-workshop\` 폴더 우클릭 → "터미널에서 열기" (Windows 11) / "새 터미널" (Mac).
>
> 터미널에서 직접 `cd` 명령 쓰는 분은 본인 경로에 맞춰 (Desktop에 풀었으면 예시 그대로 OK):

```
cd ~/Desktop/parksystems-workshop      # Mac/Linux
claude
```
> Windows: `cd "C:\Users\USER\Desktop\parksystems-workshop"`
> (Windows 자동 풀기는 같은 이름 폴더 한 단계 더 만들 수 있어요. 예: `cd ~/Desktop/parksystems-workshop/parksystems-workshop`)

클로드 코드 대화창이 열리면, 옆 **Nimbalyst** 창(또는 fallback으로 파일 탐색기/Finder)을 잘 보면서 아래 명령을 그대로 복사해서 붙여넣어 주세요.

<SectionTitle icon="📌" title="명령에 쓸 용어 3가지" sub="회사 매뉴얼 작업 폴더 구조" />

> - **RFM** — 작업자별 폴더 이름 (`RFM(S)`, `RFM(B)` 식)
> - **단계** — 매뉴얼 작업 흐름의 세 단계
>   - `raw_data` : 원본 자료 (1단계, 작업 시작 자료)
>   - `working` : 작성 중인 초안 (2~4단계)
>   - `feedback` : 리뷰 받은 자료 (3단계)
> - **LOM** — 작업 완료된 매뉴얼 모아두는 별도 폴더 (5단계, 배포 완료)

📝 **프롬프트 입력**

```
3_파일정리/raw_files/ 안의 파일들을
작업자(S, B) 2명과 단계 기준으로 4_PM에이전트/RFM/ 폴더 안에 정리해줘.

폴더 구조:
- 4_PM에이전트/RFM/RFM(작업자)/단계/ 의 위계 구조
- 단계 폴더 3개: raw_data / working / feedback
- final 붙은 파일은 별도 4_PM에이전트/RFM/LOM/ 폴더 (5단계 배포 완료)

분류 규칙:
- 파일명 앞 (S) (B) 로 작업자 구분
- 단계 분류 (매뉴얼 작업 5단계 기준):
  - 1단계 원본 자료 → raw_data : 파일명에 'raw'·'input', 또는 .stp 확장자
  - 2~4단계 Draft pdf → working : 파일명에 'working'·'draft', 또는 _v1/_v2/_v3 같은 버전 표시가 붙은 .pdf
  - 3단계 리뷰 받은 자료 → feedback : 파일명에 'feedback'·'review'
  - 5단계 배포 완료 → RFM/LOM/ : 파일명에 'final'
- 위 키워드에 안 맞는 파일은 파일명·확장자 패턴으로 가장 가까운 단계 추론 (확장자만으로도 판단 가능)

출력 순서 (이 형식으로 답해줘):
1. "● 확인 끝. 분류 계획:" — 작업자별로 그룹 묶어 폴더/파일 bullet 나열
2. 파일 이동 실행
3. "● 정리 완료. N개 파일 모두 이동했고 raw_files/는 비었음." + ASCII box-drawing 표(┌─┐ ├─┤ └─┘)로 폴더/파일 정리 (S → B → LOM 순)
4. "판단 메모:" — 비표준 파일별 분류 근거 bullet
```

<br/>

<SectionTitle icon="🤖" title="이 명령이 시키는 일" sub="클로드 코드가 알아서 처리" />

> 1. `raw_files/` 폴더를 들여다봄
> 2. 파일명 앞 `(S)` `(B)`로 누구 파일인지 구분
> 3. 파일명에 `raw` · `working` · `feedback` 단어로 어느 단계인지 구분
> 4. **3층 폴더 구조**를 만들고 파일을 옮김 (다음 챕터에서 쓸 `4_PM에이전트/` 안에):
>    ```
>    4_PM에이전트/
>      └── RFM/                  ← ① 전체 작업장
>            └── RFM(S)/         ← ② 작업자별 폴더 (S, B)
>                  └── working/  ← ③ 단계별 폴더 (raw_data·working·feedback)
>    ```
> 5. `final` 붙은 파일은 위 구조 대신 **별도 `4_PM에이전트/RFM/LOM/` 폴더**로 따로 모음
>
> 💡 정리 결과를 `4_PM에이전트/` 안에 만드는 이유는, 다음 챕터(4. PM 에이전트)에서 같은 RFM 폴더를 그대로 분석에 사용하기 때문이에요.

**Enter 누르기 전에 — Nimbalyst에서 `4_PM에이전트/` 폴더 위치를 한 번 펼쳐두세요.** 정리 결과(RFM, LOM)가 그 안에 만들어지니, 미리 보고 있어야 변화를 놓치지 않아요.

**Enter 누르고 옆 창문을 보세요.** 폴더가 하나씩 만들어지고, 파일이 옮겨지는 모습이 눈앞에서 펼쳐져요.

> ⏱️ 30초~1분이면 끝나요. 손으로 했으면 30분이 걸렸을 일이에요.

<SectionTitle icon="💬" title="클로드 코드는 이렇게 답해요" sub="실행 전 계획 → 실행 후 보고" spacious />

> **① 먼저 분류 계획부터 보여줘요** — 실행 전 "내가 이렇게 할 거예요" 확인용

```
● 확인 끝. 분류 계획:

  4_PM에이전트/RFM/RFM(S)/
  - raw_data/ → (S) NX-Interferom_input.stp, (S) NX-Interferom_v1.stp
  - working/ → (S) NX-Interferom_draft_v2.pdf
  - feedback/ → (S) NX-Interferom_review.pdf

  4_PM에이전트/RFM/RFM(B)/
  - raw_data/ → (B) Manual_update_input.stp, (B) Manual_update_raw.stp
  - working/ → (B) Manual_update_working.pdf, (B) Manual_update_v3.pdf
  - feedback/ → (없음)

  4_PM에이전트/RFM/LOM/ → final_Manual_B.pdf, final_NX_S.pdf
```

> **② 실행하고 결과를 표로 보고해요** — 실행 후 "이렇게 끝났어요"

```
● 정리 완료. 10개 파일 모두 이동했고 raw_files/는 비었음.

  ┌──────────────────────┬─────────────────────────────────────────────────────────┐
  │         폴더         │                          파일                           │
  ├──────────────────────┼─────────────────────────────────────────────────────────┤
  │ RFM/RFM(S)/raw_data/ │ (S) NX-Interferom_input.stp, (S) NX-Interferom_v1.stp   │
  ├──────────────────────┼─────────────────────────────────────────────────────────┤
  │ RFM/RFM(S)/working/  │ (S) NX-Interferom_draft_v2.pdf                          │
  ├──────────────────────┼─────────────────────────────────────────────────────────┤
  │ RFM/RFM(S)/feedback/ │ (S) NX-Interferom_review.pdf                            │
  ├──────────────────────┼─────────────────────────────────────────────────────────┤
  │ RFM/RFM(B)/raw_data/ │ (B) Manual_update_input.stp, (B) Manual_update_raw.stp  │
  ├──────────────────────┼─────────────────────────────────────────────────────────┤
  │ RFM/RFM(B)/working/  │ (B) Manual_update_working.pdf, (B) Manual_update_v3.pdf │
  ├──────────────────────┼─────────────────────────────────────────────────────────┤
  │ RFM/RFM(B)/feedback/ │ (비어 있음)                                             │
  ├──────────────────────┼─────────────────────────────────────────────────────────┤
  │ RFM/LOM/             │ final_Manual_B.pdf, final_NX_S.pdf                      │
  └──────────────────────┴─────────────────────────────────────────────────────────┘

  판단 메모:
  - (S) NX-Interferom_v1.stp — 파일명에 v1 버전 표시가 있지만 .stp 확장자 우선 적용해서 raw_data로 보냄. 버전 표시 규칙은 ".pdf일 때 working"으로 한정되어 있고, .stp는 무조건 원본 CAD/입력 자료라고 판단.
  - (B) Manual_update_v3.pdf — 'working'·'draft' 키워드는 없지만 _v3 버전 표시 + .pdf 조합이라 규칙대로 working으로 분류.
  - (B) Manual_update_raw.stp — 'raw' 키워드와 .stp 확장자 모두 매치, raw_data로 분류.
  - RFM(B)/feedback은 해당 파일이 없어 빈 폴더로 생성해 둠 (작업자별 단계 구조 일관성 유지).
```

> 💡 **포인트**: 클로드는 그냥 명령 따르는 게 아니라 (1) **계획을 먼저** 보여주고 (2) **판단한 근거까지 메모**로 남겨요. 결과가 의도와 다르면 바로 잡을 수 있고, ".stp 확장자라 raw로 분류" 같은 추론 과정이 투명하게 드러나요.
>
> 💬 학습자 화면의 실제 출력은 더미 파일 상태에 따라 살짝 달라질 수 있어요. 큰 흐름(계획 → 실행 → 보고 + 메모)만 같으면 정상이에요.

## [실습] 결과 확인

정리가 끝나면 클로드가 "완료했어요!" 같은 메시지를 줄 거예요. 옆 Nimbalyst 창에서 결과를 확인해보세요.

기대 결과:

```
parksystems-workshop/
  ├── 3_파일정리/
  │     └── raw_files/        (원본은 그대로 두거나 비워짐)
  └── 4_PM에이전트/
        └── RFM/
              ├── RFM(S)/
              │     ├── raw_data/
              │     ├── working/
              │     └── feedback/
              ├── RFM(B)/
              │     ├── raw_data/
              │     ├── working/
              │     └── feedback/
              └── LOM/        (final 파일들 모임, 5단계 배포 완료)
```

**결과 체크리스트:**

- [ ] 2명 × 3단계 = 6개 하위 폴더가 자동으로 만들어졌나요?
- [ ] 파일이 올바른 폴더로 이동했나요?
- [ ] `LOM/` 폴더에 final 파일들이 모였나요?

> 💬 "정리 결과를 표로 요약해줘" 라고 추가로 물어보세요. 어떤 작업자 폴더에 몇 개 파일이 있는지 보고서까지 자동으로 만들어줘요.

## [개념] 방금 무슨 일이 있었나요

여러분이 한 일은 **자연어 한 단락**을 입력한 것뿐이에요. 코드 한 줄도 안 썼고, 마우스로 드래그도 안 했어요.

클로드 코드가 알아서 한 일:

1. `raw_files/` 폴더를 들여다봄 → 파일 목록 파악
2. 파일명 패턴을 읽고 작업자·단계를 추론
3. 7개 폴더를 만듦 (RFM 2명 × 3단계 + LOM)
4. 파일을 하나씩 올바른 위치로 이동
5. final 파일은 따로 LOM/ 으로 분리

**이게 클로드 코드의 첫인상이에요**: 목적과 규칙만 명확히 주면, 단계는 알아서 쪼개서 실행해줍니다.

---

## [체크포인트]

- [ ] 파일 탐색기/Finder를 터미널 옆에 두고 파일 변화를 시각적으로 확인함
- [ ] 클로드 코드에게 자연어 한 단락으로 폴더 정리를 시켜봄
- [ ] 7개 폴더 + 파일 분류가 자동으로 끝나는 걸 직접 봄
- [ ] "코드 없이도 AI가 내 컴퓨터에서 일한다"는 감각을 얻음

---

> 다음은 4 — **PM 에이전트 만들기**.
> 방금과 같은 구조의 미리 준비된 RFM 폴더를 PM 에이전트가 들여다보고, "지금 어느 작업자가 어느 단계에 있는지" 자동으로 보고하게 만들어볼 거예요.
