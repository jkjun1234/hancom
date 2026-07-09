import './App.css'
// import Hello from './components/18/Hello.jsx'  // 기본 컴포넌트 요소 생성 예시
// import Greeting from './components/19/Greeting.jsx'  // props 예제 (name) 값을 사용
// import Profile from './components/20/Profile.jsx' // 기본값이 적용된 props 예제
// import Card from './components/21/Card'  // 여러 Props를 사용하는 컴포넌트 실습
// import Avatar from './components/22/Avatar.jsx' // Props 의 조건에 따른 웹 렌더링 변화 실습
import Badge from './components/23/Badge'

function App() {
 return (
  <>
  {/**여기에 새로운 컴포넌트 추가 예정 
      기존 코드들은 모두 제거*/}

    {/* <Hello/> */}

    {/* <Greeting name="React"/>
    <Greeting name="기준"/> */}

  {/* <Profile name="기준" job="백수"/> */}

   {/* <Card title="React 잘하기"
   desc="기초부터 차근차근" emoji="헤헤" /> */}

    {/* <Avatar name="정기준" online={true}></Avatar>
    <Avatar name="기준" online={false}></Avatar> */} 
   <h1> 삼항 조건 연산식 type이 new일땐 초록 아닐땐 red 표시 </h1>
   <Badge text="안녕" type='false'></Badge>
  </>
 )
}

export default App
