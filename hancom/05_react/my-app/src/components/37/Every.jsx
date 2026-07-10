import { useState, useEffect } from "react";

const Every = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        
        console.log('렌더링 될때마다 실행') // 렌더링마다 실행
    }, [])  // 2번째 칸에 []가 없으므로 매 렌더마다 실행

    return (
    <button onClick={() => setCount(c => c +1)}>{count}</button>
    )
}

export default Every