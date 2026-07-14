// 미들 웨어 cors 에대한 실습

const express = require('express') // 1. 꺼내기
const cors = require('cors')    // npm install cors(최초 1회)

const app = express();  // 2. 서버 만들기

// 미들 웨어 설정은 항상 라우터(app.get 위에서 선언)위에서 선언
app.use(cors()) // 다른 포트(프론트 5173 등) 허용

// 객체로 해석 POST body => req.body
// 변환 전 : "{\name\": \민수"}"
// 변환 후 : {name: "민수"}
app.use(express.json()) 

app.use((req, res, next) => {
    console.log(req.method, req.url)    // 모든 요청 로그 확인
    next()  // 다음으로 넘김(안 부르면 멈춤)
})

// 3. 규칙 만들기
app.get('/api/users', (req, res) => {
    res.json([{id: 1, name: "KIM"}])
})

// 4. 문 열기
app.listen(3000, () => console.log("http://localhost:3000/api/users"))