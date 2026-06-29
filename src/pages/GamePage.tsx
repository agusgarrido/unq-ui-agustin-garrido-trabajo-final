import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WordChain } from "../components/features/game/WordChain";
import { WordInput } from "../components/features/game/WordInput";
import type { WordEntry } from "../types/game";
import { firstLetter, lastLetter, normalize, wordPoints } from "../utils/words";
import { validateWord } from "../services/Api";
import { useGameTimer } from "../hooks/useGameTimer";
import { TimerBar } from "../components/ui/TimerBar";

interface GamePageProps {
  playerName: string;
  onGameEnd: (score: number, wordCount: number) => void;
}

export function GamePage({ playerName, onGameEnd }: GamePageProps) {
  const navigate = useNavigate();
  const [words, setWords] = useState<WordEntry[]>([]);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const lastWord = words[words.length - 1] ?? null;
  const requiredLetter = lastWord ? lastLetter(lastWord.word) : null;

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [words]);

  useEffect(() => {
    if (!finished && !loading) {
      inputRef.current?.focus();
    }
  }, [finished, loading]);

  const handleExpire = useCallback(() => {
    setFinished(true);
    onGameEnd(score, words.length);
    navigate("/", {
      state: { score, wordCount: words.length, playerName },
    });
  }, [score, words.length, playerName, onGameEnd, navigate]);

  const { timeLeft, resetTimer, totalSeconds } = useGameTimer({
    onExpire: handleExpire,
    enabled: !finished,
  });

  const handleSubmit = useCallback(async () => {
    const word = input.trim().toLowerCase();
    if (!word) return;
    setError(null);

    if (words.some((w) => normalize(w.word) === normalize(word))) {
      setError("Esa palabra ya fue usada, intentá otra.");
      return;
    }

    if (
      requiredLetter &&
      normalize(firstLetter(word)) !== normalize(requiredLetter)
    ) {
      setError(`Debe empezar con "${requiredLetter.toUpperCase()}"`);
      return;
    }

    setLoading(true);
    try {
      const exists = await validateWord(word);
      if (!exists) {
        setError("Esa palabra no existe en el diccionario.");
        return;
      }
    } catch {
      setError("No se pudo verificar la palabra — Revisá tu conexión.");
      return;
    } finally {
      setLoading(false);
    }

    const pts = wordPoints(word);
    setWords((prev) => [...prev, { word, points: pts, colorIndex }]);
    setScore((prev) => prev + pts);
    setColorIndex((prev) => (prev + 1) % 5);
    setInput("");
    setError(null);
    resetTimer();
  }, [input, words, requiredLetter, colorIndex, resetTimer]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden m-4">
      <header className="px-2 flex justify-end items-center gap-4">
        <span className="text-sm sm:block text-muted">{playerName}</span>
        <div className="rounded-lg px-3 text-base font-medium border border-sun text-sun">
          {score} pts
        </div>
      </header>

      <TimerBar timeLeft={timeLeft} total={totalSeconds} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 bg-card2 border border-border2 rounded-lg"
      >
        {" "}
        {words.length === 0 ? (
          <p className="text-sm text-muted">
            Ingresá la primera palabra para empezar — Puede ser cualquier
            palabra válida.
          </p>
        ) : (
          <WordChain words={words} />
        )}
      </div>

      <div className="shrink-0 px-6 py-4 flex flex-col gap-3 border-t border-border">
        {words.length > 0 && (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-cyan/10 border border-cyan/30">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-medium shrink-0 bg-cyan text-navy">
              {requiredLetter?.toUpperCase()}
            </div>
            <span className="text-base text-gray-300">
              La siguiente palabra empieza con{" "}
              <strong className="text-cyan">
                {requiredLetter?.toUpperCase()}
              </strong>
            </span>
          </div>
        )}
        <WordInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          requiredLetter={null}
          disabled={finished}
          loading={loading}
          error={error}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}
