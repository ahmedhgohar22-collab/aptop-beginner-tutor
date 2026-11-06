import { Link } from 'react-router-dom';
import type { ProgressState } from '../progress';

interface Props {
  progress: ProgressState;
  onToggleFiveSix: (value: boolean) => void;
  onReplayWalkthrough: () => void;
  onReset: () => void;
}

export function Settings({
  progress,
  onToggleFiveSix,
  onReplayWalkthrough,
  onReset,
}: Props) {
  return (
    <div className="page">
      <Link to="/" className="back">
        ← Timetable
      </Link>
      <h1>Settings</h1>

      <label className="toggle-row">
        <input
          type="checkbox"
          checked={progress.includeFiveSixInMidterm}
          onChange={(e) => onToggleFiveSix(e.target.checked)}
        />
        <span>
          Include lectures Five–Six in midterm practice
          <small>Default is One–Four only (timetable parenthetical).</small>
        </span>
      </label>

      <div className="settings-actions">
        <button type="button" className="primary" onClick={onReplayWalkthrough}>
          Replay walkthrough
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => {
            if (confirm('Reset all local progress?')) onReset();
          }}
        >
          Reset progress
        </button>
      </div>

      {progress.midtermScore !== null && (
        <p>
          Last midterm practice score saved: <strong>{progress.midtermScore}%</strong>
        </p>
      )}
    </div>
  );
}
