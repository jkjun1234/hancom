# 반응형 @media: 화면 크기에 따라 카드 배치 바꾸기

> **한 줄 요약**: `@media`로 "화면이 몇 px 이하일 때"라는 조건을 걸면, 같은 HTML도 화면 크기에 따라 가로↔세로로 배치를 바꿀 수 있다.

PC에선 카드가 가로로 나란히, 휴대폰에선 세로로 쌓이는 화면을 자주 본다. 이런 **반응형** 레이아웃을 `@media` 규칙으로 만들어 봤다.

![넓은 화면 — A·B·C 카드가 가로로 3등분된 결과](C:/Users/jun/Desktop/블로그 업로드용 이미지/01_media-query-01-wide.png)

## HTML

```html
<body>
    <h1>반응형 @media</h1>
    <div class="box">
        <div class="card">A</div>
        <div class="card">B</div>
        <div class="card">C</div>
    </div>
</body>
```

## CSS

```css
.box {
    display: flex;          /* 자식을 flex로 배치 */
    flex-direction: row;    /* 가로 배치 (왼→오) */
    gap: 10px;              /* 카드 사이 간격 */
    padding: 10px;
    background: rgb(200, 200, 156);
}

.card {
    flex: 1;                /* 남는 가로 공간 균등 분할 → 카드들 같은 너비 */
    padding: 30px 0;        /* 상하 30px, 좌우 0 */
    text-align: center;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    background: linear-gradient(135deg, rgb(245, 172, 172), rgb(248, 127, 241));
}

/* 화면 폭이 600px 이하일 때만 아래 규칙 적용 (모바일) */
@media (max-width: 600px) {
    .box {
        flex-direction: column; /* 가로 → 세로 전환 (카드 위아래로 쌓임) */
    }
    .card {
        flex: none;             /* 억지로 늘리지 않고 내용 크기만큼 */
    }
}
```

핵심:

- **@media (max-width: 600px) { … }** → "화면 폭이 **600px 이하**일 때만" 안쪽 규칙을 적용한다. 조건에 맞을 때만 켜지는 스위치라고 보면 된다.
- 평소(600px 초과)엔 `flex-direction: row`로 가로, 좁아지면 `column`으로 **세로**로 바뀐다.
- `@media` 안에서 원하는 선택자를 다시 적어 값만 덮어쓰는 방식이다.

![좁은 화면(600px 이하) — 카드가 세로로 쌓인 결과](C:/Users/jun/Desktop/블로그 업로드용 이미지/01_media-query-02-narrow.png)

## 짚고 넘어갈 점 — `flex: 1`과 `display: flex`의 차이

실습하며 헷갈렸던 부분. 둘 다 "flex"가 들어가지만 **주는 대상도, 역할도 다르다.**

| | `display: flex` | `flex: 1` |
|---|---|---|
| 주는 대상 | **부모**(컨테이너) | **자식**(아이템) |
| 역할 | 자식들을 flex로 **배치 시작**(가로 정렬 켜기) | 남는 공간을 **얼마나 차지할지** 지정 |
| 비유 | "가로로 줄 세울까?" | "남는 자리를 나눠 가질까?" |

- **`display: flex`** → 부모 `.box`에 준다. 이걸 켜야 자식들이 flex 아이템이 되어 가로로 나열된다.
- **`flex: 1`** → 자식 `.card`에 준다. `flex-grow:1 / flex-shrink:1 / flex-basis:0`의 축약형으로, **남는 가로 공간을 균등하게** 나눠 가져 카드들이 같은 너비가 된다.
- **`flex: none`** → 반대로 "늘어나지 마"라는 뜻(`flex-grow:0`). 세로로 쌓을 때 카드가 억지로 늘어나지 않고 내용 크기만큼만 차지하게 한다.

> 한 문장 정리: **부모엔 `display:flex`(배치 시작), 자식엔 `flex:1`(공간 분배).**

## 오늘의 한 줄 정리

`@media (max-width: …)`로 화면 크기 조건을 걸면 배치를 바꿀 수 있고, flex는 "부모=`display:flex`, 자식=`flex:1`"로 역할이 나뉜다는 걸 기억하자.
