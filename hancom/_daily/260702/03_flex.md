# Flexbox 입문: display:flex로 메뉴 가로 정렬하기

> **한 줄 요약**: 세로로 쌓이는 목록도 부모에 `display:flex` 한 줄만 주면 가로 메뉴로 바뀐다.

`<li>` 같은 목록 요소는 기본적으로 위에서 아래로(세로로) 쌓인다. 하지만 웹사이트 상단 메뉴는 대부분 가로로 놓이는데, 이때 쓰는 게 **Flexbox**다.

## HTML

목록 3개로 메뉴를 만든다.

```html
<body>
    <h1>flex 맛보기</h1>
    <ul class="menu">
        <li id="li1">홈</li>
        <li id="li2">소개</li>
        <li id="li3">연락</li>
    </ul>
</body>
```

[이미지 : flex 적용 전 — 홈/소개/연락이 세로로 쌓인 목록]

## CSS

```css
.menu {
    display: flex;     /* 자식을 가로로 나열 */
    gap: 30px;         /* 자식 사이 간격 */
    list-style: none;  /* 목록 점(•) 제거 */
}

#li1 {
    margin: 10%;
    padding: 10%;
    background-color: aqua;
}
```

핵심 속성:

- **display: flex** → 자식 요소들을 **가로로** 나열한다. (부모 `.menu`에 준다)
- **gap** → flex 자식들 **사이 간격**. margin으로 하나씩 벌리지 않아도 된다.
- **list-style: none** → 목록 앞 점(•)을 없앤다. 메뉴처럼 보이게 하는 필수 정리.

`#li1`에 배경색과 여백을 준 건 flex 안에서 개별 항목도 따로 꾸밀 수 있음을 보여주기 위한 것.

[이미지 : flex 적용 후 — 홈/소개/연락이 가로로 나란히 놓인 메뉴]

## 짚고 넘어갈 점

- flex는 **부모에게 주는 속성**이다. 자식(`<li>`) 하나하나가 아니라 감싸는 `<ul class="menu">`에 `display:flex`를 줘야 한다.
- 기본 흐름(세로) → 가로로 바꾸는 스위치가 바로 `display:flex` 한 줄이라는 점이 포인트.
- 항목 사이 간격은 `gap`으로 주는 게 margin보다 훨씬 깔끔하다.

## 오늘의 한 줄 정리

가로 메뉴가 필요하면 감싸는 부모에 `display:flex`, 간격은 `gap`, 목록 점은 `list-style:none` — 이 세 줄이면 끝난다.
