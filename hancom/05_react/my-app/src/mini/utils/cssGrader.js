// CSS 문제 채점: 채점할 때마다 완전히 새로운 hidden iframe에서 처음부터 다시
// 렌더링해서 getComputedStyle 값을 testCases와 비교한다 (Flexbox Froggy와 같은 원리).
// 라이브 미리보기(CssLivePreview)와는 별개로 독립 실행하므로, 미리보기에서
// 어떤 상태였든 채점 결과에는 영향을 주지 않는다.

// 브라우저는 getComputedStyle에서 색상을 항상 rgb()/rgba() 형태로 정규화해서 돌려준다.
// 그래서 'hotpink' 같은 색 이름을 기대값으로 써도 비교가 가능하도록, 기대값도 똑같이
// 브라우저를 통해 정규화한 뒤 비교한다.
const COLOR_PROPERTIES = new Set(['color', 'background-color', 'border-color', 'outline-color'])

// "정확한 값"보다 "아무 값이나 설정했는지"만 확인하고 싶을 때 쓰는 특수 기대값
// (예: box-shadow, ::before content 처럼 값 형식이 브라우저마다 달라 정확 비교가 불안정한 속성)
export const NOT_NONE = '__not_none__'

function normalize(value) {
  return String(value ?? '').trim().toLowerCase()
}

function normalizeColor(value, doc) {
  const probe = doc.createElement('div')
  probe.style.color = value
  doc.body.appendChild(probe)
  const normalized = doc.defaultView.getComputedStyle(probe).color
  doc.body.removeChild(probe)
  return normalized
}

// code: 사용자가 작성한 CSS 문자열
export function gradeCssProblem(problem, code) {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)

  let results
  try {
    const doc = iframe.contentDocument
    doc.open()
    doc.write(`<!doctype html><html><head><style>${code}</style></head><body>${problem.previewHtml}</body></html>`)
    doc.close()

    results = problem.testCases.map((testCase) => {
      const el = doc.querySelector(testCase.selector)
      if (!el) {
        return {
          selector: testCase.selector,
          property: testCase.property,
          expected: testCase.expected,
          actual: null,
          passed: false,
        }
      }

      const style = doc.defaultView.getComputedStyle(el, testCase.pseudo || null)
      const actual = style[testCase.property]

      let passed
      if (testCase.expected === NOT_NONE) {
        passed = normalize(actual) !== 'none' && actual !== ''
      } else if (COLOR_PROPERTIES.has(testCase.property)) {
        passed = normalize(actual) === normalize(normalizeColor(testCase.expected, doc))
      } else {
        passed = normalize(actual) === normalize(testCase.expected)
      }

      return { selector: testCase.selector, property: testCase.property, expected: testCase.expected, actual, passed }
    })
  } catch {
    results = problem.testCases.map((testCase) => ({
      selector: testCase.selector,
      property: testCase.property,
      expected: testCase.expected,
      actual: null,
      passed: false,
    }))
  }

  document.body.removeChild(iframe)

  return {
    allPassed: results.every((r) => r.passed),
    results,
  }
}
