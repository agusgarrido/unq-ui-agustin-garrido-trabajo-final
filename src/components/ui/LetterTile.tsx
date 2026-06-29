import { baseStyles, highlightStyles, sizeStyles } from './LetterTile.styles'
const COLORS = ['sun', 'cyan', 'rust', 'purple', 'green'] as const
type TileColor = typeof COLORS[number]

interface LetterTileProps {
  letter: string
  colorIndex: number
  highlight?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function LetterTile({ letter, colorIndex, highlight = false, size = 'md' }: LetterTileProps) {
  const color: TileColor = COLORS[colorIndex % COLORS.length]
  const colorClass = highlight ? highlightStyles[color] : baseStyles[color]

  return (
    <div
      className={`flex items-center justify-center font-medium uppercase shrink-0 ${sizeStyles[size]} ${colorClass}`}
      aria-label={letter}
    >
      {letter.toUpperCase()}
    </div>
  )
}