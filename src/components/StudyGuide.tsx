import { useMemo, useState } from 'react';
import type { GuideSection } from '../content/types';
import { CheckGate } from './CheckGate';
import { TapSymbol } from './Glossary';

interface Props {
  sections: GuideSection[];
  completedIds: string[];
  onSectionPass: (id: string, usedShowMe: boolean) => void;
  onFailTwice: (id: string) => void;
  onOpenGlossary: (symbol: string) => void;
}

const QUICK_SYMBOLS = ['⊤', '⊥', '∧', '∨', '¬', '⇒', '⇐', ':', ',', '{}', '⟨⟩', '[]'];

export function StudyGuide({
  sections,
  completedIds,
  onSectionPass,
  onFailTwice,
  onOpenGlossary,
}: Props) {
  const firstIncomplete = sections.findIndex((s) => !completedIds.includes(s.id));
  const unlockedCount =
    firstIncomplete === -1 ? sections.length : Math.max(firstIncomplete + 1, 1);
  const [focus, setFocus] = useState(
    firstIncomplete === -1 ? Math.max(sections.length - 1, 0) : firstIncomplete,
  );
  const [openTrap, setOpenTrap] = useState<Record<string, boolean>>({});

  const visible = useMemo(
    () => sections.slice(0, unlockedCount),
    [sections, unlockedCount],
  );
  const doneCount = sections.filter((s) => completedIds.includes(s.id)).length;

  return (
    <div className="study-guide">
      <div className="chain-progress">
        <div className="progress-bar">
          <div
            className="fill"
            style={{ width: `${(doneCount / Math.max(sections.length, 1)) * 100}%` }}
          />
        </div>
        <span>
          {doneCount}/{sections.length} guide sections
        </span>
      </div>

      <div className="quick-symbols">
        {QUICK_SYMBOLS.map((s) => (
          <TapSymbol key={s} symbol={s} onOpen={onOpenGlossary} />
        ))}
      </div>

      {visible.map((section, index) => {
        const isDone = completedIds.includes(section.id);
        const isFocus = index === focus || (!isDone && index === unlockedCount - 1);

        return (
          <article
            key={section.id}
            className={`guide-section ${isDone ? 'done' : ''} ${isFocus ? 'focus' : ''}`}
          >
            <header>
              <span className="card-index">
                Guide {index + 1}/{sections.length}
              </span>
              <h3>{section.title}</h3>
              {section.slidesRef && <p className="slides-ref">{section.slidesRef}</p>}
            </header>

            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}

            {section.bullets && section.bullets.length > 0 && (
              <ul className="guide-bullets">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}

            {section.formulas && section.formulas.length > 0 && (
              <pre className="notation">
                {section.formulas.join('\n')}
              </pre>
            )}

            {section.example && (
              <p className="example">
                <strong>Example: </strong>
                {section.example}
              </p>
            )}

            {section.trap && (
              <div className="confused">
                <button
                  type="button"
                  className="linkish"
                  onClick={() =>
                    setOpenTrap((m) => ({ ...m, [section.id]: !m[section.id] }))
                  }
                >
                  Exam trap
                </button>
                {openTrap[section.id] && <p>{section.trap}</p>}
              </div>
            )}

            {!isDone ? (
              <CheckGate
                check={section.check}
                onPass={(usedShowMe) => {
                  onSectionPass(section.id, usedShowMe);
                  setFocus(Math.min(index + 1, sections.length - 1));
                }}
                onFailTwice={() => onFailTwice(section.id)}
              />
            ) : (
              <p className="feedback ok">Section check passed.</p>
            )}
          </article>
        );
      })}

      {doneCount < sections.length && (
        <p className="locked-note">
          Next guide sections unlock after you pass the check (or use Show me).
        </p>
      )}
    </div>
  );
}
