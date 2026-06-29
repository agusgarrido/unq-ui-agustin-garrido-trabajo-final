import type { LeaderboardEntry } from '../types/game'

const KEY = 'palabras_encadenadas_leaderboard'
const MAX_ENTRIES = 10

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveEntry(entry: LeaderboardEntry): void {
  const board = getLeaderboard()
  board.push(entry)
  board.sort((a, b) => b.score - a.score)
  const trimmed = board.slice(0, MAX_ENTRIES)
  localStorage.setItem(KEY, JSON.stringify(trimmed))
}

export function getRank(score: number): number {
  const board = getLeaderboard()
  const pos = board.findIndex(e => e.score === score)
  return pos === -1 ? board.length : pos + 1
}

export function clearLeaderboard(): void {
  localStorage.removeItem(KEY)
}