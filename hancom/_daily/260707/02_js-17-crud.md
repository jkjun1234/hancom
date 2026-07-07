# json-server로 CRUD 실습 — 프런트에서 서버 데이터 다뤄보기 (17)

오늘 마지막 실습은 서버 연동이었다. 지금까지는 화면 안에서만 값이 왔다 갔다 했는데, 이번엔 버튼을 누르면 **진짜 서버에 있는 데이터가 생기고, 읽히고, 바뀌고, 지워졌다.** 이걸 CRUD라고 부른다고 한다.

- **C**reate — 데이터 생성
- **R**ead — 데이터 읽기
- **U**pdate — 데이터 수정
- **D**elete — 데이터 삭제

진짜 백엔드 서버를 만들 순 없으니, `json-server`라는 걸로 가짜 서버를 흉내 냈다.

## 준비 — json-server 띄우기

먼저 이 폴더에서 아래를 실행해서 서버를 켜야 한다.

```bash
npm install
npx json-server db.json
```

`db.json` 안에는 사용자 두 명이 들어 있다. 이게 서버의 초기 데이터다.

```json
{
  "users": [
    { "id": 1, "name": "Kim" },
    { "id": 2, "name": "Lee" }
  ]
}
```

이렇게 켜두면 `/users` 주소로 이 데이터를 주고받을 수 있게 된다.

## 코드 한 줄씩 뜯어보기

핵심은 `fetch`다. 서버에 "이거 해줘"라고 요청을 보내고 결과를 받아오는 함수인데, 처음 보면 헷갈려서 한 줄씩 뜯어봤다.

### ① 준비하는 부분

```js
const out = document.querySelector("#out"); // 결과를 찍을 화면 칸
const API = "/api/users";                   // 서버 주소를 변수에 담아둠
```

- `out` — 결과를 보여줄 화면 요소를 미리 찾아둔 것.
- `API` — 서버 주소다. 매번 `"/api/users"`라고 길게 쓰기 귀찮으니 변수 하나에 담아두고 `API`라고 부르기로 했다.

### ② 결과를 보기 좋게 찍는 함수

```js
const show = (label, data) => {
  out.textContent = `${label}\n${JSON.stringify(data)}`;
};
```

- `label` — "READ 결과" 같은 제목 글자.
- `data` — 서버가 돌려준 데이터(객체나 배열).
- `JSON.stringify(data)` — 여기가 중요하다. 객체·배열은 그냥 화면에 찍으면 `[object Object]`처럼 이상하게 나온다. 그래서 **글자(JSON 문자열)로 바꿔주는** `JSON.stringify`를 거쳐야 사람이 읽을 수 있는 형태가 된다.

### ②-1. 키 순서를 맞춰주는 함수 (norm)

```js
const norm = (data) =>
  Array.isArray(data)
    ? data.map(u => ({ id: u.id, name: u.name }))
    : { id: data.id, name: data.name };
```

실습하다 보니 서버가 데이터를 돌려줄 때 **키 순서가 들쭉날쭉**했다. 어떤 땐 `{ id, name }` 순서로, 어떤 땐 순서가 바뀌어 와서 화면에 찍히는 모양이 계속 달라졌다. 그래서 화면에 찍기 전에 항상 `{ id, name }` 순서로 다시 맞춰주는 함수를 만들었다.

- `Array.isArray(data)` — 받은 게 **배열**인지(목록 조회) 아니면 **하나짜리 객체**인지(생성·수정 결과) 먼저 확인한다.
- 배열이면 `data.map(...)`으로 항목을 하나하나 `{ id, name }` 순서로 새로 만들고,
- 하나짜리면 그 자리에서 `{ id, name }` 순서로 정리한다.
- `조건 ? A : B` 는 삼항 연산자다. "조건이 참이면 A, 거짓이면 B"를 한 줄로 쓴 것. 여기선 "배열이면 이렇게, 아니면 저렇게"를 뜻한다.

이 `norm`을 거치면 READ든 CREATE든 결과가 **항상 `id` 먼저, `name` 나중** 순서로 나와서 보기 편하다. (아래 실행 화면들이 전부 `id`, `name` 순으로 깔끔하게 나오는 것도 이 함수 덕분이다.)

### ③ READ — 목록 읽기 (GET)

```js
document.querySelector("#btn-read").addEventListener("click", async () => {
  const res = await fetch(API);   // 서버에 "목록 줘" 요청 → 응답 기다림
  const users = await res.json();  // 응답을 실제 배열로 변환
  show("READ 결과", norm(users));  // 키 순서 맞춰서 화면에 출력
});
```

- `async () => { ... }` — 함수 앞에 `async`가 붙어 있다. 안에서 `await`를 쓰려면 반드시 이렇게 `async`를 붙여야 한다. (이유는 아래 동기/비동기에서.)
- `await fetch(API)` — 서버에 요청을 보내고 **응답이 올 때까지 기다린다.** 받은 응답 덩어리는 `res`에 담긴다.
- `await res.json()` — 응답 덩어리(`res`)를 실제로 쓸 수 있는 JS 배열로 바꾼다. 이 변환도 시간이 걸려서 `await`를 붙인다.
- `norm(users)` — 앞에서 만든 함수로 키 순서를 `id, name`으로 맞춰서 `show`에 넘긴다.
- `fetch`에 아무 옵션도 안 주면 기본이 **GET**(=읽기)이라, READ는 주소만 넘겨도 된다.

### ④ CREATE — 새로 만들기 (POST)

```js
document.querySelector("#btn-create").addEventListener("click", async () => {
  const res = await fetch(API, {
    method: "POST",                                  // "새로 만들어줘"
    headers: { "Content-Type": "application/json" }, // 보내는 게 JSON이라고 알림
    body: JSON.stringify({ name: "John" })           // 실제로 보낼 데이터
  });
  show("CREATE 결과", norm(await res.json())); // 만들어진 결과를 키 순서 맞춰 출력
});
```

- `method: "POST"` — 서버에 "이거 **새로 만들어줘**"라는 뜻.
- `headers: { "Content-Type": "application/json" }` — "지금 내가 보내는 데이터는 JSON 형식이야"라고 서버에 미리 알려주는 거다. 이게 없으면 서버가 데이터를 못 알아들을 수 있다.
- `body: JSON.stringify({ name: "John" })` — 진짜로 보낼 내용. 객체 `{ name: "John" }`를 `JSON.stringify`로 글자로 바꿔서 실어 보낸다. (받을 때 `res.json()`으로 풀었다면, 보낼 땐 반대로 `JSON.stringify`로 싼다고 이해했다.)
- `norm(await res.json())` — 서버가 돌려준 '만들어진 사용자'를 키 순서(`id, name`) 맞춰 화면에 찍는다.

### ⑤ UPDATE — 수정 (PUT)

```js
document.querySelector("#btn-update").addEventListener("click", async () => {
  const res = await fetch(`${API}/1`, {
    method: "PUT",                                   // "이걸로 바꿔줘"
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Jane" })           // 새 이름
  });
  show("UPDATE 결과", norm(await res.json()));       // 수정된 결과 출력
});
```

- `` `${API}/1` `` — 주소 뒤에 `/1`을 붙여서 **1번 사용자**를 콕 집는다. (`${API}`는 앞에서 만든 주소 변수.)
- `method: "PUT"` — "이 사용자를 이걸로 바꿔줘".
- `body`에 새 이름(`Jane`)을 실어 보낸다.
- 마지막 `show("UPDATE 결과", norm(await res.json()))` — 바뀐 결과를 키 순서 맞춰 화면에 찍는다.

### ⑥ DELETE — 삭제

```js
document.querySelector("#btn-delete").addEventListener("click", async () => {
  await fetch(`${API}/1`, { method: "DELETE" }); // 1번 사용자 삭제
  show("DELETE 결과", "1번 사용자 삭제됨");
});
```

- `/1` — 역시 1번 사용자를 지정.
- `method: "DELETE"` — "지워줘". 삭제는 딱히 돌려줄 데이터가 없어서(그래서 여기만 `norm`도 안 쓴다), 결과는 그냥 직접 문구("1번 사용자 삭제됨")로 찍었다.

정리하면 **`fetch` 하나로 `method`만 바꿔서 네 가지를 다 한다.** GET=읽기, POST=생성, PUT=수정, DELETE=삭제. 이 규칙이 딱 잡히니 코드가 한결 단순해 보였다.

## 눌러보며 데이터가 진짜 바뀌는지 확인하기

버튼을 그냥 한 번씩 누르는 것보다, **쓰기(생성·수정·삭제)를 한 다음 바로 READ로 목록을 다시 읽어서** 진짜 바뀌었는지 확인하는 식으로 해봤다. 그래야 "아, 서버 데이터가 실제로 변하는구나"가 눈에 보였다.

**1. 먼저 READ로 처음 상태 확인.** Kim, Lee 두 명이 있다.

<img src="C:/Users/jun/Desktop/블로그 업로드용 이미지/js17_s1_read.png" width="560" alt="처음 목록 - Kim, Lee">

**2. CREATE로 John 추가.** 방금 만들어진 John이 돌아왔다.

<img src="C:/Users/jun/Desktop/블로그 업로드용 이미지/js17_s2_create.png" width="560" alt="John 생성 결과">

**3. 다시 READ.** 목록에 John이 **진짜로 추가**됐다. (Kim, Lee, John 셋)

<img src="C:/Users/jun/Desktop/블로그 업로드용 이미지/js17_s3_read.png" width="560" alt="생성 후 목록 - Kim, Lee, John">

**4. UPDATE로 1번을 Jane으로.**

<img src="C:/Users/jun/Desktop/블로그 업로드용 이미지/js17_s4_update.png" width="560" alt="1번을 Jane으로 수정">

**5. 다시 READ.** 1번이던 Kim이 **Jane으로 바뀌어** 있다.

<img src="C:/Users/jun/Desktop/블로그 업로드용 이미지/js17_s5_read.png" width="560" alt="수정 후 목록 - Jane, Lee, John">

**6. DELETE로 1번 삭제.**

<img src="C:/Users/jun/Desktop/블로그 업로드용 이미지/js17_s6_delete.png" width="560" alt="1번 삭제">

**7. 다시 READ.** 1번(Jane)이 **사라지고** Lee, John만 남았다.

<img src="C:/Users/jun/Desktop/블로그 업로드용 이미지/js17_s7_read.png" width="560" alt="삭제 후 목록 - Lee, John">

이렇게 쓰기 → READ를 번갈아 하니, 버튼이 서버 데이터를 진짜로 바꾸고 있다는 게 확실히 보였다.

한 가지 놀란 건 CREATE 결과의 **id**였다. 나는 당연히 `3` 같은 숫자로 붙을 줄 알았는데 `"2hL3A8gjNx8"` 같은 **랜덤한 글자 id**가 나왔다. 찾아보니 요즘 json-server(v1 베타)는 id를 순서대로 매기지 않고 이렇게 랜덤 문자열로 준다고 한다. 예전 자료들은 숫자 id로 설명하는 게 많아서, 버전에 따라 다를 수 있다는 걸 알게 됐다.

## 동기 vs 비동기 — 카페로 이해해봤다

코드에 `async`랑 `await`가 계속 나오는데, 이게 **동기/비동기**랑 관련이 있다. 처음엔 무슨 말인지 몰라서 카페로 비유해봤더니 감이 좀 왔다.

- **동기(synchronous)**: 카페에서 주문하고, 커피가 나올 때까지 **계산대 앞에서 꼼짝 않고 기다리는 것.** 그동안 뒷사람은 주문도 못 한다. → 한 가지 일이 끝나야 다음 일로 넘어감.
- **비동기(asynchronous)**: 주문하고 **진동벨을 받아 자리에 앉아 다른 일을 하다가**, 벨이 울리면 그때 커피를 받으러 가는 것. → 오래 걸리는 일을 맡겨두고 일단 다른 걸 함.

서버에 요청을 보내는 건 "커피 만드는 시간"처럼 **시간이 좀 걸리는 일**이다. 만약 이걸 동기로 기다리면 그동안 화면 전체가 멈춰버린다(브라우저가 얼어붙음). 그래서 자바스크립트는 이런 걸 **비동기**로 처리한다. 요청을 보내놓고 일단 넘어갔다가, 결과가 오면 그때 이어서 처리하는 식이다.

### 그래서 await와 async가 필요하다

- `fetch()`는 결과를 **바로 주지 않고**, "나중에 줄게"라는 **약속(Promise)**을 먼저 준다. 카페의 진동벨 같은 거다.
- `await`는 그 약속 앞에 붙여서 **"약속이 지켜질 때까지(=결과가 실제로 올 때까지) 기다렸다가 다음 줄로 가"**라는 뜻이다.
- 그리고 `await`는 **`async` 함수 안에서만** 쓸 수 있다. 그래서 버튼 핸들러를 전부 `async () => { ... }`로 만든 거였다.

만약 `await`를 빼먹으면 어떻게 될까? 진동벨(약속)만 손에 쥔 채로 다음 줄이 실행돼버려서, 커피(실제 데이터) 대신 **벨을 화면에 찍게 된다.** 실제로 `res.json()` 앞에 `await`를 빼보면 데이터 대신 `[object Promise]` 같은 이상한 게 나온다. 그래서 "서버에서 뭔가 받아올 땐 `await`"가 거의 공식처럼 따라붙는 거였다.

솔직히 아직 완벽히는 모르겠다. 여러 요청이 동시에 갈 때 순서가 어떻게 되는지 같은 건 더 봐야 한다. 그래도 오늘 **"오래 걸리는 일은 맡겨두고 넘어갔다가, 결과가 필요할 때 `await`로 기다렸다 받는다"** 정도로 큰 그림은 잡았다.

## 정리

- **CRUD** = 생성·읽기·수정·삭제, 데이터를 다루는 기본 네 가지.
- **`fetch(주소, { method, headers, body })`** 하나로, `method`(POST/GET/PUT/DELETE)만 바꿔서 다 한다.
- 보낼 땐 `JSON.stringify`로 싸고, 받은 응답은 `await res.json()`으로 푼다.
- 서버가 키 순서를 뒤죽박죽 줄 때가 있어서, `norm()`으로 `{ id, name }` 순서를 맞춰서 찍었다.
- 서버 요청은 시간이 걸리니 **비동기**로 처리하고, 결과를 기다릴 땐 **`await`**(그 함수는 `async`).
- json-server는 진짜 백엔드 없이 CRUD를 연습하기 좋은 도구다. (버전에 따라 id 방식이 다를 수 있다는 것도 덤으로 배웠다.)

버튼 몇 개로 서버 데이터가 실제로 생기고 바뀌고 사라지는 걸 눈으로 보니, 이제야 "웹이 서버랑 대화한다"는 게 조금 실감 났다. 비동기는 아직 숙제로 남겨둔다.
