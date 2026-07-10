import './App.css'

/* 
이전 실습 컴포넌트들
  // import Hello from './components/18/Hello.jsx'  // 기본 컴포넌트 요소 생성 예시
  // import Greeting from './components/19/Greeting.jsx'  // props 예제 (name) 값을 사용
  // import Profile from './components/20/Profile.jsx' // 기본값이 적용된 props 예제
  // import Card from './components/21/Card'  // 여러 Props를 사용하는 컴포넌트 실습
  // import Avatar from './components/22/Avatar.jsx' // Props 의 조건에 따른 웹 렌더링 변화 실습
  // import Badge from './components/23/Badge' // 3항 연산 조건에 따라 바뀌는 렌더링 확인
  // import Alert from './components/24/Alert' //객체 실습을 위한 알람박스 렌더링 
  // import Rating from './components/25/Rating' // 배열 메서드를 활용한 점수 별점 표기
  // import Tag from './components/26/Tag.jsx' // 배열 props를 받아 map으로 목록을 렌더링하느느 예제
  // import SubmitButton from './components/27/SubmitButton' // MUI 라이브러리르 활용한 버튼 렌더링
  // 여러 컴포넌트 생성 및 적용
  // 각 컴포넌트들은 선언된 위치에 따라 적용된다 (HTML과 동일)
  // import Header from './components/28/Header'
  // import Menu from './components/28/Menu'
  // import Content from './components/28/Content'
  // import Footer from './components/28/Footer'
  // // useState 카운터 실습 +1, +-1, +-1 리셋 총 3개의 컴포넌트로 연습
  // import Counter from './components/29/Counter'
  // import CounterV02 from './components/30/CounterV02'
  // import CounterV03 from './components/31/CounterV03.jsx'
  // import NameForm from './components/32/NameForm' // input 태그를 통해 실시간으로 값이 변하는 것을 다른 태그로 값 반영
  // import ProductItem from './components/33/ProductItem.jsx' // props와 useState를 같이 사용하는 예제 (이름 : props, 카운트 : useState)
  // import Hello from './components/34/Hello.jsx' // useEffect 사용예 (console.log를 통해 확인)
  // import Clock from './components/35/Clock' //useState, useEffect를 이용한 타이머 렌더링
  // import Counter from './components/36/Counter' // 카운트 변수가 증가할때마다 실행하는 useEffect 사용예시
  // import Every from './components/37/Every' // 매번 렌더링 되는 useEffect
  // import Users from './components/38/Users' // useState, useEffect 둘을 사용하여 데이터 얻어오기
*/

import Weather from './components/39/Weather' // Weather API를 활용한 서울 기온 찍기 (useEffect, useState 를 사용)

function App() {
  // const list = ['react', 'props', 'map'] //26번 예제 Tag.jsx 예제에 사용될 배열
 return (
  <>

  {/* 이전 실습 컴포넌트들 */}
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

   {/* <h1> 삼항 조건 연산식 type이 new일땐 초록 아닐땐 red 표시 </h1>
   <Badge text="안녕" type='false'></Badge> */}

    {/* <Alert type="success" text="성공!"></Alert>
    <Alert type="error" text="실패!"></Alert>
    <Alert type="warning" text="경고!"></Alert> */}

      {/* <Rating score={3}></Rating>
      <Rating score={4}></Rating>
      <Rating score={7}></Rating> */}
        {/* <Tag tags={list}></Tag> */}
        {/* <SubmitButton></SubmitButton> */}
    {/* <div>
      <Header isLoggedIn={true}></Header>
      <Menu></Menu>
      <Content></Content>
      <Footer></Footer>
      </div> */}
    {/*<Counter></Counter>
            <CounterV02></CounterV02>
            <CounterV03></CounterV03> */}
    {/* <NameForm></NameForm> */}
    {/* <ProductItem name="과일을"></ProductItem> */}
      {/* <Hello></Hello> */}
    {/* <Clock></Clock> */}
      {/* <Counter></Counter> */}
    {/* <Every></Every> */}
    {/* <Users></Users> */}
    </>

    <Weather/>
  </>
 )
}

export default App
