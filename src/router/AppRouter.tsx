import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";

export function AppRouter() {
  const [playerName, setPlayerName] = useState("Anónimo");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout showNavbar={false} />}>
          <Route
            path="/"
            element={
              <MenuPage playerName={playerName} onNameChange={setPlayerName} />
            }
          />
        </Route>

        <Route element={<MainLayout showNavbar />}>
          <Route
            path="/game"
            element={<GamePage playerName={playerName} onGameEnd={() => {}} />}
          />
          <Route path="/result" element={<div>Result</div>} />
          <Route path="/instructions" element={<div>Instructions</div>} />
          <Route path="/leaderboard" element={<div>Leaderboard</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
