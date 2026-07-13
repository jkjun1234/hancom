import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

// 단계별 코딩 학습 플랫폼 — 이 앱의 홈이자 본체
import CategoryHome from './mini/pages/CategoryHome'
import ProblemList from './mini/pages/ProblemList'
import ProblemSolve from './mini/pages/ProblemSolve'
import CategoryLearnList from './mini/pages/CategoryLearnList'
import ConceptLearn from './mini/pages/ConceptLearn'

const navLinkClass = ({ isActive }) =>
  isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link'

function App() {
  return (
    <BrowserRouter>
      <nav className="app-nav">
        <NavLink to="/" end className={navLinkClass}>Home</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<CategoryHome />} />
        <Route path="/:categoryId" element={<ProblemList />} />
        <Route path="/:categoryId/learn" element={<CategoryLearnList />} />
        <Route path="/:categoryId/learn/:problemId" element={<ConceptLearn />} />
        <Route path="/:categoryId/:problemId" element={<ProblemSolve />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
