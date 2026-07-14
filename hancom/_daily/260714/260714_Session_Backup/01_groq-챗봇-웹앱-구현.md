# 260714 세션 백업 — Groq 웹 챗봇 앱 구현

## 목표
07_groq 폴더의 CLI 스크립트(index.js, 콘솔에 한 번 출력하고 끝)를 **웹에서 대화하는 챗봇 앱**으로 확장.

## 참고 교재
https://hancom-nine.vercel.app/claude-api.html → **03. 프론트 연결** 노드 (09_groq/03)

원본 구조 → 이 프로젝트 파일명 매핑:
- `server/index.js` → `chatbot_server.js`
- `client/index.html` → `chatbot_index.html`
- `client/app.js` → `chatbot_app.js`

**진행 방식 합의**: 교재에 완성 코드가 있지만, 전체 코드를 바로 받지 않고 **힌트만 받아 직접 타이핑**하는 방식으로 진행하기로 함 (튜터 모드).

## 진행 스타일 (다음 세션에서도 유지)
- 코딩 실습은 전체 코드 대신 개념 설명 + 힌트 + 단계 제시로 진행 (튜터 모드)
- 응답은 **아주 짧게, 한 번에 한 스텝(코드 몇 줄)씩만**. 장문 설명 지양 — 사용자가 직접 명시적으로 요청한 스타일
- "다음"이라고 하면 다음 스텝 제공
- 입문자 눈높이 설명을 요청하면 쉬운 말로 풀어주되, 길이는 여전히 짧게 유지

## 현재 진행 상황

### chatbot_server.js — 작성 중
현재 파일 내용 그대로:
```js
// express 사용
const express = require('express')
const app = express()

app.listen(3001, () => console.log('http://localhost:3001'))

app.post('api/chat', (req, res) => {
    res.json({reply: 'test'})
})
```

**다음 세션 시작 시 확인할 것**:
- `express`, `cors` 패키지가 아직 `node_modules`/`package.json`에 안 보임 (package.json엔 `dotenv`만 있음). `npm install express cors` 실행 여부 확인 필요.
- `curl -X POST http://localhost:3001/api/chat` 테스트 결과를 대화 중 아직 확인 못한 채로 세션 저장됨. 안 되면 먼저 여기부터 디버깅.

### chatbot_index.html — 아직 시작 안 함
### chatbot_app.js — 아직 시작 안 함

## 다음 단계 계획 (순서대로)
1. express/cors 설치 확인 → curl 테스트 통과 확인 (라우트가 정상 응답하는지)
2. `chatbot_server.js`: 테스트용 `res.json({reply:'test'})`를 실제 Groq 호출로 교체
   - 기존 `index.js`의 fetch 로직 재사용
   - `req.body.prompt`로 사용자 질문 받도록 수정
   - `cors()` + `express.json()` 미들웨어 추가 필요 (참고: [06_node_express/index_09.js](../../../06_node_express/index_09.js)에 동일 패턴 있음)
3. `chatbot_index.html`: input(#q) + button(#btn) + 응답 표시 영역(#ans) 뼈대 작성
4. `chatbot_app.js`: 버튼 클릭 → fetch(POST `/api/chat`) → 화면에 응답 반영 로직 작성
5. 세 파일 연결 테스트 (서버 실행 + 브라우저 확인)

## 참고 원본 파일
- [hancom/07_groq/index.js](../../../07_groq/index.js): Groq API 호출 원본 (fetch, `Authorization: Bearer`, `.env`의 `GROQ_API_KEY`)
- [hancom/06_node_express/index_09.js](../../../06_node_express/index_09.js): cors + express.json() 패턴 참고용
