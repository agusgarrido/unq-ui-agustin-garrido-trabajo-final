import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Logo } from "../components/ui/Logo";

interface MenuPageProps {
  playerName: string
  onNameChange: (name: string) => void
  onPlay: () => void
}

export function MenuPage({ playerName, onNameChange, onPlay}: MenuPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState(playerName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    onNameChange(e.target.value);
    
  };

  const handlePlay = () => {
    onNameChange(name.trim() || "Anónimo");
    onPlay();
    navigate("/game");
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-32">
      <div className="w-full max-w-xs sm:max-w-lg flex flex-col gap-6 sm:gap-8">
        <div className="text-center">
          <Logo size="lg" />
          <p className="text-xs sm:text-lg text-muted leading-relaxed mt-2">
            ¡Formá la cadena más larga antes de que se acabe el tiempo!
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          <label className="text-[10px] sm:text-[11px] text-muted uppercase tracking-widest">
            tu nombre
          </label>
          <input
            className="w-full bg-card2 border border-border rounded-xl text-white text-sm sm:text-base h-10 sm:h-12 px-4 outline-none focus:border-cyan transition-colors placeholder:text-muted"
            type="text"
            value={name}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handlePlay()}
            placeholder="¿Cómo te llamás?"
            maxLength={20}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          <button
            className="btn-base btn-sun w-full h-10 sm:h-12 rounded-xl text-sm sm:text-base font-medium mb-4"
            onClick={handlePlay}
          >
            Nueva partida
          </button>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              className="h-9 sm:h-11 bg-transparent border border-border2 rounded-xl text-xs sm:text-sm text-white hover:bg-card2 transition-colors"
              onClick={() => navigate("/")}
            >
              Instrucciones
            </button>
            <button
              className="h-9 sm:h-11 bg-transparent border border-border2 rounded-xl text-xs sm:text-sm text-white hover:bg-card2 transition-colors"
              onClick={() => navigate("/leaderboard")}
            >
              Historial
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
