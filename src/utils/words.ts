export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function lastLetter(word: string): string {
  return word.trim().slice(-1)
}

export function firstLetter(word: string): string {
  return word.trim().charAt(0)
}

export function wordPoints(word: string): number {
  return word.trim().length
}