import type { LectureContent } from '../types';

export const lecture6: LectureContent = {
  id: 'six',
  cards: [
    {
      id: 'six-c1',
      title: 'More refinement practice',
      plain:
        'Lecture Six continues refinement rules with another worked example — binary exponentiation — so you see the same method on a different problem.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Binary exponentiation in the book is mainly an example of…',
        choices: [
          'Networking',
          'Refinement-based program development',
          'Bunch packing only',
          'Character theory',
        ],
        correctIndex: 1,
        explainCorrect: 'It is a development example.',
        explainWrong: 'Follow how a powering spec becomes a program.',
      },
    },
    {
      id: 'six-c2',
      title: 'Keep the invariant idea',
      plain:
        'When refining loops or recursive steps, you keep an invariant: a fact that stays true and eventually implies the goal.',
      example: 'For exponentiation, something like “answer so far times remaining power equals original.”',
      check: {
        kind: 'multiple-choice',
        prompt: 'An invariant is…',
        choices: [
          'A fact maintained during development/execution steps',
          'Always ⊥',
          'The same as ok = ⊤',
          'Only for strings',
        ],
        correctIndex: 0,
        explainCorrect: 'Invariants guide correct refinement of loops/recursion.',
        explainWrong: 'Think “what stays true while we make progress.”',
      },
    },
    {
      id: 'six-c3',
      title: 'Still optional for default midterm',
      plain:
        'Same note as lecture Five: taught before the midterm date, but not in the default midterm practice set.',
      check: {
        kind: 'spot-trap',
        prompt: 'Best study move before 22 Nov?',
        choices: [
          'Ignore One–Four and only memorize lecture Six',
          'Master One–Four first; add Five–Six if your instructor includes them',
          'Only study chapter 9',
          'Skip all proofs',
        ],
        correctIndex: 1,
        explainCorrect: 'Secure the midterm ceiling first.',
        explainWrong: 'Prioritize lectures One–Four.',
      },
    },
  ],
  proofs: [
    {
      id: 'six-p1',
      title: 'Refinement is transitive (idea)',
      claim: 'If P ⇒ Q and Q ⇒ R then P ⇒ R',
      claimReading: 'Refine in chain: P refines R if it refines through Q.',
      steps: [
        {
          connector: '=',
          expression: '⊤',
          law: 'Transitivity of ⇒',
          lawChoices: ['Transitivity of ⇒', 'ok identity', 'List indexing', 'Excluded middle'],
          wrongReasons: {
            'ok identity': 'Not about ok.',
            'List indexing': 'Wrong topic.',
            'Excluded middle': 'Not the chain rule for ⇒.',
          },
        },
      ],
    },
  ],
  drills: [
    {
      id: 'six-d1',
      prompt: 'Why does transitivity of ⇒ matter for stepwise refinement?',
      kind: 'multiple-choice',
      choices: [
        'It lets many small refinements compose into one big refinement',
        'It proves ok = ⊤',
        'It deletes specifications',
        'It only works for characters',
      ],
      correctIndex: 0,
      explainCorrect: 'Chain of refinements ⇒ overall refinement.',
      explainWrong: 'Small steps compose.',
    },
  ],
};
