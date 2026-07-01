import { useNavigate } from "react-router-dom";
import { LetterTile } from "../components/ui/LetterTile";
import { PiStarFill } from "react-icons/pi";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdBlock } from "react-icons/md";

function ChainExample() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
      <p className="text-xs text-muted uppercase tracking-widest text-center">
        ejemplo
      </p>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-wrap gap-1 items-center justify-center">
          <div className="flex gap-0.5">
            {[..."casa"].map((l, i) => (
              <LetterTile key={i} letter={l} colorIndex={0} size="sm" />
            ))}
          </div>
          <span className="text-muted text-sm">→</span>
          <div className="flex gap-0.5">
            {[..."árbol"].map((l, i) => (
              <LetterTile key={i} letter={l} colorIndex={1} size="sm" />
            ))}
          </div>
          <span className="text-muted text-sm">→</span>
          <div className="flex gap-0.5">
            {[..."luna"].map((l, i) => (
              <LetterTile key={i} letter={l} colorIndex={2} size="sm" highlight={i === 3} />
            ))}
          </div>
        </div>
        <p className="text-xs text-muted">
          La siguiente palabra empieza con{" "}
          <strong className="text-cyan">A</strong>
        </p>
      </div>
    </div>
  )
}

export function InstructionsPage() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col sm:justify-center">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">

          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-medium text-white mb-1">
              ¿Cómo se juega?
            </h1>
            <p className="text-sm text-muted">Leé las reglas y a jugar.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-card2 border border-border rounded-xl p-4 flex flex-col gap-2 items-center text-center">
              <img src="/palabrasencadenadas.svg" className="w-7 h-7" alt="cadena" />
              <p className="text-xs sm:text-sm font-medium text-white">Encadená palabras</p>
              <p className="text-xs sm:text-sm text-muted">
                Cada nueva palabra debe empezar con la última letra de la anterior.
              </p>
            </div>
            <div className="bg-card2 border border-border rounded-xl p-4 flex flex-col gap-2 items-center text-center">
              <BsFillStopwatchFill className="text-sun text-2xl" />
              <p className="text-xs sm:text-sm font-medium text-white">15 segundos por turno</p>
              <p className="text-xs sm:text-sm text-muted">
                Cada palabra válida reinicia el contador. Si se acaba el tiempo, la partida termina.
              </p>
            </div>
            <div className="bg-card2 border border-border rounded-xl p-4 flex flex-col gap-2 items-center text-center">
              <PiStarFill className="text-sun text-2xl" />
              <p className="text-xs sm:text-sm font-medium text-white">1 punto por letra</p>
              <p className="text-xs sm:text-sm text-muted">Palabras más largas suman más puntos.</p>
              <p className="text-xs sm:text-sm text-muted">¡A pensar antes de escribir!</p>
            </div>
            <div className="bg-card2 border border-border rounded-xl p-4 flex flex-col gap-2 items-center text-center">
              <MdBlock className="text-sun text-2xl" />
              <p className="text-xs sm:text-sm font-medium text-white">Sin repetir</p>
              <p className="text-xs sm:text-sm text-muted">
                No podés usar la misma palabra dos veces. Las palabras inválidas no reinician el tiempo.
              </p>
            </div>
          </div>

          <ChainExample />

        </div>
      </div>

      <div className="shrink-0 px-6 py-4 border-t border-border">
        <div className="w-full max-w-xl mx-auto">
          <button
            className="btn-base btn-sun w-full h-10 sm:h-12 rounded-xl text-sm sm:text-base font-medium"
            onClick={() => navigate("/")}
          >
            ¡Entendido!
          </button>
        </div>
      </div>
    </main>
  );
}