// express 사용
const express = require('express')
const app = express()

app.listen(3001, () => console.log('http://localhost:3001'))

app.post('api/chat', (req, res) => {
    res.json({reply: 'test'})
})