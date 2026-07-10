// 객체 실습을 위한 알람박스 렌더링 

const Alert = ({type, text}) => {
    const map = {
        success : { icon : '😊', color:'green', border:'2px solid', borderColor:'green'},
        error : { icon : '😢', color:'crimson', border:'2px solid', borderColor:'crimson'},
        warning : { icon : '😴', color:'orange',border:'2px solid', borderColor:'orange'}
    }
    const cfg = map[type]
    return <p style={{color:cfg.color, border:cfg.border, borderColor:cfg.borderColor}}>{cfg.icon} {text}</p>
}

export default Alert