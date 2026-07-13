import { Button } from '@mui/material'
import './HintPanel.css'

// hints: ["1차 힌트", "2차 힌트", "3차 힌트"]
// level: 지금까지 열어본 힌트 개수 (0 ~ hints.length)
const HintPanel = ({ hints, level, onNextHint }) => {
  return (
    <div className="hint-panel">
      <div className="hint-panel__header">
        <span>💡 힌트</span>
        {level < hints.length && (
          <Button
            size="small"
            variant="outlined"
            onClick={onNextHint}
            sx={{
              fontFamily: 'inherit',
              color: 'var(--accent)',
              borderColor: 'var(--accent-border)',
              '&:hover': {
                borderColor: 'var(--accent)',
                backgroundColor: 'var(--accent-bg)',
              },
            }}
          >
            힌트 {level + 1} 보기
          </Button>
        )}
      </div>

      {level === 0 && <p className="hint-panel__empty">막히면 위 버튼으로 힌트를 열어보세요.</p>}

      <ol className="hint-panel__list">
        {hints.slice(0, level).map((hint, index) => (
          <li key={index}>{hint}</li>
        ))}
      </ol>
    </div>
  )
}

export default HintPanel
