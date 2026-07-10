// 데이터 받아오는 예제
import { useState, useEffect } from "react";
import './Users.css'

const Users = () => {
    // users : 받아온 목록 (초기값 빈 배열 - 도착 전엔 비어있음)
    const [users, setUsers] = useState([])

    useEffect(() => {
        //fetch 요청 -> .then 응답을 json으로 변환 
        // -> .then 데이터를 state에 저장 -> .catch 에러 처리
        fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((data) => setUsers(data)).catch((error) => console.error('데이터 로딩 실패:', error))
    }, [])

    return (
        <ul>
            {/* map : 배열 들며 항목마다 li 생성 / key : 고유값 (필수) */}


            {/* 추가 정보 (유저들의 회사 이름도 가져와 표시해보자) */}
            {users.map((u) => (
                <li className="user-card" key={u.id}>사원 ID : {u.id}
                 <p>회사명 : {u.company.name}</p>
                  사원 이름 :{u.name}</li>
            ))}
        </ul>
    )
}

export default Users