# CSS 박스 모델: margin·padding·border의 차이

> **한 줄 요약**: 모든 HTML 요소는 네모난 상자이고, 그 상자는 안쪽 여백(padding)·테두리(border)·바깥 여백(margin)으로 이루어진다.

CSS로 간격을 조절할 때 가장 먼저 헷갈리는 게 "여백을 padding으로 줘야 하나, margin으로 줘야 하나?"이다. 이 셋의 역할을 구분하면 레이아웃이 훨씬 쉬워진다.

![padding·border·margin이 적용된 목록 상자 결과 화면](C:/Users/jun/Desktop/블로그 업로드용 이미지/02_box-model-01.png)

## HTML

여백과 테두리를 줄 목록 상자 하나를 만든다.

```html
<body>
    <h1>박스 모델</h1>
    <!-- 여백과 테두리를 줄 목록 상자 -->
    <ul>
        <!-- 여기에 padding, border, margin 적용 -->
        <li>여백과 테두리를 가진 상자</li> <!-- 목록 한 줄 -->
    </ul>
</body>
```

## CSS

```css
ul {
    background-color: white;
    padding: 100px 200px;   /* 상자 안쪽 여백 - 글자와 테두리 사이 공간 */
    border: 4px solid navy; /* 테두리 - 두께, 실선, 남색 */
    margin: 200px;          /* 상자 바깥 여백 - 옆 요소와의 거리 */
}
```

세 속성이 하는 일:

- **padding** → 상자 **안쪽** 여백. 내용(글자)과 테두리 사이의 공간을 넓힌다.
- **border** → 상자의 **테두리** 선. `두께 / 스타일 / 색` 순으로 적는다. (예: `4px solid navy`)
- **margin** → 상자 **바깥** 여백. 옆의 다른 요소와의 거리를 벌린다.

> 한 문장 암기: **"안쪽은 padding, 테두리는 border, 바깥은 margin"**

## margin / padding 값 개수 규칙

margin과 padding은 값을 몇 개 쓰느냐에 따라 적용 방향이 달라진다.

```css
/* 값 1개 — 상하좌우 전부 같게 */
margin: 20px;

/* 값 2개 — 상하 / 좌우 */
margin: 10px 30px;        /* 상하 10, 좌우 30 */

/* 값 4개 — 상 → 우 → 하 → 좌 (시계방향) */
margin: 10px 20px 30px 40px;

/* 한 방향씩 따로 지정 */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 30px;
margin-left: 40px;
```

값 4개는 **12시 방향(위)에서 시계방향**으로 상→우→하→좌 순서라고 기억하면 편하다.

## 짚고 넘어갈 점

- `padding: 100px 200px`는 값 2개라서 **상하 100px, 좌우 200px**가 된다.
- padding을 키우면 상자 자체가 커지고, margin을 키우면 상자는 그대로인 채 주변과 거리가 벌어진다.

## 오늘의 한 줄 정리

간격을 줄 때는 "내용 안쪽을 벌릴지(padding), 다른 요소와 벌릴지(margin)"를 먼저 정하고, 그 사이를 border가 감싼다고 생각하면 된다.
