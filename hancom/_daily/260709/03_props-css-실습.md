# React Props + CSS 실습 (2026-07-09 강의장 세션)

> 새 Claude Code 세션에서 이 파일을 열고 "이 파일 보고 이어서 코칭해줘"라고 하면 아래 맥락을 이어받아 진행할 수 있음. `99_Study/classroom-prompt.md`의 코칭 규칙(힌트 위주, 전체 코드 금지, 이해도 체크 → 응용 → 재사용 메모) 그대로 적용. 단, 실습 시간이 짧아 막히면 더 빨리 개입하는 방식으로 진행함.

## 강의장에서 있었던 일

`05_react/my-app/src/components/` 안에 번호별 폴더(18~23)를 만들어가며 Props 관련 개념을 순서대로 실습:

- **19 Greeting** — 기본 Props (`{name}`) 전달, App.jsx에서 같은 컴포넌트 두 번 다른 값으로 호출
- **20 Profile** — 기본값 있는 Props (`job = "개발자"`). `export default Profile` 빠뜨려서 ESLint가 함수 이름에 에러 표시하는 이슈 있었음 → 본인이 원인 찾아 해결
- **21 Card** — 여러 Props(`title, desc, emoji`) + CSS로 카드 모양 꾸미기 실습. 아래 CSS 개념 이슈들 다수 발생
- **22 Avatar** — boolean prop(`online`) + 삼항연산자로 조건부 렌더링(`{online ? <p>⭐</p> : <p>😴</p>}`). 첫 시도에 잘 완성함
- **23 Badge** — `type === 'new' ? 'green' : 'crimson'` 패턴. 시간 부족으로 빠르게 넘어감, App.jsx 연결까지는 직접 처리함

## 이번에 짚은 CSS/JS 개념들

- **`background` vs `background-color`**: `background`는 색·이미지·포지션 등을 한번에 넣는 축약 속성. 색만 넣으면 결과가 같아 보이지만, 이미 지정된 `background-image`가 있는 상태에서 `background: color;`를 다시 쓰면 축약 속성이라 이미지가 초기화되어 사라짐 — 이 시점에 차이가 드러남.
- **`border` 축약 속성 순서**: `두께 스타일 색상`. **스타일(`solid` 등)이 빠지면 기본값이 `none`이라 두께/색을 줘도 안 그려짐.** 21 Card에서 이 실수가 있었고, 22 Avatar에서는 `solid`를 챙겨서 재발 안 함.
- **`display`에 `row`/`column` 값은 없음**: 그건 `flex-direction`의 값. `display: flex` + `flex-direction: row|column`으로 분리해야 함. 21 Card에서 이 실수가 두 번(`display: row`, 그다음 `display: column`) 반복됨 — 같은 개념 착각이 재발한 부분이라 다음에도 헷갈릴 수 있음, 유의.
- **`flex-direction`에 따라 `justify-content`/`align-items` 축이 바뀜**: `row`일 땐 justify=가로/align=세로, `column`일 땐 justify=세로/align=가로. "주축(main axis)/교차축(cross axis)" 개념으로 연결됨.
- **boolean prop은 `online={true}`처럼 중괄호로 넘겨야 함**: 문자열 `"true"`/`"false"` 둘 다 빈 문자열이 아니므로 JS에서 truthy 취급 → 조건부 렌더링이 항상 참 쪽으로 감. Falsy 값 전체 목록: `false, 0, "", null, undefined, NaN` 6개뿐이고 나머지는 다 truthy. 사용자가 이 답을 스스로 정확히 맞힘.

## 재사용 패턴 메모 (본인 확인 필요 — 세션 중 명시적으로 다 못 남김)

- boolean prop → 항상 `{}` 로 넘기기, 문자열로 넘기면 조건식 무의미해짐
- border 축약은 `두께 스타일 색상` 순서, style 빠지면 안 보임
- flex-direction 바꾸면 justify-content/align-items 축 의미가 바뀜

## 미해결 / 다음 세션에서 이어갈 것

- 23 Badge를 App.jsx에 연결하는 건 사용자가 직접 처리함(주석으로 이전 컴포넌트들 정리, `<Badge text="안녕" type='false'>` 로 테스트)
- 마지막에 "정리 좀 해달라"는 요청이 있었는데, **어떤 부분을 정리하고 싶은지 구체적으로 확인 못 하고 세션 저장함** (App.jsx 주석 스타일? 이전 컴포넌트 주석 삭제? 다른 부분?). 다음 세션에서 이어서 확인 필요.

## 다음 실습내용 관련 열어둘 이야기

Props 기본 → 기본값 → 여러 개 → boolean + 조건부 렌더링(삼항연산자) → 문자열 비교 기반 조건(Badge)까지 순서대로 옴. 다음은 배열을 `.map()`으로 돌려서 여러 컴포넌트를 리스트로 렌더링하는 쪽으로 이어질 가능성 높음 (Avatar/Badge를 여러 개 하드코딩해서 부르는 대신, 데이터 배열 하나로 관리하는 패턴).
