# transition과 timing-function: hover 회전·확대 애니메이션

> **한 줄 요약**: `transition`은 변화를 부드럽게 이어주고, `timing-function`은 그 변화의 "속도 곡선"을 정한다.

마우스를 올리면 박스가 빙글 돌면서 커지는 효과를 만들어 봤다. 여기에 **timing-function**(ease, linear, ease-in …)을 다르게 주면 같은 동작도 느낌이 완전히 달라진다.

## HTML — 타이밍만 다른 박스 5개

```html
<body>
    <h1>hover 회전 확대</h1>

    <!-- 해당 박스 hover 시 transform(회전 + 확대) 적용 -->
    <div class="box box-ease">ease 속성</div>
    <div class="box box-linear">linear 속성</div>
    <div class="box box-ease-in">ease-in 속성</div>
    <div class="box box-ease-out">ease-out 속성</div>
    <div class="box box-ease-in-out">ease-in-out 속성</div>
</body>
```

![마우스 올리기 전 — 분홍 박스 5개가 나란히 있는 기본 상태](C:/Users/jun/Desktop/블로그 업로드용 이미지/07_transition-timing-01-before.png)

## CSS

```css
.box {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hotpink;
    color: white;
    border-radius: 30px;
    transition: transform 0.6s ease; /* 기본값 */
    padding: 5%;
    margin: 3%;
}

.box:hover {
    transform: rotate(-60deg) scale(2); /* -60도 회전 + 2배 확대 */
}

/* 각 박스의 timing-function만 다르게 */
.box-ease        { transition-timing-function: ease; }
.box-linear      { transition-timing-function: linear; }
.box-ease-in     { transition-timing-function: ease-in; }
.box-ease-out    { transition-timing-function: ease-out; }
.box-ease-in-out { transition-timing-function: ease-in-out; }
```

핵심 속성:

- **transition: transform 0.6s ease** → `transform` 속성이 바뀔 때 **0.6초**에 걸쳐 부드럽게. 마지막 `ease`가 기본 속도 곡선.
- **transform: rotate(-60deg) scale(2)** → 한 번에 **회전(-60도)** 과 **확대(2배)** 를 함께 적용.

## timing-function 5종 비교

같은 0.6초라도 "언제 빠르고 언제 느린가"가 다르다.

| 값 | 속도 느낌 |
|---|---|
| **ease** | 처음 느리게 → 빨라졌다 → 끝에 느리게 (기본, 가장 자연스러움) |
| **linear** | 처음부터 끝까지 **일정한 속도** (기계적인 느낌) |
| **ease-in** | 처음엔 느리다가 **끝으로 갈수록 빨라짐** |
| **ease-out** | 처음엔 빠르다가 **끝으로 갈수록 느려짐** |
| **ease-in-out** | 시작·끝은 느리고 중간이 빠름 (ease보다 대칭적) |

마우스를 박스 위에 올리면 `transform: rotate(-60deg) scale(2)`가 적용되어, 박스가 -60도로 회전하며 2배로 커진다.

## 짚고 넘어갈 점

- `transition`이 없으면 hover 시 **즉시 뚝 바뀐다**. transition을 줘야 "스르륵" 이어진다.
- transition은 **평소 상태(.box)** 에 적어야 올라갈 때·내려올 때 모두 부드럽다. `:hover`에만 적으면 돌아올 때 뚝 끊긴다.
- `transform`은 회전·확대·이동을 공백으로 이어서 여러 개 동시에 줄 수 있다.

## 오늘의 한 줄 정리

부드러운 hover 효과의 공식은 **평소 상태에 `transition`, hover에 `transform`** 이고, timing-function을 바꾸면 같은 동작도 인상이 달라진다.
