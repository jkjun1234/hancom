# 260714 세션 백업 — Groq 웹 챗봇 앱 (완성)

## 결과
07_groq 폴더에 실제로 동작하는 웹 챗봇을 완성함. 서버 실행 후 `http://localhost:3001/chatbot_index.html` 접속하면 Claude/Gemini 스타일 채팅 UI로 Groq와 대화 가능. Playwright로 실제 브라우저 구동해서 대화 왕복까지 확인 완료.

## 참고 교재
https://hancom-nine.vercel.app/claude-api.html → **03. 프론트 연결** 노드 (09_groq/03)

원본 구조 → 이 프로젝트 파일명 매핑:
- `server/index.js` → `chatbot_server.js`
- `client/index.html` → `chatbot_index.html`
- `client/app.js` → `chatbot_app.js` (+ 스타일은 `chatbot_style.css`로 분리 추가)

## 최종 파일 구성
- `chatbot_server.js` — Express 프록시 서버 (포트 3001)
- `chatbot_index.html` — 채팅 UI 뼈대
- `chatbot_style.css` — 채팅 버블 스타일 (Claude/Gemini 느낌)
- `chatbot_app.js` — 프론트 로직 (대화 상태관리, fetch, 렌더링)

## 오늘 진행 경위
1. **직접 타이핑 구간 (튜터 모드)**: `chatbot_server.js`의 뼈대(require, `app.listen`, 테스트 라우트, `cors`/`express.json`, `dotenv`)까지는 힌트만 받아 직접 작성함.
2. **직접 겪은 실전 디버깅**:
   - 라우트 경로에 슬래시(`/`) 빠뜨림 → `Cannot POST /api/chat` 에러
   - 코드를 고친 뒤 서버를 재시작 안 해서 옛날 코드가 계속 응답함 (Node는 파일 변경을 자동 감지하지 않음 — nodemon 없으면 수동으로 껐다 켜야 함)
   - PowerShell에서 `curl -X POST ...`가 에러남 → PowerShell의 `curl`은 `Invoke-WebRequest` 별칭이라 `-X` 옵션 문법이 다름. `curl.exe`(진짜 curl.exe) 또는 `Invoke-RestMethod -Method Post`를 써야 함.
3. **시간이 촉박해져서 이 시점부터 AI가 나머지(Groq 실제 연결 + 전체 채팅 UI)를 완성함** (튜터 모드의 "마감 임박 예외" 적용).

## 완성 코드 핵심 포인트

### chatbot_server.js
- `req.body.messages` — 프론트가 **지금까지의 대화 전체(배열)**를 매번 통째로 보내고, 서버는 그걸 그대로 Groq에 전달함 → 이래야 AI가 이전 대화 맥락을 기억함. (단발성 `prompt` 문자열 하나만 보내던 교재 원본 구조에서 한 단계 업그레이드한 부분)
- `app.use(express.static(__dirname))` — 같은 폴더의 html/js/css를 서버가 그대로 서빙해줌. 그래서 파일을 더블클릭해서 여는 대신 `http://localhost:3001/chatbot_index.html`로 접속 가능.
- `try/catch`로 Groq 호출이 실패해도 서버가 죽지 않고 에러 응답을 보내도록 처리.

### chatbot_app.js
- `messages` 배열이 대화 상태(state) 그 자체. 메시지가 생길 때마다 배열에 push하고 `renderMessages()`가 화면을 통째로 다시 그림.
- "생각 중..." 로딩 버블은 `messages` 배열에는 안 넣고 DOM에만 임시로 붙였다가, 다음 렌더링 때(`chatEl.innerHTML = ''`) 자연스럽게 사라지게 처리.
- Enter = 전송, Shift+Enter = 줄바꿈 (`keydown` 이벤트에서 `e.shiftKey`로 분기).

## 실행 방법 (집에서 이어할 때)
1. `cd hancom/07_groq`
2. `npm install` (express, cors, dotenv — 이미 package.json에 반영돼 있음)
3. `.env`에 `GROQ_API_KEY` 있는지 확인
4. `node chatbot_server.js`
5. 브라우저에서 `http://localhost:3001/chatbot_index.html` 접속

## 학습 포인트 — curl 한글 깨짐
Windows Git Bash에서 `curl -d '{"content":"한글..."}'`로 테스트했을 때 응답의 한글이 깨져 보였음. 이건 Git Bash가 명령줄 인자를 시스템 코드페이지(CP949)로 변환하면서 생긴 **테스트 도구 쪽 문제**였고, 실제 브라우저의 `fetch`/`JSON.stringify`는 항상 UTF-8로 정확히 인코딩하기 때문에 실제 서비스에는 영향 없음. (Playwright로 실제 브라우저 열어서 확인하니 한글 정상 출력됨)

## 다음에 이어서 볼 만한 것 (선택)
- 교재 원본은 `prompt` 하나만 보내는 단발성 구조였는데, 지금은 `messages` 배열 전체를 보내는 멀티턴 구조로 바꾼 부분 — 왜 그렇게 바꿔야 했는지 한번 되짚어보면 좋음
- "새 대화 시작" 버튼은 아직 없음 (필요하면 `messages.length = 0` 후 재렌더링으로 추가 가능)
- 블로그 정리는 별도 단계로 진행 예정
