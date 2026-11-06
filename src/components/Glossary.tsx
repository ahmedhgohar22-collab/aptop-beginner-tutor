import { useEffect, useMemo, useState } from 'react';
import { glossary } from '../content/glossary';

interface Props {
  open: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function Glossary({ open, onClose, initialQuery = '' }: Props) {
  const [q, setQ] = useState(initialQuery);

  useEffect(() => {
    if (open) setQ(initialQuery);
  }, [open, initialQuery]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return glossary;
    return glossary.filter(
      (g) =>
        g.symbol.toLowerCase().includes(needle) ||
        g.name.toLowerCase().includes(needle) ||
        g.reading.toLowerCase().includes(needle),
    );
  }, [q]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-label="Symbol glossary"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2>Symbol glossary</h2>
          <button type="button" className="icon-btn" onClick={onClose}>
            Close
          </button>
        </header>
        <input
          className="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search ⊤, ok, prime…"
          autoFocus
        />
        <ul className="glossary-list">
          {filtered.map((g) => (
            <li key={g.symbol}>
              <span className="sym">{g.symbol}</span>
              <div>
                <strong>{g.name}</strong>
                <p>{g.reading}</p>
                {g.tip && <p className="tip">{g.tip}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TapSymbol({
  symbol,
  onOpen,
}: {
  symbol: string;
  onOpen: (symbol: string) => void;
}) {
  return (
    <button type="button" className="tap-symbol" onClick={() => onOpen(symbol)}>
      {symbol}
    </button>
  );
}
