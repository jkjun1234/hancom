# 집 학습 메모 — NameForm 제어(controlled) 컴포넌트

> 260710 강의장 실습 중 이해도 체크하다가 헷갈려서 집으로 넘김. `coaching-prompt.md`로 드릴 돌릴 때 이어서.
> 대상 코드: `hancom/05_react/my-app/src/components/32/NameForm.jsx`

## 코드
```jsx
import {useState} from 'react'

const NameForm = () => {
    const [name, setName] = useState("")

    return (
        <>
        <input value={name} 
            onChange={(e) => setName(e.target.value)}
        />
        <p>안녕, {name}</p>
        </>
    )
}
```

## 헷갈렸던 지점 3가지 (오늘 짚어준 교정 내용)

1. **`value={name}`이 진짜 하는 일**
   - `{name}`이 `<p>`에서 갱신되는 건 `value={name}`이랑 무관하게(onChange가 state만 바꿔도) 잘 됨.
   - `value={name}`이 진짜 담당하는 건 **`<input>` 박스 자체가 보여주는 내용**을 state와 강제로 일치시키는 것.
   - 왜 필요한지 예시: 나중에 "지우기" 버튼으로 `setName("")` 하면, `value={name}`이 있어야 **입력창 안 글자도 실제로 사라짐.** 없으면 state는 바뀌어도 입력창은 브라우저가 자체 관리하는 값 그대로 남음.
   - 이게 "제어(controlled) 컴포넌트" = React state가 유일한 정답(single source of truth)이 되는 것.

2. **`e`는 "이전 값"이 아니라 이벤트 객체**
   - `e` = SyntheticEvent(이벤트 정보 뭉치), 값이 아님.
   - `e.target.value` = 그 순간 input 박스에 **이미 들어있는 전체 문자열**(브라우저가 키 입력을 이미 다 합쳐놓은 결과). "이전 값에 추가로 반영"하는 게 아니라 이미 완성된 새 값을 state로 복사하는 것뿐.

3. **`(e) => setName(e.target.value)`는 함수형(B)이 아니라 직접값(A)**
   - 화살표 함수가 두 겹이라 헷갈렸음:
     - 바깥 `(e) => {...}` = onChange 이벤트 핸들러 그 자체 (방식 A/B랑 무관, 그냥 이벤트 핸들러 문법)
     - 안쪽 `setName(e.target.value)` = `setName`에 **문자열 값**을 넘김 → 이건 방식 A(직접 값)
   - Counter 리셋 버튼(`onClick={() => setCount(0)}`)과 완전히 같은 모양: 바깥은 이벤트 핸들러, 안쪽은 직접 값.
   - 왜 A가 맞는지: `e.target.value`는 **이전 name에 의존하지 않는, 이미 완성된 값**이라서 함수형(`prev => ...`)이 필요 없음 (지난 Counter 학습의 "새 값이 이전 값에 의존하는가" 규칙과 연결).

## 다음에 이어서 할 것
- 위 3가지 교정 내용 다시 천천히 읽고 스스로 설명 가능한지 재확인.
- 이해되면 **응용 변형 문제**(이름 대신 다른 상황 — 예: 실시간 글자수 세기, 검색어 필터링, 대문자 자동 변환 등)를 하나 풀어보기.

## 오늘 배운 것과의 연결 (재사용 패턴)
- **제어 컴포넌트(`value` + `onChange`)** = 검색창, 로그인 폼, 댓글 입력 등 "입력값을 실시간으로 화면/로직에 반영"해야 하는 모든 곳에 재사용되는 기본 패턴.
- **방식 A(직접 값) vs 방식 B(함수형)** 구분 규칙 재확인: 새 값이 이전 값에 의존하면 B, 아니면 A. `setName(e.target.value)`도 이 규칙으로 설명됨 — [[02_header-usestate-toggle]] 메모의 useState 규칙과 같은 축.
