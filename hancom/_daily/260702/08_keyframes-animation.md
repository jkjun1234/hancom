# @keyframes로 둥둥 떠다니는 자동 애니메이션 만들기

> **한 줄 요약**: `@keyframes`로 움직임의 "대본"을 정의하고, `animation`으로 그 대본을 요소에 무한 반복시키면 마우스 없이도 저절로 움직인다.

`transition`은 hover 같은 **사용자 행동**이 있어야 움직인다. 반면 `@keyframes` 애니메이션은 **마우스 없이도 저절로** 반복 재생된다. 공이 위아래로 둥둥 떠다니는 효과를 만들어 봤다.

## HTML

```html
<body>
    <h1>자동 애니메이션</h1>
    <!-- 이 태그에 animation 적용 -> 자동으로 둥둥 떠다니는 모션 -->
    <div class="ball"></div>
</body>
```

## CSS

```css
@keyframes float {  /* float: 움직임 "대본"(이름)을 미리 정의 */

    /* 시작(0%), 끝(100%) : 제자리 */
    0%, 100% { transform: translateY(0); }

    /* 중간(50%): 위로 30px 올라감 (translateY 음수 = 위) */
    50% { transform: translateY(-30px); }
}

.ball {
    width: 80px;
    height: 80px;

    /* border-radius 50% -> 동그라미 형태로 */
    border-radius: 50%;
    background: hotpink;

    /* float 대본을 1.5초 주기로 무한 반복(infinite) */
    animation: float 1.5s ease-in-out infinite;
}
```

핵심 개념:

- **@keyframes float { … }** → `float`이라는 이름의 움직임 대본을 정의. `0%`(시작) ~ `100%`(끝) 사이 각 지점에서 어떤 모습일지 적는다.
- **0%, 100% { translateY(0) }** → 시작과 끝은 제자리.
- **50% { translateY(-30px) }** → 절반 시점에 위로 30px. (`translateY`는 음수가 위쪽)
- **animation: float 1.5s ease-in-out infinite** → 대본 이름 `float`을, **1.5초** 주기로, `ease-in-out` 속도로, **무한 반복(infinite)**.

애니메이션이 절반(50%) 지점에 이르면 `translateY(-30px)`가 적용되어 공이 위로 30px 떠오른다.

0%와 100% 지점에서는 `translateY(0)`이 적용되어 공이 다시 제자리로 내려온다.

## transition과 뭐가 다를까?

| | transition | @keyframes 애니메이션 |
|---|---|---|
| 시작 조건 | hover 등 **상태 변화**가 있어야 | **저절로** 시작 |
| 중간 단계 | 시작·끝 두 지점만 | 0~100% 사이 **여러 지점** 지정 가능 |
| 반복 | 기본 1회 | `infinite`로 **무한 반복** |

## 짚고 넘어갈 점

- 대본 이름(`float`)과 `animation`에 쓴 이름이 **똑같아야** 연결된다.
- `infinite`를 빼면 딱 한 번만 재생되고 멈춘다.
- `0%, 100%`를 같은 값으로 두면 "올라갔다 원위치"가 매끄럽게 반복된다.

## 오늘의 한 줄 정리

저절로 움직이는 효과는 **`@keyframes`로 대본을 짜고 `animation ... infinite`로 요소에 붙이는 것** — 이 두 단계면 끝난다.
