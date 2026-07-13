import { Link } from 'react-router-dom'
import './CategoryModeToggle.css'

// 카테고리 안에서 "학습(개념+예시)" 모드와 "문제풀이(지금까지의 목록)" 모드를 오가는 토글.
const CategoryModeToggle = ({ categoryId, mode }) => (
  <div className="mode-toggle">
    <Link to={`/${categoryId}/learn`} className={mode === 'learn' ? 'mode-toggle__link mode-toggle__link--active' : 'mode-toggle__link'}>
      📖 학습
    </Link>
    <Link to={`/${categoryId}`} className={mode === 'solve' ? 'mode-toggle__link mode-toggle__link--active' : 'mode-toggle__link'}>
      📝 문제풀이
    </Link>
  </div>
)

export default CategoryModeToggle
