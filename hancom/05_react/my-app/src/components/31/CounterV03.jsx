// 카운터 +1 / -1 / Reset 하는 버튼 생성
// 우선 useState 가져오기
import { useState } from "react";

const CounterV03 = () => {
    // useState 사용
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>V03 카운터 : {count}</p>
            <button onClick={() => setCount(c => c + 1)}>V03 증가</button>
            <button onClick={() => setCount(c => c - 1)}>V03 감소</button>
            <button onClick={() => setCount(0)}>V03 초기화</button>
        </div>
    )
}

export default CounterV03