import type { Drill } from './types';

/** Mixed practice from lectures One–Four only (default midterm ceiling). */
export const midtermDrills: Drill[] = [
  {
    id: 'mt-1',
    prompt: '[L1] What is ⊤ ∧ ⊥?',
    kind: 'multiple-choice',
    choices: ['⊤', '⊥', 'ok', 'x′'],
    correctIndex: 1,
    explainCorrect: 'And needs both theorems.',
    explainWrong: '⊥ wins for ∧ here.',
  },
  {
    id: 'mt-2',
    prompt: '[L1] ⊥ ⇒ ⊤ is…',
    kind: 'multiple-choice',
    choices: ['⊥', '⊤', 'Undefined', 'ok'],
    correctIndex: 1,
    explainCorrect: 'False antecedent makes implication a theorem.',
    explainWrong: '⊥ ⇒ anything is ⊤.',
  },
  {
    id: 'mt-3',
    prompt: '[L2] Which is a packed set?',
    kind: 'multiple-choice',
    choices: ['1, 2', '{1, 2}', '1,1', '2:1,2'],
    correctIndex: 1,
    explainCorrect: 'Braces pack a bunch into a set.',
    explainWrong: 'Look for { }.',
  },
  {
    id: 'mt-4',
    prompt: '[L2] Bunch 2,2 compared to bunch 2…',
    kind: 'multiple-choice',
    choices: ['Different multiplicity objects', 'Same bunch', 'Only equal as strings', 'Illegal'],
    correctIndex: 1,
    explainCorrect: 'Duplicates do not enlarge bunches.',
    explainWrong: 'Idempotent bunch union.',
  },
  {
    id: 'mt-5',
    prompt: '[L3] “Final x is initial x plus one” is…',
    kind: 'multiple-choice',
    choices: ['x = x + 1', 'x′ = x + 1', 'x′ = x′ + 1', 'ok = x'],
    correctIndex: 1,
    explainCorrect: 'Prime marks final value.',
    explainWrong: 'Use x′ on the left.',
  },
  {
    id: 'mt-6',
    prompt: '[L3] y unchanged means…',
    kind: 'multiple-choice',
    choices: ['y′ = 0', 'y′ = y', '¬y', 'y = ⊤'],
    correctIndex: 1,
    explainCorrect: 'Final equals initial.',
    explainWrong: 'y′ = y.',
  },
  {
    id: 'mt-7',
    prompt: '[L4] ok vs ⊤…',
    kind: 'multiple-choice',
    choices: [
      'Identical specifications',
      'ok means no state change; ⊤ allows any final state',
      '⊤ means assignment',
      'ok is only for lists',
    ],
    correctIndex: 1,
    explainCorrect: 'Classic trap question.',
    explainWrong: 'ok ≠ ⊤.',
  },
  {
    id: 'mt-8',
    prompt: '[L4] P refines S when…',
    kind: 'multiple-choice',
    choices: ['S ⇒ P', 'P ⇒ S', 'P = ⊥', 'S = ok only'],
    correctIndex: 1,
    explainCorrect: 'Program implies specification.',
    explainWrong: 'P ⇒ S.',
  },
  {
    id: 'mt-9',
    prompt: '[L4] In P.Q the start state of Q is…',
    kind: 'multiple-choice',
    choices: ['Always the original input', 'The final state after P', 'Always ⊤', 'Deleted'],
    correctIndex: 1,
    explainCorrect: 'Sequential composition threads state.',
    explainWrong: 'P’s after becomes Q’s before.',
  },
  {
    id: 'mt-10',
    prompt: '[Mixed] Prove idea: a ⇒ a ∨ b. Use hints.',
    kind: 'proof-with-hints',
    hints: [
      'Expand ⇒ to ¬a ∨ (a ∨ b).',
      'Regroup to (¬a ∨ a) ∨ b, then excluded middle to ⊤.',
    ],
    solution:
      'a ⇒ a ∨ b\n= ¬a ∨ (a ∨ b)\n= (¬a ∨ a) ∨ b\n= ⊤ ∨ b\n= ⊤',
  },
];

/** Extra items if Settings includes lectures Five–Six. */
export const midtermExtraFiveSix: Drill[] = [
  {
    id: 'mt-56-1',
    prompt: '[L5] Stepwise refinement means…',
    kind: 'multiple-choice',
    choices: [
      'Replace specs by more program-like specs until done',
      'Delete all specs',
      'Only use ⊥',
      'Ignore laws',
    ],
    correctIndex: 0,
    explainCorrect: 'Successive refinement.',
    explainWrong: 'Develop by refining.',
  },
  {
    id: 'mt-56-2',
    prompt: '[L6] Transitivity of ⇒ matters because…',
    kind: 'multiple-choice',
    choices: [
      'Small refinement steps compose',
      'ok = ⊤',
      'Lists become bunches',
      'Time disappears',
    ],
    correctIndex: 0,
    explainCorrect: 'Chains of refinements compose.',
    explainWrong: 'Compose steps.',
  },
];

export const midtermReviewLink: Record<string, string> = {
  'mt-1': 'one',
  'mt-2': 'one',
  'mt-3': 'two',
  'mt-4': 'two',
  'mt-5': 'three',
  'mt-6': 'three',
  'mt-7': 'four',
  'mt-8': 'four',
  'mt-9': 'four',
  'mt-10': 'one',
  'mt-56-1': 'five',
  'mt-56-2': 'six',
};
