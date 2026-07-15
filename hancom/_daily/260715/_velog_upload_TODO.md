# Velog 업로드 이어서 하기 (집에서)

## 현재 상태
- blog_03, blog_04, blog_05 **마크다운 작성 완료** (이미지 자리 포함)
- blog_05용 계산기 이미지 3장 캡처 완료 (`images/blog_05_calc-0*.png`)
- **Velog 초안은 아직 안 올라감** (이미지 업로드 방식 파악 중 중단)

## 로그인
- velog 세션 만료 → `access_token` 쿠키를 프로필에 주입해서 로그인함 (계정 `developjkj`).
- 프로필 경로: `C:\Users\Har24\.claude\velog-profile` (집 PC에선 재로그인 필요할 수 있음)
- 쿠키 주입 방법: 로그인된 브라우저 F12 → Application → Cookies → velog.io → `access_token` 값 복사 → Playwright `addCookies`로 주입.

## 막힌 지점 (이미지 업로드)
- velog 에디터는 **CodeMirror** (`.CodeMirror`), 툴바는 Quill(`button.ql-image`).
- 본문 주입: `document.querySelector('.CodeMirror').CodeMirror.setValue(md)` — **동작 확인됨**.
- 제목: `textarea[placeholder="제목을 입력하세요"]`, 태그: `input[placeholder="태그를 입력하세요"]`, 저장: `button:has-text("임시저장")`.
- **이미지 업로드가 문제**: `ql-image` 클릭/파일드롭 모두 업로드 요청이 안 나가고 `WritePost`(null)만 발생.
  - 다음 시도할 가설: **제목·본문 입력 → 임시저장(글 id 생성) → 그 다음 이미지 업로드** 순서.
  - (테스트 스크립트가 집 PC엔 없음. scratchpad에 있던 거라 사라짐 → 다시 작성 필요.)

## 남은 작업
1. blog_05: 이미지 3장 → velcdn URL로 업로드·교체 후 임시저장
2. blog_03, blog_04: 텍스트만이라 바로 임시저장 가능 (이미지 자리표시는 직접 캡처해서 채우기)
3. 태그: blog_03 `Vercel/배포/deploy/프론트엔드`, blog_04 `Vercel/GitHub/배포자동화/프론트엔드`, blog_05 `ClaudeCode/AI/디자인/프론트엔드`
4. 시리즈: 발행 시 "웹 개발 12일차"로 묶기 (발행은 사용자가 직접)
5. draft id 기록해두기
