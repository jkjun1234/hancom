//  부모가 준 name(props) 표시 자기만의 개수 (state)를 기억
// props = 외부에서 받은 고정 값 / state = 내가 기억하고 바꾸는 값 (이 둘의 차이가 핵심!)

import './ProductItem.css'  // css도 적용

import { useState } from "react";

const ProductItem = ({name}) => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <div className="product">
                <h3>{name}</h3>     {/** props 표시 */}
                <p>{count} 개 담았음</p>    {/** state 표시 */}
            </div>
            <button onClick={() => setCount(c => c + 1)}>¥ 담기</button>
        </div>
    )
}

export default ProductItem