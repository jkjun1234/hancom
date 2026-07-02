# CSS Grid로 3열 카드 레이아웃 만들기

> **한 줄 요약**: 부모에 `display:grid`와 `grid-template-columns`를 주면, 카드들이 원하는 열 수로 자동 배치되는 2차원 격자가 만들어진다.

flex가 한 방향(가로 또는 세로) 정렬이라면, **Grid**는 행과 열을 동시에 다루는 **2차원** 레이아웃이다. 카드 6개를 3열로 가지런히 배치해 봤다.

## HTML

```html
<body>
    <h1>Grid 격자</h1>
    <div class="grid">
        <div class="card">카드 1</div>
        <div class="card">카드 2</div>
        <div class="card">카드 3</div>
        <div class="card">카드 4</div>
        <div class="card">카드 5</div>
        <div class="card">카드 6</div>
    </div>
</body>
```

## CSS

```css
.grid {
    display: grid;  /* 2차원 격자 켜기 */
    grid-template-columns: repeat(3, 1fr); /* 3칸 동일한 너비 (1fr 1fr 1fr 과 같음) */
    gap: 12px;
}

.card {
    background: hotpink;  /* 배경 분홍 */
    color: white;         /* 글자 흰색 */
    text-align: center;   /* 가운데 정렬 */
    padding: 22px 0;      /* 위·아래 안쪽 여백 */
    border-radius: 8px;   /* 모서리 둥글게 */
}
```

핵심 속성:

- **display: grid** → 부모를 2차원 격자로 만든다. (자식 = 격자 칸에 채워짐)
- **grid-template-columns: repeat(3, 1fr)** → **열을 3개**, 각 열 너비는 `1fr`(남는 공간을 균등 분할). `1fr 1fr 1fr`을 짧게 쓴 것.
- **gap: 12px** → 칸 사이 간격 (가로·세로 모두).

카드 6개를 3열 격자에 넣으면 자동으로 **3열 × 2행**으로 배치된다.

![분홍 카드 6개가 3열 2행으로 가지런히 배치된 결과 화면](C:/Users/jun/Desktop/블로그 업로드용 이미지/11_grid-01.png)

## fr 단위와 repeat()

- **`1fr`** → "fraction(비율)". 남는 공간을 1의 비율로 나눠 갖는다. `repeat(3, 1fr)`이면 셋이 똑같이 1:1:1.
- **`repeat(3, 1fr)`** → 같은 값을 반복할 때 쓰는 축약. `repeat(4, 1fr)`로 바꾸면 4열이 된다.
- 열 수만 바꾸면 카드들이 알아서 재배치되므로 반응형에도 활용하기 좋다.

## flex와 Grid, 언제 뭘 쓸까?

| | flex | grid |
|---|---|---|
| 방향 | 한 방향(가로 **또는** 세로) | 두 방향(행 **과** 열) |
| 잘 맞는 곳 | 메뉴, 버튼 줄 같은 1차원 나열 | 카드 목록, 갤러리 같은 2차원 배치 |

## 짚고 넘어갈 점

- `grid`도 flex처럼 **부모(.grid)에 주는** 속성이다. 자식(.card)은 칸에 채워지기만 한다.
- 열 개수는 `grid-template-columns`의 값 개수(또는 `repeat`의 숫자)로 정해진다.
- 행은 따로 안 정해도 자식 수에 맞춰 자동으로 늘어난다.

## 오늘의 한 줄 정리

카드형 2차원 배치는 Grid가 답 — **부모에 `display:grid` + `grid-template-columns: repeat(열수, 1fr)` + `gap`** 이면 깔끔하게 정렬된다.
