import { Link, useParams } from 'react-router-dom'
import categories from '../data/categories'
import problemsByCategory from '../data/problemsByCategory'
import CategoryModeToggle from '../components/CategoryModeToggle'
import CssLivePreview from '../components/CssLivePreview'
import HtmlLivePreview from '../components/HtmlLivePreview'
import JsDomLivePreview from '../components/JsDomLivePreview'
import ReactComponentPreview from '../components/ReactComponentPreview'
import DemoHarness from '../components/DemoHarness'
import './ConceptLearn.css'

const ConceptLearn = () => {
  const { categoryId, problemId } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  const problems = problemsByCategory[categoryId]
  const problem = problems?.find((p) => String(p.id) === problemId)

  if (!category || !problem) {
    return (
      <div className="concept-learn">
        <Link to={`/${categoryId}/learn`} className="back-link">← 학습 목록으로</Link>
        <p>개념을 찾을 수 없습니다.</p>
      </div>
    )
  }

  const renderExampleDemo = (example) => {
    if (problem.kind === 'css') {
      return <CssLivePreview previewHtml={example.previewHtml ?? problem.previewHtml} css={example.code} />
    }
    if (problem.kind === 'html') {
      return <HtmlLivePreview html={example.code} />
    }
    if (problem.kind === 'js-dom') {
      return <JsDomLivePreview previewHtml={example.previewHtml ?? problem.previewHtml} code={example.code} />
    }
    if (problem.kind === 'react-component') {
      return (
        <ReactComponentPreview
          code={example.code}
          sampleProps={example.sampleProps ?? {}}
          interactive={Boolean(example.interactive)}
        />
      )
    }
    return <DemoHarness code={example.code} sampleInput={example.sampleInput} />
  }

  return (
    <div className="concept-learn">
      <Link to={`/${categoryId}/learn`} className="back-link">← 학습 목록으로</Link>
      <h2>{problem.title}</h2>

      <CategoryModeToggle categoryId={categoryId} mode="learn" />

      <section className="concept-learn__section">
        <h3>📚 개념</h3>
        <p>{problem.concept}</p>
      </section>

      <section className="concept-learn__section">
        <h3>🔍 다양한 예시로 익히기</h3>
        <div className="learn-examples">
          {(problem.examples ?? []).map((example, index) => (
            <div className="learn-example" key={index}>
              <h4>
                {index + 1}. {example.title}
              </h4>
              <p className="learn-example__desc">{example.description}</p>
              <div className="learn-example__body">
                <pre className="learn-example__code">
                  <code>{example.code}</code>
                </pre>
                <div className="learn-example__demo">{renderExampleDemo(example)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link to={`/${categoryId}/${problemId}`} className="learn-cta">
        이 개념으로 문제 풀어보기 →
      </Link>
    </div>
  )
}

export default ConceptLearn
