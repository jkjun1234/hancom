// CSS 카테고리 문제 목록
// Flexbox Froggy와 같은 방식: 고정된 HTML 구조에 사용자가 CSS를 적용하면
// 실시간으로 미리보기(iframe)에 반영되고, getComputedStyle 값으로 채점한다 (kind: 'css').
import { NOT_NONE } from '../utils/cssGrader'

const cssProblems = [
  {
    id: 1,
    kind: 'css',
    difficulty: 'basic',
    title: 'Flexbox로 가로 중앙 정렬',
    concept:
      'display: flex를 주면 자식 요소들이 가로로 나란히 배치돼요. justify-content는 그 가로 축(주축)에서 정렬 방식을 정해요.',
    examples: [
      {
        title: '왼쪽 정렬 (기본값)',
        description: 'justify-content의 기본값은 flex-start예요 — 왼쪽부터 채워요.',
        previewHtml: '<div class="box"><span>1</span><span>2</span><span>3</span></div>',
        code: '.box {\n  display: flex;\n  justify-content: flex-start;\n}',
      },
      {
        title: '오른쪽 정렬',
        description: 'flex-end를 주면 반대쪽 끝으로 몰려요.',
        previewHtml: '<div class="box"><span>1</span><span>2</span><span>3</span></div>',
        code: '.box {\n  display: flex;\n  justify-content: flex-end;\n}',
      },
      {
        title: '양 끝으로 균등하게 퍼뜨리기',
        description: 'space-between은 양쪽 끝에 딱 붙이고 그 사이를 균등하게 나눠요.',
        previewHtml: '<div class="box"><span>1</span><span>2</span><span>3</span></div>',
        code: '.box {\n  display: flex;\n  justify-content: space-between;\n}',
      },
      {
        title: '요소 주변에 균등한 여백',
        description: 'space-around는 각 요소 주변에 똑같은 여백을 둬요.',
        previewHtml: '<div class="box"><span>1</span><span>2</span><span>3</span></div>',
        code: '.box {\n  display: flex;\n  justify-content: space-around;\n}',
      },
    ],
    prompt: '.box 안의 숫자 3개가 가로 중앙에 모이도록 CSS를 작성하세요.',
    previewHtml: '<div class="box"><span>1</span><span>2</span><span>3</span></div>',
    starterCode: '.box {\n  \n}',
    hints: [
      '먼저 .box를 flex 컨테이너로 만들어야 해요 (display: flex).',
      '가로 축 정렬은 justify-content 속성이에요.',
      'display: flex;\njustify-content: center;',
    ],
    testCases: [
      { selector: '.box', property: 'display', expected: 'flex' },
      { selector: '.box', property: 'justify-content', expected: 'center' },
    ],
    solution: '.box {\n  display: flex;\n  justify-content: center;\n}',
    explanation:
      'display: flex는 .box를 flex 컨테이너로 바꾸고, justify-content: center는 주축(기본은 가로) 방향으로 자식들을 가운데 모아요.',
  },
  {
    id: 2,
    kind: 'css',
    difficulty: 'basic',
    title: 'flex-direction으로 세로 쌓기',
    concept: 'flex-direction은 주축의 방향 자체를 바꿔요. row(기본, 가로) 대신 column을 주면 세로로 쌓여요.',
    examples: [
      {
        title: '기본값 row (가로, 비교용)',
        description: 'flex-direction을 안 주면 기본값인 row(가로)가 적용돼요.',
        previewHtml: '<div class="stack"><div class="row">A</div><div class="row">B</div><div class="row">C</div></div>',
        code: '.stack {\n  display: flex;\n  flex-direction: row;\n}',
      },
      {
        title: 'column-reverse (아래에서 위로)',
        description: '세로로 쌓이는 건 같지만, 순서가 반대로 뒤집혀요.',
        previewHtml: '<div class="stack"><div class="row">A</div><div class="row">B</div><div class="row">C</div></div>',
        code: '.stack {\n  display: flex;\n  flex-direction: column-reverse;\n}',
      },
      {
        title: 'column + 간격 주기',
        description: 'gap을 함께 쓰면 쌓인 요소 사이에 여백을 줄 수 있어요.',
        previewHtml: '<div class="stack"><div class="row">A</div><div class="row">B</div><div class="row">C</div></div>',
        code: '.stack {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}',
      },
      {
        title: 'column + 가운데 정렬 함께 쓰기',
        description: 'flex-direction과 align-items는 서로 다른 축을 담당해서 같이 쓸 수 있어요.',
        previewHtml: '<div class="stack"><div class="row">A</div><div class="row">B</div><div class="row">C</div></div>',
        code: '.stack {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}',
      },
    ],
    prompt: '.stack 안의 박스 3개가 세로로 쌓이도록 CSS를 작성하세요.',
    previewHtml:
      '<div class="stack"><div class="row">A</div><div class="row">B</div><div class="row">C</div></div>',
    starterCode: '.stack {\n  \n}',
    hints: [
      '.stack도 먼저 flex 컨테이너로 만들어야 해요.',
      '방향을 바꾸는 속성은 flex-direction 이에요.',
      'display: flex;\nflex-direction: column;',
    ],
    testCases: [
      { selector: '.stack', property: 'display', expected: 'flex' },
      { selector: '.stack', property: 'flex-direction', expected: 'column' },
    ],
    solution: '.stack {\n  display: flex;\n  flex-direction: column;\n}',
    explanation:
      'flex-direction: column은 주축을 세로로 바꿔서, 자식 요소들이 위에서 아래로 순서대로 쌓이게 만들어요.',
  },
  {
    id: 3,
    kind: 'css',
    difficulty: 'basic',
    title: 'align-items로 세로 중앙 정렬',
    concept:
      'justify-content가 주축 정렬이라면, align-items는 교차축(주축과 수직인 방향) 정렬을 담당해요. row 방향일 땐 교차축이 세로예요.',
    examples: [
      {
        title: '위쪽 정렬',
        description: 'flex-start를 주면 교차축의 시작(위쪽)에 붙어요.',
        previewHtml: '<div class="panel"><span class="chip">Hi</span></div>',
        code: '.panel {\n  height: 100px;\n  display: flex;\n  align-items: flex-start;\n}',
      },
      {
        title: '아래쪽 정렬',
        description: 'flex-end를 주면 교차축의 끝(아래쪽)에 붙어요.',
        previewHtml: '<div class="panel"><span class="chip">Hi</span></div>',
        code: '.panel {\n  height: 100px;\n  display: flex;\n  align-items: flex-end;\n}',
      },
      {
        title: '늘려서 채우기 (기본값 stretch)',
        description: 'align-items의 기본값은 stretch예요 — 높이가 없는 요소는 꽉 채워져요.',
        previewHtml: '<div class="panel"><span class="chip">Hi</span></div>',
        code: '.panel {\n  height: 100px;\n  display: flex;\n  align-items: stretch;\n}',
      },
      {
        title: '가로+세로 동시에 중앙 정렬',
        description: 'justify-content(가로)와 align-items(세로)를 함께 쓰면 완전한 중앙 정렬이 돼요.',
        previewHtml: '<div class="panel"><span class="chip">Hi</span></div>',
        code: '.panel {\n  height: 100px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}',
      },
    ],
    prompt: '.panel 안의 칩(chip)이 세로 중앙에 오도록 CSS를 작성하세요. (height는 이미 지정돼 있어요)',
    previewHtml: '<div class="panel"><span class="chip">Hi</span></div>',
    starterCode: '.panel {\n  height: 100px;\n  \n}',
    hints: [
      '.panel도 flex 컨테이너로 만들어야 교차축 정렬이 의미가 있어요.',
      '교차축(세로) 정렬은 align-items 속성이에요.',
      'display: flex;\nalign-items: center;',
    ],
    testCases: [
      { selector: '.panel', property: 'display', expected: 'flex' },
      { selector: '.panel', property: 'align-items', expected: 'center' },
    ],
    solution: '.panel {\n  height: 100px;\n  display: flex;\n  align-items: center;\n}',
    explanation:
      'align-items: center는 교차축(기본 row 방향일 땐 세로) 기준으로 자식을 가운데 정렬해요. .panel에 높이가 있어야 눈에 보이는 여백이 생겨요.',
  },
  {
    id: 4,
    kind: 'css',
    difficulty: 'intermediate',
    title: 'flex-wrap으로 줄바꿈 허용하기',
    concept:
      '기본적으로 flex 아이템은 한 줄에 다 들어가려고 억지로 쪼그라들어요. flex-wrap: wrap을 주면 공간이 부족할 때 다음 줄로 넘어가요.',
    examples: [
      {
        title: '줄바꿈 없이 억지로 쪼그라들기 (비교용)',
        description: '기본값 nowrap이면, 다 안 들어가도 억지로 한 줄에 쪼그려 넣어요.',
        previewHtml: '<div class="wrap"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>',
        code: '.wrap {\n  width: 160px;\n  display: flex;\n  flex-wrap: nowrap;\n}',
      },
      {
        title: '줄바꿈 허용 + 줄 간격',
        description: 'gap을 함께 쓰면 줄이 넘어가도 각 칩 사이에 여백이 생겨요.',
        previewHtml: '<div class="wrap"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>',
        code: '.wrap {\n  width: 160px;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}',
      },
      {
        title: '반대 방향으로 줄바꿈',
        description: 'wrap-reverse는 줄이 넘어갈 때 위가 아니라 아래부터 채워요.',
        previewHtml: '<div class="wrap"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>',
        code: '.wrap {\n  width: 160px;\n  display: flex;\n  flex-wrap: wrap-reverse;\n}',
      },
      {
        title: '여러 줄 사이 정렬까지 함께',
        description: '줄이 여러 개일 때 그 줄들 사이 간격은 align-content로 조절해요.',
        previewHtml: '<div class="wrap"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>',
        code: '.wrap {\n  width: 160px;\n  height: 100px;\n  display: flex;\n  flex-wrap: wrap;\n  align-content: space-between;\n}',
      },
    ],
    prompt: '.wrap 안의 칩 6개가 한 줄에 다 안 들어가면 다음 줄로 넘어가도록 CSS를 작성하세요. (너비는 이미 좁게 지정돼 있어요)',
    previewHtml:
      '<div class="wrap"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>',
    starterCode: '.wrap {\n  width: 160px;\n  \n}',
    hints: [
      '.wrap도 먼저 flex 컨테이너로 만들어야 해요.',
      '줄바꿈을 허용하는 속성은 flex-wrap 이에요.',
      'display: flex;\nflex-wrap: wrap;',
    ],
    testCases: [
      { selector: '.wrap', property: 'display', expected: 'flex' },
      { selector: '.wrap', property: 'flex-wrap', expected: 'wrap' },
    ],
    solution: '.wrap {\n  width: 160px;\n  display: flex;\n  flex-wrap: wrap;\n}',
    explanation:
      'flex-wrap: wrap은 기본값인 nowrap과 반대로, 한 줄에 다 안 들어가는 아이템을 억지로 쪼그라뜨리지 않고 다음 줄로 넘겨요.',
  },
  {
    id: 5,
    kind: 'css',
    difficulty: 'intermediate',
    title: 'row-reverse로 순서 뒤집기',
    concept: 'flex-direction에는 row/column 말고도 그 반대 방향인 row-reverse, column-reverse도 있어요.',
    examples: [
      {
        title: '기본 row와 비교',
        description: 'row는 왼쪽에서 오른쪽 순서 그대로예요 — row-reverse와 비교해보세요.',
        previewHtml: '<div class="order"><span>A</span><span>B</span><span>C</span></div>',
        code: '.order {\n  display: flex;\n  flex-direction: row;\n}',
      },
      {
        title: 'column-reverse (세로 방향 뒤집기)',
        description: '가로가 아니라 세로 순서를 뒤집는 것도 가능해요.',
        previewHtml: '<div class="order"><span>A</span><span>B</span><span>C</span></div>',
        code: '.order {\n  display: flex;\n  flex-direction: column-reverse;\n}',
      },
      {
        title: 'row-reverse + 가운데 정렬',
        description: '순서를 뒤집은 채로 정렬 속성도 함께 쓸 수 있어요.',
        previewHtml: '<div class="order"><span>A</span><span>B</span><span>C</span></div>',
        code: '.order {\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: center;\n}',
      },
      {
        title: 'row-reverse + 간격',
        description: 'gap은 방향이 바뀌어도 그대로 요소 사이 여백으로 적용돼요.',
        previewHtml: '<div class="order"><span>A</span><span>B</span><span>C</span></div>',
        code: '.order {\n  display: flex;\n  flex-direction: row-reverse;\n  gap: 10px;\n}',
      },
    ],
    prompt: '.order 안의 A, B, C 순서가 화면에서 거꾸로(C, B, A) 보이도록 CSS를 작성하세요.',
    previewHtml: '<div class="order"><span>A</span><span>B</span><span>C</span></div>',
    starterCode: '.order {\n  \n}',
    hints: [
      '.order를 flex 컨테이너로 만들어야 해요.',
      '방향을 반대로 뒤집는 값이 있어요.',
      'display: flex;\nflex-direction: row-reverse;',
    ],
    testCases: [
      { selector: '.order', property: 'display', expected: 'flex' },
      { selector: '.order', property: 'flex-direction', expected: 'row-reverse' },
    ],
    solution: '.order {\n  display: flex;\n  flex-direction: row-reverse;\n}',
    explanation: 'flex-direction: row-reverse는 주축은 그대로 가로지만, 배치 시작점을 오른쪽으로 바꿔서 순서를 뒤집어요.',
  },
  {
    id: 6,
    kind: 'css',
    difficulty: 'advanced',
    title: 'position으로 배지 위치 고정하기',
    concept:
      'position: relative를 준 부모 안에서 자식에 position: absolute를 주면, top/right/bottom/left로 부모 기준 정확한 위치에 붙일 수 있어요.',
    examples: [
      {
        title: '왼쪽 위 모서리에 고정',
        description: 'top과 left를 쓰면 왼쪽 위 기준으로 위치를 정해요.',
        previewHtml: '<div class="box">상품<span class="badge">SALE</span></div>',
        code: '.box {\n  position: relative;\n  height: 80px;\n}\n\n.badge {\n  position: absolute;\n  top: 0;\n  left: 0;\n}',
      },
      {
        title: '오른쪽 아래 모서리에 고정',
        description: 'bottom과 right를 쓰면 반대쪽 모서리에 붙일 수 있어요.',
        previewHtml: '<div class="box">상품<span class="badge">SALE</span></div>',
        code: '.box {\n  position: relative;\n  height: 80px;\n}\n\n.badge {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n}',
      },
      {
        title: 'fixed로 화면에 고정하기',
        description: 'fixed는 부모가 아니라 브라우저 화면 자체를 기준으로 위치가 고정돼요 (스크롤해도 안 움직여요).',
        previewHtml: '<div class="box">상품<span class="badge">SALE</span></div>',
        code: '.box {\n  position: relative;\n  height: 80px;\n}\n\n.badge {\n  position: fixed;\n  top: 10px;\n  right: 10px;\n}',
      },
      {
        title: 'z-index로 겹치는 순서 바꾸기',
        description: 'position이 지정된 요소끼리 겹칠 때, z-index가 큰 쪽이 위로 와요.',
        previewHtml: '<div class="box">상품<span class="badge">SALE</span></div>',
        code: '.box {\n  position: relative;\n  height: 80px;\n}\n\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  z-index: 10;\n}',
      },
    ],
    prompt: '.badge가 부모(.box) 기준 오른쪽 위 모서리(top:0, right:0)에 붙도록 CSS를 작성하세요.',
    previewHtml: '<div class="box">상품<span class="badge">SALE</span></div>',
    starterCode: '.box {\n  position: relative;\n  height: 80px;\n}\n\n.badge {\n  \n}',
    hints: [
      '자식을 부모 기준으로 위치시키려면 position: absolute를 써요.',
      'top과 right로 위치를 정할 수 있어요.',
      'position: absolute;\ntop: 0;\nright: 0;',
    ],
    testCases: [
      { selector: '.badge', property: 'position', expected: 'absolute' },
      { selector: '.badge', property: 'top', expected: '0px' },
      { selector: '.badge', property: 'right', expected: '0px' },
    ],
    solution: '.box {\n  position: relative;\n  height: 80px;\n}\n\n.badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n}',
    explanation:
      'position: relative인 부모는 "위치 지정 기준점"이 돼요. 자식이 position: absolute면 그 기준점을 기준으로 top/right/bottom/left 값만큼 이동해요.',
  },
  {
    id: 7,
    kind: 'css',
    difficulty: 'advanced',
    title: 'CSS 변수로 색상 관리하기',
    concept: ':root에 --이름: 값으로 변수를 선언하고 var(--이름)으로 꺼내 쓰면, 한 곳만 고쳐도 전체 색상이 바뀌어요.',
    examples: [
      {
        title: '여러 변수를 함께 쓰기',
        description: '변수는 하나만 쓸 수 있는 게 아니라, 필요한 만큼 여러 개 선언할 수 있어요.',
        previewHtml: '<div class="theme"><button class="btn">확인</button></div>',
        code: ':root {\n  --main-color: teal;\n  --text-color: white;\n}\n\n.btn {\n  background-color: var(--main-color);\n  color: var(--text-color);\n}',
      },
      {
        title: '변수에 기본값 주기',
        description: 'var(변수, 기본값) 형태로 쓰면 변수가 선언 안 됐을 때 기본값이 대신 쓰여요.',
        previewHtml: '<div class="theme"><button class="btn">확인</button></div>',
        code: ':root {\n  \n}\n\n.btn {\n  background-color: var(--main-color, orange);\n}',
      },
      {
        title: '다른 색으로 바꿔보기',
        description: ':root의 값만 바꾸면 var()를 쓰는 모든 곳이 한 번에 바뀌어요.',
        previewHtml: '<div class="theme"><button class="btn">확인</button></div>',
        code: ':root {\n  --main-color: seagreen;\n}\n\n.btn {\n  background-color: var(--main-color);\n}',
      },
      {
        title: '한 변수를 여러 속성에 재사용하기',
        description: '같은 변수를 background-color와 border 색으로 동시에 쓸 수 있어요.',
        previewHtml: '<div class="theme"><button class="btn">확인</button></div>',
        code: ':root {\n  --brand: crimson;\n}\n\n.btn {\n  background-color: var(--brand);\n  border: 2px solid var(--brand);\n}',
      },
    ],
    prompt: '--main-color 변수를 :root에 hotpink로 선언하고, .btn의 배경색에 var(--main-color)를 사용하세요.',
    previewHtml: '<div class="theme"><button class="btn">확인</button></div>',
    starterCode: ':root {\n  \n}\n\n.btn {\n  background-color: red;\n}',
    hints: [
      ':root { --main-color: hotpink; } 형태로 변수를 선언해요.',
      '변수를 쓸 땐 var(--main-color) 형태예요.',
      '.btn {\n  background-color: var(--main-color);\n}',
    ],
    testCases: [{ selector: '.btn', property: 'background-color', expected: 'hotpink' }],
    solution:
      ':root {\n  --main-color: hotpink;\n}\n\n.btn {\n  background-color: var(--main-color);\n}',
    explanation:
      'CSS 변수는 --이름으로 선언하고 var(--이름)으로 사용해요. 나중에 :root의 값 하나만 바꾸면 var()를 쓰는 모든 곳이 한꺼번에 바뀌어서 유지보수가 쉬워져요.',
  },
  {
    id: 8,
    kind: 'css',
    difficulty: 'applied',
    title: 'box-shadow로 카드에 그림자 주기',
    concept: 'box-shadow는 x축·y축·흐림 정도·색을 지정해서 요소에 그림자를 만들어요. 카드형 UI에서 입체감을 줄 때 자주 써요.',
    examples: [
      {
        title: '그림자를 진하게',
        description: '흐림 정도와 투명도를 조절하면 그림자 느낌을 강하게 줄 수 있어요.',
        previewHtml: '<div class="card">카드 내용</div>',
        code: '.card {\n  padding: 16px;\n  background: #fff;\n  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);\n}',
      },
      {
        title: '안쪽 그림자 (inset)',
        description: 'inset을 앞에 붙이면 그림자가 바깥이 아니라 요소 안쪽에 생겨요.',
        previewHtml: '<div class="card">카드 내용</div>',
        code: '.card {\n  padding: 16px;\n  background: #fff;\n  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);\n}',
      },
      {
        title: '여러 겹 그림자 겹치기',
        description: '콤마로 구분하면 그림자를 여러 개 동시에 줄 수 있어요.',
        previewHtml: '<div class="card">카드 내용</div>',
        code: '.card {\n  padding: 16px;\n  background: #fff;\n  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.5);\n}',
      },
      {
        title: '그림자 없이 테두리만 (비교용)',
        description: 'box-shadow 없이 border만 쓰면 훨씬 평면적으로 보여요.',
        previewHtml: '<div class="card">카드 내용</div>',
        code: '.card {\n  padding: 16px;\n  background: #fff;\n  border: 1px solid #ccc;\n}',
      },
    ],
    prompt: '.card에 box-shadow를 추가해서 그림자 효과를 주세요 (값은 자유롭게 정해도 돼요).',
    previewHtml: '<div class="card">카드 내용</div>',
    starterCode: '.card {\n  padding: 16px;\n  background: #fff;\n  \n}',
    hints: [
      'box-shadow: x위치 y위치 흐림정도 색상; 형태예요.',
      '예: box-shadow: 2px 2px 8px rgba(0,0,0,0.3);',
      'box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);',
    ],
    testCases: [{ selector: '.card', property: 'box-shadow', expected: NOT_NONE }],
    solution: '.card {\n  padding: 16px;\n  background: #fff;\n  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);\n}',
    explanation:
      'box-shadow는 값 형식이 복잡해서(색+여러 길이) 정확히 어떤 값을 썼는지보다는 "그림자를 설정했는지"가 중요해요. 그래서 이 문제는 none이 아니기만 하면 통과예요.',
  },
  {
    id: 9,
    kind: 'css',
    difficulty: 'applied',
    title: '::before로 인용부호 장식 추가하기',
    concept: '::before는 요소의 내용 앞에 순수 CSS만으로 장식을 추가해요. content 속성이 반드시 있어야 화면에 나타나요.',
    examples: [
      {
        title: '::after로 뒤에 붙이기',
        description: '::before의 반대인 ::after는 내용 뒤에 장식을 붙여요.',
        previewHtml: '<p class="quote">멋진 명언입니다</p>',
        code: ".quote::after {\n  content: '\"';\n}",
      },
      {
        title: '이모지 아이콘처럼 붙이기',
        description: 'content에는 문자, 기호뿐 아니라 이모지도 넣을 수 있어요.',
        previewHtml: '<p class="quote">멋진 명언입니다</p>',
        code: ".quote::before {\n  content: '💬 ';\n}",
      },
      {
        title: '순서 번호 붙이기',
        description: '목록 앞에 번호를 붙이는 장식으로도 자주 활용해요.',
        previewHtml: '<p class="quote">멋진 명언입니다</p>',
        code: ".quote::before {\n  content: '1. ';\n}",
      },
      {
        title: '색과 함께 스타일 주기',
        description: '가상요소도 일반 요소처럼 color 등 다른 CSS 속성을 함께 줄 수 있어요.',
        previewHtml: '<p class="quote">멋진 명언입니다</p>',
        code: ".quote::before {\n  content: '★ ';\n  color: gold;\n}",
      },
    ],
    prompt: '.quote 앞에 큰따옴표(") 장식이 붙도록 ::before 가상요소를 사용하세요.',
    previewHtml: '<p class="quote">멋진 명언입니다</p>',
    starterCode: '.quote {\n  \n}',
    hints: [
      '::before는 content 속성이 없으면 화면에 아무것도 안 나와요.',
      ".quote::before { content: '\"'; } 형태예요.",
      '.quote::before {\n  content: \'"\';\n}',
    ],
    testCases: [{ selector: '.quote', property: 'content', expected: NOT_NONE, pseudo: '::before' }],
    solution: '.quote::before {\n  content: \'"\';\n}',
    explanation:
      'content가 없는 ::before/::after는 아예 렌더링되지 않아요. content를 지정해야 진짜 화면에 나타나는 가상요소가 돼요.',
  },
  {
    id: 10,
    kind: 'css',
    difficulty: 'capstone',
    title: '🏆 캡스톤 — 프로필 카드 레이아웃',
    concept: 'flexbox, position, CSS 변수, box-shadow를 한 카드 안에서 동시에 사용해봐요.',
    examples: [
      {
        title: '① flex로 가로 배치만 먼저',
        description: '한 번에 다 하지 말고, 먼저 flex로 큰 틀부터 잡아봐요.',
        previewHtml:
          '<div class="card"><span class="badge">NEW</span><div class="avatar"></div><div class="info"><h3>홍길동</h3><p>프론트엔드 학습중</p></div></div>',
        code: '.card {\n  display: flex;\n  gap: 10px;\n}',
      },
      {
        title: '② 배지 위치만 먼저',
        description: '그 다음 position으로 배지를 카드 모서리에 붙여봐요.',
        previewHtml:
          '<div class="card"><span class="badge">NEW</span><div class="avatar"></div><div class="info"><h3>홍길동</h3><p>프론트엔드 학습중</p></div></div>',
        code: '.card {\n  position: relative;\n}\n\n.badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: tomato;\n}',
      },
      {
        title: '③ 변수로 배지 색 관리',
        description: '색상을 변수로 빼두면 나중에 한 곳만 바꿔도 전체가 바뀌어요.',
        previewHtml:
          '<div class="card"><span class="badge">NEW</span><div class="avatar"></div><div class="info"><h3>홍길동</h3><p>프론트엔드 학습중</p></div></div>',
        code: ':root {\n  --accent: mediumpurple;\n}\n\n.badge {\n  background-color: var(--accent);\n}',
      },
      {
        title: '④ 네 가지 기법을 전부 조합한 완성형',
        description: 'flex + position + 변수 + shadow, 네 가지를 한 카드 안에서 동시에 사용한 모습이에요.',
        previewHtml:
          '<div class="card"><span class="badge">NEW</span><div class="avatar"></div><div class="info"><h3>홍길동</h3><p>프론트엔드 학습중</p></div></div>',
        code: ':root {\n  --accent: hotpink;\n}\n\n.card {\n  position: relative;\n  display: flex;\n  gap: 12px;\n  padding: 16px;\n  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);\n}\n\n.badge {\n  background-color: var(--accent);\n  position: absolute;\n  top: 0;\n  right: 0;\n}',
      },
    ],
    prompt:
      '카드를 완성하세요: ① --accent 변수를 하나 선언해서 .badge 배경색에 사용 ② .badge를 카드 오른쪽 위(position, top:0, right:0)에 고정 ③ .card를 flex로 만들어 avatar와 info를 가로로 나란히 배치 ④ .card에 box-shadow 추가',
    previewHtml:
      '<div class="card"><span class="badge">NEW</span><div class="avatar"></div><div class="info"><h3>홍길동</h3><p>프론트엔드 학습중</p></div></div>',
    starterCode:
      ':root {\n  \n}\n\n.card {\n  position: relative;\n  padding: 16px;\n  width: 220px;\n}\n\n.avatar {\n  width: 48px;\n  height: 48px;\n  background: #ccc;\n  border-radius: 50%;\n}\n\n.badge {\n  background-color: gray;\n}',
    hints: [
      '하나씩 순서대로: 변수 선언 → 배지 위치 → flex 배치 → 그림자.',
      ':root { --accent: hotpink; } 처럼 선언하고 .badge { background-color: var(--accent); }로 사용하세요.',
      '.badge { position: absolute; top: 0; right: 0; }\n.card { display: flex; gap: 12px; box-shadow: 2px 2px 8px rgba(0,0,0,0.25); }',
    ],
    testCases: [
      { selector: '.badge', property: 'background-color', expected: 'hotpink' },
      { selector: '.badge', property: 'position', expected: 'absolute' },
      { selector: '.badge', property: 'top', expected: '0px' },
      { selector: '.card', property: 'display', expected: 'flex' },
      { selector: '.card', property: 'box-shadow', expected: NOT_NONE },
    ],
    solution:
      ':root {\n  --accent: hotpink;\n}\n\n.card {\n  position: relative;\n  padding: 16px;\n  width: 220px;\n  display: flex;\n  gap: 12px;\n  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);\n}\n\n.avatar {\n  width: 48px;\n  height: 48px;\n  background: #ccc;\n  border-radius: 50%;\n}\n\n.badge {\n  background-color: var(--accent);\n  position: absolute;\n  top: 0;\n  right: 0;\n}',
    explanation:
      '실무 카드 UI는 보통 이렇게 여러 기법이 겹쳐서 만들어져요: flex로 큰 틀을 잡고, absolute로 배지처럼 튀어나온 요소를 고정하고, 변수로 색을 관리하고, shadow로 입체감을 줘요.',
  },
]

export default cssProblems
