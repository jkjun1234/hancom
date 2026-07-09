// 여러 Props를 받아 활용하는 컴포넌트 실습
import './Card.css'

const Card = ({title, desc, emoji}) => {
    return (
        <div className="card">
            <span>{title}</span>
            <h3>{desc}</h3>
            <p>{emoji}</p>
        </div>
    )
}

export default Card