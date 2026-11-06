import { useState } from 'react';
import type { AnimatedExplainer } from '../content/videos';

interface Props {
  explainers: AnimatedExplainer[];
}

export function AnimatedExplainers({ explainers }: Props) {
  if (explainers.length === 0) return null;

  return (
    <div className="animated-explainers">
      <p className="video-intro">
        Short step-through explainers for the trickiest ideas — use these before or after the long
        lecture videos.
      </p>
      {explainers.map((exp) => (
        <ExplainerPlayer key={exp.id} explainer={exp} />
      ))}
    </div>
  );
}

function ExplainerPlayer({ explainer }: { explainer: AnimatedExplainer }) {
  const [step, setStep] = useState(0);
  const current = explainer.steps[step];
  const last = step >= explainer.steps.length - 1;

  return (
    <article className="explainer-card">
      <header>
        <h3>{explainer.title}</h3>
        <p className="note">{explainer.summary}</p>
      </header>
      <div className="explainer-stage">
        <span className="card-index">
          Step {step + 1}/{explainer.steps.length}
        </span>
        <h4>{current.title}</h4>
        <p>{current.body}</p>
        <pre className="notation explainer-visual">{current.visual}</pre>
        <div className="explainer-controls">
          <button
            type="button"
            className="ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </button>
          <button
            type="button"
            className="primary"
            onClick={() =>
              setStep((s) => (last ? 0 : Math.min(explainer.steps.length - 1, s + 1)))
            }
          >
            {last ? 'Replay' : 'Next'}
          </button>
        </div>
        <div className="progress-bar">
          <div
            className="fill"
            style={{ width: `${((step + 1) / explainer.steps.length) * 100}%` }}
          />
        </div>
      </div>
    </article>
  );
}
