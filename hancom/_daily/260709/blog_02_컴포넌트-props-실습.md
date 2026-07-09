# 웹 개발 8일차 (3) — 드디어 내 손으로 컴포넌트 만들기 (feat. Props & 삽질기)

> 1편에서 React 폴더 구조를 다 뜯어봤으니, 이번엔 실전이다.
> 오늘 `App.jsx` 안에서 **직접 부품(컴포넌트)을 만들고 → Props로 값을 넘기고 → 조건에 따라 다르게 보여주기**까지 실습했다.
> 잘 된 것도, 삽질한 것도 다 적어봄. (삽질이 사실 제일 기억에 남음ㅋㅋ)

> 🖼️ **이미지 자리** — 글 대표 썸네일. `components/` 폴더 안에 `18`, `19`, `20`, `21`, `22`, `23` 번호 폴더들이 쭉 있는 탐색기 스크린샷. (오늘 만든 부품들 한눈에)

---

## 0. 근데 컴포넌트를 왜 써? (16)

컴포넌트 배우기 전에, "React를 왜 쓰냐"부터 짚었다. 교재 예시가 명확했다.

> 화면 **N곳**에 같은 숫자가 표시될 때
> - 기존 JS: 값 바꾸려면 **N곳을 다 찾아서** 수정 (놓치면 버그)
> - React: **한 곳(데이터)만** 바꾸면 N곳이 알아서 같이 바뀜

즉 컴포넌트는 **"화면을 레고 블록처럼 조립하는 도구"** 다. 같은 블록을 여러 번 재사용하고, 데이터 한 곳만 관리하면 되는 것.

진행 방식은 이렇게 잡았다 (15):
1. `components/*.jsx` 로 **부품**을 만든다
2. `App.jsx` 에서 `import` 해서 **조립**한다

---

## 1. 첫 컴포넌트 만들기 — Hello (17)

기본으로 있던 `App.jsx` 내용을 싹 비우고, `components/` 폴더에 첫 부품을 만들었다.

```jsx
// components/18/Hello.jsx
const Hello = () => {
  return (
    <div className="box">
      <h1>안녕!</h1>
      <p>반가워요~!</p>
    </div>
  )
}

export default Hello
```

여기서 배운 규칙 ★
- **함수 하나가 JSX를 return** 하면 그게 부품이다.
- 이름은 **반드시 대문자로 시작** (`Hello` ⭕ / `hello` ❌). 소문자면 React가 그냥 HTML 태그로 오해함.
- 맨 아래 `export default Hello` 로 **내보내야** 다른 파일에서 쓸 수 있다.

그리고 `App.jsx`에서 불러서 조립:

```jsx
import Hello from './components/18/Hello.jsx'

function App() {
  return (
    <>
      <Hello />
    </>
  )
}
```

`<Hello />` 이렇게 태그처럼 쓰면 끝. 1편에서 봤던 `main.jsx → App.jsx` 연결 방식(`import` + 태그)이 **`App.jsx → Hello.jsx`에도 똑같이** 적용된다는 게 포인트였다.

> 🖼️ **이미지 자리** — "안녕! / 반가워요~!"가 뜬 실제 브라우저 화면 스크린샷.

---

## 2. 컴포넌트 + CSS 붙이기 (18)

부품에 스타일을 입혔다. 방식은 **부품 옆에 같은 이름의 `.css`를 만들고, 파일 맨 위에서 import**.

```jsx
// Hello.jsx 맨 위에
import './Hello.css'
```

```css
/* Hello.css — Hello.jsx의 className="box"와 연결 */
.box {
  padding: 20px;
  background: #f3e8ff;
  border-radius: 12px;
  text-align: center;
}
.box h1 {
  color: #aa3bff;   /* box 안 h1만 보라색 */
}
```

여기서 새로 안 것 ★
- React에서는 HTML의 `class` 대신 **`className`** 을 쓴다. (`class`가 JS 예약어라서 충돌 방지)
- 그리고 `.css` 파일을 컴포넌트에서 import하면 그 부품 전용 스타일이 된다 → 1편에서 정리한 "컴포넌트마다 각자 css" 패턴이 여기서 실제로 나옴.

---

## 3. Props 등장 — 부모가 자식한테 값 넘기기 (19)

이제 진짜 핵심, **Props**. 같은 부품인데 안에 들어갈 값만 바꾸고 싶을 때 쓴다.

```jsx
// components/19/Greeting.jsx
const Greeting = ({ name }) => {
  return (
    <>
      <h1>Hello~! {name}!</h1>
    </>
  )
}

export default Greeting
```

```jsx
// App.jsx — 같은 부품을 값만 바꿔 두 번!
<Greeting name="React" />
<Greeting name="기준" />
```

이해한 규칙 ★
- **Props = 부모가 자식에게 넘기는 값.**
- **읽기 전용**이고, **위 → 아래로만** 흐른다. (자식이 맘대로 못 바꿈)
- JSX 안에서 `{name}` 처럼 **중괄호**를 쓰면 JS 값이 그 자리에 꽂힌다.

같은 `Greeting` 부품 하나로 "Hello~! React!" / "Hello~! 기준!" 두 개가 나오는 게 신기했음. 이게 레고 블록 재사용이구나 싶었다.

> 🖼️ **이미지 자리** — `Greeting`을 두 번 불러서 서로 다른 인사말 두 줄이 나온 화면 스크린샷.

---

## 4. Props 기본값 설정 — Profile (20)

Props를 안 넘겼을 때 쓸 **기본값**을 정할 수 있다.

```jsx
// components/20/Profile.jsx
const Profile = ({ name, job = "개발자" }) => {   // job 생략 시 "개발자"
  return (
    <div>
      <h3>{name}</h3>
      <p>직업 : {job}</p>
    </div>
  )
}

export default Profile
```

```jsx
<Profile name="지니" job="프론트엔드" />   // job 넘김 → 프론트엔드
<Profile name="이디자인" />                // job 생략 → 개발자(기본값)
```

`= "개발자"` 이렇게 매개변수에 기본값을 넣어두면, 안 넘겼을 때 알아서 채워진다.

### 💥 삽질 기록 1 — `export default` 빼먹음

이때 `export default Profile` 을 안 써서 ESLint가 함수 이름에 빨간 줄을 그었다. "어? 코드는 멀쩡한데 왜 에러지?" 하고 한참 봤는데, **내보내기(export)를 안 하니까** App.jsx에서 못 불러오는 거였음. 원인 직접 찾아서 해결. (앞으로 컴포넌트 만들면 맨 아래 `export default` 부터 챙기자)

---

## 5. 여러 Props 조합 — Card (21)

Props를 한 번에 여러 개 넘기는 실습. 카드 UI를 만들었다.

```jsx
// components/21/Card.jsx
import './Card.css'

const Card = ({ title, desc, emoji }) => {
  return (
    <div className="card">
      <span>{title}</span>
      <h3>{desc}</h3>
      <p>{emoji}</p>
    </div>
  )
}

export default Card
```

```jsx
<Card title="React 잘하기" desc="기초부터 차근차근" emoji="헤헤" />
```

같은 틀(Card)에 값만 바꿔 넣으면 카드가 계속 찍혀 나온다. 컴포넌트의 재사용성이 확 와닿는 부분.

근데… 이 CSS 꾸미다가 **삽질을 제대로 했다.** (오늘 배운 것 중 제일 기억에 남는 파트)

### 💥 삽질 기록 2 — CSS 3종 세트

**(1) `display: column` / `display: row` 는 존재하지 않는다**
```css
/* ❌ 내가 쓴 것 */
.card { display: column; }
```
`row`, `column`은 `display` 값이 아니라 **`flex-direction`의 값**이다. 올바른 건:
```css
/* ⭕ */
.card { display: flex; flex-direction: column; }
```
이거 한 번도 아니고 `display: row` → `display: column` **두 번 반복**해서 착각함. (다음에도 헷갈릴 것 같아서 크게 적어둔다 ★)

**(2) `border` 축약은 `두께 스타일 색상` 순서 — 스타일 빠지면 안 그려짐**
```css
/* ❌ */
border: 100px;
border-color: aquamarine;
/* → 아무것도 안 보임! */
```
`border`는 `두께 스타일 색상` 순서인데, **`solid` 같은 스타일이 빠지면 기본값이 `none`** 이라 두께·색을 줘도 테두리가 안 그려진다.
```css
/* ⭕ */
border: 3px solid aquamarine;
```

**(3) `background` vs `background-color`**
`background`는 색·이미지·포지션을 한 번에 넣는 축약 속성이라, 이미 `background-image`가 있는데 `background: color;`를 다시 쓰면 **이미지가 초기화돼서 사라진다.** 색만 바꿀 거면 `background-color`를 쓰는 게 안전.

> 🖼️ **이미지 자리** — "삽질 → 수정" 비교 스크린샷 2장. (테두리 안 보이던 카드 vs `solid` 넣고 제대로 나온 카드)

---

## 6. 조건부 렌더링 — Avatar (22)

이제 **조건에 따라 화면을 다르게** 보여주기. 온라인이면 ⭐, 오프라인이면 😴.

```jsx
// components/22/Avatar.jsx
const Avatar = ({ name, online }) => {
  return (
    <div className="friends-box">
      <h3>{name}</h3>
      {online ? <p>⭐</p> : <p>😴</p>}   {/* 삼항연산자로 둘 중 하나 */}
    </div>
  )
}
```

```jsx
<Avatar name="정기준" online={true} />
<Avatar name="기준"   online={false} />
```

`{ 조건 ? A : B }` — **삼항연산자**로 참이면 A, 거짓이면 B를 그린다. 첫 시도에 한 번에 됨! (뿌듯)

### ★ 오늘 제일 중요한 깨달음 — boolean은 `{}` 로 넘겨라

`online={true}` 처럼 **중괄호**로 넘겨야 진짜 boolean이 간다.
만약 `online="false"` 처럼 **문자열**로 넘기면?

> JS에서 `"false"`는 빈 문자열이 아니라서 **truthy(참)** 취급 → 조건이 **항상 참 쪽**으로 감. 😱

JS에서 거짓(falsy)인 값은 딱 6개뿐이다:
```
false, 0, "", null, undefined, NaN
```
이 6개 빼고는 **전부 참(truthy)**. `"false"`도 참이라는 게 함정. (이거 이해하고 나니까 조건부 렌더링이 왜 이상하게 동작했는지 다 설명됨)

> 🖼️ **이미지 자리** — 친구 목록에 온라인(⭐)/오프라인(😴)이 섞여 나온 화면 스크린샷.

---

## 7. 삼항으로 스타일 바꾸기 — Badge (23)

마지막. `type` 값에 따라 뱃지 색을 바꾸는 부품.

```jsx
// components/23/Badge.jsx
const Badge = ({ text, type }) => {
  const color = type === 'new' ? 'green' : 'crimson'   // new면 초록, 아니면 빨강
  return <span style={{ backgroundColor: color, color: '#fff' }}>{text}</span>
}

export default Badge
```

- `type === 'new' ? 'green' : 'crimson'` → **삼항 = 조건 한 줄로 둘 중 하나 고르기.**
- JSX에서 인라인 스타일은 `style={{ ... }}` 처럼 **중괄호 2개**(객체) 로 넣는다.

시간이 부족해서 빠르게 넘어갔지만, App.jsx에 연결까지는 직접 처리했다.

---

## 오늘의 삽질 & 재사용 메모 (다음 나에게)

앞으로 또 헷갈릴까 봐 핵심만 박제해둔다 ★

- ✅ **컴포넌트 이름은 대문자로**, 맨 아래 **`export default` 필수**
- ✅ **boolean prop은 `{}` 로** 넘기기 (`"false"`는 참이라 조건 무의미해짐)
- ✅ **falsy는 딱 6개**: `false, 0, "", null, undefined, NaN` — 나머지 전부 참
- ✅ **`display`에 `row`/`column` 없음** → `display:flex` + `flex-direction`
- ✅ **`border` 축약 = 두께 스타일 색상**, `solid` 빠지면 안 보임
- ✅ **Props는 읽기 전용 · 부모→자식 단방향**

---

## 마무리 + 내일 예고

컴포넌트 → Props → 기본값 → 여러 개 → 조건부 렌더링(삼항/`&&`)까지, **부품을 만들고 값을 넘겨 조립**하는 흐름을 오늘 쭉 훑었다. 삽질도 많았지만 그만큼 "왜 안 되는지"를 알게 돼서 오히려 남는 게 많았던 하루~

내일은 **`type`이 여러 개일 때 `if` 떡칠 대신 객체로 깔끔하게 관리하는 "객체 매핑"(24 Alert)** 과, **배열을 `.map()`으로 돌려서 컴포넌트를 리스트로 뽑아내는** 걸 배울 예정이다. Avatar/Badge를 하나하나 손으로 부르는 대신 데이터 배열 하나로 관리하는 거라는데… 벌써 좀 기대됨.

> 뭔가 알 것 같으면서도 아직 손에 안 붙은 느낌. 근데 이제 "빈 화면에 내 부품을 만들어 끼워넣는다"는 감은 확실히 잡혔다. 계속 가보자~ 🚀
