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