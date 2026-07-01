import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";
import { ResultPage } from "../pages/ResultPage";
import { LeaderboardPage } from "../pages/LeaderboardPage";
import { saveEntry } from "../utils/leaderboard";
import { InstructionsPage } from "../pages/InstructionPage";

export function AppRouter() {
  const [playerName, setPlayerName] = useState("Anónimo");
  const [hasStarted, setHasStarted] = useState(false);

const handleGameEnd = (score: number, wordCount: number) => {
  saveEntry({
    name: playerName,
    score,
    wordCount,
    date: new Date().toISOString(),
  })
}

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout showNavbar={false} />}>
          <Route
            path="/"
            element={
              <MenuPage
                playerName={playerName}
                onNameChange={setPlayerName}
                onPlay={() => setHasStarted(true)}
              />
            }
          />
        </Route>

        <Route element={<MainLayout showNavbar />}>
          <Route
            path="/game"
            element={
              hasStarted ? (
                <GamePage playerName={playerName} onGameEnd={handleGameEnd} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/result"
            element={hasStarted ? <ResultPage /> : <Navigate to="/" replace />}
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
