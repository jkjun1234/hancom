// 이미 존재하는 항목을 PUT으로 수정하는 예제

const express = require('express')  // 1. 꺼내기
const app = express()   // 2. 만들기

app.use(express.json())  // JSON body 파싱 미들웨어

let users = [
    {id: 1, name: "JINI"},
    {id: 2, name: "KIM"}
]

// 3. 규칙 만들기
app.put('/api/users/:id', (req, res) => {
    const u = users.find(u => u.id === Number(req.params.id))
    if(!u) return res.status(404).json({error: "없는 유저입니다."})
    u.name = req.body.name
    res.json(u)
})

// 4. 문 열기
app.listen(3005, async () => {
    // 서버 켜지면 코드가 스스로 PUT 요청 -> 응답 출력 (curl 없이 확인)
    try {
        const res = await fetch('http://localhost:3005/api/users/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ name: '한컴'})
        })
        console.log(await res.json())
    } catch(err) {
        console.error('❌ 에러:', err.message)
    }
})