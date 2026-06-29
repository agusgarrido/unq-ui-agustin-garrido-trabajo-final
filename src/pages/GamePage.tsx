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

  // dentro del componente, con los otros estados:
  const scrollRef = useRef<HTMLDivElement>(null);

  // nuevo useEffect después de los otros:
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [words]);

  // TEST
  useEffect(() => {
    const testWords: WordEntry[] = [
      { word: "casa", points: 4, colorIndex: 0 },
      { word: "árbol", points: 5, colorIndex: 1 },
      { word: "luna", points: 4, colorIndex: 2 },
      { word: "andar", points: 5, colorIndex: 3 },
      { word: "reloj", points: 5, colorIndex: 4 },
      { word: "jardín", points: 6, colorIndex: 0 },
      { word: "noche", points: 5, colorIndex: 1 },
      { word: "estrella", points: 8, colorIndex: 2 },
      { word: "ambiente", points: 8, colorIndex: 3 },
      { word: "elefante", points: 8, colorIndex: 4 },
      { word: "estufa", points: 6, colorIndex: 0 },
      { word: "abismo", points: 6, colorIndex: 1 },
      { word: "otoño", points: 5, colorIndex: 2 },
      { word: "orquesta", points: 8, colorIndex: 3 },
      { word: "aguacate", points: 8, colorIndex: 4 },
      { word: "eclipse", points: 7, colorIndex: 0 },
      { word: "espejo", points: 6, colorIndex: 1 },
      { word: "océano", points: 6, colorIndex: 2 },
      { word: "olivo", points: 5, colorIndex: 3 },
      { word: "oveja", points: 5, colorIndex: 4 },
      { word: "azúcar", points: 6, colorIndex: 0 },
      { word: "rincón", points: 6, colorIndex: 1 },
      { word: "nube", points: 4, colorIndex: 2 },
      { word: "espada", points: 6, colorIndex: 3 },
      { word: "alacran", points: 6, colorIndex: 4 },
      { word: "narrar", points: 6, colorIndex: 0 },
      { word: "rodar", points: 6, colorIndex: 1 },
      { word: "ruido", points: 6, colorIndex: 2 },
      { word: "oir", points: 6, colorIndex: 3 },
    ];
    setWords(testWords);
    setScore(testWords.reduce((acc, w) => acc + w.points, 0));
    setColorIndex(testWords.length % 5);
  }, []);

  const handleExpire = useCallback(() => {
    setFinished(true);
    onGameEnd(score, words.length);
    navigate("/result", {
      state: { score, wordCount: words.length, playerName },
    });
  }, [score, words.length, playerName, onGameEnd, navigate]);

  const { timeLeft, resetTimer, totalSeconds } = useGameTimer({
    onExpire: handleExpire,
    enabled: false, //!finished,
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
      const exists = true; //await validateWord(word);
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
        <span className="text-sm hidden sm:block text-muted">{playerName.toUpperCase()}</span>
        <div className="rounded-lg px-3 py-1 text-base font-medium border border-sun text-sun">
          {score} pts
        </div>
      </header>

      <TimerBar timeLeft={timeLeft} total={totalSeconds} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
        {words.length === 0 ? (
          <p className="text-sm text-muted">
            Ingresá la primera palabra para empezar — Puede ser cualquier
            palabra válida.
          </p>
        ) : (
          <WordChain words={words} />
        )}
      </div>

      <div className="shrink-0 px-6 py-6 flex flex-col gap-3 border-t border-border">
        {words.length > 0 && (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-cyan/10 border border-cyan/30">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-medium shrink-0 bg-cyan text-navy">
              {requiredLetter?.toUpperCase()}
            </div>
            <span className="text-sm text-white/80">
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
        />
      </div>
    </div>
  );
}
