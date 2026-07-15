const chatEl = document.getElementById('chat')
const formEl = document.getElementById('chat-form')
const inputEl = document.getElementById('input')
const sendBtn = document.getElementById('send-btn')

// 지금까지의 대화 전체를 담는 배열 (role: 'user' | 'assistant')
// 요청마다 이 배열 전체를 서버로 보내야 AI가 이전 대화 맥락을 기억함
const messages = []

// messages 배열을 기준으로 화면을 다시 그림
function renderMessages() {
    chatEl.innerHTML = ''
    messages.forEach(msg => {
        const div = document.createElement('div')
        div.className = 'message ' + msg.role
        div.textContent = msg.content
        chatEl.appendChild(div)
    })
    chatEl.scrollTop = chatEl.scrollHeight
}

function addMessage(role, content) {
    messages.push({ role, content })
    renderMessages()
}

// 응답 기다리는 동안 입력창/버튼 잠금
function setLoading(isLoading) {
    inputEl.disabled = isLoading
    sendBtn.disabled = isLoading
}

async function sendMessage(text) {
    addMessage('user', text)
    setLoading(true)

    // "생각 중..." 표시는 messages 배열에는 안 넣고 화면에만 임시로 추가
    const loadingEl = document.createElement('div')
    loadingEl.className = 'message assistant loading'
    loadingEl.textContent = '생각 중...'
    chatEl.appendChild(loadingEl)
    chatEl.scrollTop = chatEl.scrollHeight

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        })
        const data = await res.json()
        addMessage('assistant', data.reply || '(응답 없음)')
    } catch (err) {
        addMessage('assistant', '❌ 서버에 연결할 수 없어요.')
    } finally {
        setLoading(false)
        inputEl.focus()
    }
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = inputEl.value.trim()
    if (!text) return
    inputEl.value = ''
    sendMessage(text)
})

// Enter: 전송 / Shift+Enter: 줄바꿈
inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        formEl.requestSubmit()
    }
})
