import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { LetterBackground } from "../ui/LetterBackground";

interface MainLayoutProps {
  showNavbar?: boolean;
}

const MainLayout = ({ showNavbar = true }: MainLayoutProps) => {
  return (
    <div className="h-dvh flex flex-col bg-navy relative">
      <LetterBackground/>
      <div className="z-1 flex flex-col flex-1 overflow-hidden">
        {showNavbar && <Navbar />}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-5xl flex flex-col overflow-hidden rounded-2xl border border-border bg-navy2 h-[85dvh]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
