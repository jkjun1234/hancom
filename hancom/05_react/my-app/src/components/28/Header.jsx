// Header.jsx
const Header = ({isLoggedIn}) => {
    let currentLogged = isLoggedIn;
    return (
        <>
            <title>여러 컴포넌트 붙여보기!</title>
            <header> 헤더 
                <p> 로그인 상태 : {isLoggedIn ? <span>로그인</span> : <span>로그아웃</span>} </p> 
                <button>{currentLogged ? <span>로그아웃하기!</span> : <span>로그인하기</span>}</button>
            </header>
        </>
    )
}
export default Header