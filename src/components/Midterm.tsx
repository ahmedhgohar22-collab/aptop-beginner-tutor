import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { midtermDrills, midtermExtraFiveSix, midtermReviewLink } from '../content/midterm';
import type { ProgressState } from '../progress';
import { Drill } from './Drill';

interface Props {
  progress: ProgressState;
  onFinished: (score: number, misses: string[]) => void;
}

export function Midterm({ progress, onFinished }: Props) {
  const items = useMemo(
    () =>
      progress.includeFiveSixInMidterm
        ? [...midtermDrills, ...midtermExtraFiveSix]
        : midtermDrills,
    [progress.includeFiveSixInMidterm],
  );

  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [misses, setMisses] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const current = items[index];
  const total = items.length;

  function handleComplete(correct: boolean) {
    const nextCorrect = correctCount + (correct ? 1 : 0);
    const nextMisses = correct ? misses : [...misses, current.id];
    setCorrectCount(nextCorrect);
    setMisses(nextMisses);

    if (index + 1 >= total) {
      const score = Math.round((nextCorrect / total) * 100);
      setFinalScore(score);
      setFinished(true);
      onFinished(score, nextMisses);
    } else {
      setIndex((i) => i + 1);
    }
  }

  if (finished) {
    return (
      <div className="page">
        <Link to="/" className="back">
          ← Timetable
        </Link>
        <h1>Midterm practice result</h1>
        <p className="score">
          Score: <strong>{finalScore}%</strong> ({correctCount}/{total})
        </p>
        <p>
          Scope: lectures One–Four
          {progress.includeFiveSixInMidterm ? ' + Five–Six (Settings)' : ''}.
        </p>
        {misses.length === 0 ? (
          <p className="feedback ok">No misses — nice.</p>
        ) : (
          <div>
            <h2>Review these</h2>
            <ul className="miss-list">
              {misses.map((id) => (
                <li key={id}>
                  <Link to={`/lecture/${midtermReviewLink[id] ?? 'one'}`}>
                    {id} → lecture {midtermReviewLink[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="button"
          className="primary"
          onClick={() => {
            setIndex(0);
            setCorrectCount(0);
            setMisses([]);
            setFinalScore(null);
            setFinished(false);
          }}
        >
          Retry set
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/" className="back">
        ← Timetable
      </Link>
      <header className="lecture-header">
        <p className="eyebrow">
          Mixed set · default ceiling lecture Four
          {progress.includeFiveSixInMidterm ? ' · Five–Six included' : ''}
        </p>
        <h1>Midterm practice</h1>
        <p>
          Question {index + 1} of {total}
        </p>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${(index / total) * 100}%` }} />
        </div>
      </header>
      <Drill key={current.id} drill={current} completed={false} onComplete={handleComplete} />
    </div>
  );
}
