import './ProgressBar.css'

const ProgressBar = ({ solved, total }) => {
  const percent = total === 0 ? 0 : Math.round((solved / total) * 100)

  return (
    <div className="progress-bar">
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="progress-bar__label">
        {solved} / {total} 문제 완료 ({percent}%)
        {percent === 100 && <span className="progress-bar__badge"> 🏅 카테고리 완료!</span>}
      </div>
    </div>
  )
}

export default ProgressBar
