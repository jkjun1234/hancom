# box-shadow로 그림자 효과 만들기 (+ hover로 떠오르는 카드)

> **한 줄 요약**: `box-shadow`는 값 4자리(좌우·위아래·번짐·색)로 그림자를 그리고, hover와 조합하면 마우스를 올릴 때 카드가 떠오르는 효과를 낼 수 있다.

밋밋한 카드도 그림자를 넣으면 입체감이 생긴다. 여기에 마우스를 올리면 살짝 떠오르는 인터랙션까지 더해 봤다.

![기본 상태 — 은은한 그림자가 있는 분홍 카드](C:/Users/jun/Desktop/블로그 업로드용 이미지/03_box-shadow-01-base.png)

## HTML

```html
<body>
    <h1>그림자 효과</h1>
    <!-- 이 카드에 4가지 효과가 올라감 -->
    <div class="card">마우스를 올려봐</div>
</body>
```

## CSS

```css
.card {
    width: 150px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: hotpink;
    color: white;
    font-weight: 700;

    border-radius: 16px;
    opacity: 0.85;  /* 투명도 85% */

    /* 그림자 → 0:좌우  6px:위아래  18px:번짐  rgba:색+투명도 */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);

    transition: all 0.3s ease; /* 0.3초 동안 부드럽게 */
}

.card:hover {
    opacity: 1;                     /* 뚜렷하게 */
    transform: translateY(-8px);    /* 위로 8px 올리기 */
    box-shadow: 0 16px 32px rgba(255, 105, 180, 0.5); /* 그림자 진하게 */
}
```

## box-shadow 값 4자리 뜯어보기

`box-shadow: 0 6px 18px rgba(0,0,0,0.25)` 를 순서대로 보면:

| 순서 | 값 | 의미 |
|---|---|---|
| 1 | `0` | **좌우**(offset-x) 이동. 양수면 오른쪽 |
| 2 | `6px` | **위아래**(offset-y) 이동. 양수면 아래쪽 |
| 3 | `18px` | **번짐**(blur) 정도. 클수록 뿌옇게 퍼짐 |
| 4 | `rgba(0,0,0,0.25)` | **색 + 투명도**. 여기선 검정 25% |

- 좌우·위아래를 `0 6px`로 두면 그림자가 **아래쪽에 살짝** 깔려 자연스럽다.
- 번짐(blur)을 키우면 부드럽고 은은한 그림자, 줄이면 또렷한 그림자가 된다.

## hover와 조합 — 떠오르는 카드

마우스를 올리면 `.card:hover` 규칙이 적용되어:

- `opacity: 1` → 흐릿했다가 선명해지고
- `transform: translateY(-8px)` → 위로 8px 떠오르고
- `box-shadow`가 더 크고 진해져 → **더 높이 뜬 것처럼** 보인다.

`transition: all 0.3s ease` 덕분에 이 변화들이 뚝 바뀌지 않고 0.3초에 걸쳐 스르륵 이어진다.

![hover 시 — 위로 떠오르고 그림자가 진해진 카드](C:/Users/jun/Desktop/블로그 업로드용 이미지/03_box-shadow-02-hover.png)

> 💡 `transition`(변화를 몇 초에 걸쳐)과 `transform`(위치 옮기기)은 이전 글에서 자세히 다뤘다. 개념이 헷갈리면 [transition과 timing-function 글](../260702/07_transition-timing.md)을 참고하자.

## 짚고 넘어갈 점

- `box-shadow`는 사실 값을 5개까지 쓸 수 있다. 3번(번짐)과 4번(색) 사이에 **확산(spread)** 값을 넣으면 그림자 크기 자체를 키울 수 있다. (이번 실습은 4자리만 사용)
- `transition: all`은 "바뀌는 모든 속성"을 부드럽게 한다. 특정 속성만 원하면 `transition: box-shadow 0.3s`처럼 콕 집어도 된다.

## 오늘의 한 줄 정리

그림자는 `box-shadow: 좌우 위아래 번짐 색` 4자리로 그리고, hover + transition과 엮으면 "떠오르는 카드" 같은 살아있는 UI를 만들 수 있다.
