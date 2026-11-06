import type { LectureContent } from '../types';

export const lecture11: LectureContent = {
  id: 'eleven',
  cards: [
    {
      id: 'eleven-c1',
      title: 'While-loop',
      plain:
        'while b do P od repeats P as long as condition b holds. Its meaning is given by a specification/refinement law in the book — not by hand-waving.',
      notation: 'while b do P od',
      check: {
        kind: 'multiple-choice',
        prompt: 'A while-loop repeats while…',
        choices: ['b is a theorem (holds)', 'b is always ⊥', 'ok equals ⊤', 'Only once ever'],
        correctIndex: 0,
        explainCorrect: 'Continue while the condition holds.',
        explainWrong: 'Loop while b.',
      },
    },
    {
      id: 'eleven-c2',
      title: 'Exit-loop & for-loop',
      plain:
        'Exit-loops allow leaving from the middle. For-loops iterate a known pattern (often over a range). Both have precise specification meanings.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Exit from the middle of a loop is associated with…',
        choices: ['Exit-loop constructs', 'Only bunch commas', 'Only ⊥', 'Broadcast channels'],
        correctIndex: 0,
        explainCorrect: 'Exit-loop is the construct for mid-exit.',
        explainWrong: 'Use exit-loop when control leaves mid-body.',
      },
    },
    {
      id: 'eleven-c3',
      title: 'Functions and procedures',
      plain:
        'A function returns a value; a procedure is invoked for its effect on state. Both are subprograms with specifications.',
      check: {
        kind: 'spot-trap',
        prompt: 'Which pairing is right?',
        choices: [
          'Function ↔ value result; procedure ↔ state effect (typical)',
          'Function ↔ only ⊤; procedure ↔ only ⊥',
          'Both forbid x′',
          'Both are identical to ok',
        ],
        correctIndex: 0,
        explainCorrect: 'Classic distinction used in the chapter.',
        explainWrong: 'Functions yield values; procedures act on state.',
      },
    },
    {
      id: 'eleven-c4',
      title: 'Toward the January review',
      plain:
        'By lecture Eleven you should connect: logic → data → specs → refinement → (later) time → programming constructs. Review-2026 on 3/1 is for tying it together.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Best review strategy?',
        choices: [
          'Redo weak micro-cards and midterm misses, then constructs',
          'Only memorize Unicode symbols with no checks',
          'Skip proofs entirely',
          'Study only chapter 9 interaction',
        ],
        correctIndex: 0,
        explainCorrect: 'Practice what you missed; then connect constructs.',
        explainWrong: 'Use Needs review + midterm misses.',
      },
    },
  ],
  proofs: [
    {
      id: 'eleven-p1',
      title: 'While when b is false',
      claim: 'If ¬b initially, while b do P od acts like ok',
      claimReading: 'No iterations → no state change from the loop body.',
      steps: [
        {
          connector: '=',
          expression: 'ok',
          law: 'While zero-iteration law',
          lawChoices: [
            'While zero-iteration law',
            'Assignment',
            'Excluded middle only',
            'Set packing',
          ],
          wrongReasons: {
            Assignment: 'Not a bare assignment.',
            'Excluded middle only': 'Incomplete.',
            'Set packing': 'Wrong domain.',
          },
        },
      ],
    },
  ],
  drills: [
    {
      id: 'eleven-d1',
      prompt: 'while false do P od behaves like…',
      kind: 'multiple-choice',
      choices: ['ok (no body runs)', 'infinite loop always', '⊤ only', 'x:= ⊥'],
      correctIndex: 0,
      explainCorrect: 'Condition false ⇒ zero iterations.',
      explainWrong: 'No entry into P.',
    },
    {
      id: 'eleven-d2',
      prompt: 'In one sentence: what must a while-loop refinement prove besides partial correctness? Hints OK.',
      kind: 'proof-with-hints',
      hints: [
        'Think about whether it finishes.',
        'Termination / variant, especially when time matters.',
      ],
      solution:
        'Besides establishing the postcondition when it stops, you must ensure termination (e.g. a variant decreases), especially if the specification includes time or requires a final state.',
    },
  ],
};
