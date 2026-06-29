interface TimerBarProps {
  timeLeft: number;
  total: number;
}

export function TimerBar({ timeLeft, total }: TimerBarProps) {
  const pct = (timeLeft / total) * 100;
  const urgent = timeLeft <= 5;

  return (
    <div className="flex items-center gap-2 px-4 py-4 rounded-xl my-4 bg-card border border-border">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium shrink-0 transition-colors duration-500 text-navy ${urgent ? 'bg-rust' : 'bg-sun'}`}>
        {timeLeft}
      </div>
      <div className="flex-1 flex flex-col gap-2 pr-6">
        <div className="text-[10px] uppercase tracking-widest text-muted">
          tiempo restante
        </div>
        <div className="h-2.5 rounded-full overflow-hidden bg-white/10">
          <div
            className={`h-full rounded-full transition-colors duration-500 ${urgent ? 'bg-rust' : 'bg-sun'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}