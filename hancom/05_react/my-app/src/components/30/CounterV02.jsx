// 카운터 +1 / -1 하는 버튼 생성
// 우선 useState 가져오기
import { useState } from "react";

const CounterV02 = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="plus-minus-card">
            <p className="out-count">{count}</p>
            <button onClick={() => setCount(c => c + 1)}>횟수 증가</button>
            <button onClick={() => setCount(c => c - 1)}>횟수 감소</button>
        </div>
    )
}

export default CounterV02