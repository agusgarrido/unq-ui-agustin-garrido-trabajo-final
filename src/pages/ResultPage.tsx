import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/ui/Logo";

interface ResultState {
  score: number;
  wordCount: number;
  playerName: string;
}

export function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: ResultState | null };

  if (!state) {
    navigate("/");
    return null;
  }

  const { score, wordCount, playerName } = state;

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <Logo size="lg" />
          <p className="text-muted text-base">¡Fin del juego!</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card2 border border-border rounded-xl p-5 flex flex-col gap-1 items-center justify-center">
            <span className="text-4xl font-medium text-sun">{score}</span>
            <span className="text-xs text-muted uppercase tracking-widest">
              puntos
            </span>
          </div>
          <div className="bg-card2 border border-border rounded-xl p-5 flex flex-col gap-1 items-center justify-center">
            <span className="text-4xl font-medium text-cyan">{wordCount}</span>
            <span className="text-xs text-muted uppercase tracking-widest">
              {wordCount === 1 ? "palabra" : "palabras"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            className="btn-base btn-sun w-full h-12 rounded-xl text-base font-medium"
            onClick={() => navigate("/game", { state: { playerName } })}
          >
            Jugar de nuevo
          </button>
          <button
            className="btn-base w-full h-11 rounded-xl text-sm text-white bg-transparent border border-border2 hover:bg-card2 transition-colors"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </main>
  );
}
