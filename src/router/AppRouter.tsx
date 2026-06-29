import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { MenuPage } from "../pages/MenuPage";

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
      </Routes>
    </BrowserRouter>
  );
}
