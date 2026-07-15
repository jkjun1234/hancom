module.exports = async (req, res) => {
    try {
        const messages = req.body.messages

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.GROQ_API_KEY
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages
            })
        })

        const data = await groqRes.json()
        const reply = data.choices?.[0]?.message?.content || '(응답 없음)'
        res.status(200).json({ reply })
    } catch (err) {
        console.error(err)
        res.status(500).json({ reply: '서버에서 오류가 발생했어요.' })
    }
}