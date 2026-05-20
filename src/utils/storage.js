import { RECENT_STORAGE_KEY } from '../constants/data'

export function getRecentQuestions() {
  try {
    return (
      JSON.parse(
        localStorage.getItem(
          RECENT_STORAGE_KEY
        )
      ) || []
    )
  } catch {
    return []
  }
}

export function saveRecentQuestion(question) {
  const existing = getRecentQuestions()

  const updated = [
    question,
    ...existing.filter((q) => q !== question),
  ].slice(0, 6)

  localStorage.setItem(
    RECENT_STORAGE_KEY,
    JSON.stringify(updated)
  )

  return updated
}

export function clearRecentQuestions() {
  localStorage.removeItem(
    RECENT_STORAGE_KEY
  )
}