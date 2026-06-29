export interface WordEntry {
  word: string
  points: number
  colorIndex: number
}

export type GameStatus = 'idle' | 'playing' | 'finished'

export interface GameState {
  status: GameStatus
  words: WordEntry[]
  score: number
  currentInput: string
  error: string | null
  lastValidLetter: string | null
}

export interface LeaderboardEntry {
  name: string
  score: number
  wordCount: number
  date: string
}