# 가상요소 ::before / ::after로 HTML 없이 장식 붙이기

> **한 줄 요약**: `::before`·`::after`는 HTML을 건드리지 않고 요소의 앞뒤에 `content`로 아이콘·따옴표·밑줄 같은 장식을 CSS만으로 붙이는 기능이다.

별표(⭐)나 따옴표, 밑줄 같은 장식은 HTML에 직접 쓸 수도 있지만, **꾸미기용 요소**라면 CSS의 가상요소로 붙이는 게 깔끔하다. HTML에는 없는 "가짜 요소"를 만들어 봤다.

[이미지 : ⭐ 붙은 제목, 따옴표로 감싸인 인용문, 밑줄 장식 문장이 함께 보이는 결과]

## HTML

```html
<body>
    <h1>가상요소</h1>

    <!-- CSS가 ::before로 앞에 별(⭐)을 붙여준다 -->
    <h1 class="start-title">즐겨찾기 메뉴</h1>

    <!-- ::before와 ::after로 양 옆에 따옴표가 생긴다 -->
    <p class="quote">가짜 요소는 HTML에 없다.</p>

    <!-- ::after로 글자 아래 파란 줄이 그려진다 -->
    <p class="underline-deco">밑줄 장식이 붙은 문장</p>
</body>
```

HTML을 보면 별·따옴표·밑줄은 **어디에도 적혀 있지 않다.** 전부 CSS가 만들어낸다.

## CSS

```css
.start-title {
    color: navy;
    font-size: 50px;
}

/* 해당 태그 앞에 content를 붙임 */
.start-title::before {
    content: "⭐";
}

.quote {
    color: gray;
    font-style: italic;
}

/* 앞 따옴표 */
.quote::before {
    content: " ' ";
    color: tomato;
    font-weight: 700;
}

/* 뒤 따옴표 */
.quote::after {
    content: " ' ";
    color: tomato;
    font-weight: 700;
}

/* 밑줄 장식용 */
.underline-deco {
    position: relative;
    color: green;
    display: inline-block;
}

/* 밑줄은 빈 박스를 그려서 줄처럼 보이게 한다 */
.underline-deco::after {
    content: "";        /* 빈 값이어도 content는 반드시 필요 */
    display: block;
    width: 100%;
    height: 2px;
    background: royalblue;
    border-radius: 2px;
    margin-top: 3px;
}
```

핵심:

- **`::before`** → 요소 내용의 **맨 앞**에 삽입. (예: 제목 앞 ⭐)
- **`::after`** → 요소 내용의 **맨 뒤**에 삽입. (예: 인용문 뒤 따옴표)
- **`content`** → 가상요소에는 **반드시 `content`가 있어야** 화면에 나타난다. 글자·이모지는 물론 `content: ""`(빈 값)도 가능하다.
- 앞뒤 따옴표처럼 `::before`와 `::after`를 **함께** 쓰면 요소를 양쪽에서 감쌀 수 있다.

## content: "" 로 밑줄 그리기

`.underline-deco::after`는 글자가 아니라 **빈 박스**다.

- `content: ""` 로 빈 가상요소를 만들고,
- `width: 100%; height: 2px; background`로 얇은 파란 막대를 그려
- 글자 아래 **밑줄처럼** 보이게 했다.

이렇게 "장식용 도형"을 만들 때 빈 `content`를 자주 쓴다.

## 짚고 넘어갈 점 — display가 함께 등장한다

밑줄 예시에서 `display: inline-block`과 `display: block`이 나온다.

- `.underline-deco`에 `display: inline-block` → 글자 폭만큼만 자리를 차지하면서도 크기를 가질 수 있게.
- `::after`에 `display: block` → 밑줄 막대를 글자 **아래 줄**로 내려 배치.

여기서 `display` 값에 따라 배치가 왜 달라지는지 헷갈리기 쉽다. `display` 속성만 따로 정리한 [display 속성 총정리 글](05_display-property.md)에서 이어서 다룬다.

## 오늘의 한 줄 정리

HTML을 더럽히지 않고 장식을 붙이고 싶다면 `::before`/`::after` + `content`를 쓰자. 도형 장식이 필요하면 `content: ""` 빈 박스가 답이다.
