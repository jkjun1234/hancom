# 웹 개발 11일차 (1) — Node·Express 서버 첫걸음, GET·POST로 프론트와 대화하기

> 지금까지 HTML·CSS·JS에 React까지, 화면 그리는 프론트엔드 쪽만 만졌었는데 오늘부터는 방향을 바꿔서 **서버(Node·Express)**를 다뤄보기로 했다.
> 그동안은 화면에 보여줄 가짜 데이터를 그냥 코드 안에 박아놓고 썼는데, 오늘 보니 그 데이터를 "누가, 어디서, 어떻게 보내주는지"가 서버의 역할이더라. GET으로 값 꺼내오는 것부터, 진짜로 다른 컴퓨터와 메시지를 주고받는 것까지 해봤다.

---

## 0. 오늘의 요약

- **프로젝트 세팅**: `npm init -y`로 `package.json` 생성 → `express` 설치까지 서버 프로젝트 첫 세팅.
- **GET(고정 주소)**: `app.get('/api/users', ...)`로 항상 같은 주소에 전체 목록을 JSON으로 응답하는 가장 기본적인 API.
- **GET(변하는 주소, `:id`)**: URL 뒤에 붙는 값(`req.params`)으로 배열에서 특정 유저 하나만 찾아 응답하는 법.
- **POST + fetch**: 프론트가 `fetch`로 서버에 문장을 "보내고", 서버는 `req.body`로 그걸 "받아서" 다시 응답까지 돌려주는 실전 통신.

---

## 1. 프로젝트 세팅

![](https://velog.velcdn.com/images/developjkj/post/c903d09f-39ed-4599-a217-57b56578f368/image.png)

위 이미지처럼 폴더를 만든 후 `index_04.js` 파일을 생성했다. 그 후 `06_node_express` 폴더에서 `cmd`로 아래 명령어를 순서대로 실행했다.

```
> npm init -y
> npm install
> npm install express
```

- `npm init -y`: 이 폴더가 "node 프로젝트"라는 걸 알려주는 설정 파일 `package.json`을 (질문 없이 `-y`로) 자동 생성한다.
- `npm install`: `package.json`에 적힌 대로 의존성을 설치한다(지금은 아직 아무것도 안 적혀 있어서 사실상 할 일이 없다).
- `npm install express`: 서버 프레임워크 **express**를 내려받고 `package.json`의 `dependencies`에 등록한다. 여기서부터 `require('express')`가 가능해진다.

---

## 2. 서버를 통해 값 받아오기 (GET, 고정 주소)

![](https://velog.velcdn.com/images/developjkj/post/06e9a27a-415a-46a3-8b52-123a5592fcb9/image.png)

이미지처럼 `index_04.js` 파일 코드를 작성해줬다.

```js
const express = require('express')  // 1. 서버 꺼내기 
const app = express()   // 2. 서버 만들기

// 고정 주소로 GET 요청오면 전체 목록 응답
app.get('/api/users', (req, res) => { // req=요청, res=응답
    res.json([
        // 배열-> josn 등답( 날 데이터, 디자인 X )
        {id: 1, name: '길동'},
        {id: 2, name: 'Tom'}
    ])
})

app.listen(3000, () => console.log('http://localhost:3000')) // 문열기
```

한 줄씩 보면:
- `require('express')`로 express 라이브러리를 불러오고, `express()`를 호출해서 `app`이라는 서버 인스턴스를 만든다.
- `app.get('주소', 콜백)`은 "이 주소로 **GET** 요청이 오면 이 함수를 실행해라"는 규칙(라우트)이다. 콜백은 항상 `(req, res)` 두 개를 받는데, `req`는 브라우저가 보낸 요청 정보, `res`는 내가 돌려줄 응답이다.
- `res.json(배열이나 객체)`는 그 데이터를 JSON 문자열로 바꿔서 응답으로 보내준다. 브라우저 주소창에 `http://localhost:3000/api/users`를 직접 쳐서 들어가도 GET 요청이라 바로 확인할 수 있다.
- `app.listen(포트, 콜백)`은 그 포트 번호로 "문을 열고" 요청을 기다리기 시작한다. 콜백은 서버가 켜지자마자 딱 한 번 실행된다.

요점은 **주소가 항상 똑같다**는 것 — `/api/users`로 몇 번을 요청해도 같은 배열이 돌아온다.

---

## 3. 서버에 있는 유저 목록에서 값을 찾아오기 (GET, `:id`)

```js
const express = require('express')
const app = express()

// 유저 목록 - 실무에선 DB에 저장(지금은 테스트로 간단한 배열로 확인)
const users = [
    {id: 1, name: '지니'},
    {id: 2, name: '철수'},
    {id: 3, name: '영희'}
]

// :id 로 모록에서 그 번호 유저 찾기 (/api/users/3 -> 영희)
app.get('/api/users/:id', (req, res) => {
    // params 는 문제열 3 -> Number로 숫자 3
    const user = users.find(u => u.id === Number(req.params.id)) 

    // 목록에 없으면 404 (/api/users/9)
    if(!user) return res.status(404).json({ error: '없는 유저' }) 

    res.json(user) // 찾은 유저 응답 { id:3, name: '영희' }
})

// 3000번 포트로 요청을 받겠다는 의미
app.listen(3000, () => console.log('http://localhost:3000'))
```

여기서 새로 나온 게 `:id`다.
- 주소에 `:id`처럼 콜론을 붙이면 "이 자리엔 아무 값이나 들어올 수 있는 변수"라는 뜻이 된다. `/api/users/3`으로 요청하면 express가 알아서 `req.params.id`에 `'3'`을 담아준다.
- 근데 이때 `req.params.id`는 **문자열** `'3'`이다. 배열 안 `id: 3`은 **숫자**라서, `Number(req.params.id)`로 타입을 맞춰줘야 `find`가 제대로 비교(`===`)된다. "주소창에 적힌 건 결국 다 글자"라고 생각하니 이해가 됐다.
- 목록에 없는 id(예: `/api/users/9`)로 요청하면 `users.find`가 `undefined`를 리턴하니까, `if(!user)`로 걸러서 `res.status(404)`(못 찾았다는 표준 상태 코드)로 응답한다. 이 체크가 없으면 없는 유저를 요청했을 때 서버가 이상한 값을 그대로 돌려주게 된다.

이후 터미널에서

```
> node ./index_05.js
```

로 해당 파일을 실행해주면 서버가 실행되고, `http://localhost:3000/api/users/`에 접속해서 원하는 id 숫자를 입력하면 아래 이미지처럼 데이터를 읽어올 수 있다.

![](https://velog.velcdn.com/images/developjkj/post/55495bbe-0c3b-4b2a-84e1-c4975aec5141/image.png)

---

## 4. 다른 사람(server ↔ front)과 메시지를 주고받기 (POST)

이번엔 다른 컴퓨터의 서버에 접속하여 메시지를 보내고 서로 통신이 되는 것을 확인하는 실습을 해봤다. 지금까지는 GET으로 "달라는 대로 받기"만 했다면, 이번엔 **POST로 "내가 만든 데이터를 보내기"**까지 해본 거라 체감이 확 달랐다.

### 서버 (Server)

관리자 권한 `cmd` 창을 켜서, 서버가 3000번 포트로 들어오는 요청을 받을 수 있게 방화벽을 풀어준다(서버 쪽 컴퓨터에서만 실행).

```
> netsh advfirewall firewall add rule name="Node 3000" dir=in action=allow protocol=TCP localport=3000
```

```js
// 서버측 코드 (index_06_server.js)

const express = require('express')
const app = express()

app.use(express.json())   // 必 — 보낸 JSON을 req.body로 풀어줌 (없으면 undefined)

// POST = 프론트가 보낸 메시지 받는 자리 (주소창으론 못 옴)
app.post('/api/chat', (req, res) => {
  const { message } = req.body          // 받기 — 보내온 문장 꺼냄
  console.log('받은 메시지:', message)        // 서버 터미널에 찍힘
  res.json({ ok: true, 받은문장: message })   // 답장 — '잘 받았다' 확인(영수증)
})

app.listen(3000, () => console.log('http://서버측 ip(ipconfig로 확인)/:3000'))
```

여기서 핵심은 두 가지다.

1. **`app.use(express.json())`** — 이게 없으면 `req.body`가 그냥 `undefined`다. 프론트가 보낸 건 사실 그냥 텍스트(JSON 문자열)라서, express가 이 미들웨어를 거쳐야 그 텍스트를 진짜 JS 객체로 "풀어서" `req.body`에 넣어준다. 이 줄 하나 빼먹고 `req.body.message`를 읽으려다 에러 나는 경우가 흔하다고 해서 주석에도 `必`(반드시)이라고 강조돼 있다.
2. **GET과 다르게 POST는 주소창으로 못 들어간다** — GET은 주소 자체에 정보가 다 담기지만, POST는 눈에 안 보이는 `body`에 데이터를 실어 보내기 때문에, 브라우저 주소창에 쳐서 확인할 방법이 없다. 그래서 프론트 쪽에서 `fetch`로 직접 요청을 만들어 보내야 한다.

서버를 실행해두고 기다리면, 프론트에서 보낸 메시지가 서버 터미널에 아래 이미지처럼 찍힌다.

![](https://velog.velcdn.com/images/developjkj/post/c9c37035-5c3f-4e15-8b1b-07d62a7e1932/image.png)

### 프론트 (Front)

```js
// 터미널에 물어보고 → 내가 입력한 문장을 서버로 보냄
const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question('메시지: ', (message) => {   // ← 입력받기 (엔터 치면 message에 담김)
  fetch('http://192.168.20.10:3000/api/chat', {
    method: 'POST',                              // POST로 보냄 (GET은 body 못 실음)
    headers: { 'Content-Type': 'application/json' },   // "JSON 보낸다" 알림
    body: JSON.stringify({ message })             // 입력한 문장 → 문자열로 변환
  })
    .then(r => r.json())   // 서버 응답 받기 (JSON → 객체)
    .then(console.log)        // { ok: true, 받은문장: '...' } 확인
    .catch(() => console.log('❌ 서버 먼저 켜기 (node index.js)'))
    .finally(() => rl.close())   // 입력창 닫기
})
```

`fetch` + `.then` 부분이 아직 손에 잘 안 익어서, 한 줄씩 풀어봤다.

1. **`readline`으로 입력받기** — 브라우저가 아니라 터미널에서 실행하는 코드라서, `rl.question('메시지: ', (message) => {...})`로 사용자가 엔터를 칠 때까지 기다렸다가, 입력한 문장을 `message`에 담아 콜백을 실행한다.
2. **`fetch(주소, 옵션)`** — 첫 번째 인자는 요청 보낼 주소, 두 번째 인자(`{ method, headers, body }`)가 "어떻게 보낼지"를 정한다.
   - `method: 'POST'` — GET이 아니라 POST로 보낸다는 선언.
   - `headers: { 'Content-Type': 'application/json' }` — "내가 지금 보내는 건 JSON 형식이야"라고 서버에 미리 알려주는 꼬리표. 이게 없으면 서버가 body를 어떤 형식으로 풀어야 할지 헷갈릴 수 있다.
   - `body: JSON.stringify({ message })` — body에는 문자열만 실을 수 있어서, JS 객체 `{ message }`를 `JSON.stringify`로 문자열로 바꿔서 넣는다. 서버 쪽 `express.json()`이 이걸 다시 객체로 풀어주는 거였다.
3. **`fetch`는 결과를 바로 안 주고 Promise(나중에 온다는 약속표)를 리턴**한다. 그래서 결과를 쓰려면 `.then()`으로 이어 붙여야 한다.
   - `.then(r => r.json())` — 첫 번째 `.then`. 서버가 준 응답(`r`)에서 실제 내용을 꺼내는 것도 또 비동기라서, `r.json()`도 Promise를 리턴한다. 그래서 이 결과를 쓰려면 `.then`을 한 번 더 붙여야 한다.
   - `.then(console.log)` — 두 번째 `.then`. 여기서 드디어 진짜 데이터(`{ ok: true, 받은문장: '...' }`)가 손에 들어와서 그걸 출력한다.
   - `.catch(...)` — 중간에 서버가 꺼져있거나 네트워크가 끊기는 등 뭔가 실패하면 이쪽으로 빠진다.
   - `.finally(...)` — 성공하든 실패하든 마지막에 무조건 한 번 실행된다. 여기선 입력창(`rl`)을 닫아서 프로그램을 끝낸다.

정리하면 `.then`이 여러 번 이어지는 이유는 "응답 받기"와 "그 응답을 JSON으로 바꾸기"가 **둘 다 각각 비동기 작업**이라서다. `fetch(...).then(r => r.json()).then(data => ...)`이 통신 코드에서 계속 반복되는 패턴이니, 이 구조만 외워두면 나중에 어떤 API를 붙이든 응용할 수 있을 것 같다.

> #### 실행 전 fetch에서 요청하려는 주소는 서버측의 주소여야 함

실행은:

```
> node .\index_06_front.js
```

메시지를 전송하면 받은 문장과 결과 값을 아래처럼 확인할 수 있다.

![](https://velog.velcdn.com/images/developjkj/post/29f31a83-cae6-4cf4-b773-ce5c0b63b31d/image.png)

---

## 오늘의 재사용 메모 (다음 나에게)

- ✅ **GET 고정 주소**: `app.get('/api/users', (req,res)=>res.json(...))` — 항상 같은 데이터를 주는 가장 단순한 API
- ✅ **GET + `:id`**: `req.params.id`는 항상 문자열 → `Number()`로 변환해서 비교, 없으면 `res.status(404)`
- ✅ **POST 받기**: `app.use(express.json())` 없으면 `req.body`는 `undefined`
- ✅ **POST 보내기(fetch)**: `method`, `headers: {Content-Type: application/json}`, `body: JSON.stringify(...)` 세트로 기억
- ✅ **`fetch(...).then(r=>r.json()).then(data=>...)`**: 응답 받기 + JSON 변환이 각각 비동기라서 `.then`이 두 번 이어짐

---

## 마무리 + 다음 글 예고

GET으로 값 꺼내오는 거야 프론트에서 이미 많이 해봐서 익숙했는데, POST로 직접 메시지를 "보내는" 쪽을 만들어보니까 서버-프론트가 실제로 대화하는 느낌이 들어서 재밌었다. 특히 `fetch`의 `.then` 체이닝이 왜 여러 번 이어지는지 이번에 제대로 이해하고 넘어간 것 같다.

다음 글(11일차 (2))에서는 오늘 만든 유저 목록을 가지고 **PUT으로 수정하고, DELETE로 지우고, CORS 미들웨어까지** 이어서 정리한다.
