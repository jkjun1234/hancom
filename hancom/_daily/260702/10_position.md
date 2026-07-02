# position 완전 정복: relative·absolute·fixed·sticky

> **한 줄 요약**: `position`은 요소를 "어디를 기준으로" 배치할지 정하는 속성이고, relative·absolute·fixed·sticky가 각각 다르게 동작한다.

요소를 원하는 위치로 옮기려면 `position`과 `top/right/bottom/left`를 함께 쓴다. 네 가지 값이 각각 무엇을 기준으로 움직이는지 실습으로 비교해 봤다.

## HTML

```html
<body>
    <h1>position</h1>

    <!-- 부모에 relative -> 안쪽 absolute가 이 부모 기준 -->
    <div class="parent">
        <span class="ptag">부모 (relative)</span>
        <div class="rel">relative</div>
        <div class="abs">absolute</div>
    </div>

    <!-- fixed : 화면 오른쪽 아래 고정, 스크롤해도 그대로 -->
    <div class="fixed">fixed</div>
    <div class="sticky">sticky</div>
    <p>일반 글은 원래 흐름대로 흐름</p>
</body>
```

## CSS

```css
/* 페이지를 일부러 길게 만들어 스크롤 생성 => fixed, sticky 동작 확인용 */
body {
    min-height: 3000px;
}

/* 부모 박스 : 안쪽 absolute의 기준점 */
.parent {
    position: relative;
    border: 2px dashed red;
    height: 120px;
    margin: 10px 0;
}

/* relative : 원래 자리 기준으로 살짝 이동 */
.rel {
    position: relative;
    top: 30px;
    left: 20px;
}

/* absolute : 가장 가까운 position 조상(.parent) 기준, 문서 흐름에서 빠짐 */
.abs {
    position: absolute;
    bottom: 50px;
    right: 16px;   /* 부모의 오른쪽 아래 구석 */
    z-index: 10;   /* 겹치면 숫자 큰 쪽이 위로 */
}

/* fixed : 화면(뷰포트) 고정 - 스크롤해도 그 자리 */
.fixed {
    position: fixed;
    bottom: 16px;
    right: 16px;
}

/* sticky : 스크롤하다 지정 위치에 닿으면 그때부터 고정 */
.sticky {
    position: sticky;
    top: 0;   /* 화면 맨 위에 닿으면 붙음 */
}
```
*(색·여백 등 꾸밈 속성은 지면상 생략)*

## 네 가지 position 비교

- **relative** → **원래 자기 자리**를 기준으로 `top/left`만큼 이동. 원래 있던 공간은 그대로 차지한다.
- **absolute** → 문서 흐름에서 **빠져나와**, 가장 가까운 `position` 지정 조상(여기선 `.parent`)을 기준으로 배치된다. 그래서 부모에 `relative`를 주는 게 중요.
- **fixed** → **화면(뷰포트)** 기준. 스크롤을 내려도 항상 같은 자리에 붙어 있다. (예: 우측 하단 버튼)
- **sticky** → 평소엔 일반 흐름대로 있다가, 스크롤이 지정 위치(`top:0`)에 닿으면 **그때부터 고정**된다. (예: 상단에 붙는 헤더)

![relative가 살짝 이동하고 absolute가 부모 오른쪽 아래 구석에 붙은 결과](C:/Users/jun/Desktop/블로그 업로드용 이미지/10_position-01-top.png)

![스크롤을 내려도 화면에 계속 붙어 있는 fixed·sticky](C:/Users/jun/Desktop/블로그 업로드용 이미지/10_position-02-scroll.png)

## 짚고 넘어갈 점

- `absolute`의 기준은 "가장 가까운 **position이 지정된** 조상"이다. 부모에 `position:relative`가 없으면 화면 전체(body) 기준으로 튀어 나간다.
- `fixed`와 `sticky`는 **스크롤이 있어야** 차이가 보여서, `body { min-height: 3000px }`로 일부러 페이지를 길게 만들었다.
- 겹칠 때는 **`z-index`가 큰 요소가 위**에 온다.

## 오늘의 한 줄 정리

position은 "기준이 무엇인가"로 외우자 — **relative=제자리, absolute=position 조상, fixed=화면, sticky=스크롤 닿으면 고정**.
