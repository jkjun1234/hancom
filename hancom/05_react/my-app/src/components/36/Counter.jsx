import { useState, useEffect } from "react";

const Counter = () => {
    const [count, setCount] = useState(0)

    // useEffect - react 내장 함수. 인자 : (실행할 콜백, 의존성 배열)
    useEffect(() => {
        console.log('count 바뀜:', count)
    }, [count])         // 2번째 인자 (의존성. 이 값 바뀔때만 콜백 재실행)

    return <button onClick={() => setCount(c => c + 1)} >{count}</button>
}

export default Counter