import { Link } from 'react-router-dom'
import categories from '../data/categories'
import './CategoryHome.css'

const CategoryHome = () => {
  return (
    <div className="category-home">
      <h2>단계별 코딩 학습 플랫폼</h2>
      <p className="category-home__subtitle">
        지금까지 배운 HTML · CSS · JS · React 개념을 문제로 풀며 복습해요. CSS · JS · React 카테고리가 열려 있어요.
      </p>

      <div className="category-home__grid">
        {categories.map((category) => {
          const card = (
            <div
              className={`category-card ${
                category.active ? 'category-card--active' : 'category-card--disabled'
              }`}
            >
              <h3>{category.title}</h3>
              {!category.active && <span className="category-card__status">준비중</span>}
              <ul>
                {category.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          )

          return category.active ? (
            <Link key={category.id} to={`/${category.id}`} className="category-card-link">
              {card}
            </Link>
          ) : (
            <div key={category.id}>{card}</div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryHome
