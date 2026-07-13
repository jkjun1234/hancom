import { useEffect, useRef } from 'react'
import './CssLivePreview.css'

// previewHtml: 고정된 HTML 구조, css: 실행할 CSS (탐색용 미리보기 — 채점은 별도로 독립 실행됨)
const CssLivePreview = ({ previewHtml, css }) => {
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
            .box, .stack, .panel { border: 1px dashed #b8b2a0; min-height: 40px; }
            span, .row, .chip { background: #d64550; color: #fff; padding: 6px 10px; border-radius: 4px; }
            ${css}
          </style>
        </head>
        <body>${previewHtml}</body>
      </html>`)
    doc.close()
  }, [previewHtml, css])

  return <iframe ref={iframeRef} title="css-live-preview" className="css-live-preview" />
}

export default CssLivePreview
