import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@mui/material'
import categories from '../data/categories'
import problemsByCategory from '../data/problemsByCategory'
import CodeEditor from '../components/CodeEditor'
import DemoHarness from '../components/DemoHarness'
import CssLivePreview from '../components/CssLivePreview'
import HtmlLivePreview from '../components/HtmlLivePreview'
import JsDomLivePreview from '../components/JsDomLivePreview'
import ReactComponentPreview from '../components/ReactComponentPreview'
import HintPanel from '../components/HintPanel'
import { gradeProblem } from '../utils/grader'
import { gradeCssProblem, NOT_NONE } from '../utils/cssGrader'
import { gradeHtmlProblem } from '../utils/htmlGrader'
import { gradeJsDomProblem } from '../utils/jsDomGrader'
import { gradeStaticComponent, gradeInteractiveComponent } from '../utils/reactComponentGrader'
import { markSolved, isSolved } from '../utils/storage'
import './ProblemSolve.css'

const ProblemSolve = () => {
  const { categoryId, problemId } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  const problems = problemsByCategory[categoryId]
  const problem = problems?.find((p) => String(p.id) === problemId)

  const [code, setCode] = useState(problem ? problem.starterCode : '')
  // "내 결과" 데모는 타이핑할 때마다 바로 반영하지 않고, 실행/채점 버튼을 눌렀을 때만
  // 반영한다. (타이핑 도중 미완성 코드가 즉시 실행되면서 생기는 오류/무한루프 위험을 피하기 위함)
  const [runCode, setRunCode] = useState(problem ? problem.starterCode : '')
  const [hintLevel, setHintLevel] = useState(0)
  const [gradeResult, setGradeResult] = useState(null)
  const [solved, setSolved] = useState(problem ? isSolved(categoryId, problem.id) : false)

  if (!category || !problem) {
    return (
      <div className="problem-solve">
        <p>문제를 찾을 수 없습니다.</p>
        <Link to={`/${categoryId}`} className="back-link">← 목록으로</Link>
      </div>
    )
  }

  const isCss = problem.kind === 'css'
  const isHtml = problem.kind === 'html'
  const isJsDom = problem.kind === 'js-dom'
  const isReactComponent = problem.kind === 'react-component'
  const sampleInput = problem.kind === 'expression' ? problem.testCases[0].input : null

  const editorLanguage = isCss ? 'css' : isHtml ? 'html' : 'javascript'

  const renderDemo = (codeToRun) => {
    if (isCss) {
      return <CssLivePreview previewHtml={problem.previewHtml} css={codeToRun} />
    }
    if (isHtml) {
      return <HtmlLivePreview html={codeToRun} />
    }
    if (isJsDom) {
      return <JsDomLivePreview previewHtml={problem.previewHtml} code={codeToRun} />
    }
    if (isReactComponent) {
      return (
        <ReactComponentPreview
          code={codeToRun}
          sampleProps={problem.demoProps}
          interactive={Boolean(problem.interactive)}
        />
      )
    }
    return <DemoHarness code={codeToRun} sampleInput={sampleInput} />
  }

  const handleRun = () => {
    setRunCode(code)
  }

  const handleGrade = () => {
    setRunCode(code)

    let result
    if (isCss) result = gradeCssProblem(problem, code)
    else if (isHtml) result = gradeHtmlProblem(problem, code)
    else if (isJsDom) result = gradeJsDomProblem(problem, code)
    else if (isReactComponent) {
      result = problem.interactive
        ? gradeInteractiveComponent(problem, code)
        : gradeStaticComponent(problem, code)
    } else result = gradeProblem(problem, code)

    setGradeResult(result)
    if (result.allPassed) {
      markSolved(categoryId, problem.id)
      setSolved(true)
    }
  }

  return (
    <div className="problem-solve">
      <Link to={`/${categoryId}`} className="back-link">← 문제 목록으로</Link>
      <h2>{problem.title}</h2>

      <section className="problem-solve__section">
        <h3>📚 개념</h3>
        <p>{problem.concept}</p>
      </section>

      <section className="problem-solve__section">
        <h3>📝 문제</h3>
        <p>{problem.prompt}</p>
      </section>

      <div className="problem-solve__workspace">
        <div className="problem-solve__pane">
          <div className="problem-solve__pane-header">
            <h3>코드 작성</h3>
            <Button
              size="small"
              variant="outlined"
              onClick={handleRun}
              sx={{
                fontFamily: 'inherit',
                color: 'var(--accent)',
                borderColor: 'var(--accent-border)',
                '&:hover': { borderColor: 'var(--accent)', backgroundColor: 'var(--accent-bg)' },
              }}
            >
              ▶ 실행
            </Button>
          </div>
          <CodeEditor value={code} onChange={setCode} language={editorLanguage} height="220px" />
        </div>
        <div className="problem-solve__pane">
          <h3>데모</h3>
          <div className="demo-stack">
            <div className="demo-stack__item">
              <span className="demo-stack__label">🎯 목표 모습 (정답이면 이렇게 돼요)</span>
              {renderDemo(problem.solution)}
            </div>
            <div className="demo-stack__item">
              <span className="demo-stack__label">✏️ 내 결과 (실행 버튼을 누르면 반영돼요)</span>
              {renderDemo(runCode)}
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="contained"
        onClick={handleGrade}
        sx={{
          fontFamily: 'inherit',
          fontWeight: 700,
          backgroundColor: 'var(--accent)',
          '&:hover': { backgroundColor: 'var(--accent)', opacity: 0.9 },
        }}
      >
        채점하기
      </Button>

      {gradeResult && (
        <div
          className={`grade-result ${
            gradeResult.allPassed ? 'grade-result--pass' : 'grade-result--fail'
          }`}
        >
          <p>{gradeResult.allPassed ? '🎉 모든 테스트를 통과했어요!' : '❌ 아직 통과하지 못한 테스트가 있어요.'}</p>
          <ul>
            {gradeResult.results.map((r, index) => (
              <li key={index}>
                {r.passed ? '✅' : '❌'}{' '}
                {isCss && (
                  <>
                    {r.selector} 의 {r.property} →{' '}
                    {r.expected === NOT_NONE ? '값이 설정되어 있어야 함' : `기대값 "${r.expected}"`}
                    {!r.passed && ` (내 결과: ${r.actual ?? '없음'})`}
                  </>
                )}
                {(isHtml || isReactComponent || isJsDom) && <>{r.description}</>}
                {problem.kind === 'expression' && (
                  <>
                    입력 {JSON.stringify(r.input)} → 기대값 {JSON.stringify(r.expected)}
                    {!r.passed &&
                      ` (내 결과: ${r.error ? '오류 - ' + r.error : JSON.stringify(r.actual)})`}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <HintPanel
        hints={problem.hints}
        level={hintLevel}
        onNextHint={() => setHintLevel((level) => Math.min(level + 1, problem.hints.length))}
      />

      {solved && (
        <section className="problem-solve__section problem-solve__explanation">
          <h3>💡 해설</h3>
          <p>{problem.explanation}</p>
          <pre>
            <code>{problem.solution}</code>
          </pre>
        </section>
      )}
    </div>
  )
}

export default ProblemSolve
