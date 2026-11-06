import { useState } from 'react';
import type { Connector, Proof } from '../content/types';

interface Props {
  proof: Proof;
  completed: boolean;
  onComplete: () => void;
}

export function ProofStepper({ proof, completed, onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(completed ? proof.steps.length : 0);
  const [connectorPick, setConnectorPick] = useState<Connector | null>(null);
  const [lawPick, setLawPick] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(
    completed ? proof.steps.map((_, i) => i) : ([] as number[]),
  );

  const current = proof.steps[stepIndex];
  const done = stepIndex >= proof.steps.length;

  function tryAdvance() {
    if (!current || done) return;
    const connectors = current.connectorChoices ?? ['=', '⇒', '⇐'];
    if (!connectorPick || !lawPick) {
      setError('Pick both the connector and the law.');
      return;
    }
    if (!connectors.includes(connectorPick)) {
      setError('That connector is not offered for this step.');
      return;
    }
    if (connectorPick !== current.connector) {
      setError(
        current.wrongReasons?.[connectorPick] ??
          `Need connector ${current.connector} here, not ${connectorPick}.`,
      );
      return;
    }
    if (lawPick !== current.law) {
      setError(
        current.wrongReasons?.[lawPick] ??
          `Not “${lawPick}”. Look for the law that justifies this rewrite.`,
      );
      return;
    }
    setError(null);
    setRevealed((r) => [...r, stepIndex]);
    setConnectorPick(null);
    setLawPick(null);
    const next = stepIndex + 1;
    setStepIndex(next);
    if (next >= proof.steps.length) onComplete();
  }

  return (
    <div className="proof-stepper">
      <h3>{proof.title}</h3>
      <p className="claim">
        <strong>Claim:</strong> <code>{proof.claim}</code>
      </p>
      <p className="read-aloud">{proof.claimReading}</p>

      <div className="proof-lines">
        <div className="proof-line start">
          <code>{proof.claim}</code>
        </div>
        {proof.steps.map((step, i) =>
          revealed.includes(i) ? (
            <div key={i} className="proof-line">
              <span className="connector">{step.connector}</span>
              <code>{step.expression}</code>
              <span className="law-hint">{step.law}</span>
            </div>
          ) : null,
        )}
      </div>

      {!done && current && (
        <div className="step-controls">
          <p>Choose the next connector and law:</p>
          <div className="connector-row">
            {(current.connectorChoices ?? (['=', '⇒', '⇐'] as Connector[])).map(
              (c) => (
                <button
                  key={c}
                  type="button"
                  className={connectorPick === c ? 'selected' : ''}
                  onClick={() => setConnectorPick(c)}
                >
                  {c}
                </button>
              ),
            )}
          </div>
          <div className="law-row">
            {current.lawChoices.map((law) => (
              <button
                key={law}
                type="button"
                className={lawPick === law ? 'selected' : ''}
                onClick={() => setLawPick(law)}
              >
                {law}
              </button>
            ))}
          </div>
          <button type="button" className="primary" onClick={tryAdvance}>
            Check step
          </button>
          {error && <p className="feedback bad">{error}</p>}
        </div>
      )}

      {done && <p className="feedback ok">Proof complete — reached the justified end.</p>}
    </div>
  );
}
