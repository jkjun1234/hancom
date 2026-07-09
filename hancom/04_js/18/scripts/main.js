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
      "<div>는 단순한 컨테이너일 뿐 의미 정보를 전달하지 않습니다.",
      "<section>은 문서의 의미 있는 섹션을 나타내는 시맨틱 태그입니다.",
      "<span>은 인라인 컨테이너로 의미가 없습니다.",
      "<b>는 시각적 강조일 뿐 시맨틱 태그가 아닙니다."
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
      "let과 const는 다릅니다.",
      "let은 재할당 가능하고, const는 한 번 할당하면 재할당할 수 없습니다.",
      "const는 재할당 불가능합니다.",
      "let과 const는 분명히 다릅니다."
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
      "텍스트 정렬은 text-align이 담당합니다.",
      "display: flex는 Flexbox를 활성화해 자식 요소들을 유연하게 배치할 수 있게 합니다.",
      "배경 색상은 background-color로 지정합니다.",
      "폰트 크기는 font-size로 조정합니다."
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
      "DOM은 JavaScript의 문법이 아니라 HTML 문서를 표현하는 방식입니다.",
      "DOM(Document Object Model)은 HTML 문서를 트리 구조로 표현합니다.",
      "DOM은 CSS와 무관합니다.",
      "DOM은 서버 프로토콜이 아닙니다."
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
      "이벤트 리스너는 CSS 애니메이션과 다릅니다.",
      "addEventListener()로 등록한 이벤트 리스너는 클릭, 입력 등 사용자 액션을 감지합니다.",
      "이벤트 리스너는 서버 요청이 아닙니다.",
      "이벤트 리스너는 변수 선언과 무관합니다."
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
      "일반 컨테이너는 <div>입니다.",
      "<article>은 블로그 글, 뉴스 기사 같은 독립적인 콘텐츠를 나타냅니다.",
      "헤더 섹션은 <header> 태그입니다.",
      "네비게이션은 <nav> 태그입니다."
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
      "배열 검색은 find()나 filter() 메서드입니다.",
      "fetch()는 비동기로 서버에 HTTP 요청을 보냅니다.",
      "변수 초기화는 let, const로 합니다.",
      "CSS 적용은 JavaScript가 아닙니다."
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
      "this는 전역 변수가 아닙니다.",
      "this는 메서드가 호출된 현재 객체를 가리킵니다.",
      "this는 함수 이름이 아닙니다.",
      "this는 배열 요소가 아닙니다."
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
      "async/await는 HTML 태그가 아닙니다.",
      "async/await는 Promise를 더 쉽게 다루는 JavaScript 비동기 처리 문법입니다.",
      "async/await는 CSS 속성이 아닙니다.",
      "async/await는 배열 메서드가 아닙니다."
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
      "position: absolute는 가장 가까운 위치 설정된 부모를 기준으로 배치됩니다.",
      "전체 페이지 기준은 position: fixed입니다.",
      "다른 요소 기준은 relative나 sticky입니다.",
      "자동 배치는 position: static(기본값)입니다."
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
  const resultLabel = isCorrect ? "정답입니다! " : "오답입니다. ";
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
