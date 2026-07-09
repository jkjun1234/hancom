const Profile = ({ name, job = "개발자"}) => {
    return (
        <div>
            <h3>{name}</h3>     {/* name prop사용 */}
            
            {/* job prop의 값이 전달하지 않을경우 "개발자"라고 표시 */}
            <p>직업 : {job}</p>  
        </div>
    )
}

export default Profile