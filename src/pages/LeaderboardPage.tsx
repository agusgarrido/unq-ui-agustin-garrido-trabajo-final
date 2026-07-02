import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLeaderboard } from '../utils/leaderboard'
import type { LeaderboardEntry } from '../types/game'
import { pluralizeWord } from '../utils/words'

export function LeaderboardPage() {
    const navigate = useNavigate()
    const [entries, setEntries] = useState<LeaderboardEntry[]>([])

    useEffect(() => {
        setEntries(getLeaderboard())
    }, [])

    return (
        <main className="flex-1 flex flex-col overflow-hidden">

            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="w-full max-w-xl mx-auto flex flex-col gap-4">

                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl font-medium text-white mb-1">Historial</h1>
                        <p className="text-sm text-muted">Las mejores 10 partidas</p>
                    </div>

                    {entries.length === 0 ? (
                        <div className="bg-card2 border border-border rounded-xl p-8 text-center">
                            <p className="text-sm text-muted">Todavía no hay partidas guardadas.</p>
                        </div>
                    ) : (
                        <div className="bg-card2 border border-border rounded-xl overflow-hidden">
                            {entries.map((entry, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 px-4 py-2 border-b border-border last:border-b-0"
                                >
                                    <span className="text-lg font-medium text-sun w-6 shrink-0">#{i + 1}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{entry.name}</p>
                                        <p className="text-xs text-muted">
                                            {entry.wordCount} {pluralizeWord(entry.wordCount)}
                                        </p>
                                    </div>
                                    <span className="text-lg font-medium text-sun shrink-0">
                                        {entry.score} <span className="text-sm text-sun/70">pts</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="shrink-0 px-6 py-4 border-t border-border">
                <div className="w-full max-w-xl mx-auto">
                    <button
                        className="btn-base bg-sun text-navy w-full h-10 sm:h-12 rounded-xl text-sm sm:text-base font-medium"
                        onClick={() => navigate('/')}
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>

        </main>
    )
}