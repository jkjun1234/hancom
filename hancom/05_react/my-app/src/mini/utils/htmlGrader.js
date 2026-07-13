// HTML 문제 채점: 채점할 때마다 완전히 새로운 hidden iframe에서 사용자의 마크업을
// 처음부터 다시 렌더링한 뒤, 각 testCase의 check(doc) 함수로 구조/속성을 검사한다.
// 라이브 미리보기(HtmlLivePreview)와는 별개로 독립 실행한다.
export function gradeHtmlProblem(problem, code) {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)

  let results
  try {
    const doc = iframe.contentDocument
    doc.open()
    doc.write(`<!doctype html><html><body>${code}</body></html>`)
    doc.close()

    results = problem.testCases.map((testCase) => {
      let passed = false
      try {
        passed = Boolean(testCase.check(doc))
      } catch {
        passed = false
      }
      return { description: testCase.description, passed }
    })
  } catch {
    results = problem.testCases.map((testCase) => ({ description: testCase.description, passed: false }))
  }

  document.body.removeChild(iframe)

  return {
    allPassed: results.every((r) => r.passed),
    results,
  }
}
