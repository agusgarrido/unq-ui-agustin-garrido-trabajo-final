import { useNavigate } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "text-sm sm:text-base",
  md: "text-lg sm:text-2xl",
  lg: "text-2xl sm:text-3xl md:text-4xl",
};

export function Logo({ size = "md" }: LogoProps) {
  const navigate = useNavigate();

  return (
    <span
      className={`font-medium text-white select-none cursor-pointer tracking-wide ${sizeStyles[size]}`}
      onClick={() => navigate("/")}
    >
      palabras<span className="text-sun">encadenadas</span>
    </span>
  );
}
