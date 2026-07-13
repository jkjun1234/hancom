// JavaScript 카테고리 · 문제 목록
// new Function으로 함수 본문을 실행 후 testCases 비교로 채점하되(kind: 'expression'),
// 반드시 교재(JS.html)에서 실제로 가르친 문법/메서드만 사용한다.
// 시각적 데모 없이 계산 결과 자체를 보여준다 (demo: 'value').
const jsProblems = [
  {
    id: 1,
    kind: 'expression',
    difficulty: 'basic',
    title: '배열 합계 구하기',
    concept: 'for 반복문은 배열의 인덱스를 0부터 하나씩 늘려가며 각 요소에 접근할 수 있게 해줘요.',
    examples: [
      {
        title: '배열 최댓값 구하기',
        description: '누적 변수에 "가장 큰 값"을 계속 갱신해나가는 방식이에요.',
        code: 'let max = numbers[0]\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] > max) {\n    max = numbers[i]\n  }\n}\nreturn max',
        sampleInput: { numbers: [3, 7, 2] },
      },
      {
        title: '짝수 개수 세기',
        description: '합계 대신 조건에 맞을 때만 카운트를 올릴 수도 있어요.',
        code: 'let count = 0\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] % 2 === 0) {\n    count++\n  }\n}\nreturn count',
        sampleInput: { numbers: [1, 2, 3, 4, 5, 6] },
      },
      {
        title: '문자열도 for로 순회하기',
        description: '문자열도 배열처럼 word[i]로 한 글자씩 접근할 수 있어요.',
        code: "let aCount = 0\nfor (let i = 0; i < word.length; i++) {\n  if (word[i] === 'a') {\n    aCount++\n  }\n}\nreturn aCount",
        sampleInput: { word: 'banana' },
      },
      {
        title: '곱셈 누적하기 (팩토리얼)',
        description: '더하기(+=) 대신 곱하기로 누적하면 팩토리얼도 만들 수 있어요.',
        code: 'let result = 1\nfor (let i = 1; i <= n; i++) {\n  result = result * i\n}\nreturn result',
        sampleInput: { n: 5 },
      },
    ],
    prompt: 'for 반복문을 사용해서 numbers 배열의 모든 숫자를 더한 합계를 반환하는 함수를 작성하세요.',
    starterCode: 'let sum = 0\nfor (let i = 0; i < numbers.length; i++) {\n  \n}\nreturn sum',
    hints: [
      'sum이라는 변수에 값을 하나씩 누적해나가면 돼요.',
      'numbers[i]로 배열의 i번째 값에 접근할 수 있어요.',
      'sum += numbers[i]',
    ],
    testCases: [
      { input: { numbers: [1, 2, 3] }, expected: 6 },
      { input: { numbers: [] }, expected: 0 },
      { input: { numbers: [10, -2, 5] }, expected: 13 },
    ],
    solution: 'let sum = 0\nfor (let i = 0; i < numbers.length; i++) {\n  sum += numbers[i]\n}\nreturn sum',
    explanation: 'for문은 i가 numbers.length보다 작은 동안 계속 반복돼요. 매 반복마다 sum에 numbers[i]를 더해서 결국 전체 합계가 만들어져요.',
    demo: 'value',
  },
  {
    id: 2,
    kind: 'expression',
    difficulty: 'basic',
    title: '짝수만 걸러내기',
    concept: 'filter는 조건에 맞는 요소만 남겨 새 배열을 만들어요. map과 짝을 이루는 대표적인 배열 메서드예요.',
    examples: [
      {
        title: '3의 배수만 남기기',
        description: '조건식만 바꾸면 어떤 배수든 걸러낼 수 있어요.',
        code: 'return numbers.filter(n => n % 3 === 0)',
        sampleInput: { numbers: [1, 3, 4, 6, 9] },
      },
      {
        title: '짧은 단어만 남기기',
        description: '숫자뿐 아니라 문자열의 길이(length)로도 조건을 만들 수 있어요.',
        code: 'return words.filter(w => w.length <= 3)',
        sampleInput: { words: ['cat', 'elephant', 'dog'] },
      },
      {
        title: '양수만 남기기',
        description: '비교 연산자(>)를 조건으로 쓰는 가장 흔한 형태예요.',
        code: 'return numbers.filter(n => n > 0)',
        sampleInput: { numbers: [-2, 5, -1, 8] },
      },
      {
        title: '특정 값 제외하기',
        description: '!== 로 "그 값만 빼고" 남기는 것도 filter로 가능해요.',
        code: "return names.filter(name => name !== 'admin')",
        sampleInput: { names: ['admin', '홍길동', '하늘'] },
      },
    ],
    prompt: 'numbers 배열에서 짝수만 남긴 새 배열을 반환하는 함수를 작성하세요 (filter 사용).',
    starterCode: 'return numbers.filter(n => true)',
    hints: [
      'filter는 콜백이 true를 반환하는 요소만 남겨요.',
      '짝수 판별은 나머지 연산자 %를 사용해요 (n % 2 === 0).',
      'return numbers.filter(n => n % 2 === 0)',
    ],
    testCases: [
      { input: { numbers: [1, 2, 3, 4] }, expected: [2, 4] },
      { input: { numbers: [1, 3, 5] }, expected: [] },
    ],
    solution: 'return numbers.filter(n => n % 2 === 0)',
    explanation: 'filter는 map처럼 배열을 순회하지만, 콜백의 반환값이 true인 요소만 골라 새 배열을 만들어요.',
    demo: 'value',
  },
  {
    id: 3,
    kind: 'expression',
    difficulty: 'basic',
    title: '문자열 뒤집기',
    concept: '문자열은 배열이 아니라서 직접 reverse()를 쓸 수 없어요. split으로 배열로 바꿨다가 다시 합치는 흐름을 연습해요.',
    examples: [
      {
        title: '띄어쓰기 기준으로 단어 쪼개기',
        description: "split의 구분자를 바꾸면 글자 단위가 아니라 단어 단위로도 쪼갤 수 있어요.",
        code: "return sentence.split(' ')",
        sampleInput: { sentence: 'hello world react' },
      },
      {
        title: '배열을 문자열로 합치기',
        description: 'join은 split의 반대 동작이에요 — 배열을 원하는 구분자로 이어 붙여요.',
        code: "return words.join('-')",
        sampleInput: { words: ['2026', '07', '13'] },
      },
      {
        title: '한 글자씩 배열로만 쪼개기',
        description: "join 없이 split('')만 쓰면 글자 배열 자체를 얻을 수 있어요.",
        code: "return word.split('')",
        sampleInput: { word: 'hi' },
      },
      {
        title: '뒤집었을 때 같은 단어인지 확인용 문자열 만들기',
        description: '뒤집기는 팰린드롬(거꾸로 읽어도 같은 단어) 확인에도 자주 쓰여요.',
        code: "return text.split('').reverse().join('')",
        sampleInput: { text: 'stressed' },
      },
    ],
    prompt: 'str 문자열을 거꾸로 뒤집은 문자열을 반환하는 함수를 작성하세요.',
    starterCode: 'return str',
    hints: [
      "문자열은 split('')으로 한 글자씩 배열로 바꿀 수 있어요.",
      "split('') → reverse() → join('') 순서로 이어보세요.",
      "return str.split('').reverse().join('')",
    ],
    testCases: [
      { input: { str: 'hello' }, expected: 'olleh' },
      { input: { str: '리액트' }, expected: '트액리' },
    ],
    solution: "return str.split('').reverse().join('')",
    explanation:
      "split('')은 문자열을 한 글자씩 쪼갠 배열로, reverse()는 배열 순서를 뒤집고, join('')은 다시 문자열로 합쳐요.",
    demo: 'value',
  },
  {
    id: 4,
    kind: 'expression',
    difficulty: 'basic',
    title: '객체 속성 개수 세기',
    concept: 'Object.keys()는 객체의 키 목록을 배열로 뽑아내요. 배열이 되면 length 같은 배열 기능을 그대로 쓸 수 있어요.',
    examples: [
      {
        title: '속성 이름 목록 자체를 반환하기',
        description: 'Object.keys()의 결과를 length 없이 배열 그대로 써도 돼요.',
        code: 'return Object.keys(person)',
        sampleInput: { person: { name: '홍길동', age: 20 } },
      },
      {
        title: '값들만 뽑기 (Object.values)',
        description: '키가 아니라 값 목록이 필요할 땐 Object.values()를 써요.',
        code: 'return Object.values(scores)',
        sampleInput: { scores: { math: 90, eng: 85 } },
      },
      {
        title: '특정 속성이 있는지 확인하기',
        description: '키 배열에 includes를 조합하면 "이 속성이 있나?"를 확인할 수 있어요.',
        code: "return Object.keys(user).includes('email')",
        sampleInput: { user: { name: '하늘', email: 'a@test.com' } },
      },
      {
        title: '속성 개수 비교하기',
        description: 'Object.keys().length를 두 번 써서 두 객체를 비교할 수도 있어요.',
        code: 'return Object.keys(a).length > Object.keys(b).length',
        sampleInput: { a: { x: 1, y: 2, z: 3 }, b: { x: 1 } },
      },
    ],
    prompt: 'obj 객체가 가진 속성(키)의 개수를 반환하는 함수를 작성하세요.',
    starterCode: 'return obj',
    hints: [
      '객체의 키 목록을 배열로 뽑는 메서드가 있어요.',
      'Object.keys(obj)는 키 이름들의 배열을 반환해요.',
      'return Object.keys(obj).length',
    ],
    testCases: [
      { input: { obj: { a: 1, b: 2 } }, expected: 2 },
      { input: { obj: {} }, expected: 0 },
      { input: { obj: { a: 1, b: 2, c: 3 } }, expected: 3 },
    ],
    solution: 'return Object.keys(obj).length',
    explanation: "Object.keys(obj)는 ['a', 'b']처럼 키 이름 배열을 반환하므로, 그 길이가 곧 속성 개수예요.",
    demo: 'value',
  },
  {
    id: 5,
    kind: 'expression',
    difficulty: 'intermediate',
    title: '배열 중복 제거하기',
    concept: 'includes()로 어떤 값이 배열에 이미 있는지 확인할 수 있어요. 없을 때만 push하면 중복 없는 배열을 만들 수 있어요.',
    examples: [
      {
        title: '중복 없는 이름만 모으기',
        description: '가장 기본형 — 문자열 배열에서 중복을 제거해요.',
        code: 'const result = []\nfor (let i = 0; i < names.length; i++) {\n  if (!result.includes(names[i])) {\n    result.push(names[i])\n  }\n}\nreturn result',
        sampleInput: { names: ['a', 'b', 'a', 'c'] },
      },
      {
        title: '조건과 중복 제거를 함께 쓰기',
        description: 'if 조건에 다른 조건(양수인지)까지 && 로 추가할 수 있어요.',
        code: 'const result = []\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] > 0 && !result.includes(numbers[i])) {\n    result.push(numbers[i])\n  }\n}\nreturn result',
        sampleInput: { numbers: [1, -2, 1, 3, -2] },
      },
      {
        title: '다른 배열에 있는 값 제외하기',
        description: 'includes()는 "제외 목록"을 확인하는 용도로도 자주 쓰여요.',
        code: 'const result = []\nfor (let i = 0; i < fruits.length; i++) {\n  if (!excluded.includes(fruits[i])) {\n    result.push(fruits[i])\n  }\n}\nreturn result',
        sampleInput: { fruits: ['apple', 'banana', 'melon'], excluded: ['banana'] },
      },
      {
        title: '중복 없는 글자만 모으기',
        description: '배열이 아니라 문자열이어도 인덱스로 순회하면 똑같은 방식이 통해요.',
        code: "const result = []\nfor (let i = 0; i < word.length; i++) {\n  if (!result.includes(word[i])) {\n    result.push(word[i])\n  }\n}\nreturn result.join('')",
        sampleInput: { word: 'banana' },
      },
    ],
    prompt: 'for 반복문과 includes(), push()를 사용해서 numbers 배열에서 중복된 값을 제거한 새 배열을 반환하는 함수를 작성하세요.',
    starterCode: 'const result = []\nfor (let i = 0; i < numbers.length; i++) {\n  \n}\nreturn result',
    hints: [
      'result 배열에 이미 있는 값인지 먼저 확인해야 해요.',
      'result.includes(numbers[i])가 false일 때만 push하세요.',
      'if (!result.includes(numbers[i])) {\n  result.push(numbers[i])\n}',
    ],
    testCases: [
      { input: { numbers: [1, 2, 2, 3, 1] }, expected: [1, 2, 3] },
      { input: { numbers: [5, 5, 5] }, expected: [5] },
    ],
    solution:
      'const result = []\nfor (let i = 0; i < numbers.length; i++) {\n  if (!result.includes(numbers[i])) {\n    result.push(numbers[i])\n  }\n}\nreturn result',
    explanation:
      'result 배열을 하나 만들어두고, numbers를 순회하면서 "아직 result에 없는 값"일 때만 push해요. 그러면 처음 나온 값만 남아 중복이 제거돼요.',
    demo: 'value',
  },
  {
    id: 6,
    kind: 'expression',
    difficulty: 'intermediate',
    title: '객체 배열에서 합계 구하기',
    concept: 'forEach는 배열의 각 요소를 순서대로 하나씩 꺼내 콜백 함수를 실행해요. map과 달리 새 배열을 만들지 않고 순회만 해요.',
    examples: [
      {
        title: '평균 점수 구하기',
        description: '합계를 구한 뒤 개수로 나누면 평균이 돼요.',
        code: 'let sum = 0\nscores.forEach(score => {\n  sum += score\n})\nreturn sum / scores.length',
        sampleInput: { scores: [80, 90, 100] },
      },
      {
        title: '원하는 필드만 모아 새 배열 만들기',
        description: 'forEach 콜백 안에서 별도의 배열에 push하면, map처럼 값을 뽑아 모을 수 있어요.',
        code: 'const names = []\nusers.forEach(user => {\n  names.push(user.name)\n})\nreturn names',
        sampleInput: { users: [{ name: '하늘' }, { name: '홍길동' }] },
      },
      {
        title: '조건 만족하는 개수 세기',
        description: '더하기 대신 조건이 맞을 때만 카운트를 올릴 수도 있어요.',
        code: 'let count = 0\nitems.forEach(item => {\n  if (item.inStock) {\n    count++\n  }\n})\nreturn count',
        sampleInput: { items: [{ inStock: true }, { inStock: false }, { inStock: true }] },
      },
      {
        title: '가장 비싼 상품 가격 찾기',
        description: '누적 변수를 "최댓값 갱신" 용도로 쓰는 것도 forEach로 똑같이 가능해요.',
        code: 'let max = 0\nitems.forEach(item => {\n  if (item.price > max) {\n    max = item.price\n  }\n})\nreturn max',
        sampleInput: { items: [{ price: 1000 }, { price: 5000 }, { price: 2000 }] },
      },
    ],
    prompt: 'forEach를 사용해서 items 배열({name, price} 객체들)의 price를 모두 더한 합계를 반환하는 함수를 작성하세요.',
    starterCode: 'let sum = 0\nitems.forEach(item => {\n  \n})\nreturn sum',
    hints: [
      'forEach 콜백 안에서 각 item에 접근할 수 있어요.',
      'sum에 item.price를 더해나가면 돼요.',
      'sum += item.price',
    ],
    testCases: [
      {
        input: {
          items: [
            { name: 'A', price: 1000 },
            { name: 'B', price: 2000 },
          ],
        },
        expected: 3000,
      },
      { input: { items: [] }, expected: 0 },
    ],
    solution: 'let sum = 0\nitems.forEach(item => {\n  sum += item.price\n})\nreturn sum',
    explanation: '배열이 객체로 이루어져 있어도 forEach의 원리는 같아요. 콜백 안에서 원하는 필드(item.price)만 골라 누적하면 돼요.',
    demo: 'value',
  },
  {
    id: 7,
    kind: 'expression',
    difficulty: 'advanced',
    title: '첫 글자만 대문자로 바꾸기',
    concept: 'charAt(0)으로 첫 글자만 뽑고, substring(1)으로 나머지 글자를 뽑을 수 있어요. 이 둘을 합치면 첫 글자만 다르게 바꿀 수 있어요.',
    examples: [
      {
        title: '마지막 글자만 떼기',
        description: 'substring의 시작 위치를 length - 1로 주면 마지막 글자만 얻을 수 있어요.',
        code: 'return str.substring(str.length - 1)',
        sampleInput: { str: 'react' },
      },
      {
        title: '앞 세 글자만 뽑기',
        description: 'substring(시작, 끝)처럼 범위를 지정하면 원하는 구간만 잘라낼 수 있어요.',
        code: 'return str.substring(0, 3)',
        sampleInput: { str: 'javascript' },
      },
      {
        title: '첫 글자만 소문자로 바꾸기',
        description: 'toUpperCase() 대신 toLowerCase()를 쓰면 반대로 동작해요.',
        code: 'return str.charAt(0).toLowerCase() + str.substring(1)',
        sampleInput: { str: 'Hello' },
      },
      {
        title: '특정 위치 글자 확인하기',
        description: 'charAt(인덱스)로 원하는 위치의 글자 하나만 꺼낼 수 있어요.',
        code: 'return str.charAt(2)',
        sampleInput: { str: 'react' },
      },
    ],
    prompt: 'str의 첫 글자만 대문자로 바꾸고 나머지는 그대로인 문자열을 반환하는 함수를 작성하세요.',
    starterCode: 'return str',
    hints: [
      '첫 글자는 str.charAt(0), 나머지는 str.substring(1)로 나눠서 생각해보세요.',
      '첫 글자에만 toUpperCase()를 적용하면 돼요.',
      "return str.charAt(0).toUpperCase() + str.substring(1)",
    ],
    testCases: [
      { input: { str: 'hello' }, expected: 'Hello' },
      { input: { str: 'react' }, expected: 'React' },
    ],
    solution: 'return str.charAt(0).toUpperCase() + str.substring(1)',
    explanation:
      'charAt(0)은 인덱스 0번째 글자 하나만, substring(1)은 인덱스 1번째부터 끝까지를 뽑아요. 앞부분만 대문자로 바꾼 뒤 나머지와 이어 붙이면 완성이에요.',
    demo: 'value',
  },
  {
    id: 8,
    kind: 'expression',
    difficulty: 'advanced',
    title: 'Person 클래스로 인사말 만들기',
    concept: 'class로 "붕어빵 틀"을 만들고 new로 실제 데이터를 채운 인스턴스를 찍어낼 수 있어요. constructor는 new할 때 자동으로 실행되고, this는 그 인스턴스 자신을 가리켜요.',
    examples: [
      {
        title: '동물 소리 클래스',
        description: '가장 단순한 형태 — 속성 1개, 메서드 1개인 클래스예요.',
        code: 'class Animal {\n  constructor(sound) {\n    this.sound = sound\n  }\n  makeSound() {\n    return `${this.sound}!`\n  }\n}\nconst a = new Animal(sound)\nreturn a.makeSound()',
        sampleInput: { sound: '멍멍' },
      },
      {
        title: '속성 2개 받는 클래스',
        description: 'constructor는 매개변수를 여러 개 받아 각각 this에 저장할 수 있어요.',
        code: 'class Product {\n  constructor(name, price) {\n    this.name = name\n    this.price = price\n  }\n  info() {\n    return `${this.name}: ${this.price}원`\n  }\n}\nconst p = new Product(name, price)\nreturn p.info()',
        sampleInput: { name: '키보드', price: 30000 },
      },
      {
        title: '메서드 안에서 계산하기',
        description: '메서드는 저장된 속성을 이용해 새로운 값을 계산할 수도 있어요.',
        code: 'class Circle {\n  constructor(radius) {\n    this.radius = radius\n  }\n  area() {\n    return this.radius * this.radius * 3.14\n  }\n}\nconst c = new Circle(radius)\nreturn c.area()',
        sampleInput: { radius: 2 },
      },
      {
        title: '메서드 호출로 상태 바꾸기',
        description: '메서드 안에서 this.속성 값을 직접 바꾸는 것도 가능해요.',
        code: 'class Counter {\n  constructor(start) {\n    this.count = start\n  }\n  increase() {\n    this.count = this.count + 1\n    return this.count\n  }\n}\nconst c = new Counter(start)\nreturn c.increase()',
        sampleInput: { start: 5 },
      },
    ],
    prompt: 'Person 클래스의 constructor에서 name을 this.name에 저장하도록 완성하세요.',
    starterCode:
      'class Person {\n  constructor(name) {\n    \n  }\n  greet() {\n    return `안녕하세요, ${this.name}입니다`\n  }\n}\nconst p = new Person(name)\nreturn p.greet()',
    hints: [
      'constructor 안에서 this.속성 = 매개변수 형태로 저장할 수 있어요.',
      'this.name에 매개변수 name을 저장하세요.',
      'this.name = name',
    ],
    testCases: [
      { input: { name: '홍길동' }, expected: '안녕하세요, 홍길동입니다' },
      { input: { name: '하늘' }, expected: '안녕하세요, 하늘입니다' },
    ],
    solution:
      'class Person {\n  constructor(name) {\n    this.name = name\n  }\n  greet() {\n    return `안녕하세요, ${this.name}입니다`\n  }\n}\nconst p = new Person(name)\nreturn p.greet()',
    explanation:
      'new Person(name)을 호출하면 constructor가 자동으로 실행되면서 this(새로 만들어진 인스턴스)에 name을 저장해요. 이후 p.greet()을 호출하면 그 저장된 값을 꺼내 쓸 수 있어요.',
    demo: 'value',
  },
  {
    id: 9,
    kind: 'js-dom',
    difficulty: 'applied',
    title: '클릭하면 목록에 항목 추가하기',
    concept: 'createElement로 새 요소를 만들고 appendChild로 화면에 붙일 수 있어요. addEventListener로 버튼 클릭에 반응하는 로직을 연결해요.',
    examples: [
      {
        title: '클릭할 때마다 숫자 늘리기',
        description: 'DOM 요소를 새로 만들지 않고, 기존 요소의 내용만 바꾸는 가장 단순한 형태예요.',
        previewHtml: '<button id="addBtn">클릭</button>\n<p id="count">0</p>',
        code: "const btn = document.querySelector('#addBtn')\nconst output = document.querySelector('#count')\nlet count = 0\nbtn.addEventListener('click', () => {\n  count++\n  output.textContent = count\n})",
      },
      {
        title: '입력값을 리스트에 추가하기',
        description: '고정된 텍스트("항목") 대신, 사용자가 입력한 값을 그대로 추가할 수도 있어요.',
        previewHtml: '<input id="itemInput">\n<button id="addBtn2">추가</button>\n<ul id="itemList"></ul>',
        code: "const input = document.querySelector('#itemInput')\nconst list = document.querySelector('#itemList')\nconst btn = document.querySelector('#addBtn2')\nbtn.addEventListener('click', () => {\n  const li = document.createElement('li')\n  li.textContent = input.value\n  list.appendChild(li)\n})",
      },
      {
        title: '마지막 항목 삭제하기',
        description: 'remove()를 쓰면 appendChild의 반대로, 요소를 화면에서 없앨 수 있어요.',
        previewHtml: '<ul id="removeList"><li>항목1</li><li>항목2</li></ul>\n<button id="removeBtn">마지막 삭제</button>',
        code: "const list = document.querySelector('#removeList')\nconst btn = document.querySelector('#removeBtn')\nbtn.addEventListener('click', () => {\n  const items = list.querySelectorAll('li')\n  if (items.length > 0) {\n    items[items.length - 1].remove()\n  }\n})",
      },
      {
        title: '클릭하면 배경색 바꾸기',
        description: 'DOM을 새로 만들지 않고, 이미 있는 요소의 style을 바꾸는 것도 자주 쓰는 패턴이에요.',
        previewHtml:
          '<div id="box" style="width:80px;height:40px;border:1px solid #999;"></div>\n<button id="colorBtn">색칠하기</button>',
        code: "const box = document.querySelector('#box')\nconst btn = document.querySelector('#colorBtn')\nbtn.addEventListener('click', () => {\n  box.style.backgroundColor = 'lightblue'\n})",
      },
    ],
    prompt: 'addBtn을 클릭할 때마다 list 안에 새로운 li 요소("항목")가 추가되도록 완성하세요.',
    previewHtml: '<ul id="list"></ul>\n<button id="addBtn">추가</button>',
    starterCode:
      "const btn = document.querySelector('#addBtn')\nconst list = document.querySelector('#list')\n\nbtn.addEventListener('click', () => {\n  \n})",
    hints: [
      "document.createElement('li')로 새 요소를 만들 수 있어요.",
      'textContent로 글자를 넣고, list.appendChild()로 화면에 추가하세요.',
      "const li = document.createElement('li')\nli.textContent = '항목'\nlist.appendChild(li)",
    ],
    testCases: [
      {
        interactions: [{ click: '#addBtn' }, { click: '#addBtn' }],
        description: '버튼을 2번 누르면 목록에 li가 2개 생겨야 해요',
        check: (doc) => doc.querySelectorAll('#list li').length === 2,
      },
    ],
    solution:
      "const btn = document.querySelector('#addBtn')\nconst list = document.querySelector('#list')\n\nbtn.addEventListener('click', () => {\n  const li = document.createElement('li')\n  li.textContent = '항목'\n  list.appendChild(li)\n})",
    explanation:
      'addEventListener로 클릭을 감지하고, 그 콜백 안에서 createElement + appendChild로 새 요소를 계속 추가할 수 있어요. 클릭할 때마다 콜백이 다시 실행되니 누른 횟수만큼 li가 쌓여요.',
  },
  {
    id: 10,
    kind: 'js-dom',
    difficulty: 'applied',
    title: 'localStorage에 입력값 저장하기',
    concept: 'localStorage.setItem(키, 값)으로 브라우저에 데이터를 저장해두면, 페이지를 새로고침해도 값이 남아있어요.',
    examples: [
      {
        title: '저장한 값 바로 읽어서 보여주기',
        description: 'setItem으로 저장한 값을 getItem으로 바로 꺼내 화면에 표시해요.',
        previewHtml: '<p id="output"></p>',
        code: "const output = document.querySelector('#output')\nlocalStorage.setItem('greeting', '안녕하세요')\noutput.textContent = localStorage.getItem('greeting')",
      },
      {
        title: '저장된 값 삭제하기',
        description: 'removeItem으로 저장했던 값을 지울 수 있어요. 지운 뒤엔 getItem이 null을 반환해요.',
        previewHtml: '<p id="output2">저장됨</p>\n<button id="clearBtn">삭제</button>',
        code: "const btn = document.querySelector('#clearBtn')\nconst output = document.querySelector('#output2')\nlocalStorage.setItem('token', 'abc123')\nbtn.addEventListener('click', () => {\n  localStorage.removeItem('token')\n  output.textContent = localStorage.getItem('token')\n})",
      },
      {
        title: '숫자를 저장해도 문자열로 돌아옴',
        description: 'localStorage는 모든 값을 문자열로 저장해서, 숫자를 넣어도 꺼내면 문자열이에요.',
        previewHtml: '<button id="saveBtn">저장</button>\n<p id="output3"></p>',
        code: "const btn = document.querySelector('#saveBtn')\nconst output = document.querySelector('#output3')\nbtn.addEventListener('click', () => {\n  localStorage.setItem('count', 5)\n  const saved = localStorage.getItem('count')\n  output.textContent = typeof saved\n})",
      },
      {
        title: '체크박스 상태 저장하기',
        description: 'change 이벤트를 이용하면 체크할 때마다 상태를 바로 저장할 수 있어요.',
        previewHtml: '<input type="checkbox" id="agree"> 동의합니다',
        code: "const checkbox = document.querySelector('#agree')\ncheckbox.addEventListener('change', () => {\n  localStorage.setItem('agreed', checkbox.checked)\n})",
      },
    ],
    prompt: '저장 버튼을 클릭하면 입력값을 localStorage에 "username"이라는 키로 저장하세요.',
    previewHtml: '<input id="nameInput" type="text">\n<button id="saveBtn">저장</button>',
    starterCode:
      "const input = document.querySelector('#nameInput')\nconst btn = document.querySelector('#saveBtn')\n\nbtn.addEventListener('click', () => {\n  \n})",
    hints: [
      '입력값은 input.value로 읽을 수 있어요.',
      'localStorage.setItem(키, 값) 형태로 저장해요.',
      "localStorage.setItem('username', input.value)",
    ],
    testCases: [
      {
        interactions: [{ fill: { selector: '#nameInput', value: '리액트' } }, { click: '#saveBtn' }],
        description: '저장 버튼을 누르면 localStorage의 username에 입력값이 저장돼야 해요',
        check: (doc) => doc.defaultView.localStorage.getItem('username') === '리액트',
      },
    ],
    solution:
      "const input = document.querySelector('#nameInput')\nconst btn = document.querySelector('#saveBtn')\n\nbtn.addEventListener('click', () => {\n  localStorage.setItem('username', input.value)\n})",
    explanation:
      'localStorage는 브라우저에 데이터를 계속 남겨두는 저장소예요. setItem으로 저장하고 getItem으로 꺼낼 수 있고, 새로고침하거나 다시 방문해도 값이 유지돼요.',
  },
  {
    id: 11,
    kind: 'js-dom',
    difficulty: 'capstone',
    title: '🏆 캡스톤 — 할 일 목록에 추가하고 저장하기',
    concept: 'DOM 조작(createElement/appendChild)과 localStorage 저장을 함께 사용해서, 진짜 할 일 목록 앱의 핵심 로직을 만들어봐요.',
    examples: [
      {
        title: '완료 표시 토글하기',
        description: '이벤트 위임(부모에 리스너를 걸고 e.target으로 실제 클릭된 요소 확인)을 활용한 예시예요.',
        previewHtml: '<ul id="toggleList"><li>할일 1</li><li>할일 2</li></ul>',
        code: "const list = document.querySelector('#toggleList')\nlist.addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI') {\n    e.target.style.textDecoration = 'line-through'\n  }\n})",
      },
      {
        title: '저장된 개수 세서 보여주기',
        description: 'localStorage 저장과 함께, 화면에도 지금까지 몇 개 저장했는지 보여줘요.',
        previewHtml: '<button id="addBtn2">추가</button>\n<p id="output">0개 저장됨</p>',
        code: "const btn = document.querySelector('#addBtn2')\nconst output = document.querySelector('#output')\nlet items = []\nbtn.addEventListener('click', () => {\n  items.push('항목')\n  localStorage.setItem('items', JSON.stringify(items))\n  output.textContent = `${items.length}개 저장됨`\n})",
      },
      {
        title: '빈 값은 추가하지 않기',
        description: 'if로 조건을 걸어, 입력값이 비어있을 땐 아무 일도 안 하게 막을 수 있어요.',
        previewHtml: '<input id="validateInput">\n<button id="addBtn3">추가</button>\n<ul id="validateList"></ul>',
        code: "const input = document.querySelector('#validateInput')\nconst btn = document.querySelector('#addBtn3')\nconst list = document.querySelector('#validateList')\nbtn.addEventListener('click', () => {\n  if (input.value.trim() !== '') {\n    const li = document.createElement('li')\n    li.textContent = input.value\n    list.appendChild(li)\n  }\n})",
      },
      {
        title: '배열 전체를 한 번에 저장하기',
        description: 'JSON.stringify/JSON.parse로 배열 전체를 저장하고 다시 꺼낼 수 있어요.',
        previewHtml: '<p id="output2"></p>',
        code: "const items = ['우유 사기', '청소하기']\nlocalStorage.setItem('todos', JSON.stringify(items))\nconst output = document.querySelector('#output2')\noutput.textContent = JSON.parse(localStorage.getItem('todos')).join(', ')",
      },
    ],
    prompt: '추가 버튼을 클릭하면 입력값으로 새 li를 목록에 추가하고, 동시에 localStorage에도 "todos" 키로 저장하세요 (JSON.stringify 사용).',
    previewHtml: '<input id="todoInput" type="text">\n<button id="addBtn">추가</button>\n<ul id="todoList"></ul>',
    starterCode:
      "const input = document.querySelector('#todoInput')\nconst btn = document.querySelector('#addBtn')\nconst list = document.querySelector('#todoList')\n\nbtn.addEventListener('click', () => {\n  \n})",
    hints: [
      '먼저 li를 만들어서 화면 목록에 추가하는 부분부터 해보세요 (이전 문제와 비슷해요).',
      'localStorage에는 문자열만 저장할 수 있어서, 배열은 JSON.stringify로 바꿔서 저장해야 해요.',
      "const li = document.createElement('li')\nli.textContent = input.value\nlist.appendChild(li)\nlocalStorage.setItem('todos', JSON.stringify([input.value]))",
    ],
    testCases: [
      {
        interactions: [{ fill: { selector: '#todoInput', value: '빨래하기' } }, { click: '#addBtn' }],
        description: '목록에 "빨래하기"가 추가되고, localStorage의 todos에도 저장돼야 해요',
        check: (doc) => {
          const listOk = doc.querySelector('#todoList').textContent.includes('빨래하기')
          const stored = doc.defaultView.localStorage.getItem('todos')
          const storedOk = Boolean(stored && stored.includes('빨래하기'))
          return listOk && storedOk
        },
      },
    ],
    solution:
      "const input = document.querySelector('#todoInput')\nconst btn = document.querySelector('#addBtn')\nconst list = document.querySelector('#todoList')\n\nbtn.addEventListener('click', () => {\n  const li = document.createElement('li')\n  li.textContent = input.value\n  list.appendChild(li)\n  localStorage.setItem('todos', JSON.stringify([input.value]))\n})",
    explanation:
      '화면에 보이는 것(DOM)과 저장되는 것(localStorage)은 서로 다른 두 가지 작업이라, 둘 다 따로 챙겨줘야 해요. 실제 할 일 목록 앱도 이 두 로직이 핵심이에요.',
    demo: 'value',
  },
]

export default jsProblems
