// 카테고리별 풀이 완료 여부를 localStorage에 저장/조회하는 유틸리티.
const STORAGE_KEY = 'mini-progress'

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function markSolved(categoryId, problemId) {
  const progress = readAll()
  const solved = progress[categoryId] || []
  if (!solved.includes(problemId)) {
    progress[categoryId] = [...solved, problemId]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }
}

export function isSolved(categoryId, problemId) {
  const progress = readAll()
  return (progress[categoryId] || []).includes(problemId)
}

export function getSolvedCount(categoryId) {
  const progress = readAll()
  return (progress[categoryId] || []).length
}
