import { useCallback, useEffect, useRef, useState } from 'react'

const TURN_SECONDS = 15

interface UseGameTimerOptions {
  onExpire: () => void
  enabled: boolean
}

export function useGameTimer({ onExpire, enabled }: UseGameTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(TURN_SECONDS)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onExpireRef = useRef(onExpire)

  useEffect(() => { onExpireRef.current = onExpire }, [onExpire])

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resetTimer = useCallback(() => {
    setTimeLeft(TURN_SECONDS)
  }, [])

  useEffect(() => {
    if (!enabled) { clearTimer(); return }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer()
          onExpireRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return clearTimer
  }, [enabled, clearTimer])

  return { timeLeft, resetTimer, totalSeconds: TURN_SECONDS }
}