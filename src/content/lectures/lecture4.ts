import type { LectureContent } from '../types';

export const lecture4: LectureContent = {
  id: 'four',
  cards: [
    {
      id: 'four-c1',
      title: 'ok — the empty program',
      plain:
        'ok means “do nothing”: every variable’s final value equals its initial value. It is a precise specification, not a vague “true.”',
      notation: 'ok  =  (x′ = x ∧ y′ = y ∧ …)',
      readAloud: 'ok leaves the whole state unchanged.',
      confused:
        'Trap: ok is not the same as ⊤. ⊤ allows any final state. ok allows only “no change.”',
      check: {
        kind: 'spot-trap',
        prompt: 'What is the difference between ok and ⊤ as specifications?',
        choices: [
          'They are identical',
          'ok requires unchanged state; ⊤ allows any final state',
          '⊤ means assignment; ok means loop',
          'ok is only for numbers',
        ],
        correctIndex: 1,
        explainCorrect: '⊤ is the weakest possible binary claim; ok is specifically “no change.”',
        explainWrong: 'Never treat ok as interchangeable with ⊤.',
      },
    },
    {
      id: 'four-c2',
      title: 'Assignment',
      plain:
        'x:= e is a program (and a specification) that sets final x to the value of e, computed in the initial state, and typically leaves other variables alone.',
      notation: 'x:= e',
      readAloud: 'Assign e to x.',
      example: 'x:= x + 1 has specification involving x′ = x + 1 (and other vars unchanged, depending on frame).',
      check: {
        kind: 'translate',
        prompt: 'What does x:= 3 intend for x?',
        source: 'x:= 3',
        choices: [
          'Initial x must already be 3',
          'Final x equals 3',
          'x is a theorem',
          'Delete x',
        ],
        correctIndex: 1,
        explainCorrect: 'Assignment sets the final value.',
        explainWrong: 'After x:= 3, we want x′ = 3.',
      },
    },
    {
      id: 'four-c3',
      title: 'Sequential composition',
      plain:
        'P.Q means do P, then Q. The final state after P becomes the initial state for Q. The period is sequential composition.',
      notation: 'P. Q',
      readAloud: 'P then Q.',
      example: 'x:= 1. x:= x + 1 ends with x′ = 2.',
      check: {
        kind: 'multiple-choice',
        prompt: 'In P.Q, the initial state of Q is…',
        choices: [
          'Always the original initial state',
          'The final state produced by P',
          'Always ok',
          'Irrelevant',
        ],
        correctIndex: 1,
        explainCorrect: 'Outputs of P feed into Q.',
        explainWrong: 'Sequential means P finishes, then Q starts from there.',
      },
    },
    {
      id: 'four-c4',
      title: 'Programs are specifications',
      plain:
        'In this theory, a program is a special kind of specification — one we know how to implement/execute. So programs sit inside the same logic.',
      check: {
        kind: 'multiple-choice',
        prompt: 'A program in Hehner’s theory is…',
        choices: [
          'Outside mathematics',
          'A specification (implementable form)',
          'Only assembly code',
          'Always equal to ⊤',
        ],
        correctIndex: 1,
        explainCorrect: 'Programs are specifications with implementable shape.',
        explainWrong: 'Programs are a subclass of specifications.',
      },
    },
    {
      id: 'four-c5',
      title: 'Refinement',
      plain:
        'Specification S is refined by P when every behavior of P is allowed by S. In the book this is the implication P ⇒ S (P is stronger / more specific).',
      notation: 'P ⇒ S',
      readAloud: 'P implies S — P is a refinement of S.',
      confused:
        'English “refine” means “make more precise.” A refining program may be harder to satisfy but still must obey the customer’s spec S.',
      check: {
        kind: 'spot-trap',
        prompt: 'If P refines S, which implication do we need?',
        choices: ['S ⇒ P', 'P ⇒ S', 'P = ok', 'S = ⊥'],
        correctIndex: 1,
        explainCorrect: 'P ⇒ S: behaviors of P are included in those allowed by S.',
        explainWrong: 'Direction: program implies specification.',
      },
    },
    {
      id: 'four-c6',
      title: 'Midterm checkpoint',
      plain:
        'For the midterm (lectures One–Four): logic proofs, bunches/sets, strings/lists, specs with x/x′, ok, assignment, P.Q, and refinement direction.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Which topic is inside the default midterm ceiling (lecture Four)?',
        choices: [
          'Dining philosophers concurrency',
          'Sequential composition and refinement',
          'Probabilistic programming',
          'Channel communication',
        ],
        correctIndex: 1,
        explainCorrect: 'Lecture Four ends at sequential composition & refinement.',
        explainWrong: 'Midterm stops at lecture Four topics.',
      },
    },
  ],
  proofs: [
    {
      id: 'four-p1',
      title: 'ok refines? wait — ok implies weaker specs',
      claim: 'ok ⇒ (x′ = x)',
      claimReading: 'Doing nothing implies x is unchanged (among possibly more conjuncts).',
      steps: [
        {
          connector: '=',
          expression: '(x′ = x ∧ y′ = y ∧ …) ⇒ (x′ = x)',
          law: 'Expand ok',
          lawChoices: ['Expand ok', 'Assignment', 'Excluded middle', 'String join'],
          wrongReasons: {
            Assignment: 'No := here.',
            'Excluded middle': 'Binary law, wrong step.',
            'String join': 'Not about strings.',
          },
        },
        {
          connector: '=',
          expression: '⊤',
          law: 'Conjunction weakens to a conjunct',
          lawChoices: [
            'Conjunction weakens to a conjunct',
            'Contradiction',
            'Bunch idempotence',
            'Double negation',
          ],
          wrongReasons: {
            Contradiction: 'We are not producing ⊥.',
            'Bunch idempotence': 'Wrong theory.',
            'Double negation': 'Wrong theory step.',
          },
        },
      ],
    },
    {
      id: 'four-p2',
      title: 'Assignment then ok',
      claim: 'x:= 1. ok   behaves like   x:= 1',
      claimReading: 'Trailing ok changes nothing.',
      steps: [
        {
          connector: '=',
          expression: 'x:= 1',
          law: 'P.ok = P',
          lawChoices: ['P.ok = P', 'ok = ⊤', 'P.Q = Q.P', 'x:= e = e:= x'],
          wrongReasons: {
            'ok = ⊤': 'Classic trap — ok is not ⊤.',
            'P.Q = Q.P': 'Sequential composition is not commutative.',
            'x:= e = e:= x': 'Nonsense swap.',
            '⇒': 'This step is an equality law for trailing ok.',
          },
        },
      ],
    },
  ],
  drills: [
    {
      id: 'four-d1',
      prompt: 'After x:= 0. x:= x + 2, what is x′?',
      kind: 'multiple-choice',
      choices: ['0', '2', 'x+2', 'Undefined'],
      correctIndex: 1,
      explainCorrect: 'First set to 0, then add 2 → final 2.',
      explainWrong: 'Trace the sequence of assignments.',
    },
    {
      id: 'four-d2',
      prompt: 'Does ⊤ refine ok? (Is ⊤ ⇒ ok a theorem?)',
      kind: 'multiple-choice',
      choices: [
        'Yes — they are equal',
        'No — ⊤ allows changes; ok forbids them',
        'Yes — because ok = ⊤',
        'Only for lists',
      ],
      correctIndex: 1,
      explainCorrect: '⊤ is weaker; it does not imply ok.',
      explainWrong: '⊤ ⇏ ok in general.',
    },
    {
      id: 'four-d3',
      prompt: 'Show why x:= x is like ok for variable x (idea). Use hints.',
      kind: 'proof-with-hints',
      hints: [
        'Assignment x:= x wants x′ = x (and others unchanged with proper frame).',
        'That is exactly the conjuncts that make ok on those variables.',
      ],
      solution:
        'x:= x sets x′ = x (and leaves others unchanged under the usual frame). That is the same constraint ok places on x. So for that variable, x:= x matches ok.',
    },
  ],
};
