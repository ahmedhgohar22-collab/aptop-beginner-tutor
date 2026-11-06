import type { LectureContent } from '../types';

export const lecture10: LectureContent = {
  id: 'ten',
  cards: [
    {
      id: 'ten-c1',
      title: 'Scope and declaration',
      plain:
        'A variable declaration introduces a name with a local scope. Outside that region, the name is not available (or means something else).',
      notation: 'var x: T · P',
      readAloud: 'Declare x of type T, then do P.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Scope answers…',
        choices: [
          'Where a name is visible',
          'Only bunch size',
          'Whether ⊤ equals ⊥',
          'Network latency',
        ],
        correctIndex: 0,
        explainCorrect: 'Scope = visibility region.',
        explainWrong: 'Declaration creates a scoped name.',
      },
    },
    {
      id: 'ten-c2',
      title: 'Variable suspension',
      plain:
        'Suspension temporarily hides an outer variable so an inner region can reuse a name carefully. Beginner takeaway: nested scopes can shadow.',
      check: {
        kind: 'spot-trap',
        prompt: 'Inner declaration of x while outer x exists…',
        choices: [
          'Always deletes ok',
          'Can hide/shadow the outer x in the inner region',
          'Merges both into a bunch automatically',
          'Is forbidden in all theories',
        ],
        correctIndex: 1,
        explainCorrect: 'Shadowing/suspension affects which x you mean.',
        explainWrong: 'Inner scope can hide the outer name.',
      },
    },
    {
      id: 'ten-c3',
      title: 'Array',
      plain:
        'An array is a programmable list-like structure: indexed collection you can read and assign to at indices.',
      notation: 'A i   or   A(i)   depending on notation',
      check: {
        kind: 'translate',
        prompt: 'Assigning to index i of array A means…',
        source: 'A:= A i → e  (idea)',
        choices: [
          'Change the i-th slot’s final value to e',
          'Delete binary theory',
          'Make A a character',
          'Force termination false',
        ],
        correctIndex: 0,
        explainCorrect: 'Indexed update.',
        explainWrong: 'Arrays are indexed updatable structures.',
      },
    },
    {
      id: 'ten-c4',
      title: 'Record',
      plain:
        'A record groups named fields (like a struct). You select fields by name rather than by numeric index.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Records differ from arrays mainly by…',
        choices: [
          'Using named fields instead of only numeric indices',
          'Being identical to ⊥',
          'Forbidding specifications',
          'Being only midterm lecture One',
        ],
        correctIndex: 0,
        explainCorrect: 'Named components.',
        explainWrong: 'Records = named fields.',
      },
    },
  ],
  proofs: [
    {
      id: 'ten-p1',
      title: 'Local variable idea',
      claim: 'Local x does not leak',
      claimReading: 'After the block, outer state should not depend on a vanished local — unless assigned out.',
      steps: [
        {
          connector: '=',
          expression: 'framed outer specification',
          law: 'Declaration / frame reasoning',
          lawChoices: [
            'Declaration / frame reasoning',
            'Excluded middle',
            'Dining philosophers',
            'Double negation',
          ],
          wrongReasons: {
            'Excluded middle': 'Not this topic.',
            'Dining philosophers': 'Concurrency.',
            'Double negation': 'Binary only.',
          },
        },
      ],
    },
  ],
  drills: [
    {
      id: 'ten-d1',
      prompt: 'Arrays are closest to…',
      kind: 'multiple-choice',
      choices: ['Indexed lists you can update', 'Only axioms ⊤/⊥', 'Implies only', 'Channels'],
      correctIndex: 0,
      explainCorrect: 'Indexed updatable structure.',
      explainWrong: 'Think indexed collection.',
    },
  ],
};
