import { runUserCode } from '../utils/grader'
import './DemoHarness.css'

// JS 카테고리 문제용: 사용자 코드의 실행 결과 값을 그대로 보여준다.
const DemoHarness = ({ code, sampleInput }) => {
  let result
  let error = null
  try {
    result = runUserCode(code, sampleInput)
  } catch (e) {
    error = e.message
  }

  if (error) {
    return <div className="demo-harness demo-harness--error">코드 오류: {error}</div>
  }

  return (
    <div className="demo-harness">
      <pre className="demo-value">{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}

export default DemoHarness
