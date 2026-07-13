// HTML 카테고리 · 초급 탭 문제 목록
// 사용자가 작성한 HTML 마크업을 iframe(HtmlLivePreview)에 렌더링하고,
// 각 testCase의 check(doc) 함수로 구조/속성을 검사한다 (kind: 'html').
const htmlProblems = [
  {
    id: 1,
    kind: 'html',
    difficulty: 'basic',
    title: '시맨틱 네비게이션 만들기',
    concept: 'nav 태그는 "이 부분이 내비게이션이다"라는 의미를 브라우저와 스크린리더에 전달해요. div보다 의미가 분명해요.',
    examples: [
      {
        title: 'main과 aside 구분하기',
        description: 'nav처럼 main(본문), aside(사이드바)도 의미를 가진 시맨틱 태그예요.',
        code: '<main>본문 내용</main>\n<aside>사이드바</aside>',
      },
      {
        title: 'header 안에 nav 넣기',
        description: '실제 사이트에서는 보통 header 태그 안에 nav를 넣어요.',
        code: '<header>\n  <nav>\n    <a href="#">홈</a>\n    <a href="#">소개</a>\n  </nav>\n</header>',
      },
      {
        title: 'footer도 시맨틱하게',
        description: '페이지 맨 아래 저작권/링크 영역은 footer 태그로 표현해요.',
        code: '<footer>\n  <p>저작권 2026</p>\n</footer>',
      },
      {
        title: 'article과 section 구분',
        description: 'article은 독립된 하나의 글, section은 그 안의 주제별 묶음이에요.',
        code: '<article>\n  <section>첫 번째 섹션</section>\n  <section>두 번째 섹션</section>\n</article>',
      },
    ],
    prompt: 'Home, About, Contact 링크 3개를 감싸는 nav 태그를 작성하세요.',
    starterCode: '<div>\n  <a href="#">Home</a>\n  <a href="#">About</a>\n  <a href="#">Contact</a>\n</div>',
    hints: [
      'div 대신 의미를 가진 태그를 써보세요.',
      '내비게이션을 뜻하는 시맨틱 태그가 있어요.',
      '<nav>로 감싸면 돼요.',
    ],
    testCases: [
      { description: 'nav 태그가 있어야 해요', check: (doc) => Boolean(doc.querySelector('nav')) },
      {
        description: 'nav 안에 링크(a 태그)가 3개 있어야 해요',
        check: (doc) => doc.querySelectorAll('nav a').length === 3,
      },
    ],
    solution: '<nav>\n  <a href="#">Home</a>\n  <a href="#">About</a>\n  <a href="#">Contact</a>\n</nav>',
    explanation:
      '<nav>는 페이지의 주요 내비게이션 영역임을 명시하는 시맨틱 태그예요. 스크린리더 사용자는 nav로 이동해서 바로 메뉴를 찾을 수 있어요.',
  },
  {
    id: 2,
    kind: 'html',
    difficulty: 'basic',
    title: '이미지 대체 텍스트(alt) 추가',
    concept: 'alt 속성은 이미지가 로드되지 않거나 스크린리더가 읽을 때 대신 전달되는 설명이에요. 접근성의 기본이에요.',
    examples: [
      {
        title: '순수 장식용 이미지는 빈 alt',
        description: '내용과 상관없는 장식용 이미지는 alt=""로 비워둬서 스크린리더가 건너뛰게 해요.',
        code: "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ccc'/%3E%3C/svg%3E\" alt=\"\">",
      },
      {
        title: '제품 사진에 자세한 설명 넣기',
        description: '의미 있는 이미지일수록 alt를 구체적으로 써야 정보가 잘 전달돼요.',
        code: "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%232f9e44'/%3E%3C/svg%3E\" alt=\"초록색 노트북 가방\">",
      },
      {
        title: '여러 이미지에 각각 다른 alt',
        description: '이미지가 여러 개면 각각 무엇이 다른지 alt로 구분해줘야 해요.',
        code: "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle r='20' cx='20' cy='20' fill='red'/%3E%3C/svg%3E\" alt=\"빨간 원\">\n<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle r='20' cx='20' cy='20' fill='blue'/%3E%3C/svg%3E\" alt=\"파란 원\">",
      },
      {
        title: 'alt가 없으면 생기는 문제 (잘못된 예)',
        description: 'alt가 없으면 스크린리더가 파일 경로를 그대로 읽어서 의미를 전혀 알 수 없어요.',
        code: "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='orange'/%3E%3C/svg%3E\">",
      },
    ],
    prompt: '이미지에 내용을 설명하는 alt 속성을 추가하세요.',
    starterCode:
      "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='90'%3E%3Crect width='120' height='90' fill='%23d64550'/%3E%3C/svg%3E\">",
    hints: [
      'img 태그에 속성을 하나 더 추가해야 해요.',
      '대체 텍스트를 나타내는 속성 이름은 alt 예요.',
      'alt="빨간색 사각형 이미지" 처럼 값을 채워보세요.',
    ],
    testCases: [
      { description: 'img 태그가 있어야 해요', check: (doc) => Boolean(doc.querySelector('img')) },
      {
        description: 'alt 속성이 비어있지 않아야 해요',
        check: (doc) => {
          const img = doc.querySelector('img')
          return Boolean(img && img.getAttribute('alt') && img.getAttribute('alt').trim().length > 0)
        },
      },
    ],
    solution:
      "<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='90'%3E%3Crect width='120' height='90' fill='%23d64550'/%3E%3C/svg%3E\" alt=\"빨간색 사각형 이미지\">",
    explanation:
      'alt 속성이 없으면 시각장애인 사용자는 이 이미지가 무슨 내용인지 전혀 알 수 없어요. 의미 있는 이미지에는 항상 alt를 채워야 해요.',
  },
  {
    id: 3,
    kind: 'html',
    difficulty: 'basic',
    title: 'label과 input 연결하기',
    concept: 'label의 for 속성과 input의 id를 같게 맞추면, 라벨을 눌러도 입력창에 포커스가 가고 스크린리더가 관계를 인식해요.',
    examples: [
      {
        title: '이메일 입력칸 연결하기',
        description: 'for와 id를 "email"로 똑같이 맞춘 예시예요.',
        code: '<label for="email">이메일</label>\n<input type="email" id="email">',
      },
      {
        title: '체크박스도 label로 연결하기',
        description: 'text 입력칸뿐 아니라 체크박스도 label과 연결할 수 있어요.',
        code: '<label for="agree">약관에 동의합니다</label>\n<input type="checkbox" id="agree">',
      },
      {
        title: '여러 입력칸을 각각 연결하기',
        description: '입력칸이 여러 개면, 각각 서로 다른 id로 짝을 맞춰야 해요.',
        code: '<label for="first">이름</label>\n<input type="text" id="first">\n<label for="last">성</label>\n<input type="text" id="last">',
      },
      {
        title: 'label로 감싸는 방법 (for/id 없이도 연결됨)',
        description: 'input을 label 태그로 직접 감싸면 for/id 없이도 자동으로 연결돼요.',
        code: '<label>\n  전화번호\n  <input type="tel">\n</label>',
      },
    ],
    prompt: '이름 입력칸의 label과 input을 for/id로 연결하세요.',
    starterCode: '<label>이름</label>\n<input type="text">',
    hints: [
      'label에 for 속성을 추가해야 해요.',
      'input에는 id 속성을 추가해야 해요.',
      'label의 for 값과 input의 id 값을 똑같이 맞추세요 (예: name).',
    ],
    testCases: [
      {
        description: 'label에 for 속성이 있어야 해요',
        check: (doc) => Boolean(doc.querySelector('label')?.getAttribute('for')),
      },
      {
        description: 'label의 for 값과 같은 id를 가진 input이 있어야 해요',
        check: (doc) => {
          const forValue = doc.querySelector('label')?.getAttribute('for')
          return Boolean(forValue && doc.getElementById(forValue))
        },
      },
    ],
    solution: '<label for="name">이름</label>\n<input type="text" id="name">',
    explanation:
      'for와 id를 연결하면 label 클릭 시 연결된 input에 자동으로 포커스가 가고, 스크린리더가 "이름 입력칸"처럼 읽어줄 수 있어요.',
  },
  {
    id: 4,
    kind: 'html',
    difficulty: 'intermediate',
    title: '표(table) 구조 만들기',
    concept: '표 형태의 데이터는 table/tr/th/td로 표현해요. th는 제목(헤더) 셀, td는 일반 내용 셀이에요.',
    examples: [
      {
        title: '여러 행 데이터 표',
        description: '제목 행 하나에 내용 행이 여러 개 있는 가장 흔한 표 형태예요.',
        code: '<table>\n  <tr><th>과목</th><th>점수</th></tr>\n  <tr><td>수학</td><td>90</td></tr>\n  <tr><td>영어</td><td>85</td></tr>\n</table>',
      },
      {
        title: 'thead/tbody로 구역 나누기',
        description: '제목 부분(thead)과 내용 부분(tbody)을 명확히 구분할 수도 있어요.',
        code: '<table>\n  <thead>\n    <tr><th>이름</th><th>나이</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>홍길동</td><td>20</td></tr>\n  </tbody>\n</table>',
      },
      {
        title: 'colspan으로 칸 합치기',
        description: 'colspan="2"를 주면 그 셀이 2칸을 가로로 차지해요.',
        code: '<table>\n  <tr><th colspan="2">공지사항</th></tr>\n  <tr><td>제목</td><td>내용</td></tr>\n</table>',
      },
      {
        title: '세 개 열짜리 표',
        description: '열 개수는 th/td 개수만큼 자유롭게 늘릴 수 있어요.',
        code: '<table>\n  <tr><th>순위</th><th>이름</th><th>점수</th></tr>\n  <tr><td>1</td><td>홍길동</td><td>100</td></tr>\n</table>',
      },
    ],
    prompt: '이름과 나이 데이터를 표로 만드세요. 제목 행은 th, 내용 행은 td를 사용하세요.',
    starterCode: '<div>\n  이름 나이\n  홍길동 20\n</div>',
    hints: [
      'table 태그로 전체를 감싸고, 각 줄은 tr(행)로 나눠요.',
      '제목 셀은 th, 일반 내용 셀은 td를 써요.',
      '<table>\n  <tr><th>이름</th><th>나이</th></tr>\n  <tr><td>홍길동</td><td>20</td></tr>\n</table>',
    ],
    testCases: [
      { description: 'table 태그가 있어야 해요', check: (doc) => Boolean(doc.querySelector('table')) },
      { description: '제목 셀(th)이 하나 이상 있어야 해요', check: (doc) => doc.querySelectorAll('th').length >= 1 },
      { description: '내용 셀(td)이 하나 이상 있어야 해요', check: (doc) => doc.querySelectorAll('td').length >= 1 },
    ],
    solution:
      '<table>\n  <tr><th>이름</th><th>나이</th></tr>\n  <tr><td>홍길동</td><td>20</td></tr>\n</table>',
    explanation: 'table은 표 전체, tr은 한 행, th는 제목 셀, td는 내용 셀이에요. 이 구조 덕분에 스크린리더도 표를 행/열 단위로 읽어줄 수 있어요.',
  },
  {
    id: 5,
    kind: 'html',
    difficulty: 'intermediate',
    title: '링크와 버튼 구분하기',
    concept: 'a 태그는 "다른 페이지/위치로 이동"할 때, button 태그는 "클릭하면 어떤 동작이 실행"될 때 사용해요. 의미가 달라요.',
    examples: [
      {
        title: '폼 제출 버튼',
        description: '폼을 제출하는 동작에는 button(type="submit")이 맞아요.',
        code: '<button type="submit">가입하기</button>',
      },
      {
        title: '메일 보내는 링크',
        description: 'mailto:는 클릭 시 메일 앱을 여는 특수한 이동이라, a 태그가 맞아요.',
        code: '<a href="mailto:test@example.com">이메일 보내기</a>',
      },
      {
        title: '여러 버튼 나란히 놓기',
        description: '확인/취소처럼 동작이 여러 개면 button을 여러 개 나란히 써요.',
        code: '<button>확인</button>\n<button>취소</button>',
      },
      {
        title: '페이지 안에서 이동하는 링크',
        description: 'href="#id"는 같은 페이지 안의 다른 위치로 이동하는 것이라 여전히 a예요.',
        code: '<a href="#section2">아래로 이동</a>',
      },
    ],
    prompt: '"자세히 보기"는 이동이니 a 태그로, "삭제"는 동작 실행이니 button 태그로 만드세요.',
    starterCode: '<a href="#">자세히 보기</a>\n<a href="#">삭제</a>',
    hints: [
      '이동이 아니라 동작 실행에는 a 대신 다른 태그를 써야 해요.',
      '동작 실행용 태그는 button 이에요.',
      '<a href="#">자세히 보기</a>\n<button>삭제</button>',
    ],
    testCases: [
      { description: 'a 태그(링크)가 있어야 해요', check: (doc) => Boolean(doc.querySelector('a[href]')) },
      { description: 'button 태그가 있어야 해요', check: (doc) => Boolean(doc.querySelector('button')) },
    ],
    solution: '<a href="#">자세히 보기</a>\n<button>삭제</button>',
    explanation:
      'a 태그를 버튼처럼 쓰면 키보드 사용자나 스크린리더에게 "이동"이라는 잘못된 정보를 줄 수 있어요. 동작 실행에는 button이 맞아요.',
  },
  {
    id: 6,
    kind: 'html',
    difficulty: 'advanced',
    title: '이메일 입력칸과 체크박스 만들기',
    concept: 'input의 type 속성을 바꾸면 브라우저가 알아서 다르게 동작해요. type="email"은 이메일 형식을 검사하고, type="checkbox"는 다중 선택용 네모 칸이 돼요.',
    examples: [
      {
        title: '비밀번호 입력칸',
        description: 'type="password"는 입력한 글자를 점(•)으로 가려줘요.',
        code: '<input type="password">',
      },
      {
        title: '라디오 버튼 (단일 선택)',
        description: 'name을 똑같이 맞추면 그 그룹 중 하나만 선택되도록 묶여요.',
        code: '<input type="radio" name="gender"> 남성\n<input type="radio" name="gender"> 여성',
      },
      {
        title: '날짜 선택 입력칸',
        description: 'type="date"를 쓰면 브라우저가 자동으로 달력 UI를 보여줘요.',
        code: '<input type="date">',
      },
      {
        title: '숫자만 입력받기',
        description: 'type="number"는 숫자가 아닌 문자를 막아주고, 위아래 화살표도 생겨요.',
        code: '<input type="number">',
      },
    ],
    prompt: '이메일 입력칸(type="email")과 "약관에 동의합니다" 체크박스(type="checkbox")를 만드세요.',
    starterCode: '<input type="text">\n<input type="text">',
    hints: [
      '첫 번째 input의 type을 email로 바꿔보세요.',
      '두 번째 input의 type을 checkbox로 바꿔보세요.',
      '<input type="email">\n<input type="checkbox"> 약관에 동의합니다',
    ],
    testCases: [
      { description: 'type="email" 입력칸이 있어야 해요', check: (doc) => Boolean(doc.querySelector('input[type="email"]')) },
      { description: 'type="checkbox" 입력칸이 있어야 해요', check: (doc) => Boolean(doc.querySelector('input[type="checkbox"]')) },
    ],
    solution: '<input type="email">\n<input type="checkbox"> 약관에 동의합니다',
    explanation: 'input은 type 속성 하나로 완전히 다른 입력 방식이 돼요. email은 자동으로 형식을 검사하고, checkbox는 여러 개를 동시에 선택할 수 있는 UI를 만들어줘요.',
  },
  {
    id: 7,
    kind: 'html',
    difficulty: 'advanced',
    title: '드롭다운 메뉴 만들기',
    concept: 'select와 option을 함께 쓰면 여러 선택지 중 하나를 고르는 드롭다운 메뉴를 만들 수 있어요.',
    examples: [
      {
        title: '기본 선택값 정하기',
        description: 'option에 selected를 추가하면 처음부터 그 값이 선택돼 있어요.',
        code: '<select>\n  <option>월요일</option>\n  <option selected>화요일</option>\n  <option>수요일</option>\n</select>',
      },
      {
        title: 'value 속성과 함께 쓰기',
        description: '화면에 보이는 글자와 실제 저장되는 값(value)을 다르게 둘 수 있어요.',
        code: '<select>\n  <option value="kr">한국</option>\n  <option value="us">미국</option>\n  <option value="jp">일본</option>\n</select>',
      },
      {
        title: '여러 줄 텍스트 입력칸',
        description: 'select는 아니지만, 긴 글을 입력받을 땐 textarea를 함께 알아두면 좋아요.',
        code: '<textarea>여기에 여러 줄을 입력할 수 있어요</textarea>',
      },
      {
        title: '선택지 그룹 나누기',
        description: 'optgroup으로 선택지를 카테고리별로 묶어서 보여줄 수 있어요.',
        code: '<select>\n  <optgroup label="과일">\n    <option>사과</option>\n    <option>바나나</option>\n  </optgroup>\n  <optgroup label="채소">\n    <option>당근</option>\n  </optgroup>\n</select>',
      },
    ],
    prompt: '과일을 고를 수 있는 드롭다운(select)을 만드세요. option은 3개 이상이어야 해요.',
    starterCode: '<div>사과, 바나나, 포도 중 하나 선택</div>',
    hints: [
      '전체를 select 태그로 감싸요.',
      '선택지 하나하나는 option 태그예요.',
      '<select>\n  <option>사과</option>\n  <option>바나나</option>\n  <option>포도</option>\n</select>',
    ],
    testCases: [
      { description: 'select 태그가 있어야 해요', check: (doc) => Boolean(doc.querySelector('select')) },
      { description: 'option이 3개 이상 있어야 해요', check: (doc) => doc.querySelectorAll('option').length >= 3 },
    ],
    solution: '<select>\n  <option>사과</option>\n  <option>바나나</option>\n  <option>포도</option>\n</select>',
    explanation: 'select는 드롭다운 상자 전체를, option은 그 안의 선택지 하나하나를 나타내요. 사용자가 클릭하면 목록이 펼쳐져서 하나를 고를 수 있어요.',
  },
  {
    id: 8,
    kind: 'html',
    difficulty: 'applied',
    title: '새 탭에서 열리는 링크 만들기',
    concept: 'a 태그에 target="_blank"를 추가하면 클릭했을 때 현재 탭이 아니라 새 탭에서 열려요. 외부 사이트로 보낼 때 자주 써요.',
    examples: [
      {
        title: '전화 걸기 링크',
        description: 'tel:을 쓰면 모바일에서 클릭 시 바로 전화 앱이 열려요.',
        code: '<a href="tel:01012345678">전화하기</a>',
      },
      {
        title: '새 탭 + 보안 속성 함께 쓰기',
        description: 'target="_blank"를 쓸 땐 rel="noopener noreferrer"를 같이 써주는 게 실무 권장 방식이에요.',
        code: '<a href="https://example.com" target="_blank" rel="noopener noreferrer">외부 링크</a>',
      },
      {
        title: '같은 탭에서 열리는 링크 (비교용)',
        description: 'target이 없으면 기본값은 현재 탭에서 그대로 이동하는 거예요.',
        code: '<a href="https://example.com">같은 탭에서 열림</a>',
      },
      {
        title: '이미지에 링크 걸기',
        description: 'a 태그는 텍스트뿐 아니라 이미지 같은 다른 요소도 감쌀 수 있어요.',
        code: "<a href=\"https://example.com\" target=\"_blank\">\n  <img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='%23555'/%3E%3C/svg%3E\" alt=\"바로가기 배너\">\n</a>",
      },
    ],
    prompt: '외부 사이트로 이동하는 링크가 새 탭에서 열리도록 target 속성을 추가하세요.',
    starterCode: '<a href="https://example.com">외부 사이트로 이동</a>',
    hints: [
      'a 태그에 속성을 하나 더 추가해야 해요.',
      '새 탭에서 열게 하는 속성은 target이에요.',
      '<a href="https://example.com" target="_blank">외부 사이트로 이동</a>',
    ],
    testCases: [
      {
        description: 'target="_blank" 속성이 있는 링크가 있어야 해요',
        check: (doc) => Boolean(doc.querySelector('a[target="_blank"]')),
      },
    ],
    solution: '<a href="https://example.com" target="_blank">외부 사이트로 이동</a>',
    explanation: 'target="_blank"는 브라우저에게 "이 링크는 새 탭/창에서 열어줘"라고 알려주는 속성이에요.',
  },
  {
    id: 9,
    kind: 'html',
    difficulty: 'applied',
    title: '인용문과 강조 텍스트 넣기',
    concept: 'blockquote는 다른 곳에서 가져온 인용문을 나타내고, em은 문장에서 강조하고 싶은 부분을 나타내는 시맨틱 태그예요.',
    examples: [
      {
        title: 'strong으로 더 강하게 강조하기',
        description: 'em은 "말투를 강조"하는 느낌이고, strong은 "중요함"을 나타내는 강조예요.',
        code: '<p>이 부분은 <strong>정말 중요</strong>해요.</p>',
      },
      {
        title: '출처와 함께 인용하기',
        description: 'blockquote 안에 footer로 인용의 출처를 함께 밝힐 수 있어요.',
        code: '<blockquote>\n  <p>아는 것을 안다고 하라.</p>\n  <footer>— 공자</footer>\n</blockquote>',
      },
      {
        title: 'mark로 형광펜 표시하기',
        description: 'mark는 형광펜으로 칠한 것처럼 노란 배경으로 강조해줘요.',
        code: '<p>시험 범위는 <mark>3단원부터 5단원까지</mark>입니다.</p>',
      },
      {
        title: '코드 부분 강조하기',
        description: '문장 속 코드 단어는 code 태그로 감싸면 고정폭 글꼴로 구분돼 보여요.',
        code: '<p>변수는 <code>let</code> 이나 <code>const</code>로 선언해요.</p>',
      },
    ],
    prompt: '인용문(blockquote) 안에 강조하고 싶은 단어를 em으로 감싸서 넣으세요.',
    starterCode: '<div>아는 것을 안다고 하고 모르는 것을 모른다고 하는 것이 아는 것이다.</div>',
    hints: [
      '전체 문장을 blockquote 태그로 감싸요.',
      '강조하고 싶은 단어는 em 태그로 감싸요.',
      '<blockquote>아는 것을 안다고 하고 <em>모르는 것을 모른다</em>고 하는 것이 아는 것이다.</blockquote>',
    ],
    testCases: [
      { description: 'blockquote 태그가 있어야 해요', check: (doc) => Boolean(doc.querySelector('blockquote')) },
      { description: 'em 태그가 있어야 해요', check: (doc) => Boolean(doc.querySelector('em')) },
    ],
    solution:
      '<blockquote>아는 것을 안다고 하고 <em>모르는 것을 모른다</em>고 하는 것이 아는 것이다.</blockquote>',
    explanation: 'blockquote와 em은 둘 다 "생김새"가 아니라 "의미"를 나타내는 시맨틱 태그예요. 브라우저는 기본 스타일(들여쓰기, 기울임)도 자동으로 입혀줘요.',
  },
  {
    id: 10,
    kind: 'html',
    difficulty: 'capstone',
    title: '🏆 캡스톤 — 미니 프로필 카드',
    concept: '지금까지 배운 nav, img+alt, table, label+input을 한 번에 조합해서 미니 프로필 마크업을 완성해요.',
    examples: [
      {
        title: '① nav만 먼저',
        description: '한 번에 다 만들지 말고, 배운 것부터 하나씩 조립해봐요.',
        code: '<nav>\n  <a href="#">Home</a>\n  <a href="#">About</a>\n</nav>',
      },
      {
        title: '② img까지 추가',
        description: 'nav 아래에 alt가 채워진 이미지를 이어 붙여요.',
        code: "<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">About</a>\n</nav>\n<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%23d64550'/%3E%3C/svg%3E\" alt=\"프로필 사진\">",
      },
      {
        title: '③ table까지 추가',
        description: '그 아래에 th/td가 있는 표를 이어 붙여요.',
        code: '<nav>\n  <a href="#">Home</a>\n  <a href="#">About</a>\n</nav>\n<table>\n  <tr><th>이름</th><th>직업</th></tr>\n  <tr><td>홍길동</td><td>학생</td></tr>\n</table>',
      },
      {
        title: '④ label+input까지 전부 조합한 완성형',
        description: 'nav + img + table + label/input, 네 가지를 모두 한 화면에 담은 모습이에요.',
        code: "<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">About</a>\n</nav>\n<img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%23d64550'/%3E%3C/svg%3E\" alt=\"프로필 사진\">\n<table>\n  <tr><th>이름</th><th>직업</th></tr>\n  <tr><td>홍길동</td><td>학생</td></tr>\n</table>\n<label for=\"email2\">이메일</label>\n<input type=\"email\" id=\"email2\">",
      },
    ],
    prompt:
      '다음을 모두 만족하는 마크업을 작성하세요: ① 링크 2개 이상이 들어있는 nav ② alt가 채워진 img ③ th/td가 있는 table ④ for/id로 연결된 label+input',
    starterCode:
      '<div>\n  <!-- 1. 여기에 nav (링크 2개 이상) -->\n\n  <!-- 2. 여기에 alt가 채워진 img -->\n\n  <!-- 3. 여기에 table (th, td 포함) -->\n\n  <!-- 4. 여기에 label + input (for/id 연결) -->\n</div>',
    hints: [
      '4개 요구사항을 하나씩 순서대로 채워나가세요. 앞에서 풀었던 문제들을 참고해도 좋아요.',
      'nav 안에는 a 태그, table 안에는 tr/th/td, label에는 for, input에는 같은 값의 id가 필요해요.',
      'nav: <nav><a href="#">Home</a><a href="#">About</a></nav>\ntable: <table><tr><th>이름</th></tr><tr><td>홍길동</td></tr></table>',
    ],
    testCases: [
      { description: 'nav 태그 안에 링크가 2개 이상 있어야 해요', check: (doc) => doc.querySelectorAll('nav a').length >= 2 },
      {
        description: 'alt가 채워진 img가 있어야 해요',
        check: (doc) => {
          const img = doc.querySelector('img')
          return Boolean(img && img.getAttribute('alt') && img.getAttribute('alt').trim().length > 0)
        },
      },
      {
        description: 'th와 td가 있는 table이 있어야 해요',
        check: (doc) => doc.querySelectorAll('table th').length >= 1 && doc.querySelectorAll('table td').length >= 1,
      },
      {
        description: 'for/id로 연결된 label과 input이 있어야 해요',
        check: (doc) => {
          const forValue = doc.querySelector('label')?.getAttribute('for')
          return Boolean(forValue && doc.getElementById(forValue))
        },
      },
    ],
    solution:
      '<div>\n  <nav>\n    <a href="#">Home</a>\n    <a href="#">About</a>\n  </nav>\n\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\'%3E%3Ccircle cx=\'40\' cy=\'40\' r=\'40\' fill=\'%23d64550\'/%3E%3C/svg%3E" alt="프로필 사진">\n\n  <table>\n    <tr><th>이름</th><th>직업</th></tr>\n    <tr><td>홍길동</td><td>학생</td></tr>\n  </table>\n\n  <label for="email">이메일</label>\n  <input type="email" id="email">\n</div>',
    explanation:
      '4가지 요소를 각각 따로 배웠지만, 실제 페이지에서는 이렇게 한 화면 안에 다 같이 쓰여요. nav로 이동 경로를, img로 시각 정보를, table로 정형 데이터를, label+input으로 입력을 담당해요.',
  },
]

export default htmlProblems
