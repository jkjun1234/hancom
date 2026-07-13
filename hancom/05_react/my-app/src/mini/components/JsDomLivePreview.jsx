import { useEffect, useRef } from 'react'
import './JsDomLivePreview.css'

// previewHtml: 고정된 HTML 구조, code: 사용자가 작성 중인 JS
// 사용자의 JS를 <script> 태그로 문서에 직접 써서, 진짜 그 문서 안에서 실행되게 한다.
// (탐색용 미리보기라 채점에는 쓰지 않음 — 채점은 매번 새 iframe에서 독립적으로 실행한다.)
const JsDomLivePreview = ({ previewHtml, code }) => {
  const iframeRef = useRef(null)

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument
    if (!doc) return

    doc.open()
    doc.write(`<!doctype html>
      <html>
        <head>
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }
            button { padding: 6px 12px; cursor: pointer; }
            input { padding: 4px 8px; }
            ul { padding-left: 20px; }
          </style>
        </head>
        <body>
          ${previewHtml}
          <script>
            try {
              ${code}
            } catch (e) {
              console.error('코드 오류:', e.message)
            }
          </script>
        </body>
      </html>`)
    doc.close()
  }, [previewHtml, code])

  return <iframe ref={iframeRef} title="js-dom-live-preview" className="js-dom-live-preview" />
}

export default JsDomLivePreview
