import './Avatar.css'

const Avatar = ({name, online}) => {
    return (
        <>
        <div className="friends-box">
            <h2 className="friends">친구 목록</h2>
            <p>상태 표시</p>
            <p>로그인 : ⭐ 로그아웃 : 😴</p>
            <h3>{name}</h3>
            {online ? <p>⭐</p> : <p>😴</p>}    
        </div>
        </>
    )
}

export default Avatar