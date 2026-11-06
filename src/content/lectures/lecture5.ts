import type { LectureContent } from '../types';

export const lecture5: LectureContent = {
  id: 'five',
  cards: [
    {
      id: 'five-c1',
      title: 'Specification laws',
      plain:
        'Specifications obey algebraic laws — you can rewrite them like logic expressions. That is how you simplify a customer requirement before coding.',
      example: 'S ∨ S = S.  S ∧ ⊤ = S.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Why learn specification laws?',
        choices: [
          'To avoid using x′ forever',
          'To rewrite and simplify specs safely',
          'They replace refinement',
          'Only for concurrency',
        ],
        correctIndex: 1,
        explainCorrect: 'Laws are licensed rewrites.',
        explainWrong: 'Use laws to transform specs without changing meaning.',
      },
    },
    {
      id: 'five-c2',
      title: 'Refinement laws',
      plain:
        'Refinement has its own laws: if you refine a part correctly, you refine the whole in structured ways (sequential composition, if, etc.).',
      notation: 'If P ⇒ S and Q ⇒ R then P.Q ⇒ S.R (under the theory’s conditions)',
      check: {
        kind: 'multiple-choice',
        prompt: 'Refinement laws help you…',
        choices: [
          'Build a program stepwise from a spec',
          'Delete all primes',
          'Avoid binary theory',
          'Prove ⊥ = ⊤',
        ],
        correctIndex: 0,
        explainCorrect: 'Stepwise refinement is the development method.',
        explainWrong: 'You refine piece by piece toward a program.',
      },
    },
    {
      id: 'five-c3',
      title: 'List summation example',
      plain:
        'A classic development: specify the sum of a list, then refine to a loop or recursion that accumulates the total.',
      example: 'Spec idea: s′ = sum of list L (and other frame conditions).',
      check: {
        kind: 'translate',
        prompt: 'What is the goal of the list-summation example?',
        source: 'list summation refinement',
        choices: [
          'Sort the list',
          'Compute the sum by refining a clear specification',
          'Prove lists are bunches',
          'Replace ok with ⊤',
        ],
        correctIndex: 1,
        explainCorrect: 'It is a worked refinement from spec to program idea.',
        explainWrong: 'The example develops a summing program from a spec.',
      },
    },
    {
      id: 'five-c4',
      title: 'Not in default midterm',
      plain:
        'This lecture is taught before 22 Nov on your timetable, but the midterm set defaults to lectures One–Four. Toggle Settings if your instructor includes Five–Six.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Default midterm set includes lecture Five?',
        choices: ['Yes always', 'No by default (optional toggle)', 'Only notation tools', 'Only chapter 9'],
        correctIndex: 1,
        explainCorrect: 'Default ceiling is lecture Four.',
        explainWrong: 'Five is optional via Settings.',
      },
    },
  ],
  proofs: [
    {
      id: 'five-p1',
      title: 'Idempotent spec',
      claim: 'S ∧ S = S',
      claimReading: 'Repeating a specification conjunct does nothing.',
      steps: [
        {
          connector: '=',
          expression: 'S',
          law: 'Idempotence of ∧',
          lawChoices: ['Idempotence of ∧', 'ok = ⊤', 'Assignment', 'String reverse'],
          wrongReasons: {
            'ok = ⊤': 'Trap.',
            Assignment: 'Not assignment.',
            'String reverse': 'Wrong domain.',
          },
        },
      ],
    },
  ],
  drills: [
    {
      id: 'five-d1',
      prompt: 'Stepwise refinement means…',
      kind: 'multiple-choice',
      choices: [
        'Jump straight to machine code',
        'Replace specs by more program-like specs until done',
        'Delete the specification',
        'Only draw bunches',
      ],
      correctIndex: 1,
      explainCorrect: 'Refine gradually.',
      explainWrong: 'Development is successive refinement.',
    },
    {
      id: 'five-d2',
      prompt: 'Outline why S ∧ S = S matters when cleaning a spec. Hints available.',
      kind: 'proof-with-hints',
      hints: [
        'Duplicate requirements do not change who satisfies the spec.',
        'Idempotence lets you delete repeated conjuncts.',
      ],
      solution:
        'If a behavior satisfies S, it satisfies S∧S and conversely. So repeated conjuncts can be dropped by idempotence without changing the meaning of the specification.',
    },
  ],
};
