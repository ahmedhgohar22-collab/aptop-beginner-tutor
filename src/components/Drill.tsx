import { useState } from 'react';
import type { Drill as DrillType } from '../content/types';

interface Props {
  drill: DrillType;
  completed: boolean;
  onComplete: (correct: boolean) => void;
}

export function Drill({ drill, completed, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [showSolution, setShowSolution] = useState(completed);
  const [feedback, setFeedback] = useState<string | null>(
    completed ? 'Already completed.' : null,
  );
  const [done, setDone] = useState(completed);

  function submit(index: number) {
    if (done || drill.kind !== 'multiple-choice') return;
    setSelected(index);
    const correct = index === drill.correctIndex;
    setFeedback(correct ? drill.explainCorrect ?? 'Correct.' : drill.explainWrong ?? 'Try again.');
    if (correct) {
      setDone(true);
      onComplete(true);
    }
  }

  function revealMore() {
    if (!drill.hints) return;
    if (hintLevel < 2) setHintLevel((h) => h + 1);
    else {
      setShowSolution(true);
      if (!done) {
        setDone(true);
        onComplete(false);
      }
    }
  }

  return (
    <div className="drill">
      <p className="drill-prompt">{drill.prompt}</p>

      {drill.kind === 'multiple-choice' && drill.choices && (
        <div className="choices">
          {drill.choices.map((c, i) => (
            <button
              key={c}
              type="button"
              className={`choice ${selected === i ? 'picked' : ''} ${done && i === drill.correctIndex ? 'correct' : ''}`}
              onClick={() => submit(i)}
              disabled={done}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {drill.kind === 'proof-with-hints' && (
        <div className="hint-ladder">
          {hintLevel >= 1 && drill.hints?.[0] && (
            <p className="hint">Hint 1: {drill.hints[0]}</p>
          )}
          {hintLevel >= 2 && drill.hints?.[1] && (
            <p className="hint">Hint 2: {drill.hints[1]}</p>
          )}
          {showSolution && drill.solution && (
            <pre className="solution">{drill.solution}</pre>
          )}
          {!showSolution && (
            <button type="button" className="primary" onClick={revealMore}>
              {hintLevel === 0
                ? 'Hint 1'
                : hintLevel === 1
                  ? 'Hint 2'
                  : 'Show full solution'}
            </button>
          )}
          {hintLevel > 0 && !done && hintLevel < 2 && (
            <button
              type="button"
              className="linkish"
              onClick={() => {
                setDone(true);
                onComplete(true);
              }}
            >
              I got it — mark done
            </button>
          )}
        </div>
      )}

      {feedback && <p className={`feedback ${done ? 'ok' : 'bad'}`}>{feedback}</p>}
    </div>
  );
}
