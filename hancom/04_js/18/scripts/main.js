// 퀴즈 데이터: 각 선택지마다 설명을 가지고 있음
// 정답 버튼뿐 아니라 오답 버튼도 왜 틀렸는지 설명을 표시
const quizzes = [
  {
    question: "다음 중 시맨틱 태그는?",
    choices: ["<div>", "<section>", "<span>", "<b>"],
    choiceDescriptions: [
      "<div> ▸ 순수 컨테이너\n\n<div class=\"header\">\n  콘텐츠\n</div>",
      "<section> ▸ 시맨틱 태그\n\n<section>\n  <h2>소개</h2>\n</section>",
      "<span> ▸ 인라인 컨테이너\n\n<span class=\"highlight\">\n  강조\n</span>",
      "<b> ▸ 강조 태그\n\n<b>중요한 텍스트</b>"
    ],
    answer: 1,
    explanations: [
      "오답: <div>는 단순한 컨테이너일 뿐입니다. 의미 정보를 전달하지 않으므로 검색엔진이 내용을 이해하기 어렵습니다. 레이아웃 분할이나 스타일 적용이 필요할 때만 사용합니다. 예: <div class=\"wrapper\">내용</div>",
      "정답: <section>은 문서의 의미 있는 섹션을 구분하는 시맨틱 태그입니다. 검색엔진과 스크린리더가 문서 구조를 이해할 수 있습니다. 예: <section><h2>소개</h2>내용</section>",
      "오답: <span>은 인라인 요소로, 텍스트 일부에 스타일을 적용할 때만 사용합니다. 의미 정보가 없으므로 시맨틱 태그가 아닙니다. 예: <span class=\"highlight\">중요</span>",
      "오답: <b>는 시각적 강조만 하는 태그입니다. 시맨틱 정보를 전달하지 않습니다. 의미 있는 강조는 <strong> 태그를 사용해야 합니다. 예: <b>굵은 텍스트</b>"
    ]
  },
  {
    question: "let과 const의 차이는?",
    choices: ["둘 다 재할당 가능", "let만 재할당 가능", "const만 재할당 가능", "차이 없음"],
    choiceDescriptions: [
      "let / const 비교\n\n// 다릅니다",
      "let ▸ 재할당 가능\n\nlet count = 0;\ncount = 1;  // ✓",
      "const ▸ 재할당 불가능\n\nconst PI = 3.14;\nPI = 3;  // ✗ 에러",
      "let / const 비교\n\n// 명확히 다릅니다"
    ],
    answer: 1,
    explanations: [
      "오답: let과 const는 매우 다릅니다. let은 값을 재할당할 수 있지만 const는 한 번 할당하면 절대 변경할 수 없습니다. 예: let x = 1; x = 2; (가능) vs const y = 1; y = 2; (에러 발생)",
      "정답: let은 재할당 가능한 변수입니다. 카운터, 사용자 입력값, 변할 수 있는 데이터를 저장할 때 사용합니다. 예: let count = 0; count = 1; count = 2; 모두 가능합니다.",
      "오답: const는 재할당 불가능하고 let은 재할당 가능합니다. 정반대입니다. const PI = 3.14; PI = 3; (에러) 하지만 let x = 10; x = 20; (정상)",
      "오답: let과 const는 명확히 다릅니다. 재할당 가능 여부, 선언 방식, 초기화 필수 여부 등에서 근본적으로 다릅니다. const는 선언할 때 반드시 값을 할당해야 합니다."
    ]
  },
  {
    question: "다음 중 display: flex의 역할은?",
    choices: ["텍스트 정렬", "레이아웃 배치", "배경 색상 지정", "폰트 크기 조정"],
    choiceDescriptions: [
      "text-align ▸ 텍스트 정렬\n\ntext-align: center;",
      "display: flex ▸ 요소 배치\n\n.container {\n  display: flex;\n  justify-content: center;\n}",
      "background-color ▸ 배경색\n\nbackground-color: #fff;",
      "font-size ▸ 폰트 크기\n\nfont-size: 16px;"
    ],
    answer: 1,
    explanations: [
      "오답: 텍스트 정렬은 text-align의 역할입니다. display: flex와는 완전히 다릅니다. text-align은 인라인 요소들의 정렬만 처리하고, flex는 블록 레이아웃을 완전히 변경합니다. 예: text-align: center; (텍스트만 정렬)",
      "정답: display: flex는 Flexbox 레이아웃을 활성화합니다. 자식 요소들을 행/열로 유연하게 배치하고, 간격 분배, 정렬을 자동으로 처리합니다. 반응형 디자인의 필수 속성입니다. 예: display: flex; justify-content: center; align-items: center;",
      "오답: 배경 색상은 background-color로 지정합니다. display: flex는 요소의 배치 방식을 결정하고, background-color는 그 배경을 채우는 것일 뿐입니다. 둘은 완전히 다른 역할입니다.",
      "오답: 폰트 크기는 font-size로 조정합니다. display: flex는 글자 크기와 무관하게 컨테이너 내 요소들의 배치 방식을 변경합니다. 예: font-size: 16px; (글자 크기) vs display: flex; (배치 방식)"
    ]
  },
  {
    question: "DOM이란 뭐예요?",
    choices: ["JavaScript 문법", "HTML 문서의 트리 구조", "CSS 스타일시트", "서버 프로토콜"],
    choiceDescriptions: [
      "JavaScript 문법\n\n// var, let, const\nlet x = 10;",
      "DOM ▸ Document Object Model\n\ndocument\n  .querySelector('#id')\n  .textContent = 'text';",
      "CSS 스타일시트\n\n<link rel=\"stylesheet\"\n  href=\"style.css\">",
      "서버 프로토콜\n\n// HTTP, FTP\nfetch('/api/data');"
    ],
    answer: 1,
    explanations: [
      "오답: DOM은 JavaScript 문법이 아닙니다. let, const, if 등이 JavaScript 문법입니다. DOM은 HTML 문서를 JavaScript에서 접근 가능한 객체 구조로 표현하는 모델일 뿐입니다. JavaScript는 DOM을 이용해 HTML을 조작합니다.",
      "정답: DOM(Document Object Model)은 HTML 문서를 트리 구조로 표현합니다. 각 태그는 노드(node)가 되고, 계층적 구조를 이룹니다. JavaScript는 document 객체를 통해 DOM에 접근하고 조작합니다. 예: document.querySelector('#id').textContent = 'text';",
      "오답: DOM은 CSS와 무관합니다. DOM은 HTML 구조이고, CSS는 그 구조를 꾸미는 스타일입니다. 그리고 JavaScript는 DOM을 조작합니다. 셋은 서로 다른 역할입니다.",
      "오답: DOM은 서버 프로토콜이 아닙니다. HTTP, FTP 같은 프로토콜과는 완전히 다릅니다. DOM은 브라우저에서 HTML 문서를 표현하는 방식입니다."
    ]
  },
  {
    question: "이벤트 리스너란?",
    choices: ["CSS 애니메이션", "사용자 액션 감지", "서버 요청", "변수 선언"],
    choiceDescriptions: [
      "CSS 애니메이션\n\n@keyframes slide {\n  0% { left: 0; }\n  100% { left: 100%; }\n}",
      "이벤트 리스너 ▸ 액션 감지\n\nbutton.addEventListener(\n  'click',\n  function() { }\n);",
      "서버 요청\n\nfetch('/api/data')\n  .then(res => res.json());",
      "변수 선언\n\nlet count = 0;\nconst name = 'Kim';"
    ],
    answer: 1,
    explanations: [
      "오답: 이벤트 리스너는 CSS 애니메이션과 완전히 다릅니다. CSS 애니메이션은 미리 정의된 움직임을 자동으로 재생하고, 이벤트 리스너는 사용자 액션(클릭, 입력 등)에 반응합니다. 예: @keyframes은 CSS, addEventListener()는 JavaScript",
      "정답: 이벤트 리스너는 addEventListener()로 등록하여 사용자 액션을 감지합니다. 클릭, 입력, 키보드, 마우스 이동 등 다양한 이벤트를 처리할 수 있습니다. 예: button.addEventListener('click', function() { alert('클릭됨!'); });",
      "오답: 이벤트 리스너는 서버 요청(fetch)과 다릅니다. 이벤트 리스너는 사용자 상호작용에 반응하고, fetch는 서버에 데이터를 요청합니다. 둘은 다른 용도입니다. 예: 이벤트 리스너로 버튼 클릭 감지 → fetch로 서버 요청",
      "오답: 이벤트 리스너는 변수 선언(let, const)과는 완전히 다릅니다. 이벤트 리스너는 DOM 요소에 액션을 등록하는 기능이고, 변수 선언은 값을 저장하는 것입니다. 하지만 이벤트 리스너 콜백함수 안에서 변수를 사용할 수 있습니다."
    ]
  },
  {
    question: "<article> 태그의 용도는?",
    choices: ["일반 컨테이너", "독립적인 콘텐츠", "헤더 섹션", "네비게이션"],
    choiceDescriptions: [
      "<div> ▸ 일반 컨테이너\n\n<div class=\"wrapper\">\n  콘텐츠\n</div>",
      "<article> ▸ 독립적 콘텐츠\n\n<article>\n  <h2>기사 제목</h2>\n  본문...\n</article>",
      "<header> ▸ 헤더 섹션\n\n<header>\n  <h1>사이트명</h1>\n</header>",
      "<nav> ▸ 네비게이션\n\n<nav>\n  <a href=\"/\">홈</a>\n</nav>"
    ],
    answer: 1,
    explanations: [
      "오답: 일반 컨테이너는 <div>입니다. <div>는 의미가 없는 순수 그룹화 요소이고, <article>은 의미 있는 독립적 콘텐츠를 나타냅니다. 예: <div class=\"wrapper\"> (의미 없음) vs <article> (독립적 글)",
      "정답: <article>은 블로그 글, 뉴스 기사, 리뷰, 포럼 글 같은 독립적인 콘텐츠를 나타냅니다. 검색엔진이 이 콘텐츠를 독립적인 기사로 인식합니다. 페이지의 다른 부분과 떨어져도 의미가 완전합니다. 예: <article><h2>제목</h2><p>본문...</p></article>",
      "오답: 헤더 섹션은 <header> 태그입니다. <header>는 페이지 또는 섹션의 소개/네비게이션 정보를 담습니다. <article>은 기사 콘텐츠 자체를 나타내므로 역할이 다릅니다. 예: <header>로고, 메뉴</header> vs <article>기사 내용</article>",
      "오답: 네비게이션은 <nav> 태그입니다. <nav>는 주요 네비게이션 링크(메뉴, 목차)를 담습니다. <article>은 콘텐츠 자체를 나타내므로 역할이 다릅니다. <nav> 안에는 링크들이, <article> 안에는 기사 내용이 있습니다."
    ]
  },
  {
    question: "fetch()는 뭐에 쓰나요?",
    choices: ["배열 검색", "서버에 요청 보내기", "변수 초기화", "CSS 적용"],
    choiceDescriptions: [
      "배열 검색 ▸ find(), filter()\n\narr.find(item =>\n  item.id === 1\n);",
      "fetch() ▸ 서버 요청\n\nfetch('/api/data')\n  .then(res => res.json())\n  .then(data => console.log(data));",
      "변수 초기화\n\nlet data = [];\nconst PI = 3.14;",
      "CSS 적용\n\n<link rel=\"stylesheet\"\n  href=\"style.css\">"
    ],
    answer: 1,
    explanations: [
      "오답: 배열 검색은 find()나 filter() 메서드입니다. fetch()와는 완전히 다릅니다. find()는 배열 내 요소를 찾고, fetch()는 서버에 HTTP 요청을 보냅니다. 예: arr.find(x => x.id === 1)",
      "정답: fetch()는 비동기로 서버에 HTTP 요청을 보냅니다. 데이터를 가져오거나(GET), 데이터를 전송(POST)할 때 사용합니다. 응답이 올 때까지 기다렸다가 처리합니다. 예: fetch('/api/data').then(res => res.json()).then(data => console.log(data));",
      "오답: 변수 초기화는 let, const로 합니다. 이건 데이터를 메모리에 저장하는 것이고, fetch()는 서버에 접근하는 것입니다. 전혀 다른 기능입니다. 예: let data = []; (변수 초기화) vs fetch('/api') (서버 요청)",
      "오답: CSS 적용은 JavaScript가 아닙니다. CSS는 스타일 언어이고 fetch()는 JavaScript 함수입니다. fetch()로 서버에서 데이터를 받아온 후, JavaScript로 DOM을 업데이트하고, CSS로 스타일을 입힙니다."
    ]
  },
  {
    question: "this는 뭘 가리켜요?",
    choices: ["전역 변수", "현재 객체", "함수 이름", "배열 요소"],
    choiceDescriptions: [
      "전역 변수\n\nlet globalVar = 'global';\nconsole.log(globalVar);",
      "this ▸ 현재 객체\n\nobj.method() {\n  this.property\n}",
      "함수 이름\n\nfunction getName() {\n  return this.name;\n}",
      "배열 요소\n\nconst arr = [1, 2, 3];\narr[0];  // 1"
    ],
    answer: 1,
    explanations: [
      "오답: this는 전역 변수가 아닙니다. 전역 변수는 어디서나 접근 가능하지만, this는 호출 방식에 따라 가리키는 대상이 변합니다. 같은 함수라도 호출 방식에 따라 this가 다릅니다.",
      "정답: this는 메서드가 호출된 현재 객체를 가리킵니다. 객체의 메서드 안에서 this를 사용하면 그 객체의 속성에 접근할 수 있습니다. 예: obj.method() -> this는 obj / function() -> this는 window(전역)",
      "오답: this는 함수 이름이 아닙니다. function myFunc()라고 하면 myFunc가 함수 이름이고, this는 함수 내에서 호출 객체를 가리키는 키워드입니다. 둘은 완전히 다른 개념입니다.",
      "오답: this는 배열 요소가 아닙니다. 배열 요소는 arr[0], arr[1] 같은 인덱스로 접근합니다. this는 현재 실행 컨텍스트의 객체를 가리키는 특별한 키워드입니다. 예: arr[0] (요소) vs this.property (현재 객체의 속성)"
    ]
  },
  {
    question: "async/await는 뭐예요?",
    choices: ["HTML 태그", "비동기 처리 문법", "CSS 속성", "배열 메서드"],
    choiceDescriptions: [
      "HTML 태그\n\n<div class=\"container\">\n  <h1>제목</h1>\n</div>",
      "async/await ▸ 비동기 처리\n\nasync function() {\n  const data = \n    await fetch('/api');\n}",
      "CSS 속성\n\ncolor: blue;\ndisplay: flex;",
      "배열 메서드\n\narr.map(x => x * 2);\narr.filter(x => x > 0);"
    ],
    answer: 1,
    explanations: [
      "오답: async/await는 HTML 태그가 아닙니다. HTML 태그는 <div>, <section>, <h1> 같은 것들이고, async/await는 JavaScript 문법입니다. 역할이 완전히 다릅니다.",
      "정답: async/await는 비동기 작업을 동기식처럼 작성할 수 있게 해주는 JavaScript 문법입니다. fetch() 결과를 기다릴 때 주로 사용합니다. 코드를 더 읽기 쉽게 만듭니다. 예: async function() { const data = await fetch('/api'); }",
      "오답: async/await는 CSS 속성이 아닙니다. CSS 속성은 color, display, font-size 같은 스타일 관련 것들입니다. async/await는 JavaScript에서 비동기 작업을 처리하는 문법입니다. 언어 자체가 다릅니다.",
      "오답: async/await는 배열 메서드가 아닙니다. map(), filter(), reduce() 같은 것이 배열 메서드입니다. async/await는 함수 내에서 비동기 작업을 순차적으로 처리하는 문법입니다. 예: const results = arr.map(x => x * 2); (배열 메서드)"
    ]
  },
  {
    question: "position: absolute는?",
    choices: ["부모 요소 기준 배치", "전체 페이지 기준 배치", "다른 요소 기준 배치", "자동 배치"],
    choiceDescriptions: [
      "position: absolute ▸ 부모 기준\n\n.parent {\n  position: relative;\n}\n.child {\n  position: absolute;\n}",
      "position: fixed ▸ 페이지 기준\n\nposition: fixed;\ntop: 0;\nleft: 0;",
      "position: relative/sticky\n\nposition: relative;\ntop: 20px;",
      "position: static ▸ 기본값\n\n/* 일반 흐름 */\nposition: static;"
    ],
    answer: 0,
    explanations: [
      "정답: position: absolute는 가장 가까운 위치 설정된 부모(position이 static이 아닌 부모)를 기준으로 배치됩니다. 부모가 없으면 body 기준입니다. 일반 문서 흐름에서 벗어납니다. 예: .parent { position: relative; } .child { position: absolute; top: 10px; }",
      "오답: 전체 페이지 기준으로 배치되는 건 position: fixed입니다. absolute는 부모 기준이고, fixed는 뷰포트(화면) 기준입니다. fixed는 스크롤해도 위치가 고정됩니다. 예: position: fixed; top: 0; (화면 최상단에 고정)",
      "오답: 다른 요소 기준으로 배치되는 건 relative나 sticky가 아닙니다. relative는 자신의 원래 위치 기준이고, sticky는 스크롤 기준입니다. absolute는 부모 위치 설정 요소 기준입니다. 예: position: relative; top: 20px; (원래 위치에서 20px 아래)",
      "오답: 자동 배치는 position: static(기본값)입니다. 이건 맞지만 position: absolute와는 다릅니다. static은 일반 문서 흐름을 따르고, absolute는 흐름을 벗어나 독립적으로 배치됩니다. 예: position: static; (생략 가능, 기본값)"
    ]
  }
];

// 상태 관리: 현재 문제 번호, 점수, 선택했는지 여부
let currentIndex = 0;
let score = 0;
let answered = false;

// 페이지 로드 완료 시 퀴즈 초기화
document.addEventListener("DOMContentLoaded", initQuiz);

// 퀴즈 초기화: 첫 문제 표시 및 다음 버튼 이벤트 등록
function initQuiz() {
  renderQuestion();
  document.querySelector("#nextBtn").addEventListener("click", nextQuestion);
}

// 현재 문제와 선택지를 화면에 표시
function renderQuestion() {
  // 현재 문제 객체 가져오기
  const quiz = quizzes[currentIndex];

  // 문제 텍스트 표시
  document.querySelector("#questionDisplay").textContent = quiz.question;

  // 선택지를 넣을 컨테이너 찾기
  const choicesContainer = document.querySelector("#choicesContainer");
  // 이전 문제의 버튼들 모두 삭제
  choicesContainer.textContent = "";

  // 4개의 선택지를 반복해서 버튼으로 생성
  for (let i = 0; i < quiz.choices.length; i++) {
    // 선택지와 설명을 담을 wrapper div 생성
    const choiceItem = document.createElement("div");
    choiceItem.className = "choice-item";

    // 새로운 button 요소 생성
    const btn = document.createElement("button");

    // 버튼 텍스트: 선택지 내용
    btn.textContent = quiz.choices[i];

    // CSS 클래스 적용: 스타일 지정
    btn.className = "choice-btn";

    // 버튼 클릭 시 checkAnswer 함수 실행
    btn.addEventListener("click", function() {
      checkAnswer(i);
    });

    // 선택지 설명 텍스트 생성
    const desc = document.createElement("div");
    desc.className = "choice-desc";
    desc.textContent = quiz.choiceDescriptions[i];

    // wrapper에 버튼과 설명 추가
    choiceItem.appendChild(btn);
    choiceItem.appendChild(desc);

    // wrapper를 컨테이너에 추가
    choicesContainer.appendChild(choiceItem);
  }

  // 설명 박스 숨기기 (다음 문제를 위해)
  document.querySelector("#explanationDisplay").style.display = "none";

  // 상태 초기화: 아직 선택하지 않음
  answered = false;
  document.querySelector("#nextBtn").disabled = true;
}

// 사용자가 선택한 답이 맞는지 확인하고 시각적 피드백 제공
function checkAnswer(selectedIndex) {
  // 이미 답변했으면 다시 처리하지 않음
  if (answered) return;
  answered = true;

  // 현재 문제 데이터 가져오기
  const quiz = quizzes[currentIndex];

  // 모든 선택지 버튼 찾기
  const allButtons = document.querySelectorAll(".choice-btn");

  // 선택한 버튼 찾기
  const selectedBtn = allButtons[selectedIndex];

  // 정답 여부 확인
  const isCorrect = selectedIndex === quiz.answer;

  // 정답인지 오답인지에 따라 처리
  if (isCorrect) {
    // 정답: 초록색 표시 + 점수 1 증가
    selectedBtn.classList.add("selected");
    score++;
  } else {
    // 오답: 빨간색 표시 + 정답 버튼을 초록색으로 표시
    selectedBtn.classList.add("wrong");
    allButtons[quiz.answer].classList.add("selected");
  }

  // 모든 선택지 버튼 아래에 설명 표시
  const allDescs = document.querySelectorAll(".choice-desc");
  allDescs.forEach(desc => {
    desc.classList.add("show");
  });

  // 큰 설명 박스에도 상세 설명 표시
  const explanationDisplay = document.querySelector("#explanationDisplay");
  const resultLabel = isCorrect ? "" : "";
  explanationDisplay.textContent = resultLabel + quiz.explanations[selectedIndex];
  explanationDisplay.style.display = "block";

  // 다음 문제 버튼 활성화
  document.querySelector("#nextBtn").disabled = false;
}

// 다음 문제로 진행
function nextQuestion() {
  // 현재 문제 번호 증가
  currentIndex++;

  // 모든 문제를 풀었는지 확인
  if (currentIndex >= quizzes.length) {
    // 결과 화면 표시
    showResult();
    return;
  }

  // 다음 문제 표시
  renderQuestion();

  // 진행도 업데이트
  updateProgress();
}

// 진행도 표시 (현재 문제 번호 / 전체 문제 수)
function updateProgress() {
  // 현재 문제는 currentIndex + 1 (0부터 시작하므로)
  const progressText = document.querySelector("#progressText");
  progressText.textContent = (currentIndex + 1) + " / " + quizzes.length;
}

// 모든 문제를 풀었을 때 최종 결과 화면 표시
function showResult() {
  // 카드 숨기기
  document.querySelector(".card").style.display = "none";

  // 다음 버튼 숨기기
  document.querySelector(".controls").style.display = "none";

  // 결과 메시지 표시
  const container = document.querySelector(".container");
  const resultDiv = document.createElement("div");
  resultDiv.className = "card";

  // 정답 개수와 점수율 계산
  const percentage = Math.round((score / quizzes.length) * 100);

  // 결과 메시지 구성
  let resultMessage = ``;
  if (percentage === 100) {
    resultMessage = `완벽합니다! 100점 (${score}/${quizzes.length})`;
  } else if (percentage >= 80) {
    resultMessage = `훌륭합니다! ${percentage}점 (${score}/${quizzes.length})`;
  } else if (percentage >= 60) {
    resultMessage = `좋습니다! ${percentage}점 (${score}/${quizzes.length})`;
  } else {
    resultMessage = `더 공부해봅시다! ${percentage}점 (${score}/${quizzes.length})`;
  }

  // 결과 화면 구성
  resultDiv.innerHTML = `
    <div class="question" style="font-size: 24px; font-weight: bold;">
      ${resultMessage}
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <button onclick="location.reload()">다시 풀기</button>
    </div>
  `;

  container.appendChild(resultDiv);

  // 진행도도 숨기기
  document.querySelector(".progress").style.display = "none";
}
