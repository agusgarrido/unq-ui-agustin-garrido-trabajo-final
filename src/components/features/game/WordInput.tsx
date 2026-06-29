interface WordInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  requiredLetter: string | null;
  disabled?: boolean;
  loading?: boolean;
  error: string | null;
  inputRef?: React.RefObject<HTMLInputElement | null>
}

export function WordInput({
  value,
  onChange,
  onSubmit,
  requiredLetter,
  disabled,
  loading,
  error,
  inputRef
}: WordInputProps) {
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <input
          className="flex-1 min-w-0 bg-card2 border border-border2 rounded-lg text-white text-lg font-medium h-12 px-4 outline-none focus:border-cyan transition-colors placeholder:text-muted placeholder:text-sm placeholder:font-normal disabled:opacity-50"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ingresá una palabra…"
          disabled={disabled || loading}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-label="Ingresá una palabra"
          ref={inputRef}
        />
        {requiredLetter && (
          <div className="w-12 h-12 bg-cyan rounded-lg flex items-center justify-center text-2xl font-medium text-black shrink-0">
            {requiredLetter.toUpperCase()}
          </div>
        )}
        <button
          className="btn-base btn-sun h-12 w-28 rounded-xl text-sm font-medium uppercase tracking-wide shrink-0"
          onClick={onSubmit}
          disabled={disabled || loading || !value.trim()}
        >
          {loading ? "…" : "¡Listo!"}
        </button>
      </div>

      {error && (
        <div
          className="flex items-center gap-2 bg-rust-dim border border-rust/40 rounded-lg px-4 py-2.5 text-sm text-[#f6a99a]"
          role="alert"
        >
          <span>⚠</span>
          {error}
        </div>
      )}
    </div>
  );
}
