// useEffect 사용 예제 
// useEffect : 화면 뜰 때 딱 1번 렌더링 실행

import { useEffect } from "react";  // useEffect 사용

const Hello = () => {
    useEffect (() => {
        // 개발할땐 main.jsx 에 있는 StrictMode 의해 렌더링이 
        // 한번 더 실행되어서 아래 로그가 2번 찍힌다.
        console.log("화면 뜰때 딱 1번만 실행되는 '의존성 배열'")
    }, [])
     return (
        <p>안녕하세요</p>
     )
}

export default Hello