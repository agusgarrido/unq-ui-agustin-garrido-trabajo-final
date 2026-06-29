interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: 'text-sm sm:text-base',
  md: 'text-lg sm:text-2xl',
  lg: 'text-2xl sm:text-3xl md:text-4xl',
}

export function Logo({ size = 'md' }: LogoProps) {
  return (
    <span className={`font-medium text-white select-none ${sizeStyles[size]}`}>
      palabras<span className="text-sun">encadenadas</span>
    </span>
  )
}