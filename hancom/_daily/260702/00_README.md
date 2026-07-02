# 2026-07-02 CSS 실습 블로그 글 모음

오늘(2026-07-02) 진행한 CSS 실습 11개 주제를 블로그 글로 정리한 폴더입니다.
각 글은 블로그에 그대로 옮겨 붙일 수 있게 마크다운으로 작성되었고,
이미지가 필요한 자리는 `[이미지 : 상황설명]` 형식으로 표기해 두었습니다.

## 글 목록 (총 11편, 수업/폴더 순서)

| # | 제목 | 실습 폴더 | 파일 |
|---|---|---|---|
| 1 | stylelint로 CSS 속성 순서 자동 정렬하기 (설치부터 --fix까지) | `03_css/03` | [01_stylelint.md](01_stylelint.md) |
| 2 | CSS 박스 모델: margin·padding·border의 차이 | `03_css/04` | [02_box-model.md](02_box-model.md) |
| 3 | Flexbox 입문: display:flex로 메뉴 가로 정렬하기 | `03_css/05` | [03_flex.md](03_flex.md) |
| 4 | CSS를 HTML에 넣는 3가지 방법과 우선순위 (외부·내부·인라인) | `03_css/06` | [04_css-3ways.md](04_css-3ways.md) |
| 5 | 가상 클래스로 링크 상태 꾸미기 (:link :visited :hover :active) | `03_css/07` | [05_pseudo-hover.md](05_pseudo-hover.md) |
| 6 | transform 3D로 카드 뒤집기 (perspective·backface-visibility) | `03_css/08` | [06_card-flip-3d.md](06_card-flip-3d.md) |
| 7 | transition과 timing-function: hover 회전·확대 애니메이션 | `03_css/09` | [07_transition-timing.md](07_transition-timing.md) |
| 8 | @keyframes로 둥둥 떠다니는 자동 애니메이션 만들기 | `03_css/10` | [08_keyframes-animation.md](08_keyframes-animation.md) |
| 9 | linear-gradient와 box-shadow로 네온 효과 만들기 | `03_css/11` | [09_neon-gradient.md](09_neon-gradient.md) |
| 10 | position 완전 정복: relative·absolute·fixed·sticky | `03_css/12` | [10_position.md](10_position.md) |
| 11 | CSS Grid로 3열 카드 레이아웃 만들기 | `03_css/13` | [11_grid.md](11_grid.md) |

## 작성 기준 (질문 답변 기록)

블로그 글을 어떻게 쓸지 미리 6가지를 정하고 작성했습니다.

| 질문 | 선택한 답변 |
|---|---|
| 글 묶음 단위 | **폴더당 1편, 총 11편** (수업 순서 그대로) — *추천안* |
| 톤/독자 | **입문자용 학습 로그(TIL)**, 친근한 정리 말투 — *추천안* |
| 코드 포함 범위 | **전체 HTML+CSS + 줄별/속성별 설명** — *추천안* |
| 저장 위치 | **`hancom/_daily/260702/` 아래 01~11 .md** — *추천안* |
| 이미지 종류 | **결과 화면 스크린샷 위주** (움직임은 상태별 복수 표기) — *추천안* |
| 머리말/시리즈 | **없음** — 각 글은 제목 + 본문만 |

## 각 글 공통 구조

1. 제목
2. 한 줄 요약 (이 글에서 배우는 것)
3. `[이미지 : 완성 결과 화면]`
4. HTML 코드 + 설명
5. CSS 코드 + 속성별 설명
6. 짚고 넘어갈 점 (실습 중 관찰/주의점)
7. 오늘의 한 줄 정리

## 이미지 표기 사용법

글 속 `[이미지 : ...]` 위치에 실제 스크린샷을 찍어 넣으면 됩니다.
예: `[이미지 : stylelint 실행 후 정렬 오류가 표시된 터미널]` → 해당 터미널 캡처로 교체.
