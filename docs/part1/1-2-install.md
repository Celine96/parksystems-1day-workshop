# 2. 설치 및 첫 실행

---

## [영상 가이드]

설치 과정이 막막하다면 아래 영상을 보면서 따라하셔도 좋아요. 글로 된 안내는 영상 아래 이어집니다.

**📺 코딩 몰라도 됩니다 — 클로드 코드 설치부터 기본 세팅까지 (EP.01)**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 20px 0;">
  <iframe src="https://www.youtube.com/embed/ZY9RNQghsf0" title="코딩 몰라도 됩니다 — 클로드 코드 설치부터 기본 세팅까지" loading="lazy" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>
</div>

**📺 Windows에 Claude Code 설치, 이렇게 쉬울 줄이야…** (Windows 사용자 추천)

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 20px 0;">
  <iframe src="https://www.youtube.com/embed/7Spk6medZY8" title="Windows에 Claude Code 설치, 이렇게 쉬울 줄이야…" loading="lazy" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>
</div>

## 클로드 코드 설치하기

**Step 1. 터미널을 열어주세요.**

터미널 = 컴퓨터에 직접 명령어를 입력하는 까만 창이에요. 무서운 거 아니에요.

- **Windows**: 시작 메뉴에서 "Windows PowerShell"을 검색하여 실행해 주세요. (명령 프롬프트(cmd)가 아닌 PowerShell을 선택해 주세요.)
- **Mac**: Spotlight(Cmd+Space)에서 "터미널"을 검색하여 실행해 주세요.

**Step 2. 아래 설치 명령어를 복사해서 터미널에 붙여넣고 Enter를 눌러주세요.**

본인 컴퓨터에 맞는 명령어를 골라주세요.

Windows PowerShell:
```
irm https://claude.ai/install.ps1 | iex
```
> 이 명령어는 Anthropic 공식 설치 스크립트를 다운로드해서 자동으로 설치해줘요.

Mac/Linux:
```
curl -fsSL https://claude.ai/install.sh | bash
```
> 위와 같은 일을 Mac/Linux 환경에서 해주는 명령어예요.

Mac (Homebrew 사용자):
```
brew install --cask claude-code
```
> Homebrew라는 패키지 관리자를 이미 쓰는 분만 선택. 모르시면 위 `curl` 명령어를 쓰세요.

**Step 3. 설치가 완료되면 터미널을 닫았다가 다시 열어주세요.** (이 단계가 중요해요!)

## 첫 실행 & 로그인

**Step 1. `claude --version`을 입력해서 설치가 정상적으로 되었는지 확인해볼게요.**

```
claude --version
```

> 버전 번호(예: `1.0.x`)가 표시되면 설치 완료예요. "command not found"가 나오면 터미널을 다시 닫고 열어주세요.
>
> **Mac에서 계속 `command not found: claude`가 나온다면** PATH가 설정되지 않은 상태예요 (설치된 파일 위치를 터미널이 모르는 상태). 아래를 복사해서 터미널에 붙여넣어 주세요:
>
> ```
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
> source ~/.zshrc
> ```
>
> 그 다음 `claude --version`을 다시 시도해 주세요.

**Step 2. 사전에 공유받은 zip 파일을 바탕화면에 압축 해제해 주세요.**

압축을 풀면 어딘가에 **`parksystems-workshop`** 폴더가 생겨요 (압축 도구·OS마다 한두 단계 깊이 차이 있을 수 있음). 안에 `3_파일정리`, `4_PM에이전트`, `5_매뉴얼`, `.claude` 등이 보이면 정답.

**Step 3. 터미널에서 해당 폴더로 이동해 주세요.**

`cd`는 "change directory(폴더 이동)"의 줄임말이에요.

> 💡 **가장 쉬운 방법**: 파일 탐색기/Finder에서 `parksystems-workshop\` 폴더 우클릭 → "터미널에서 열기" (Windows 11) / "새 터미널" (Mac). 그러면 `cd` 명령 안 써도 돼요.

Windows PowerShell (Desktop에 풀린 경우 예시):
```
cd C:\Users\USER\Desktop\parksystems-workshop
```
> "USER" 부분은 본인의 Windows 사용자명으로 바꿔주세요. 사용자명을 모르겠다면 파일 탐색기에서 `C:\Users` 폴더를 열어 본인 폴더명을 확인할 수 있어요.
>
> 다른 위치에 풀었거나 한 단계 더 들어갔으면 본인 경로로 수정.

Mac/Linux 터미널:
```
cd ~/Desktop/parksystems-workshop
```

**Step 4. 클로드 코드를 실행해 주세요.**

```
claude
```

**Step 5. 로그인해 주세요.**

- "Claude account with subscription"을 선택해 주세요. (Anthropic Console이 아닌, 구독 계정 옵션을 선택하세요.)
- 브라우저가 열리면 Claude 계정으로 로그인해 주세요.
- 로그인 완료 후 터미널로 돌아와 주세요.
- 텍스트 스타일을 선택하라는 안내가 나오면, 원하는 스타일을 선택해 주세요.

**Step 6. 아래와 비슷한 화면이 나오면 성공이에요:**

```
╭──────────────────────────────────────╮
│ Welcome to Claude Code!              │
│                                      │
│ /help for available commands         │
╰──────────────────────────────────────╯

You:
```

이제 여러분 컴퓨터 안에 클로드 코드가 출근했어요. 👋

## 시각화 도구 Nimbalyst 다운로드 (3 파일 정리 준비)

3 파일 정리부터 클로드 코드가 파일을 바꾸는 모습을 **눈으로 보면서** 진행할 거예요. 그래서 **Nimbalyst**라는 무료 도구를 미리 받아둘게요.

**Step 1.** 브라우저에서 https://nimbalyst.com/ 접속.

**Step 2.** 본인 OS(Windows / macOS / Linux)에 맞는 버전 다운로드 → 설치.

> 가입·로그인 불필요. 완전 무료예요.

**Step 3.** 한 번 열어서 정상 실행되는지 확인. (3 파일 정리에 다시 열어서 본격 사용해요.)

> 💡 **시간 절약 팁**: 사전에 안내메일에서 받으신 Nimbalyst 다운로드 링크로 미리 설치해두셨다면 이 단계는 건너뛰셔도 돼요.

---

## [체크포인트]

- [ ] `claude --version`으로 설치 확인 완료
- [ ] "Claude account with subscription"으로 로그인 완료
- [ ] `parksystems-workshop` 폴더로 이동 완료
- [ ] `claude` 명령어로 대화창이 정상 표시됨
- [ ] Nimbalyst 다운로드·실행 확인 완료

---

> 다음은 3 파일 정리 — **파일 정리**로 첫 손맛 보러 갈게요!
