// NameForm.jsx
// state로 붙잡아 실시간 사용 ( 검색, 로그인, 댓글 등)
// 입력값과 화면을 항상 일치 = controlled(제어) 컴포넌트
import {useState} from 'react'

const NameForm = () => {
    const [name, setName] = useState("")

    return (
        <>
        <input value={name} 
            onChange={(e) => setName(e.target.value)}
        />
        <p>안녕, {name}</p>
        </>
    )
}

export default NameForm