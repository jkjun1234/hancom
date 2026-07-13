// 4개 카테고리 메타데이터. 지금은 React만 실제로 문제를 풀 수 있고
// 나머지는 홈 화면에 "다루게 될 주제 미리보기"만 보여준다.
const categories = [
  {
    id: 'html',
    title: 'HTML',
    active: true,
    topics: ['시맨틱 마크업', '표(table)', 'form', 'img'],
  },
  {
    id: 'css',
    title: 'CSS',
    active: true,
    topics: ['Flexbox', 'Grid', '반응형(미디어쿼리)', '애니메이션'],
  },
  {
    id: 'js',
    title: 'JavaScript',
    active: true,
    topics: ['배열/객체 메서드', '비동기 처리', '이벤트', 'DOM 조작'],
  },
  {
    id: 'react',
    title: 'React',
    active: true,
    topics: ['조건부 렌더링', '배열 map 렌더링', '객체 매핑', 'useState', 'props 기본값'],
  },
]

export default categories
