# transform 3D로 카드 뒤집기 (perspective·backface-visibility)

> **한 줄 요약**: 앞면·뒷면을 겹쳐 두고 마우스를 올리면 `rotateY(180deg)`로 카드가 입체적으로 뒤집히게 만든다.

마우스를 올리면 카드가 스르륵 돌아가며 뒷면을 보여주는 효과를 3D 변형으로 구현해 봤다. 핵심은 **원근감(perspective)** 과 **뒷면 숨기기(backface-visibility)** 다.

## HTML — 앞/뒷면 구조

```html
<body>
    <h1>카드 뒤집기 3D</h1>
    <!-- card : 바깥쪽 -->
    <div class="card">
        <div class="inner">
            <div class="front">앞면!</div>
            <div class="back">뒷면!</div>
        </div>
    </div>
</body>
```

- `.card` : 원근감을 담당하는 바깥 상자
- `.inner` : 실제로 회전하는 안쪽 상자
- `.front` / `.back` : 앞면과 뒷면 (겹쳐 쌓임)

![마우스 올리기 전 — 분홍색 카드 앞면(앞면!)](C:/Users/jun/Desktop/블로그 업로드용 이미지/06_card-flip-01-front.png)

## CSS

```css
.card {
    width: 300px;
    height: 150px;
    perspective: 1000px; /* 3D 원근 화면 구성. 값이 작을수록 화면과 가깝게(과장되게) 보인다 */
}

.inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;   /* transform이 바뀔 때마다 0.6초에 걸쳐 부드럽게 */
    transform-style: preserve-3d; /* 자식(앞/뒷면)을 3D 공간에 둠 */
}

.card:hover .inner {
    transform: rotateY(180deg);   /* 마우스 올리면 Y축으로 180도 회전 */
}

.front, .back {
    position: absolute;         /* 앞·뒷면을 .inner 위에 겹쳐 쌓음 */
    inset: 0;                   /* top·right·bottom·left 전부 0 (부모 꽉 채움) */
    display: flex;              /* 안의 글자를 가운데 두기 위해 */
    align-items: center;        /* 세로 가운데 정렬 */
    justify-content: center;    /* 가로 가운데 정렬 */
    border-radius: 12px;
    color: white;
    font-size: 20px;
    backface-visibility: hidden; /* 뒤로 돌아간 면은 안 보이게 */
}

.front {
    background: hotpink;
}

.back {
    background: rebeccapurple;
    transform: rotateY(180deg);  /* 뒷면은 미리 180도 돌려 둠 */
}
```

핵심 속성:

- **perspective** → 부모에 주는 원근 거리. 이게 있어야 회전이 평면이 아닌 **입체**로 보인다. 값이 작을수록 더 과장된 3D.
- **transform-style: preserve-3d** → 자식들을 3D 공간에 배치. 없으면 뒤집혀도 납작해 보인다.
- **rotateY(180deg)** → Y축(세로축) 기준 180도 회전 = 좌우로 뒤집기.
- **backface-visibility: hidden** → 면의 뒷모습은 숨긴다. 덕분에 앞으로 온 면만 보인다.
- **transition** → 0.6초에 걸쳐 부드럽게 회전.

마우스를 카드 위에 올리면 `.inner`가 `rotateY(180deg)`로 0.6초에 걸쳐 회전하며, 보라색(rebeccapurple) 뒷면("뒷면!")이 나타난다.

## 짚고 넘어갈 점

- 앞면과 뒷면을 `position: absolute` + `inset: 0`으로 **완전히 겹쳐** 쌓는 게 핵심이다.
- 뒷면(`.back`)은 처음부터 `rotateY(180deg)`로 돌려 놓아야, 카드가 180도 돌았을 때 정방향으로 보인다.
- `backface-visibility: hidden`이 없으면 뒤집는 도중 뒤집힌 글자가 비쳐 보인다.

## 오늘의 한 줄 정리

카드 뒤집기의 공식은 **부모에 perspective + preserve-3d, 자식은 겹쳐 두고 backface 숨기기, hover에 rotateY(180deg)** 다.
