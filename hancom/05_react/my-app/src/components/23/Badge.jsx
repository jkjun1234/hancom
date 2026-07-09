// Type 이 new 면 초록, 아니면 빨강 
const Badge = ({ text, type }) => {
    const color = type === 'new' ? 'green' : 'crimson'
    
    return <span style={{backgroundColor:color, color: '#fff'}}>{text}</span>
}

export default Badge