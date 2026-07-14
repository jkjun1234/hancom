require('dotenv').config()
const key = process.env.GROQ_API_KEY

const main = async () => {

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            // 사용권한 있음을 인증
            // Bearer 방식은 'Bearer ' 처럼 공백이 필수요소로 있어야함
            'Authorization': 'Bearer ' + key
        },
        body : JSON.stringify({
            model:'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: '한 문장으로 자기소개 해줘'}]
        })
    })

    // 응답을 객체로 변환
    const data = await groqRes.json()

    // 이 안에 AI 답이 들어 있음
    // ? : 데이터 답이 없어도 에러가 나지 않도록 진행하는 문법
    console.log(data.choices?.[0]?.message?.content || data)
}


// main 정의 후 호출
main()