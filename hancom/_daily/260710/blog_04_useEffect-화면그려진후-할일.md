# 웹 개발 9일차 (4) — useEffect, 화면 그려진 다음에 할 일

> 3편에서 useState로 "값이 바뀌면 화면도 바뀐다"를 익혔으니, 마지막인 이 글에서는 **"화면이 다 그려진 다음에 뭘 실행할지"**를 정하는 `useEffect`를 정리한다.
> 콘솔에 로그가 왜 2번 찍히는지부터, 타이머 정리(cleanup), 의존성 배열까지 — 오늘 배운 것 중 오해했던 부분이 가장 많았던 주제였다.

🖼️ **이미지 자리** — Clock 컴포넌트가 1초마다 시각을 갱신하며 렌더링되는 화면

---

## 0. 오늘의 요약

- **useEffect 기초(34)**: 컴포넌트가 처음 화면에 나타날 때 1번만 실행되는 훅. `useEffect(() => {...}, [])` 형태.
- **useEffect 심화(35)**: 타이머(`setInterval`)처럼 반복되는 작업엔 반드시 **cleanup**(`return () => ...`)이 필요하다는 걸 Clock으로 배웠다.
- **의존성 배열(36, 37)**: `[]` / `[특정 값]` / 아예 없음, 세 가지 경우가 각각 다르게 동작한다.
- **오개념 3개 정정**: StrictMode 이중 실행 이유, effect-렌더링 인과관계 순서, "[]가 없으면 무조건 무한루프"라는 과장.

---

## 1. useEffect 기초 — 화면 뜰 때 딱 1번 (34)

```jsx
// components/34/Hello.jsx
// useEffect 사용 예제
// useEffect : 화면 뜰 때 딱 1번 렌더링 실행

import { useEffect } from "react";

const Hello = () => {
    useEffect (() => {
        // 개발할땐 main.jsx 에 있는 StrictMode 의해 렌더링이
        // 한번 더 실행되어서 아래 로그가 2번 찍힌다.
        console.log("화면 뜰때 딱 1번만 실행되는 '의존성 배열'")
    }, [])
     return (
        <p>안녕하세요</p>
     )
}

export default Hello
```

`useEffect(콜백함수, 의존성배열)` 형태로 쓴다. 두 번째 인자인 **의존성 배열이 `[]`(빈 배열)**이면, 컴포넌트가 처음 화면에 나타날(마운트) 때 딱 1번만 콜백이 실행되고 이후 리렌더에선 다시 실행되지 않는다.

### ⚠️ 오개념 정정 — 콘솔에 로그가 2번 찍히는 진짜 이유

`console.log`를 찍어보면 콘솔에 **2번** 찍힌다. 처음엔 "`main.jsx`의 StrictMode가 웹이 크래시 나지 않게 하려고 한 번 더 실행해주는 것"이라고 생각했는데, 이건 틀렸다.

**정정**: StrictMode의 이중 실행은 안전장치가 아니라 **개발 중에 버그를 미리 잡아내라고 일부러 두 번 실행시키는 디버깅 도구**다. 특히 cleanup을 제대로 안 한 부작용(useEffect) 같은 걸 개발자가 놓치지 않게, "한 번 실행 → 정리 → 다시 실행"을 강제로 시켜보는 것. **프로덕션 빌드에서는 이 이중 실행이 아예 없다.** 이게 왜 중요한지는 바로 다음(Clock)에서 드러난다.

---

## 2. Clock — setInterval과 cleanup (35)

```jsx
// components/35/Clock.jsx
import { useState, useEffect } from 'react'

const Clock = () => {
  // time: 현재 시각 문자열 / 초기값 = 첫 렌더 시각
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    // setInterval — 브라우저 내장 함수 (직접 만든 것 아님)
    // 인자: (콜백함수, 간격ms) / 반환값: 타이머 ID(숫자)
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())   // 시각 갱신 → 리렌더
    }, 1000)                                     // 1000 = 두번째 인자, 밀리초 간격(내가 지정) → 1초마다 반복
    // clearInterval — 브라우저 내장 함수, 인자: 멈출 타이머 ID
    return () => clearInterval(timer)   // 사라질 때 그 ID로 타이머 정리(cleanup)
  }, [])                                // [] = 처음 1번만 등록

  return <p>⏰ {time}</p>
}
export default Clock
```

1초마다 시각을 갱신하는 시계. 여기서 처음 나온 게 **cleanup**, `return () => clearInterval(timer)` 부분이다.

### ⚠️ cleanup이 왜 필요한가

`setInterval`은 "1초마다 실행해줘"라고 브라우저에 **예약**해두는 거다. 컴포넌트가 화면에서 사라져도 그 예약이 저절로 취소되지 않는다. 그래서 useEffect 안에서 **"내가 예약한 건 내가 정리한다"**는 뜻으로 cleanup 함수를 리턴해야 한다.

이게 왜 필요한지, StrictMode가 바로 알려준다. StrictMode는 개발 중 mount → unmount → 다시 mount를 실행해보는데, cleanup이 없으면 이 과정에서 **타이머가 계속 쌓인다**(첫 번째 mount에서 만든 타이머가 안 지워진 채로, 두 번째 mount에서 또 새 타이머가 생김). 그러면 각 타이머가 1초마다 `setTime`을 부르려 하는데, 이미 사라진 컴포넌트를 갱신하려는 거라 **메모리 누수 + 콘솔 경고**로 이어진다. cleanup을 제대로 넣으면 이 문제가 개발 단계에서부터 바로 드러나므로, StrictMode의 이중 실행이 "미리 잡아내는" 도구라는 게 여기서 실감 났다.

🖼️ **이미지 자리** — Clock 컴포넌트가 시:분:초를 표시하며 1초마다 갱신되는 화면 (연속 캡처 또는 GIF면 더 좋음)

---

## 3. 의존성 배열에 값 넣기 — 바뀔 때마다 재실행 (36)

```jsx
// components/36/Counter.jsx
import { useState, useEffect } from "react";

const Counter = () => {
    const [count, setCount] = useState(0)

    // useEffect - react 내장 함수. 인자 : (실행할 콜백, 의존성 배열)
    useEffect(() => {
        console.log('count 바뀜:', count)
    }, [count])         // 2번째 인자 (의존성. 이 값 바뀔때만 콜백 재실행)

    return <button onClick={() => setCount(c => c + 1)} >{count}</button>
}

export default Counter
```

의존성 배열에 `[count]`처럼 값을 넣으면, **그 값이 바뀔 때마다** effect가 재실행된다.

### ⚠️ 오개념 정정 — 인과관계 순서가 반대였다

처음엔 "값이 변하면 effect가 재실행돼서 그 결과로 리렌더링이 한 번 더 일어난다"고 이해했는데, 순서가 거꾸로다.

**정정**: 실제 순서는 **① `setCount`로 state 변경 → ② 그것 때문에 컴포넌트가 리렌더링 → ③ 리렌더링 후에 React가 의존성 배열(`[count]`)의 값을 이전 렌더와 비교 → ④ 바뀌었으면 그제서야 effect를 재실행**이다. "effect가 재실행돼서 렌더링이 일어나는" 게 아니라 "렌더링이 이미 일어난 다음에 effect가 재실행되는" 것.

---

## 4. 의존성 배열이 없을 때 (37)

```jsx
// components/37/Every.jsx
import { useState, useEffect } from "react";

const Every = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('렌더링 될때마다 실행') // 렌더링마다 실행
    }, [])  // 2번째 칸에 []가 없으므로 매 렌더마다 실행

    return (
    <button onClick={() => setCount(c => c +1)}>{count}</button>
    )
}

export default Every
```

### ⚠️ 코드 발견 — 주석과 실제 코드가 안 맞는다

이 파일, 코드를 다시 자세히 보니 재밌는 게 있다. 주석은 "`[]`가 없으므로 매 렌더마다 실행"이라고 적혀 있는데, **실제 코드엔 `}, [])`처럼 빈 배열 `[]`가 그대로 남아있다.** 즉 지금 이 코드는 (이름이 `Every`인데도) 사실 **딱 1번만 실행**되고 있는 상태다. 아마 "의존성 배열을 아예 빼면 어떻게 되는지" 보여주려다가 `[]`를 지우는 걸 깜빡한 것 같다. 진짜 "매 렌더마다 실행"을 보려면 이렇게 두 번째 인자 자체를 없애야 한다.

```jsx
// 진짜 "매 렌더마다 실행"이 되려면
useEffect(() => {
    console.log('렌더링 될때마다 실행')
})   // 의존성 배열 자체가 없음
```

### ⚠️ 오개념 정정 — "[]가 없으면 무조건 무한 실행"은 과장이다

처음엔 "의존성 배열이 아예 없으면 무한 실행되어 큰 부하가 걸린다"고 적었는데, 이건 과장이다.

**정정**: 의존성 배열이 없으면 정확히는 "**리렌더될 때마다 매번 effect가 실행**"되는 것뿐이고, 그 자체로 자동 무한루프는 아니다. 예를 들어 안에 `console.log`만 있으면 렌더마다 로그가 찍히기만 하지 폭주하진 않는다. **진짜 무한루프가 되는 건, 그 effect 안에서 조건 없이 state를 바꾸는 경우다** — `setCount(count + 1)`처럼 effect 안에서 상태를 바꾸면: state 변경 → 리렌더 → (의존성 배열이 없으니) effect 재실행 → 다시 state 변경 → ... 이 반복되는 조합일 때 비로소 무한루프가 되고 부하가 걸린다.

---

## 오늘의 재사용 메모 (다음 나에게)

- ✅ **`useEffect(fn, [])`** = 마운트 시 1번만
- ✅ **`useEffect(fn, [dep])`** = `dep` 값이 바뀔 때마다
- ✅ **`useEffect(fn)`**(배열 자체 없음) = 렌더될 때마다 매번 — 그 자체로 무한루프는 아님
- ✅ **타이머·구독처럼 "예약"하는 작업은 반드시 cleanup**(`return () => 정리함수()`)으로 되돌려놓기
- ✅ **StrictMode 이중 실행 = 버그 조기 발견용**, 크래시 방지 장치가 아님
- ✅ **effect는 렌더링 다음에 실행된다** — effect가 렌더링을 일으키는 게 아니라, 렌더링(state 변경) 이후에 effect가 반응하는 순서

---

## 마무리

오늘 하루 동안 객체 매핑·배열 map·MUI(1편) → fetch로 API 데이터 가져오기(2편) → useState(3편) → useEffect(4편)까지, 정적인 화면에서 시작해서 "데이터가 실시간으로 살아 움직이는" 화면까지 쭉 이어졌다. 특히 useEffect는 오해했던 부분이 많았는데, 하나씩 정정하고 나니 "화면이 그려진 다음엔 무슨 일이 일어나는지"의 흐름이 훨씬 선명해졌다.

노트에 적어둔 다음 일정: **13일 월요일엔 리액트 미니 프로젝트, 14일 화요일엔 Node/Express**로 넘어간다. 오늘 배운 fetch·useState·useEffect가 미니 프로젝트에서 바로 쓰일 것 같아서, 주말 동안 Header 로그인 토글 숙제부터 마저 끝내놔야겠다.

> 4편까지 오는 동안 하루가 꽤 길었지만, 코드 하나하나를 실제 파일과 대조하면서 오해했던 부분을 짚어보니 훨씬 확실하게 남는 느낌이다. 다음은 미니 프로젝트 — 오늘 배운 걸 다 엮어볼 시간이다. 🚀
