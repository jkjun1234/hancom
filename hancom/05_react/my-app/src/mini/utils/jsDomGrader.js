// JS DOM 조작 문제 채점: 실시간 미리보기와는 별개로, 채점할 때마다
// 완전히 새로운 iframe에서 사용자 코드를 처음부터 다시 실행한다.
// (미리보기에서 사용자가 미리 클릭해본 상태가 채점 결과에 영향을 주면 안 되므로)
export function gradeJsDomProblem(problem, code) {
  const results = problem.testCases.map((testCase) => {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    let passed = false
    try {
      const doc = iframe.contentDocument
      doc.open()
      doc.write(`<!doctype html>
        <html>
          <body>
            ${problem.previewHtml}
            <script>${code}</script>
          </body>
        </html>`)
      doc.close()

      for (const step of testCase.interactions ?? []) {
        if (step.click) {
          doc.querySelector(step.click)?.click()
        }
        if (step.fill) {
          const el = doc.querySelector(step.fill.selector)
          if (el) {
            el.value = step.fill.value
          }
        }
      }

      passed = Boolean(testCase.check(doc))
    } catch {
      passed = false
    }

    document.body.removeChild(iframe)
    return { description: testCase.description, passed }
  })

  return { allPassed: results.every((r) => r.passed), results }
}
