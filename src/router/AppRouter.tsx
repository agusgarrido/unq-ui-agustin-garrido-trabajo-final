import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";

export function AppRouter() {
  const [playerName, setPlayerName] = useState("Anónimo");
  const [hasStarted, setHasStarted] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout showNavbar={false} />}>
          <Route
            path="/"
            element={
              <MenuPage playerName={playerName} onNameChange={setPlayerName} onPlay={() => setHasStarted(true)}/>
            }
          />
        </Route>

        <Route element={<MainLayout showNavbar />}>
          <Route
            path="/game"
            element={
              hasStarted ? (
                <GamePage playerName={playerName} onGameEnd={() => {}} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/result" element={<div>Result</div>} />
          <Route path="/instructions" element={<div>Instructions</div>} />
          <Route path="/leaderboard" element={<div>Leaderboard</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
