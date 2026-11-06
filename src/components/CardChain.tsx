import { useMemo, useState } from 'react';
import type { Card } from '../content/types';
import { CheckGate } from './CheckGate';
import { TapSymbol } from './Glossary';

interface Props {
  cards: Card[];
  completedCards: string[];
  onCardPass: (cardId: string, usedShowMe: boolean) => void;
  onFailTwice: (cardId: string) => void;
  onOpenGlossary: (symbol: string) => void;
}

const QUICK_SYMBOLS = ['⊤', '⊥', '∧', '∨', '¬', '⇒', '⇐', 'x′', 'ok', '.'];

export function CardChain({
  cards,
  completedCards,
  onCardPass,
  onFailTwice,
  onOpenGlossary,
}: Props) {
  const firstIncomplete = cards.findIndex((c) => !completedCards.includes(c.id));
  const unlockedCount =
    firstIncomplete === -1 ? cards.length : Math.max(firstIncomplete + 1, 1);

  const [focus, setFocus] = useState(
    firstIncomplete === -1 ? Math.max(cards.length - 1, 0) : firstIncomplete,
  );
  const [confused, setConfused] = useState<Record<string, boolean>>({});

  const visible = useMemo(() => cards.slice(0, unlockedCount), [cards, unlockedCount]);
  const doneCount = cards.filter((c) => completedCards.includes(c.id)).length;

  return (
    <div className="card-chain">
      <div className="chain-progress">
        <div className="progress-bar">
          <div
            className="fill"
            style={{ width: `${(doneCount / Math.max(cards.length, 1)) * 100}%` }}
          />
        </div>
        <span>
          {doneCount}/{cards.length} cards
        </span>
      </div>

      <div className="quick-symbols">
        {QUICK_SYMBOLS.map((s) => (
          <TapSymbol key={s} symbol={s} onOpen={onOpenGlossary} />
        ))}
      </div>

      {visible.map((card, index) => {
        const isDone = completedCards.includes(card.id);
        const isFocus = index === focus || (!isDone && index === unlockedCount - 1);

        return (
          <article
            key={card.id}
            className={`micro-card ${isDone ? 'done' : ''} ${isFocus ? 'focus' : ''}`}
          >
            <header>
              <span className="card-index">
                Card {index + 1}/{cards.length}
              </span>
              <h3>{card.title}</h3>
            </header>
            <p>{card.plain}</p>
            {card.example && <p className="example">{card.example}</p>}
            {card.notation && (
              <pre className="notation">
                {card.notation}
                {card.readAloud && (
                  <span className="read-aloud">Read: {card.readAloud}</span>
                )}
              </pre>
            )}
            {card.confused && (
              <div className="confused">
                <button
                  type="button"
                  className="linkish"
                  onClick={() =>
                    setConfused((m) => ({ ...m, [card.id]: !m[card.id] }))
                  }
                >
                  Confused?
                </button>
                {confused[card.id] && <p>{card.confused}</p>}
              </div>
            )}
            {!isDone ? (
              <CheckGate
                check={card.check}
                onPass={(usedShowMe) => {
                  onCardPass(card.id, usedShowMe);
                  setFocus(Math.min(index + 1, cards.length - 1));
                }}
                onFailTwice={() => onFailTwice(card.id)}
              />
            ) : (
              <p className="feedback ok">Check passed.</p>
            )}
          </article>
        );
      })}

      {doneCount < cards.length && (
        <p className="locked-note">
          Next cards unlock after you pass the current check (or use Show me).
        </p>
      )}
    </div>
  );
}
