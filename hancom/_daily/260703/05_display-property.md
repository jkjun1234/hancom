# display 속성 총정리: block · inline · inline-block · none · flex · grid

> **한 줄 요약**: `display`는 요소가 "어떻게 자리를 차지하고 배치되는지"를 정하는 속성으로, 값에 따라 줄을 통째로 먹기도 하고 글자처럼 옆으로 붙기도 한다.

가상요소 실습에서 `display: inline-block`과 `block`이 나왔는데, 값마다 배치가 왜 달라지는지 헷갈렸다. 그래서 `display`의 주요 값을 예시와 함께 한 번에 정리했다.

## 먼저 큰 그림 — block vs inline

CSS 요소는 기본적으로 **block** 아니면 **inline** 성격을 가진다.

- **block(블록)** : 한 줄을 **통째로** 차지한다. 다음 요소는 아래로 내려간다. `width`·`height`를 줄 수 있다. (예: `<div>`, `<p>`, `<h1>`)
- **inline(인라인)** : 글자처럼 **옆으로** 흐른다. 딱 내용만큼만 차지하고, `width`·`height`를 줘도 무시된다. (예: `<span>`, `<a>`)

[이미지 : block 3개는 세로로 쌓이고, inline 3개는 한 줄에 옆으로 붙은 비교 화면]

## display 값별 정리

### 1) display: block

```css
.box {
    display: block;
    width: 200px;   /* 적용됨 */
    height: 60px;   /* 적용됨 */
}
```

- 한 줄 전체를 차지 → 옆에 다른 요소가 못 온다.
- 크기(`width`/`height`) 지정 가능.

### 2) display: inline

```css
.tag {
    display: inline;
    width: 200px;   /* ❌ 무시됨 */
    padding: 20px;  /* 좌우는 먹지만 위아래 간격은 어색하게 동작 */
}
```

- 글자처럼 옆으로 나열.
- `width`/`height`가 **무시**되고 내용 크기만큼만 차지.

### 3) display: inline-block

```css
.chip {
    display: inline-block;
    width: 80px;    /* 적용됨 */
    height: 30px;   /* 적용됨 */
}
```

- **inline처럼 옆으로 나열되면서** block처럼 **크기·여백을 줄 수 있다.**
- 버튼·칩·밑줄 장식처럼 "옆으로 붙지만 크기는 갖고 싶은" 요소에 딱. (가상요소 글의 `.underline-deco`가 이 경우)

[이미지 : inline-block 요소들이 옆으로 나란히 붙으면서 각자 크기를 가진 화면]

### 4) display: none

```css
.hidden {
    display: none;
}
```

- 화면에서 **완전히 사라진다.** 공간도 차지하지 않는다.
- (참고: `visibility: hidden`은 안 보이지만 **공간은 남는다** — 이 점이 다르다.)

[이미지 : display:none 적용 전(요소 보임)과 후(요소와 공간 모두 사라짐) 비교]

### 5) display: flex

```css
.row {
    display: flex; /* 자식들을 1차원(가로/세로)으로 정렬 */
}
```

- 자식들을 **한 방향**으로 정렬하는 컨테이너가 된다.
- 자세한 내용은 이전 글 참고 → [Flexbox 입문](../260702/03_flex.md), [반응형 @media](01_media-query.md)

### 6) display: grid

```css
.grid {
    display: grid; /* 자식들을 2차원(행+열) 격자로 배치 */
}
```

- 행과 열을 동시에 다루는 **2차원 격자** 컨테이너.
- 자세한 내용은 이전 글 참고 → [CSS Grid로 3열 카드 만들기](../260702/11_grid.md)

## 한눈에 비교

| display 값 | 줄 차지 | 크기(width/height) | 배치 |
|---|---|---|---|
| `block` | 한 줄 통째로 | ✅ 가능 | 세로로 쌓임 |
| `inline` | 내용만큼만 | ❌ 무시 | 옆으로 흐름 |
| `inline-block` | 내용만큼만 | ✅ 가능 | 옆으로 흐름 + 크기 O |
| `none` | 없음(사라짐) | — | 화면에서 제거 |
| `flex` | (컨테이너) | ✅ | 자식 1차원 정렬 |
| `grid` | (컨테이너) | ✅ | 자식 2차원 격자 |

## 짚고 넘어갈 점

- `<div>`·`<p>`는 기본이 `block`, `<span>`·`<a>`는 기본이 `inline`이다. `display`로 이 성격을 바꿀 수 있다.
- "옆으로 붙이고 싶은데 크기도 주고 싶다" → **`inline-block`** 을 떠올리자.
- 잠깐 숨기고 싶을 때 `display: none`(공간까지 제거)과 `visibility: hidden`(공간 유지)의 차이를 기억하자.

## 오늘의 한 줄 정리

`display`는 요소의 배치 성격을 정하는 스위치다 — **block(줄 독차지), inline(글자처럼), inline-block(옆으로+크기O), none(제거), flex/grid(자식 정렬)** 로 구분해 두면 헷갈리지 않는다.
