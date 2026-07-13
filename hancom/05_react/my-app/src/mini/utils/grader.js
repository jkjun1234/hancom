// 사용자가 작성한 함수 본문을 실제로 실행해서 채점하는 유틸리티.
// code는 testCases의 input 객체 키들을 매개변수로 받는 함수의 "본문"이며,
// 반드시 직접 return 문을 포함해야 한다 (for/forEach 같은 문장도 쓸 수 있도록).

// code: "let sum = 0\nfor (...) { sum += numbers[i] }\nreturn sum" 같은 함수 본문 문자열
// input: { numbers: [1,2,3] } 같은 객체
export function runUserCode(code, input) {
  const keys = Object.keys(input)
  const values = keys.map((key) => input[key])
  // eslint-disable-next-line no-new-func
  const fn = new Function(...keys, code)
  return fn(...values)
}

function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

// problem: reactProblems.jsx의 문제 객체 하나
// userCode: 에디터에 입력된 코드 문자열
export function gradeProblem(problem, userCode) {
  const results = problem.testCases.map((testCase) => {
    let actual
    let error = null
    try {
      actual = runUserCode(userCode, testCase.input)
    } catch (e) {
      error = e.message
    }
    const passed = error === null && isEqual(actual, testCase.expected)
    return { input: testCase.input, expected: testCase.expected, actual, passed, error }
  })

  return {
    allPassed: results.every((r) => r.passed),
    results,
  }
}
