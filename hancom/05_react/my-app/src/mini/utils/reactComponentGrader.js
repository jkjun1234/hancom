import { transform } from '@babel/standalone'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { Button, TextField, Checkbox } from '@mui/material'

// input/textarea에 .value = x 처럼 직접 대입하면 React가 변경을 감지하지 못해
// onChange가 안 불린다(React가 네이티브 value setter를 감싸서 이전 값을 추적하기 때문).
// 그래서 네이티브 setter를 직접 호출해 "진짜 타이핑"과 똑같이 값을 넣어준다.
function setNativeInputValue(el, value) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  setter.call(el, value)
  el.dispatchEvent(new Event('input', { bubbles: true }))
}

// 사용자가 작성한 "실제 컴포넌트 파일" 코드(JSX + export default)를 실행 가능한
// 컴포넌트 함수로 컴파일한다. 예)
//   const Badge = ({ text, type }) => { ... }
//   export default Badge
export function compileComponent(code) {
  // runtime: 'classic'을 명시해야 React.createElement(...) 형태로 변환된다.
  // (기본값인 automatic 런타임은 _jsx/_jsxs를 import해서 쓰는데, new Function 안에서는
  //  import를 쓸 수 없어서 실행 시점에 "_jsxs is not defined" 에러가 난다.)
  const { code: transpiled } = transform(code, {
    presets: [['react', { runtime: 'classic' }]],
  })
  // Function 생성자는 ES 모듈 문법(import/export)을 실행할 수 없으므로,
  // import 문은 지우고(대신 React/useState/useEffect를 매개변수로 직접 넣어준다),
  // 맨 마지막의 "export default 이름"은 "return 이름"으로 바꿔서 값을 돌려받는다.
  const withoutImports = transpiled.replace(/^\s*import\s+.*?;?\s*$/gm, '')
  const withReturn = withoutImports.replace(/export\s+default\s+(\w+)\s*;?\s*$/, 'return $1;')
  // eslint-disable-next-line no-new-func
  const factory = new Function('React', 'useState', 'useEffect', 'Button', 'TextField', 'Checkbox', withReturn)
  return factory(React, React.useState, React.useEffect, Button, TextField, Checkbox)
}

function parseHtmlDoc(html) {
  return new DOMParser().parseFromString(`<!doctype html><body>${html}</body>`, 'text/html')
}

// 정적 렌더링 기반 채점: props만 바뀌는, 클릭 등 상호작용이 없는 컴포넌트용.
// problem.testCases: [{ props, description, check(doc) }]
export function gradeStaticComponent(problem, code) {
  let Component
  try {
    Component = compileComponent(code)
  } catch (e) {
    return {
      allPassed: false,
      results: problem.testCases.map((tc) => ({ description: tc.description, passed: false })),
      error: e.message,
    }
  }

  const results = problem.testCases.map((testCase) => {
    let passed = false
    let error = null
    try {
      const html = renderToStaticMarkup(React.createElement(Component, testCase.props))
      const doc = parseHtmlDoc(html)
      passed = Boolean(testCase.check(doc))
    } catch (e) {
      error = e.message
    }
    return { description: testCase.description, passed, error }
  })

  return { allPassed: results.every((r) => r.passed), results }
}

// 상호작용(클릭 등)이 필요한 컴포넌트용: 실제 DOM에 마운트해서
// 버튼 클릭 같은 이벤트를 진짜로 발생시킨 뒤 결과를 확인한다.
// problem.testCases 필드:
//   props, interactions: [{ click: 'selector' }, { fill: { selector, value } }]
//   check(container) — 마운트/상호작용 후 DOM으로 검증할 때
//   trackCalls: 'onReady' 같은 prop 이름 — 그 자리에 "호출 횟수를 세는 함수"를 대신 넣어준다
//     (useEffect가 몇 번 실행되는지 등을 setState 없이, 즉 무한루프 위험 없이 검증하기 위함)
//   checkCallCount(count) — trackCalls를 쓸 때, 몇 번 호출됐는지로 판정
//   unmountBeforeCheck: true — cleanup 함수(예: useEffect의 return)가 실행되는지 보려면
//     체크 전에 먼저 언마운트해야 하므로 이 옵션을 쓴다
export function gradeInteractiveComponent(problem, code) {
  let Component
  try {
    Component = compileComponent(code)
  } catch (e) {
    return {
      allPassed: false,
      results: problem.testCases.map((tc) => ({ description: tc.description, passed: false })),
      error: e.message,
    }
  }

  const results = problem.testCases.map((testCase) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    let passed = false
    let root = null
    let callCount = 0
    const props = { ...testCase.props }
    if (testCase.trackCalls) {
      props[testCase.trackCalls] = () => {
        callCount += 1
      }
    }

    try {
      root = createRoot(container)
      flushSync(() => {
        root.render(React.createElement(Component, props))
      })

      for (const step of testCase.interactions ?? []) {
        if (step.click) {
          const el = container.querySelector(step.click)
          if (el) {
            flushSync(() => {
              el.click()
            })
          }
        }
        if (step.fill) {
          const el = container.querySelector(step.fill.selector)
          if (el) {
            flushSync(() => {
              setNativeInputValue(el, step.fill.value)
            })
          }
        }
        if (step.rerender) {
          // 같은 props로 다시 렌더링을 강제로 발생시킨다.
          // (의존성 배열이 없는 useEffect가 "렌더링마다 매번" 실행되는지 확인하려면
          //  실제로 리렌더링이 한 번 더 일어나야 한다 — 마운트 1번만으로는 구분이 안 됨)
          flushSync(() => {
            root.render(React.createElement(Component, { ...props }))
          })
        }
      }

      if (testCase.unmountBeforeCheck) {
        flushSync(() => {
          root.unmount()
        })
        root = null // 이미 언마운트했으니 아래에서 다시 unmount() 부르지 않게 함
      }

      passed = testCase.trackCalls
        ? Boolean(testCase.checkCallCount?.(callCount))
        : Boolean(testCase.check(container))
    } catch {
      passed = false
    }
    // root.unmount()를 지금(이벤트 핸들러 안, 즉 React가 이미 렌더링 중인 시점)
    // 바로 부르면 "Attempted to synchronously unmount a root while React was
    // already rendering" 경고가 나므로, 다음 틱으로 미뤄서 정리한다.
    setTimeout(() => {
      root?.unmount()
      container.remove()
    }, 0)
    return { description: testCase.description, passed }
  })

  return { allPassed: results.every((r) => r.passed), results }
}
