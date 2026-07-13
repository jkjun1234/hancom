import { renderToStaticMarkup } from 'react-dom/server'
import { compileComponent } from '../utils/reactComponentGrader'
import './ReactComponentPreview.css'

// 사용자가 작성한 컴포넌트 코드를 실제로 컴파일해서 보여주는 미리보기.
// 이 컴포넌트 자체가 이미 앱의 React 트리 안에 있으므로, 클릭이 필요한(interactive)
// 컴포넌트도 별도 root 없이 그냥 자식으로 렌더링하면 정상적으로 상호작용된다.
// key={code}를 줘서 코드가 바뀔 때마다 이전 상태(예: count) 없이 새로 시작한다.
const ReactComponentPreview = ({ code, sampleProps, interactive = false }) => {
  let Component
  let error = null
  try {
    Component = compileComponent(code)
  } catch (e) {
    error = e.message
  }

  if (error) {
    return <div className="demo-harness demo-harness--error">코드 오류: {error}</div>
  }

  if (interactive) {
    return (
      <div className="demo-harness">
        <Component {...sampleProps} key={code} />
      </div>
    )
  }

  const html = renderToStaticMarkup(<Component {...sampleProps} />)
  return <div className="demo-harness" dangerouslySetInnerHTML={{ __html: html }} />
}

export default ReactComponentPreview
