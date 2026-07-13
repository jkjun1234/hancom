import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import categories from '../data/categories'
import problemsByCategory from '../data/problemsByCategory'
import CategoryModeToggle from '../components/CategoryModeToggle'
import './ProblemList.css'

const DIFFICULTY_TABS = [
  { key: 'basic', label: '초급' },
  { key: 'intermediate', label: '중급' },
  { key: 'advanced', label: '고급' },
  { key: 'applied', label: '응용' },
  { key: 'capstone', label: '🏆 캡스톤' },
]

const CategoryLearnList = () => {
  const { categoryId } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  const problems = problemsByCategory[categoryId]
  const [difficulty, setDifficulty] = useState('basic')

  if (!category || !problems) {
    return (
      <div className="problem-list">
        <Link to="/" className="back-link">← 카테고리 목록으로</Link>
        <p>아직 준비 중인 카테고리예요.</p>
      </div>
    )
  }

  const shownProblems = problems.filter((problem) => problem.difficulty === difficulty)

  return (
    <div className="problem-list">
      <Link to="/" className="back-link">← 카테고리 목록으로</Link>
      <h2>{category.title} 개념 학습</h2>
      <p className="learn-list__hint">문제를 풀기 전에, 각 개념을 여러 예시로 먼저 익혀보세요.</p>

      <CategoryModeToggle categoryId={categoryId} mode="learn" />

      <div className="difficulty-tabs">
        {DIFFICULTY_TABS.map((tab) => {
          const hasProblems = problems.some((problem) => problem.difficulty === tab.key)
          if (!hasProblems) {
            return (
              <span key={tab.key} className="difficulty-tab difficulty-tab--disabled">
                {tab.label} (곧 추가됩니다)
              </span>
            )
          }
          return (
            <button
              key={tab.key}
              type="button"
              className={`difficulty-tab ${difficulty === tab.key ? 'difficulty-tab--active' : ''}`}
              onClick={() => setDifficulty(tab.key)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <ul className="problem-cards">
        {shownProblems.map((problem) => (
          <li key={problem.id}>
            <Link to={`/${categoryId}/learn/${problem.id}`} className="problem-card">
              📖 {problem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryLearnList
