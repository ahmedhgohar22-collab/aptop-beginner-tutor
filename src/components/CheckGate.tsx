import { useMemo, useState } from 'react';
import type { Check } from '../content/types';

interface Props {
  check: Check;
  onPass: (usedShowMe: boolean) => void;
  onFailTwice?: () => void;
}

export function CheckGate({ check, onPass, onFailTwice }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [tableAnswers, setTableAnswers] = useState<
    Record<number, 'theorem' | 'antitheorem' | undefined>
  >({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [passed, setPassed] = useState(false);
  const [fails, setFails] = useState(0);
  const [showMe, setShowMe] = useState(false);

  const choiceList = useMemo(() => {
    if (check.kind === 'value-table') return [];
    return check.choices;
  }, [check]);

  function pass(usedShowMe: boolean) {
    setPassed(true);
    setFeedback(check.explainCorrect);
    onPass(usedShowMe);
  }

  function fail() {
    const next = fails + 1;
    setFails(next);
    setFeedback(check.explainWrong);
    if (next >= 2) onFailTwice?.();
  }

  function submitChoice(index: number) {
    if (passed) return;
    setSelected(index);
    if (check.kind === 'value-table') return;
    if (index === check.correctIndex) pass(false);
    else fail();
  }

  function submitTable() {
    if (passed || check.kind !== 'value-table') return;
    const ok = check.rows.every((row, i) => tableAnswers[i] === row.correct);
    if (ok) pass(false);
    else fail();
  }

  function handleShowMe() {
    setShowMe(true);
    if (check.kind === 'value-table') {
      const filled: Record<number, 'theorem' | 'antitheorem'> = {};
      check.rows.forEach((row, i) => {
        filled[i] = row.correct;
      });
      setTableAnswers(filled);
    } else {
      setSelected(check.correctIndex);
    }
    pass(true);
  }

  return (
    <div className="check-gate">
      <p className="check-prompt">{check.prompt}</p>

      {check.kind === 'value-table' ? (
        <div className="value-table">
          {check.rows.map((row, i) => (
            <div key={row.expression} className="value-row">
              <code>{row.expression}</code>
              <div className="value-toggles">
                <button
                  type="button"
                  className={tableAnswers[i] === 'theorem' ? 'selected' : ''}
                  onClick={() =>
                    setTableAnswers((prev) => ({ ...prev, [i]: 'theorem' }))
                  }
                  disabled={passed}
                >
                  ⊤ theorem
                </button>
                <button
                  type="button"
                  className={tableAnswers[i] === 'antitheorem' ? 'selected' : ''}
                  onClick={() =>
                    setTableAnswers((prev) => ({ ...prev, [i]: 'antitheorem' }))
                  }
                  disabled={passed}
                >
                  ⊥ antitheorem
                </button>
              </div>
            </div>
          ))}
          {!passed && (
            <button type="button" className="primary" onClick={submitTable}>
              Check table
            </button>
          )}
        </div>
      ) : (
        <div className="choices">
          {check.kind === 'pick-rule' && (
            <pre className="expression-block">{check.expression}</pre>
          )}
          {check.kind === 'complete-line' && (
            <pre className="expression-block">{check.before}</pre>
          )}
          {check.kind === 'translate' && (
            <pre className="expression-block">{check.source}</pre>
          )}
          {choiceList.map((choice, i) => (
            <button
              key={choice}
              type="button"
              className={`choice ${selected === i ? (passed && i === check.correctIndex ? 'correct' : selected === i && !passed ? 'picked' : '') : ''} ${passed && i === check.correctIndex ? 'correct' : ''}`}
              onClick={() => submitChoice(i)}
              disabled={passed}
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {feedback && (
        <p className={`feedback ${passed ? 'ok' : 'bad'}`}>{feedback}</p>
      )}

      {!passed && (
        <button type="button" className="linkish" onClick={handleShowMe}>
          Show me
        </button>
      )}
      {passed && showMe && (
        <p className="review-note">Marked for review because you used Show me.</p>
      )}
      {passed && (
        <p className="continue-hint">Unlocked — continue to the next card.</p>
      )}
    </div>
  );
}
