interface Props {
  open: boolean;
  onDone: () => void;
}

const STEPS = [
  {
    title: 'Welcome',
    body: 'This tutor teaches a Practical Theory of Programming in tiny cards. One idea, then a quick check — then the next card unlocks.',
  },
  {
    title: 'Checks gate progress',
    body: 'You must try the check. “Show me” reveals the answer but marks the card for review. Fail twice also adds it to Needs review.',
  },
  {
    title: 'Tap any symbol',
    body: 'Open the glossary anytime for ⊤ ⊥ ∧ ∨ ⇒ x′ ok and friends — plain English readings.',
  },
  {
    title: 'Proofs step by step',
    body: 'Before each proof line appears, pick the connector (=, ⇒, or ⇐) and the law name. Wrong picks explain why.',
  },
];

export function Walkthrough({ open, onDone }: Props) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal walkthrough" role="dialog" aria-label="Walkthrough">
        <h2>How this tutor works</h2>
        <ol>
          {STEPS.map((s) => (
            <li key={s.title}>
              <strong>{s.title}</strong>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <button type="button" className="primary" onClick={onDone}>
          Start learning
        </button>
      </div>
    </div>
  );
}
