import { useEffect, useRef } from 'react'
import './HtmlLivePreview.css'

// html: 실행할 HTML 마크업 (탐색용 미리보기 — 채점은 별도로 독립 실행됨)
const HtmlLivePreview = ({ html }) => {
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
            body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; color: #241f1a; }
            nav a { margin-right: 12px; color: #d64550; text-decoration: none; font-weight: 600; }
            img { max-width: 100%; display: block; }
            label { display: inline-block; margin-right: 8px; font-weight: 600; }
          </style>
        </head>
        <body>${html}</body>
      </html>`)
    doc.close()
  }, [html])

  return <iframe ref={iframeRef} title="html-live-preview" className="html-live-preview" />
}

export default HtmlLivePreview
