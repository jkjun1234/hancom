const path = require('path')

// .env 파일의 GROQ_API_KEY를 process.env로 불러오기 (실행 위치와 무관하게 chatbot/.env를 찾도록 경로 지정)
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

// express 사용
const express = require('express')
const app = express()

// 다른 포트(주소)에서 오는 요청을 허용해주는 도구(미들웨어)
const cors = require('cors')
// 위 도구를 서버 전체 요청에 적용
app.use(cors())
// 요청 body(JSON 문자열)를 req.body 객체로 자동 변환
app.use(express.json())
// 상위 폴더(chatbot/)의 정적 파일(html, js, css)을 그대로 서빙 (index.html 등)
app.use(express.static(path.join(__dirname, '..')))

const key = process.env.GROQ_API_KEY

// 프론트에서 messages(지금까지의 대화 전체 배열)를 보내면
// 그걸 그대로 Groq에 전달해서 대화 맥락을 유지시킴
app.post('/api/chat', async (req, res) => {
    try {
        const messages = req.body.messages

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 사용권한 있음을 인증
                // Bearer 방식은 'Bearer ' 처럼 공백이 필수요소로 있어야함
                'Authorization': 'Bearer ' + key
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages
            })
        })

        // 응답을 객체로 변환
        const data = await groqRes.json()

        // 이 안에 AI 답이 들어 있음
        // ? : 데이터 답이 없어도 에러가 나지 않도록 진행하는 문법
        const reply = data.choices?.[0]?.message?.content || '(응답 없음)'
        res.json({ reply })
    } catch (err) {
        console.error(err)
        res.status(500).json({ reply: '서버에서 오류가 발생했어요.' })
    }
})

app.listen(3001, () => console.log('http://localhost:3001/index.html'))
