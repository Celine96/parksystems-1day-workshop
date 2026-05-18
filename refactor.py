# -*- coding: utf-8 -*-
"""P0 + P1 일괄 리팩토링"""
import os, re
from pathlib import Path
from PIL import Image

BASE = Path(r"C:\Users\User\Desktop\06_개인\2. ai native workshop\파크시스템스 기업강의\v1-파크시스템스")

# P0-1: placeholder .md 삭제
target = BASE / "{{LEARNER}}_클로드코드_워크숍_워크북.md"
if target.exists():
    target.unlink()
    print(f"[P0-1] 삭제: {{LEARNER}} placeholder .md")

# P0-2: 프로필 사진 480px JPEG 재인코딩
img_path = BASE / "docs" / "public" / "images" / "ella-profile.jpg"
if img_path.exists():
    before = img_path.stat().st_size
    img = Image.open(img_path)
    # 480px width 기준 비율 유지
    target_w = 480
    ratio = target_w / img.width
    target_h = int(img.height * ratio)
    img_resized = img.resize((target_w, target_h), Image.LANCZOS)
    img_resized = img_resized.convert("RGB")
    img_resized.save(img_path, "JPEG", quality=85, optimize=True)
    after = img_path.stat().st_size
    print(f"[P0-2] 사진 재인코딩: {before/1024:.1f}KB -> {after/1024:.1f}KB ({after*100/before:.1f}%)")

# P0-3: .gitignore 안전망 추가
gi = BASE / ".gitignore"
content = gi.read_text(encoding='utf-8')
extra = """
# 회사 자료 우발 push 차단 (PII 안전망)
*.pptx
*.pdf
!docs/public/**/*.pdf
"""
if "*.pptx" not in content:
    gi.write_text(content + extra, encoding='utf-8')
    print(f"[P0-3] .gitignore 안전망 추가")

# P1-4: YouTube iframe lazy + title
install_md = BASE / "docs" / "part1" / "1-2-install.md"
text = install_md.read_text(encoding='utf-8')
text = text.replace(
    '<iframe src="https://www.youtube.com/embed/ZY9RNQghsf0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>',
    '<iframe src="https://www.youtube.com/embed/ZY9RNQghsf0" title="코딩 몰라도 됩니다 — 클로드 코드 설치부터 기본 세팅까지" loading="lazy" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>'
)
text = text.replace(
    '<iframe src="https://www.youtube.com/embed/7Spk6medZY8" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>',
    '<iframe src="https://www.youtube.com/embed/7Spk6medZY8" title="Windows에 Claude Code 설치, 이렇게 쉬울 줄이야…" loading="lazy" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>'
)
install_md.write_text(text, encoding='utf-8', newline='')
print(f"[P1-4] YouTube iframe lazy + title 추가")

# P1-5: .claude/settings.local.json 정리 — placeholder를 실제 경로로 + 무용 명령 제거
settings_path = BASE / ".claude" / "settings.local.json"
new_settings = """{
  "permissions": {
    "allow": [
      "Bash(npm install *)",
      "Bash(npm run *)",
      "Bash(npx vitepress *)",
      "Bash(gh --version)",
      "Bash(gh auth *)",
      "Bash(gh repo *)",
      "Bash(gh api *)",
      "Bash(gh run *)",
      "Bash(curl -sI \\"https://celine96.github.io/parksystems-1day-workshop/\\")",
      "Bash(curl -s \\"https://celine96.github.io/parksystems-1day-workshop/*\\")",
      "Bash(python build_zip.py)",
      "Bash(python refactor.py)"
    ]
  }
}
"""
settings_path.write_text(new_settings, encoding='utf-8', newline='')
print(f"[P1-5] .claude/settings.local.json 정리 (placeholder 제거)")

print("\n[P1-6, P1-7, P1-8] 별도 Edit으로 처리 필요 (헤딩 위계·HTML table·sidebar 동기화)")
print("\n=== 완료 ===")
