# 2026-07-03 CSS 실습 블로그 글 모음

오늘(2026-07-03) 진행한 CSS 실습(폴더 14~18) + 추가 개념 정리를 블로그 글로 정리한 폴더입니다.
각 글은 블로그에 그대로 옮겨 붙일 수 있게 마크다운으로 작성되었고,
이미지가 필요한 자리는 `[이미지 : 상황설명]` 형식으로 표기해 두었습니다.

## 글 목록 (총 6편)

| # | 제목 | 실습 폴더 | 파일 |
|---|---|---|---|
| 1 | 반응형 @media: 화면 크기에 따라 카드 배치 바꾸기 (+ flex:1 vs display:flex) | `03_css/14` | [01_media-query.md](01_media-query.md) |
| 2 | CSS 변수 (:root와 var())로 색·간격 한 번에 관리하기 | `03_css/15` | [02_css-variables.md](02_css-variables.md) |
| 3 | box-shadow로 그림자 효과 만들기 (+ hover로 떠오르는 카드) | `03_css/16` | [03_box-shadow.md](03_box-shadow.md) |
| 4 | 가상요소 ::before / ::after로 HTML 없이 장식 붙이기 | `03_css/17` | [04_pseudo-elements.md](04_pseudo-elements.md) |
| 5 | display 속성 총정리: block·inline·inline-block·none·flex·grid | (개념 정리) | [05_display-property.md](05_display-property.md) |
| 6 | CSS 리셋: * 선택자로 기본 여백 0부터 시작하기 | `03_css/18` | [06_css-reset.md](06_css-reset.md) |

## 작성 기준 (질문 답변 기록)

| 질문 | 선택한 답변 |
|---|---|
| 글 범위 | **6편** — 폴더 14~18 (5편) + `display` 속성 총정리 (1편). *`flex:1` vs `display:flex`는 별도 글이 아니라 @media 글 안 섹션으로 포함* |
| 이미지 형식 | **`[이미지 : 설명]` 임시 표기** (마크다운 링크 변환·삽입은 직접) |

## txt 메모 반영 내역

`2026.07.03.txt`에서 "정리/작성이 필요하다"고 남긴 내용을 이렇게 반영했습니다.

- **[14] `flex:1` vs `display:flex` 차이** → [01_media-query.md](01_media-query.md)의 "짚고 넘어갈 점" 섹션에 표로 정리.
- **[16] transition/transform 참고** → [03_box-shadow.md](03_box-shadow.md)에서 이전 글 [260702/07_transition-timing.md](../260702/07_transition-timing.md) 링크로 연결.
- **[17] display 속성 별도 글 필요** → [05_display-property.md](05_display-property.md)로 신규 작성 (값별 예시 코드 + 비교 표 + 이미지 표기).

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
예: `[이미지 : 좁은 화면(600px 이하) — 카드가 세로로 쌓인 결과]` → 해당 화면 캡처로 교체.
(참고: 260702 글들처럼 `![설명](경로/파일명.png)` 마크다운 링크로 바꿔 넣어도 됩니다.)
