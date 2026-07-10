# 집 학습 메모 — Header 로그인 토글 (useState)

> 260710 강의장 실습 중 시간 부족으로 못 끝내고 집으로 넘김. `coaching-prompt.md`로 드릴 돌릴 때 이어서.
> 대상 코드: `hancom/05_react/my-app/src/components/28/Header.jsx`

## 목표
헤더에 버튼을 눌러서 "로그인 상태 : 로그인 / 로그아웃"이 바뀌고, 버튼 글자도 "로그인하기 ↔ 로그아웃하기"로 같이 바뀌게 하기.

## 지금까지 진행 상황 (오늘 강의장에서 고친 것)
```jsx
const Header = ({isLoggedIn}) => {
    let currentLogged = isLoggedIn;
    return (
        <>
            <title>여러 컴포넌트 붙여보기!</title>
            <header> 헤더 
                <p> 로그인 상태 : {isLoggedIn ? <span>로그인</span> : <span>로그아웃</span>} </p> 
                <button>{currentLogged ? <span>로그아웃하기!</span> : <span>로그인하기</span>}</button>
            </header>
        </>
    )
}
```
- `{ }` 안 채우기는 이미 해결함 — `{cfg.icon}`이 됐던 건 객체라서가 아니라 **`{ }`가 "JS 표현식 결과를 넣어라"는 뜻이라서**. 변수 하나(`currentLogged`)든 프로퍼티 접근(`cfg.icon`)이든 똑같이 동작.

## 막힌 지점 — 왜 버튼을 눌러도 안 바뀌나
1. `<button>`에 `onClick`이 아예 없음 → 눌러도 아무 일도 안 일어남.
2. `let currentLogged = isLoggedIn`은 **일반 지역변수**라서, 렌더될 때마다 `isLoggedIn` prop 값으로 매번 초기화됨. 재할당해도 React가 "다시 그려야지"라고 인식 못 함 → 화면이 안 바뀜.
3. → **"값이 바뀌면 화면도 같이 바뀌게" 하려면 React의 state(`useState`)가 필요.**

## 힌트 — 필요한 것만 (정답 코드 아님)
Vite 기본 카운터 (`count`/`setCount`, 260709 실습)랑 구조가 완전히 같음. 다른 점은 숫자를 늘리는 대신 **true/false를 뒤집는 것**뿐.

1. `useState`를 어디서 import 했었는지 기억 되살리기 (Counter 때 썼던 import문 그대로).
2. state 선언 — prop을 초기값으로만 쓰고, 실제 값은 컴포넌트 안에서 따로 관리:
   ```
   const [???, ???] = useState(isLoggedIn)
   ```
3. `onClick`에서 true/false 뒤집기 — `count + 1` 자리에 뭘 넣어야 반대가 될까? (힌트: `!` 연산자)
4. `<p>`랑 `<button>` 안의 삼항 조건, 지금 `isLoggedIn`/`currentLogged` 대신 **새로 만든 state 변수**를 참조하도록 바꾸기.
5. (여유되면 생각해볼 것) Header가 이제 스스로 로그인 상태를 관리하게 되면, `App.jsx`에서 넘겨주는 `isLoggedIn` prop은 여전히 필요한가? — "초기값만 주는 prop" vs "매번 바뀌는 값 자체를 주는 prop"의 차이.

## 미해결 숙제 하나 더 (260709에서 이어짐)
`Counter.jsx`로 분리하는 숙제(`count`/`setCount`)도 아직 안 되어 있음(`Counter.jsx` 파일 자체가 없음). 시간 되면 이것도 같이 볼 것 — 두 숙제가 같은 `useState` 개념이라 연달아 하면 효율적.

## 오늘 배운 것과의 연결 (재사용 패턴)
- **`{ }`는 "JS 표현식 삽입"** — 객체 프로퍼티든 변수든 함수 호출이든 다 동일하게 적용됨. Alert(`cfg.icon`), Header(`currentLogged`) 둘 다 같은 규칙.
- **`useState`로 "클릭 → 값 변경 → 화면 갱신"** — 카운터든 로그인 토글이든, 값이 바뀌면 화면도 같이 바뀌어야 하는 모든 상황에 재사용(체크박스 토글, 탭 전환, 모달 열고 닫기 등).
- **prop vs state 구분** — prop은 "밖에서 받은 값"(읽기 전용), state는 "컴포넌트 안에서 스스로 바꾸는 값". 이번 Header 사례가 그 경계를 헷갈렸던 지점이라 좋은 예시로 남겨둘 것.
