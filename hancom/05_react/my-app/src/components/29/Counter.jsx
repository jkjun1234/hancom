import { useState } from 'react'    // 값 기억하는 훅(useState) 가져오기

const Counter = () => {
    const [count, setCount] = useState(0) // count 보관 (처음 0), 바꿀땐 setCount 사용
    return (
        // 클릭하면 count + 1 (함수형)
        <button onClick={() => setCount(c => c + 1)}>
            {count} 번 눌렀습니다.
        </button>
    )
}

export default Counter