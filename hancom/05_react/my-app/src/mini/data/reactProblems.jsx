// React 카테고리 · 문제 목록
// components/18~33 실습에서 실제로 만든 것과 같은 "진짜 컴포넌트 파일" 형태로 문제를 낸다.
// kind: 'react-component' — Babel로 JSX를 실제 컴파일해서 렌더링/채점한다 (utils/reactComponentGrader.js).
const reactProblems = [
  {
    id: 1,
    kind: 'react-component',
    difficulty: 'basic',
    title: 'Greeting — props 값 표시하기',
    concept: 'JSX 안에서 중괄호 { }로 감싸면 그 안의 JS 값을 화면에 그대로 출력할 수 있어요. components/19/Greeting.jsx와 같은 원리예요.',
    examples: [
      {
        title: '기본 문자열 보여주기',
        description: 'props로 받은 문자열을 그대로 화면에 출력하는 가장 기본적인 형태예요.',
        code: "const Hello = ({ name }) => {\n  return <p>{name}</p>\n}\n\nexport default Hello",
        sampleProps: { name: '민지' },
      },
      {
        title: '계산식 표시하기',
        description: '중괄호 안에는 문자열뿐 아니라 계산식도 그대로 넣을 수 있어요.',
        code: "const PriceTag = ({ price }) => {\n  return <p>가격: {price * 1.1}원 (부가세 포함)</p>\n}\n\nexport default PriceTag",
        sampleProps: { price: 1000 },
      },
      {
        title: '메서드 호출 결과 표시하기',
        description: '문자열 메서드처럼 함수 호출 결과도 중괄호 안에 바로 쓸 수 있어요.',
        code: "const Shout = ({ text }) => {\n  return <p>{text.toUpperCase()}!</p>\n}\n\nexport default Shout",
        sampleProps: { text: 'hello' },
      },
      {
        title: '여러 값 조합하기 (템플릿 리터럴)',
        description: '백틱(템플릿 리터럴)을 쓰면 여러 값을 한 문자열로 자연스럽게 합칠 수 있어요.',
        code: "const UserBadge = ({ name, level }) => {\n  return <p>{`${name}님 (Lv.${level})`}</p>\n}\n\nexport default UserBadge",
        sampleProps: { name: '홍길동', level: 3 },
      },
    ],
    prompt: 'name prop이 인사말 안에 표시되도록 완성하세요.',
    starterCode: "const Greeting = ({ name }) => {\n  return <p>안녕하세요, 님!</p>\n}\n\nexport default Greeting",
    hints: [
      '중괄호 {} 안에 JS 표현식을 넣을 수 있어요.',
      '{name}을 원하는 자리에 넣어보세요.',
      '<p>안녕하세요, {name}님!</p>',
    ],
    demoProps: { name: '홍길동' },
    testCases: [
      {
        props: { name: '홍길동' },
        description: '"홍길동"이라는 이름이 화면에 보여야 해요',
        check: (doc) => doc.body.textContent.includes('홍길동'),
      },
      {
        props: { name: '하늘' },
        description: '"하늘"이라는 이름이 화면에 보여야 해요',
        check: (doc) => doc.body.textContent.includes('하늘'),
      },
    ],
    solution: "const Greeting = ({ name }) => {\n  return <p>안녕하세요, {name}님!</p>\n}\n\nexport default Greeting",
    explanation: 'JSX 안에서는 중괄호 {}로 감싸면 그 안에 JS 값을 그대로 출력할 수 있어요. {name}은 name prop의 값을 화면에 꽂아 넣어요.',
  },
  {
    id: 2,
    kind: 'react-component',
    difficulty: 'basic',
    title: 'Profile — props 기본값',
    concept: '구조분해 할당에서 매개변수 = 기본값 형태로 쓰면, 부모가 값을 안 넘겨줄 때 자동으로 기본값이 사용돼요. components/20/Profile.jsx와 같은 원리예요.',
    examples: [
      {
        title: '숫자 기본값',
        description: 'start를 안 넘기면 0부터 시작해요.',
        code: "const Counter = ({ start = 0 }) => {\n  return <p>시작값: {start}</p>\n}\n\nexport default Counter",
        sampleProps: {},
      },
      {
        title: '문자열 기본값',
        description: 'lang을 안 넘기면 기본값 "ko"가 쓰여요.',
        code: "const Greeting = ({ lang = 'ko' }) => {\n  return <p>언어: {lang}</p>\n}\n\nexport default Greeting",
        sampleProps: {},
      },
      {
        title: '여러 기본값 함께 쓰기',
        description: 'label만 넘기고 color는 기본값 그대로 사용하는 경우예요.',
        code: "const Tag = ({ label = '확인', color = 'blue' }) => {\n  return <p style={{ color }}>{label}</p>\n}\n\nexport default Tag",
        sampleProps: { label: '삭제' },
      },
      {
        title: '기본값 덮어쓰기',
        description: '값을 명시적으로 넘기면 기본값 대신 그 값이 사용돼요.',
        code: "const Volume = ({ level = 50 }) => {\n  return <p>음량: {level}</p>\n}\n\nexport default Volume",
        sampleProps: { level: 80 },
      },
    ],
    prompt: 'job이 전달되지 않으면 "개발자"가 기본값으로 보이도록 완성하세요.',
    starterCode:
      "const Profile = ({ name, job }) => {\n  return (\n    <div>\n      <h3>{name}</h3>\n      <p>직업 : {job}</p>\n    </div>\n  )\n}\n\nexport default Profile",
    hints: [
      '구조분해 할당에서 매개변수 = 기본값 형태로 기본값을 줄 수 있어요.',
      "{ name, job = ? } 형태예요.",
      "{ name, job = '개발자' }",
    ],
    demoProps: { name: '홍길동' },
    testCases: [
      {
        props: { name: '홍길동' },
        description: 'job 없이 렌더링하면 "개발자"가 보여야 해요',
        check: (doc) => doc.body.textContent.includes('개발자'),
      },
      {
        props: { name: '홍길동', job: '디자이너' },
        description: 'job을 주면 그 값이 보여야 해요',
        check: (doc) => doc.body.textContent.includes('디자이너'),
      },
    ],
    solution:
      "const Profile = ({ name, job = '개발자' }) => {\n  return (\n    <div>\n      <h3>{name}</h3>\n      <p>직업 : {job}</p>\n    </div>\n  )\n}\n\nexport default Profile",
    explanation: "job = '개발자' 처럼 쓰면, 부모가 job을 안 넘겨줄 때(undefined일 때)만 자동으로 '개발자'가 사용돼요.",
  },
  {
    id: 3,
    kind: 'react-component',
    difficulty: 'basic',
    title: 'NewBadge — && 조건부 렌더링',
    concept: '&&는 왼쪽이 true일 때만 오른쪽 값을 렌더링해요. false면 아무것도 안 보여요. components/22/Avatar.jsx의 조건부 렌더링과 같은 개념이에요.',
    examples: [
      {
        title: '로그인 상태 표시',
        description: 'isLoggedIn이 true일 때만 환영 문구가 추가로 보여요.',
        code: "const Status = ({ isLoggedIn }) => {\n  return (\n    <div>\n      <p>내 정보</p>\n      {isLoggedIn && <p>환영합니다!</p>}\n    </div>\n  )\n}\n\nexport default Status",
        sampleProps: { isLoggedIn: true },
      },
      {
        title: '에러 메시지 표시',
        description: 'hasError가 true일 때만 경고 문구가 나타나요.',
        code: "const Form = ({ hasError }) => {\n  return (\n    <div>\n      <input />\n      {hasError && <p style={{ color: 'red' }}>입력값을 확인하세요</p>}\n    </div>\n  )\n}\n\nexport default Form",
        sampleProps: { hasError: true },
      },
      {
        title: '개수가 있을 때만 배지 표시',
        description: '조건식(itemCount > 0)의 결과를 그대로 && 왼쪽에 쓸 수 있어요.',
        code: "const Cart = ({ itemCount }) => {\n  return (\n    <div>\n      <span>장바구니</span>\n      {itemCount > 0 && <span> ({itemCount})</span>}\n    </div>\n  )\n}\n\nexport default Cart",
        sampleProps: { itemCount: 3 },
      },
      {
        title: 'false일 때 아무것도 안 보이는 경우',
        description: 'show가 false면 알림 문구 자리에 정말 아무것도 렌더링되지 않아요.',
        code: "const AlertBox = ({ show }) => {\n  return (\n    <div>\n      <p>알림 영역</p>\n      {show && <p>새 알림이 있어요</p>}\n    </div>\n  )\n}\n\nexport default AlertBox",
        sampleProps: { show: false },
      },
    ],
    prompt: 'isNew가 true일 때만 "NEW!" 표시가 추가로 보이도록 && 연산자로 완성하세요.',
    starterCode:
      "const NewBadge = ({ isNew }) => {\n  return (\n    <div>\n      <span>상품명</span>\n    </div>\n  )\n}\n\nexport default NewBadge",
    hints: [
      '조건 && 표시할내용 형태로 쓰면, 조건이 true일 때만 그 내용이 렌더링돼요.',
      'isNew가 조건이에요.',
      '{isNew && <span>NEW!</span>}',
    ],
    demoProps: { isNew: true },
    testCases: [
      {
        props: { isNew: true },
        description: 'isNew가 true면 "NEW!"가 보여야 해요',
        check: (doc) => doc.body.textContent.includes('NEW!'),
      },
      {
        props: { isNew: false },
        description: 'isNew가 false면 "NEW!"가 보이면 안 돼요',
        check: (doc) => !doc.body.textContent.includes('NEW!'),
      },
    ],
    solution:
      "const NewBadge = ({ isNew }) => {\n  return (\n    <div>\n      <span>상품명</span>\n      {isNew && <span>NEW!</span>}\n    </div>\n  )\n}\n\nexport default NewBadge",
    explanation: '&&는 왼쪽이 true일 때만 오른쪽 값을 반환해요. false면 그 자리에 아무것도 렌더링되지 않아요.',
  },
  {
    id: 4,
    kind: 'react-component',
    difficulty: 'basic',
    title: 'Badge — 삼항 연산자로 색 분기',
    concept: '삼항 연산자(조건 ? A : B)로 조건에 따라 다른 값을 만들 수 있어요. components/23/Badge.jsx 실습과 완전히 같아요.',
    examples: [
      {
        title: '온라인/오프라인 표시',
        description: '조건에 따라 아예 다른 문자열을 통째로 바꿔치기해요.',
        code: "const Status = ({ online }) => {\n  return <p>{online ? '🟢 온라인' : '⚫ 오프라인'}</p>\n}\n\nexport default Status",
        sampleProps: { online: true },
      },
      {
        title: '재고 여부 표시',
        description: '비교 연산 결과(count > 0)를 삼항 연산자의 조건으로 바로 써요.',
        code: "const Stock = ({ count }) => {\n  return <p>{count > 0 ? '구매 가능' : '품절'}</p>\n}\n\nexport default Stock",
        sampleProps: { count: 5 },
      },
      {
        title: '합격/불합격 스타일 분기',
        description: '삼항 연산자로 값을 만든 뒤 style에 바로 사용할 수도 있어요.',
        code: "const Result = ({ score }) => {\n  const color = score >= 60 ? 'green' : 'red'\n  return <p style={{ color }}>{score}점</p>\n}\n\nexport default Result",
        sampleProps: { score: 85 },
      },
      {
        title: '날씨 안내 문구 바꾸기',
        description: '이모지까지 포함한 안내 문구를 통째로 바꿀 수 있어요.',
        code: "const Weather = ({ isRaining }) => {\n  return <p>{isRaining ? '☔ 우산 챙기세요' : '☀️ 맑아요'}</p>\n}\n\nexport default Weather",
        sampleProps: { isRaining: false },
      },
    ],
    prompt: "type이 'new'이면 초록색(green), 아니면 빨간색(crimson)이 되도록 삼항 연산자로 완성하세요.",
    starterCode:
      "const Badge = ({ text, type }) => {\n  const color = 'crimson'\n  return <span style={{backgroundColor:color, color: '#fff'}}>{text}</span>\n}\n\nexport default Badge",
    hints: [
      '삼항 연산자: 조건 ? A : B',
      "type === 'new' 가 조건이에요.",
      "const color = type === 'new' ? 'green' : 'crimson'",
    ],
    demoProps: { text: 'NEW', type: 'new' },
    testCases: [
      {
        props: { text: 'NEW', type: 'new' },
        description: 'type이 new면 배경색이 green이어야 해요',
        check: (doc) => doc.querySelector('span')?.style.backgroundColor === 'green',
      },
      {
        props: { text: 'OLD', type: 'old' },
        description: 'type이 new가 아니면 배경색이 crimson이어야 해요',
        check: (doc) => doc.querySelector('span')?.style.backgroundColor === 'crimson',
      },
    ],
    solution:
      "const Badge = ({ text, type }) => {\n  const color = type === 'new' ? 'green' : 'crimson'\n  return <span style={{backgroundColor:color, color: '#fff'}}>{text}</span>\n}\n\nexport default Badge",
    explanation: '삼항 연산자는 if/else를 한 줄로 줄인 표현식이에요. components/23/Badge.jsx에서 실제로 이렇게 사용했어요.',
  },
  {
    id: 5,
    kind: 'react-component',
    difficulty: 'basic',
    title: 'Alert — 객체 매핑',
    concept: '조건이 여러 개일 때 객체에 미리 값을 정리해두고 [key]로 꺼내 쓰면 if/else보다 훨씬 짧아져요. components/24/Alert.jsx 실습과 완전히 같아요.',
    examples: [
      {
        title: '요일 이름 매핑',
        description: '짧은 코드(mon)를 사람이 읽기 좋은 이름으로 바꿔줘요.',
        code: "const DayLabel = ({ day }) => {\n  const map = { mon: '월요일', tue: '화요일', wed: '수요일' }\n  return <p>{map[day]}</p>\n}\n\nexport default DayLabel",
        sampleProps: { day: 'mon' },
      },
      {
        title: '등급별 색상 매핑',
        description: '값(색상)을 style에 바로 연결해서 쓸 수도 있어요.',
        code: "const Grade = ({ level }) => {\n  const colorMap = { gold: 'goldenrod', silver: 'gray', bronze: 'peru' }\n  return <p style={{ color: colorMap[level] }}>{level} 등급</p>\n}\n\nexport default Grade",
        sampleProps: { level: 'gold' },
      },
      {
        title: '상태 아이콘 매핑',
        description: '이모지처럼 순서가 없는 값도 객체 매핑에 잘 어울려요.',
        code: "const Task = ({ status }) => {\n  const icons = { done: '✅', pending: '⏳', failed: '❌' }\n  return <p>{icons[status]} 작업</p>\n}\n\nexport default Task",
        sampleProps: { status: 'done' },
      },
      {
        title: '숫자 키로 매핑하기',
        description: '객체의 key는 문자열뿐 아니라 숫자로도 쓸 수 있어요.',
        code: "const RankLabel = ({ rank }) => {\n  const labels = { 1: '초급', 2: '중급', 3: '고급' }\n  return <p>{labels[rank]}</p>\n}\n\nexport default RankLabel",
        sampleProps: { rank: 2 },
      },
    ],
    prompt: 'map 객체에서 type에 해당하는 설정을 cfg 변수에 꺼내오는 코드를 완성하세요.',
    starterCode:
      "const Alert = ({type, text}) => {\n    const map = {\n        success : { icon : '😊', color:'green', border:'2px solid', borderColor:'green'},\n        error : { icon : '😢', color:'crimson', border:'2px solid', borderColor:'crimson'},\n        warning : { icon : '😴', color:'orange',border:'2px solid', borderColor:'orange'}\n    }\n    const cfg = \n    return <p style={{color:cfg.color, border:cfg.border, borderColor:cfg.borderColor}}>{cfg.icon} {text}</p>\n}\n\nexport default Alert",
    hints: [
      '객체에서 값을 꺼낼 땐 대괄호 표기법(객체[key])을 쓸 수 있어요.',
      'map[type] 형태예요.',
      'const cfg = map[type]',
    ],
    demoProps: { type: 'success', text: '성공!' },
    testCases: [
      {
        props: { type: 'success', text: '성공!' },
        description: 'success면 😊 아이콘이 보여야 해요',
        check: (doc) => doc.body.textContent.includes('😊'),
      },
      {
        props: { type: 'error', text: '실패!' },
        description: 'error면 😢 아이콘이 보여야 해요',
        check: (doc) => doc.body.textContent.includes('😢'),
      },
      {
        props: { type: 'warning', text: '경고!' },
        description: 'warning이면 😴 아이콘이 보여야 해요',
        check: (doc) => doc.body.textContent.includes('😴'),
      },
    ],
    solution:
      "const Alert = ({type, text}) => {\n    const map = {\n        success : { icon : '😊', color:'green', border:'2px solid', borderColor:'green'},\n        error : { icon : '😢', color:'crimson', border:'2px solid', borderColor:'crimson'},\n        warning : { icon : '😴', color:'orange',border:'2px solid', borderColor:'orange'}\n    }\n    const cfg = map[type]\n    return <p style={{color:cfg.color, border:cfg.border, borderColor:cfg.borderColor}}>{cfg.icon} {text}</p>\n}\n\nexport default Alert",
    explanation: '지금 실제로 실습한 components/24/Alert.jsx와 똑같은 코드예요. 객체 매핑은 if/else 여러 번보다 짧고, type이 늘어나도 map에 한 줄만 추가하면 돼요.',
  },
  {
    id: 6,
    kind: 'react-component',
    difficulty: 'intermediate',
    title: 'Tag — 배열 map + key',
    concept: 'map은 배열의 각 요소를 원하는 JSX로 바꿔줘요. 이때 key는 각 항목을 구분하는 값으로 꼭 필요해요. components/26/Tag.jsx 실습과 같아요.',
    examples: [
      {
        title: '숫자 목록 렌더링',
        description: '가장 단순한 형태 — 배열의 각 값을 li로 그대로 펼쳐요.',
        code: "const NumberList = ({ numbers }) => {\n  return (\n    <ul>\n      {numbers.map((n) => (\n        <li key={n}>{n}번</li>\n      ))}\n    </ul>\n  )\n}\n\nexport default NumberList",
        sampleProps: { numbers: [1, 2, 3] },
      },
      {
        title: '객체 배열 렌더링',
        description: '배열 안에 객체가 들어있으면, key는 보통 고유한 id를 사용해요.',
        code: "const UserList = ({ users }) => {\n  return (\n    <ul>\n      {users.map((u) => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  )\n}\n\nexport default UserList",
        sampleProps: { users: [{ id: 1, name: '홍길동' }, { id: 2, name: '하늘' }] },
      },
      {
        title: 'map 안에서 계산하기',
        description: '콜백 안에서 각 값을 가공한 뒤 렌더링할 수도 있어요.',
        code: "const PriceList = ({ prices }) => {\n  return (\n    <ul>\n      {prices.map((p) => (\n        <li key={p}>{p * 1.1}원</li>\n      ))}\n    </ul>\n  )\n}\n\nexport default PriceList",
        sampleProps: { prices: [1000, 2000] },
      },
      {
        title: '인덱스도 함께 쓰기',
        description: 'map의 콜백은 두 번째 인자로 인덱스도 받을 수 있어요.',
        code: "const RankList = ({ names }) => {\n  return (\n    <ul>\n      {names.map((name, index) => (\n        <li key={name}>{index + 1}등: {name}</li>\n      ))}\n    </ul>\n  )\n}\n\nexport default RankList",
        sampleProps: { names: ['홍길동', '하늘'] },
      },
    ],
    prompt: "각 태그 앞에 '#'이 붙어서 보이도록 완성하세요.",
    starterCode:
      "const Tag = ({ tags }) => {\n  return (\n    <div>\n      {tags.map((tag) => (\n        <span key={tag}>{tag}</span>\n      ))}\n    </div>\n  )\n}\n\nexport default Tag",
    hints: [
      'map 콜백 안에서 문자열을 합칠 수 있어요.',
      "'#' + tag 형태예요.",
      "<span key={tag}>{'#' + tag}</span>",
    ],
    demoProps: { tags: ['react', 'vite'] },
    testCases: [
      {
        props: { tags: ['react', 'vite'] },
        description: '#react와 #vite가 둘 다 보여야 해요',
        check: (doc) => doc.body.textContent.includes('#react') && doc.body.textContent.includes('#vite'),
      },
      {
        props: { tags: ['hancom'] },
        description: '#hancom이 보여야 해요',
        check: (doc) => doc.body.textContent.includes('#hancom'),
      },
    ],
    solution:
      "const Tag = ({ tags }) => {\n  return (\n    <div>\n      {tags.map((tag) => (\n        <span key={tag}>{'#' + tag}</span>\n      ))}\n    </div>\n  )\n}\n\nexport default Tag",
    explanation: 'map은 배열의 각 요소를 원하는 JSX로 바꿔줘요. key는 각 항목을 구분하는 고유값으로, React가 리스트를 효율적으로 관리하는 데 필요해요.',
  },
  {
    id: 7,
    kind: 'react-component',
    difficulty: 'intermediate',
    interactive: true,
    title: 'Counter — useState로 값 증가시키기',
    concept: 'useState로 만든 값은 setCount(c => c + 1)처럼 함수형 업데이트로 안전하게 바꿀 수 있어요. components/29/Counter.jsx 실습과 같아요.',
    examples: [
      {
        title: '감소 버튼',
        description: '증가와 반대로, 이전 값에서 1을 빼는 것도 똑같은 방식이에요.',
        code: "const DownCounter = () => {\n  const [count, setCount] = useState(10)\n  return <button onClick={() => setCount(c => c - 1)}>{count}</button>\n}\n\nexport default DownCounter",
        sampleProps: {},
        interactive: true,
      },
      {
        title: '좋아요 토글',
        description: '숫자가 아니라 true/false를 뒤집는 함수형 업데이트도 자주 써요.',
        code: "const LikeButton = () => {\n  const [liked, setLiked] = useState(false)\n  return <button onClick={() => setLiked(l => !l)}>{liked ? '❤️' : '🤍'}</button>\n}\n\nexport default LikeButton",
        sampleProps: {},
        interactive: true,
      },
      {
        title: '리셋 버튼 추가하기',
        description: '버튼마다 다른 setCount 호출을 연결하면 여러 동작을 만들 수 있어요.',
        code: "const ResettableCounter = () => {\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <button onClick={() => setCount(c => c + 1)}>+1</button>\n      <span> {count} </span>\n      <button onClick={() => setCount(0)}>리셋</button>\n    </div>\n  )\n}\n\nexport default ResettableCounter",
        sampleProps: {},
        interactive: true,
      },
      {
        title: '여러 state 동시 관리',
        description: '버튼마다 서로 다른 state를 따로 관리할 수도 있어요.',
        code: "const ScoreBoard = () => {\n  const [home, setHome] = useState(0)\n  const [away, setAway] = useState(0)\n  return (\n    <div>\n      <button onClick={() => setHome(h => h + 1)}>홈 {home}</button>\n      <button onClick={() => setAway(a => a + 1)}>원정 {away}</button>\n    </div>\n  )\n}\n\nexport default ScoreBoard",
        sampleProps: {},
        interactive: true,
      },
    ],
    prompt: '버튼을 누를 때마다 count가 1씩 증가하도록 완성하세요 (함수형 업데이트 사용).',
    starterCode:
      "import { useState } from 'react'\n\nconst Counter = () => {\n  const [count, setCount] = useState(0)\n  return (\n    <button onClick={() => setCount(count)}>\n      {count} 번 눌렀습니다.\n    </button>\n  )\n}\n\nexport default Counter",
    hints: [
      'setCount(c => c + 1) 형태로 이전 값을 기준으로 다음 값을 계산할 수 있어요.',
      'onClick 안의 함수를 고쳐보세요.',
      'setCount(c => c + 1)',
    ],
    demoProps: {},
    testCases: [
      {
        props: {},
        interactions: [{ click: 'button' }, { click: 'button' }, { click: 'button' }],
        description: '버튼을 3번 누르면 "3 번 눌렀습니다"가 보여야 해요',
        check: (container) => container.textContent.includes('3 번'),
      },
    ],
    solution:
      "import { useState } from 'react'\n\nconst Counter = () => {\n  const [count, setCount] = useState(0)\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      {count} 번 눌렀습니다.\n    </button>\n  )\n}\n\nexport default Counter",
    explanation: 'setCount(c => c + 1)처럼 함수형 업데이트를 쓰면 항상 최신 count 값을 기준으로 안전하게 다음 값을 계산할 수 있어요.',
  },
  {
    id: 8,
    kind: 'react-component',
    difficulty: 'advanced',
    title: 'SubmitButton — MUI 컴포넌트 사용',
    concept: 'MUI(Material UI)는 이미 스타일이 입혀진 컴포넌트 모음이에요. import해서 HTML 태그 대신 컴포넌트로 사용해요. components/27/SubmitButton.jsx 실습과 같아요.',
    examples: [
      {
        title: 'TextField 사용',
        description: 'input 태그 대신 MUI의 입력창 컴포넌트를 쓸 수 있어요.',
        code: "import { TextField } from '@mui/material'\n\nconst SearchBox = () => {\n  return <TextField placeholder=\"검색어 입력\" />\n}\n\nexport default SearchBox",
      },
      {
        title: 'Checkbox 사용',
        description: '체크박스도 MUI 컴포넌트로 바로 가져다 쓸 수 있어요.',
        code: "import { Checkbox } from '@mui/material'\n\nconst AgreeBox = () => {\n  return <Checkbox />\n}\n\nexport default AgreeBox",
      },
      {
        title: 'variant 옵션 바꾸기',
        description: 'variant="outlined"를 주면 테두리만 있는 버튼이 돼요.',
        code: "import { Button } from '@mui/material'\n\nconst OutlinedButton = () => {\n  return <Button variant=\"outlined\">더보기</Button>\n}\n\nexport default OutlinedButton",
      },
      {
        title: 'color 옵션 함께 쓰기',
        description: 'variant와 color를 같이 쓰면 위험한 동작(삭제 등)을 색으로 강조할 수 있어요.',
        code: "import { Button } from '@mui/material'\n\nconst DangerButton = () => {\n  return <Button variant=\"contained\" color=\"error\">삭제</Button>\n}\n\nexport default DangerButton",
      },
    ],
    prompt: '일반 button 태그 대신 MUI의 Button 컴포넌트(variant="contained")를 사용하도록 바꾸세요.',
    starterCode: "const SubmitButton = () => {\n  return <button>제출</button>\n}\n\nexport default SubmitButton",
    hints: [
      'MUI에서 가져온 Button 컴포넌트를 태그처럼 사용할 수 있어요.',
      'variant="contained"를 주면 배경이 채워진 버튼이 돼요.',
      '<Button variant="contained">제출</Button>',
    ],
    demoProps: {},
    testCases: [
      {
        props: {},
        description: 'MUI Button 컴포넌트가 사용돼야 해요',
        check: (doc) => Boolean(doc.querySelector('[class*="MuiButton"]')),
      },
    ],
    solution: "const SubmitButton = () => {\n  return <Button variant=\"contained\">제출</Button>\n}\n\nexport default SubmitButton",
    explanation: 'MUI 컴포넌트는 이미 CSS까지 다 갖춰진 상태로 제공돼서, 직접 스타일링하지 않아도 바로 보기 좋은 UI를 만들 수 있어요.',
  },
  {
    id: 9,
    kind: 'react-component',
    difficulty: 'advanced',
    interactive: true,
    title: 'NameForm — Controlled Input',
    concept: 'input의 value를 state와 연결하고 onChange로 그 state를 갱신하면, "지금 화면에 보이는 값"과 "state 값"이 항상 똑같이 유지돼요. 이걸 controlled input이라고 해요. components/32/NameForm.jsx 실습과 같아요.',
    examples: [
      {
        title: '기본 controlled input',
        description: '가장 기본형 — 입력값을 그대로 state에 저장하고 화면에 보여줘요.',
        code: "const AgeForm = () => {\n  const [age, setAge] = useState('')\n  return (\n    <div>\n      <input value={age} onChange={(e) => setAge(e.target.value)} />\n      <p>나이: {age}</p>\n    </div>\n  )\n}\n\nexport default AgeForm",
        sampleProps: {},
        interactive: true,
      },
      {
        title: '글자 수 세기',
        description: 'state 값을 가공(length)해서 다른 정보로 보여줄 수도 있어요.',
        code: "const CharCounter = () => {\n  const [text, setText] = useState('')\n  return (\n    <div>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <p>{text.length}자</p>\n    </div>\n  )\n}\n\nexport default CharCounter",
        sampleProps: {},
        interactive: true,
      },
      {
        title: '입력값을 변환해서 보여주기',
        description: '입력 자체는 그대로 두고, 보여줄 때만 대문자로 바꿀 수 있어요.',
        code: "const UpperForm = () => {\n  const [text, setText] = useState('')\n  return (\n    <div>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <p>{text.toUpperCase()}</p>\n    </div>\n  )\n}\n\nexport default UpperForm",
        sampleProps: {},
        interactive: true,
      },
      {
        title: '체크박스도 controlled로',
        description: 'input type이 checkbox면 value 대신 checked를 state와 연결해요.',
        code: "const AgreeForm = () => {\n  const [checked, setChecked] = useState(false)\n  return (\n    <div>\n      <input type=\"checkbox\" checked={checked} onChange={(e) => setChecked(e.target.checked)} />\n      <span> 동의함: {checked ? 'O' : 'X'}</span>\n    </div>\n  )\n}\n\nexport default AgreeForm",
        sampleProps: {},
        interactive: true,
      },
    ],
    prompt: 'input에 입력한 값이 실시간으로 화면에 반영되도록 value와 onChange를 연결하세요.',
    starterCode:
      "const NameForm = () => {\n  const [name, setName] = useState('')\n  return (\n    <div>\n      <input type=\"text\" />\n      <p>입력한 이름: {name}</p>\n    </div>\n  )\n}\n\nexport default NameForm",
    hints: [
      'input에 value={name}을 주면 state 값이 화면에 표시돼요.',
      'onChange={(e) => ...} 콜백 안에서 e.target.value로 입력값을 읽을 수 있어요.',
      '<input type="text" value={name} onChange={(e) => setName(e.target.value)} />',
    ],
    demoProps: {},
    testCases: [
      {
        props: {},
        interactions: [{ fill: { selector: 'input', value: '홍길동' } }],
        description: 'input에 "홍길동"을 입력하면 "입력한 이름: 홍길동"이 보여야 해요',
        check: (container) => container.textContent.includes('입력한 이름: 홍길동'),
      },
    ],
    solution:
      "const NameForm = () => {\n  const [name, setName] = useState('')\n  return (\n    <div>\n      <input type=\"text\" value={name} onChange={(e) => setName(e.target.value)} />\n      <p>입력한 이름: {name}</p>\n    </div>\n  )\n}\n\nexport default NameForm",
    explanation: 'value={name}은 input이 항상 state 값을 보여주게 하고, onChange는 사용자가 타이핑할 때마다 그 state를 최신 값으로 갱신해요. 이 둘이 짝을 이뤄야 완전한 controlled input이 돼요.',
  },
  {
    id: 10,
    kind: 'react-component',
    difficulty: 'applied',
    interactive: true,
    title: 'Tracker — useEffect는 처음 딱 1번만',
    concept:
      'useEffect(콜백, [])처럼 두 번째 자리에 빈 배열을 주면, 컴포넌트가 처음 나타날 때 딱 1번만 실행돼요. 배열을 아예 안 쓰면 렌더링될 때마다 매번 실행돼요. components/34/Hello.jsx 실습과 같아요.',
    examples: [
      {
        title: '상태를 1번만 초기화하기',
        description: '마운트 직후 딱 1번만 상태를 바꿔서 "로딩 완료" 표시를 해요.',
        code: "import { useState, useEffect } from 'react'\n\nconst Logger = () => {\n  const [logged, setLogged] = useState(false)\n  useEffect(() => {\n    setLogged(true)\n  }, [])\n  return <p>{logged ? '로그 기록됨' : '대기중'}</p>\n}\n\nexport default Logger",
        sampleProps: {},
        interactive: true,
      },
      {
        title: '1회성 초기화 패턴',
        description: 'API 호출이나 초기 세팅처럼 "딱 한 번만 하면 되는 일"에 자주 쓰는 형태예요.',
        code: "import { useState, useEffect } from 'react'\n\nconst InitOnce = () => {\n  const [ready, setReady] = useState(false)\n  useEffect(() => {\n    setReady(true)\n  }, [])\n  return <p>초기화 상태: {ready ? '완료' : '대기'}</p>\n}\n\nexport default InitOnce",
        sampleProps: {},
        interactive: true,
      },
      {
        title: '의존성 배열이 없으면 매번 실행 (비교용)',
        description: '두 번째 인자를 아예 안 쓰면, 렌더링될 때마다 콘솔에 계속 로그가 남아요.',
        code: "import { useEffect } from 'react'\n\nconst EveryRender = ({ tick }) => {\n  useEffect(() => {\n    console.log('렌더링마다 실행됨')\n  })\n  return <p>tick: {tick}</p>\n}\n\nexport default EveryRender",
        sampleProps: { tick: 1 },
        interactive: true,
      },
      {
        title: '특정 값이 바뀔 때만 실행하기',
        description: '빈 배열 대신 [userId]처럼 값을 넣으면, 그 값이 바뀔 때만 다시 실행돼요.',
        code: "import { useState, useEffect } from 'react'\n\nconst DepExample = ({ userId }) => {\n  const [loadedFor, setLoadedFor] = useState(null)\n  useEffect(() => {\n    setLoadedFor(userId)\n  }, [userId])\n  return <p>{userId}번 사용자 로딩됨: {loadedFor === userId ? 'O' : 'X'}</p>\n}\n\nexport default DepExample",
        sampleProps: { userId: 1 },
        interactive: true,
      },
    ],
    prompt: 'useEffect가 컴포넌트가 처음 나타날 때 딱 1번만 실행되도록 완성하세요 (지금은 렌더링마다 매번 실행돼요).',
    starterCode:
      "import { useEffect } from 'react'\n\nconst Tracker = ({ onReady }) => {\n  useEffect(() => {\n    onReady()\n  })\n\n  return <p>로딩 완료</p>\n}\n\nexport default Tracker",
    hints: [
      'useEffect(콜백, 배열) 형태에서 두 번째 자리를 채워야 해요.',
      '빈 배열 []을 두 번째 인자로 추가하면 처음 1번만 실행돼요.',
      'useEffect(() => {\n  onReady()\n}, [])',
    ],
    demoProps: { onReady: () => {} },
    testCases: [
      {
        props: {},
        trackCalls: 'onReady',
        interactions: [{ rerender: true }, { rerender: true }],
        checkCallCount: (count) => count === 1,
        description: '리렌더링이 여러 번 일어나도 onReady는 처음 1번만 호출돼야 해요',
      },
    ],
    solution:
      "import { useEffect } from 'react'\n\nconst Tracker = ({ onReady }) => {\n  useEffect(() => {\n    onReady()\n  }, [])\n\n  return <p>로딩 완료</p>\n}\n\nexport default Tracker",
    explanation:
      '의존성 배열이 없으면 리렌더링될 때마다 effect가 다시 실행돼요. 빈 배열 []은 "의존하는 값이 없다"는 뜻이라, 처음 마운트될 때 딱 1번만 실행되고 이후엔 실행되지 않아요.',
  },
  {
    id: 11,
    kind: 'react-component',
    difficulty: 'applied',
    interactive: true,
    title: 'Watcher — useEffect cleanup',
    concept:
      'useEffect 콜백에서 함수를 return하면, 그 함수는 컴포넌트가 화면에서 사라질 때(또는 effect가 다시 실행되기 직전에) 자동으로 호출돼요. 이걸 cleanup(정리) 함수라고 해요. components/35/Clock.jsx의 clearInterval과 같은 원리예요.',
    examples: [
      {
        title: '이벤트 리스너 정리',
        description: 'addEventListener로 등록한 리스너는 removeEventListener로 꼭 정리해줘야 해요.',
        code: "import { useEffect } from 'react'\n\nconst KeyWatcher = () => {\n  useEffect(() => {\n    const handler = () => {}\n    window.addEventListener('keydown', handler)\n    return () => {\n      window.removeEventListener('keydown', handler)\n    }\n  }, [])\n  return <p>키보드 감시중</p>\n}\n\nexport default KeyWatcher",
        sampleProps: {},
        interactive: true,
      },
      {
        title: 'setTimeout 정리',
        description: '예약해둔 setTimeout도 사라지기 전이면 clearTimeout으로 취소해야 해요.',
        code: "import { useEffect } from 'react'\n\nconst DelayedMessage = () => {\n  useEffect(() => {\n    const timer = setTimeout(() => {}, 3000)\n    return () => {\n      clearTimeout(timer)\n    }\n  }, [])\n  return <p>3초 뒤 메시지 예약됨</p>\n}\n\nexport default DelayedMessage",
        sampleProps: {},
        interactive: true,
      },
      {
        title: 'setInterval 정리 (실제로 똑딱거리는 시계)',
        description: 'components/35/Clock.jsx와 똑같은 패턴이에요 — 정리 안 하면 사라진 뒤에도 타이머가 계속 돌아요.',
        code: "import { useState, useEffect } from 'react'\n\nconst Clock = () => {\n  const [seconds, setSeconds] = useState(0)\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setSeconds(s => s + 1)\n    }, 1000)\n    return () => {\n      clearInterval(timer)\n    }\n  }, [])\n  return <p>{seconds}초 경과</p>\n}\n\nexport default Clock",
        sampleProps: {},
        interactive: true,
      },
      {
        title: '구독 해제 패턴',
        description: '외부 콜백(onCleanup)을 호출하는 형태로, 지금 풀 문제와 가장 비슷한 예시예요.',
        code: "import { useEffect } from 'react'\n\nconst Subscriber = ({ onCleanup }) => {\n  useEffect(() => {\n    return () => {\n      onCleanup()\n    }\n  }, [])\n  return <p>구독중</p>\n}\n\nexport default Subscriber",
        sampleProps: { onCleanup: () => {} },
        interactive: true,
      },
    ],
    prompt: '컴포넌트가 사라질 때 onCleanup이 호출되도록 정리(cleanup) 함수를 완성하세요.',
    starterCode:
      "import { useEffect } from 'react'\n\nconst Watcher = ({ onCleanup }) => {\n  useEffect(() => {\n    \n  }, [])\n\n  return <p>감시중...</p>\n}\n\nexport default Watcher",
    hints: [
      'useEffect 콜백 안에서 함수를 return하면, 그게 cleanup 함수가 돼요.',
      'return () => { ... } 형태로 만들고, 그 안에서 onCleanup을 호출하세요.',
      'return () => {\n  onCleanup()\n}',
    ],
    demoProps: { onCleanup: () => {} },
    testCases: [
      {
        props: {},
        trackCalls: 'onCleanup',
        unmountBeforeCheck: true,
        checkCallCount: (count) => count === 1,
        description: '컴포넌트가 사라질 때 onCleanup이 정확히 1번 호출돼야 해요',
      },
    ],
    solution:
      "import { useEffect } from 'react'\n\nconst Watcher = ({ onCleanup }) => {\n  useEffect(() => {\n    return () => {\n      onCleanup()\n    }\n  }, [])\n\n  return <p>감시중...</p>\n}\n\nexport default Watcher",
    explanation:
      'cleanup 함수는 타이머 해제(clearInterval), 이벤트 리스너 제거처럼 "뒷정리"가 필요할 때 써요. 정리를 안 하면 컴포넌트가 사라진 뒤에도 타이머가 계속 돌거나 메모리가 새는 문제가 생길 수 있어요.',
  },
  {
    id: 12,
    kind: 'react-component',
    difficulty: 'capstone',
    interactive: true,
    title: '🏆 캡스톤 — ProfileCard 컴포넌트',
    concept: 'props, 배열 map, useState, 조건부 렌더링을 한 컴포넌트 안에서 동시에 사용해봐요.',
    examples: [
      {
        title: '① props만 표시하는 카드',
        description: '가장 단순한 형태 — props로 받은 값만 그대로 보여줘요.',
        code: 'const UserCard = ({ name, role }) => {\n  return (\n    <div>\n      <h3>{name}</h3>\n      <p>{role}</p>\n    </div>\n  )\n}\n\nexport default UserCard',
        sampleProps: { name: '홍길동', role: '프론트엔드 개발자' },
      },
      {
        title: '② 조건부 렌더링 + 배열 map 추가',
        description: '&&로 상태 표시를, map으로 멤버 목록을 함께 보여줘요.',
        code: 'const TeamCard = ({ teamName, isActive, members }) => {\n  return (\n    <div>\n      <h3>{teamName}</h3>\n      {isActive && <p>🟢 활동중</p>}\n      <ul>\n        {members.map((m) => (\n          <li key={m}>{m}</li>\n        ))}\n      </ul>\n    </div>\n  )\n}\n\nexport default TeamCard',
        sampleProps: { teamName: '개발팀', isActive: true, members: ['홍길동', '하늘'] },
      },
      {
        title: '③ useState + 배열 조합',
        description: '목록을 보여주면서 동시에 버튼 클릭으로 상태도 바꿔요.',
        code: "const VoteCard = ({ options }) => {\n  const [votes, setVotes] = useState(0)\n  return (\n    <div>\n      <ul>\n        {options.map((o) => (\n          <li key={o}>{o}</li>\n        ))}\n      </ul>\n      <button onClick={() => setVotes(v => v + 1)}>투표하기 ({votes})</button>\n    </div>\n  )\n}\n\nexport default VoteCard",
        sampleProps: { options: ['A안', 'B안'] },
        interactive: true,
      },
      {
        title: '④ 네 가지 개념을 전부 조합한 완성형',
        description: 'props + 조건부(삼항) + map + useState, 지금 풀 문제와 거의 같은 구조예요.',
        code: "const ProductCard = ({ name, inStock, tags }) => {\n  const [favorited, setFavorited] = useState(false)\n  return (\n    <div>\n      <h3>{name}</h3>\n      {inStock ? <p>구매 가능</p> : <p>품절</p>}\n      <ul>\n        {tags.map((t) => (\n          <li key={t}>#{t}</li>\n        ))}\n      </ul>\n      <button onClick={() => setFavorited(f => !f)}>{favorited ? '⭐' : '☆'}</button>\n    </div>\n  )\n}\n\nexport default ProductCard",
        sampleProps: { name: '키보드', inStock: true, tags: ['전자기기', '인기'] },
        interactive: true,
      },
    ],
    prompt: 'isOnline이 true일 때만 "🟢 온라인"이 이름 아래에 보이도록 완성하세요. (스킬 목록 렌더링과 좋아요 버튼은 이미 완성되어 있어요)',
    starterCode:
      "const ProfileCard = ({ name, isOnline, skills }) => {\n  const [liked, setLiked] = useState(false)\n  return (\n    <div>\n      <h3>{name}</h3>\n      <ul>\n        {skills.map((skill) => (\n          <li key={skill}>{skill}</li>\n        ))}\n      </ul>\n      <button onClick={() => setLiked(true)}>{liked ? '❤️' : '🤍'}</button>\n    </div>\n  )\n}\n\nexport default ProfileCard",
    hints: [
      '&& 연산자로 조건이 true일 때만 보이는 부분을 추가할 수 있어요.',
      '{isOnline && <p>...</p>} 형태로 h3 아래에 추가해보세요.',
      "<h3>{name}</h3>\n{isOnline && <p>🟢 온라인</p>}",
    ],
    demoProps: { name: '홍길동', isOnline: true, skills: ['React', 'CSS'] },
    testCases: [
      {
        props: { name: '홍길동', isOnline: true, skills: ['React', 'CSS'] },
        interactions: [],
        description: '이름, 스킬 목록, 온라인 표시가 모두 보여야 해요',
        check: (c) =>
          c.textContent.includes('홍길동') &&
          c.textContent.includes('React') &&
          c.textContent.includes('CSS') &&
          c.textContent.includes('온라인'),
      },
      {
        props: { name: '하늘', isOnline: false, skills: ['JS'] },
        interactions: [{ click: 'button' }],
        description: 'isOnline이 false면 온라인 표시가 없어야 하고, 좋아요 버튼을 누르면 하트가 채워져야 해요',
        check: (c) => c.textContent.includes('❤️') && !c.textContent.includes('온라인'),
      },
    ],
    solution:
      "const ProfileCard = ({ name, isOnline, skills }) => {\n  const [liked, setLiked] = useState(false)\n  return (\n    <div>\n      <h3>{name}</h3>\n      {isOnline && <p>🟢 온라인</p>}\n      <ul>\n        {skills.map((skill) => (\n          <li key={skill}>{skill}</li>\n        ))}\n      </ul>\n      <button onClick={() => setLiked(true)}>{liked ? '❤️' : '🤍'}</button>\n    </div>\n  )\n}\n\nexport default ProfileCard",
    explanation:
      '실제 컴포넌트는 이렇게 props로 받은 데이터(name, skills)를 표시하고, 조건에 따라 다르게 보여주고(isOnline), 사용자 동작에 반응하는(useState) 여러 기능이 한 곳에 섞여 있어요.',
  },
]

export default reactProblems
