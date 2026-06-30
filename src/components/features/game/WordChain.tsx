import { LetterTile } from "../../ui/LetterTile";
import type { WordEntry } from "../../../types/game";
import { pluralizeWord } from "../../../utils/words";

interface WordChainProps {
  words: WordEntry[];
}

export function WordChain({ words }: WordChainProps) {
  if (words.length === 0) return null;

  return (
    <div className="mb-5">
      <div className="text-xs text-muted uppercase tracking-widest mb-2">
        tu cadena — {words.length} {pluralizeWord(words.length)}
      </div>
      <div className="flex flex-wrap gap-2 items-end">
        {words.map((entry, wi) => {
          const letters = [...entry.word];
          const isLast = wi === words.length - 1;
          return (
            <div
              key={`${entry.word}-${wi}`}
              className="flex flex-col items-start gap-1"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {letters.map((letter, li) => (
                    <LetterTile
                      key={li}
                      letter={letter}
                      colorIndex={entry.colorIndex}
                      highlight={isLast && li === letters.length - 1}
                    />
                  ))}
                </div>
                {wi < words.length - 1 && (
                  <span className="text-muted text-base">→</span>
                )}
              </div>
              <span className="text-xs text-muted pl-0.5">
                +{entry.points}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
