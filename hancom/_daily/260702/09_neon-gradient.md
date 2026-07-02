# linear-gradient와 box-shadow로 네온 효과 만들기

> **한 줄 요약**: 배경을 그라디언트로 칠하고 `box-shadow`로 빛 번짐을 주면, 어두운 데서 빛나는 네온 버튼 느낌이 난다.

밋밋한 사각형도 **그라디언트 배경**과 **그림자 번짐**을 더하면 화사한 네온 배지처럼 보인다. 색과 번짐 값을 조절하는 감각을 익혀 봤다.

## HTML

```html
<body>
    <h1>네온 그라디언트</h1>
    <div class="neon">NEON</div>
</body>
```

## CSS

```css
.neon {
  width: 220px;
  height: 120px;

  /* 글자 가운데 (flex 가운데정렬 3종 세트) */
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 22px;
  font-weight: bold;

  /* 모서리 둥글게 */
  border-radius: 20px;

  /* 135도 방향으로 분홍→보라 색 섞기 */
  background: linear-gradient(135deg, #ec4899, #8b5cf6);

  /* 0 0 = 그림자 위치(가운데), 25px = 흐림 반경 → 네온빛 · rgba 끝 0.7 = 투명도 70% */
  box-shadow: 0 0 25px rgba(236, 72, 153, 0.7);
}
```

핵심 속성:

- **linear-gradient(135deg, #ec4899, #8b5cf6)** → 135도(왼쪽 위 → 오른쪽 아래) 방향으로 **분홍에서 보라**로 이어지는 배경. 색은 2개 이상 넣을 수 있다.
- **box-shadow: 0 0 25px rgba(...)** → 그림자로 빛 번짐을 표현.
  - 첫 두 값 `0 0` = 그림자를 **가운데**(오른쪽·아래로 안 밀림)에 둠
  - `25px` = **흐림 반경**. 클수록 뿌옇게 퍼져 네온빛처럼 보임
  - `rgba(..., 0.7)` = 색 + **투명도 70%**
- **flex 가운데정렬 3종 세트** → `display:flex` + `align-items:center`(세로) + `justify-content:center`(가로)로 글자 "NEON"을 정중앙에.

[이미지 : 분홍→보라 그라디언트에 분홍빛이 번지는 네온 박스 결과 화면]

## 값만 바꿔서 응용하기

- **각도** : `135deg`를 `90deg`로 바꾸면 위→아래, `45deg`면 대각선 방향이 달라진다.
- **번짐 세기** : `box-shadow`의 `25px`를 키우면 더 몽환적으로, 줄이면 또렷하게.
- **색** : 그라디언트 색과 그림자 색을 맞추면 빛나는 느낌이 자연스럽다.

## 짚고 넘어갈 점

- `box-shadow`는 원래 "그림자"지만, 위치를 `0 0`으로 두고 흐림만 키우면 **네온 글로우(빛 번짐)** 로 쓸 수 있다.
- `rgba`의 마지막 값(알파)으로 투명도를 조절하니, 배경과 자연스럽게 섞인다.
- 어두운 배경에 두면 네온 느낌이 훨씬 산다.

## 오늘의 한 줄 정리

네온 효과 = **`linear-gradient` 배경 + 위치 `0 0`에 흐림 큰 `box-shadow`**. 숫자만 바꿔가며 분위기를 조절하면 된다.
