const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const COLS = 10
const ROWS = 7

const positions = Array.from({ length: COLS * ROWS }, (_, index) => {
  const col = index % COLS
  const row = Math.floor(index / COLS)

  return {
    id: index,
    letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
    left: `${((col + 0.15 + Math.random() * 0.7) / COLS) * 100}%`,
    top: `${((row + 0.15 + Math.random() * 0.7) / ROWS) * 100}%`,
    rotate: `${-20 + Math.random() * 40}deg`,
    size: `${36 + Math.random() * 28}px`
  }
})

export function LetterBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {positions.map((item) => (
        <span
          key={item.id}
          className="absolute font-bold select-none"
          style={{
            top: item.top,
            left: item.left,
            rotate: item.rotate,
            fontSize: item.size,
            color: `rgba(252, 163, 29, 0.15)`,
          }}
        >
          {item.letter}
        </span>
      ))}
    </div>
  )
}