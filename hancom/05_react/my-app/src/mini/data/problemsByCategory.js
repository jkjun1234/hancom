import reactProblems from './reactProblems'
import jsProblems from './jsProblems'
import cssProblems from './cssProblems'
import htmlProblems from './htmlProblems'

// 카테고리 id -> 그 카테고리의 문제 배열. ProblemList/ProblemSolve가 이 레지스트리로
// 카테고리별 문제를 조회한다.
const problemsByCategory = {
  react: reactProblems,
  js: jsProblems,
  css: cssProblems,
  html: htmlProblems,
}

export default problemsByCategory
