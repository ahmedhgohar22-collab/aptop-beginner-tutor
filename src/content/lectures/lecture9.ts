import type { LectureContent } from '../types';

export const lecture9: LectureContent = {
  id: 'nine',
  cards: [
    {
      id: 'nine-c1',
      title: 'Time in specifications',
      plain:
        'You can add a time variable (often t) to specifications so that a program must finish by a deadline or take a measured number of steps.',
      notation: 't′ = t + 1',
      readAloud: 'Time advances by one.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Why put time in a specification?',
        choices: [
          'To ignore termination',
          'To talk about duration and deadlines precisely',
          'To delete refinement',
          'Only for character theory',
        ],
        correctIndex: 1,
        explainCorrect: 'Time becomes part of the before/after claim.',
        explainWrong: 'Specs can constrain time.',
      },
    },
    {
      id: 'nine-c2',
      title: 'Recursive time',
      plain:
        'For recursive programs, time often adds the cost of the recursive calls plus local work. The specification mentions how t grows.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Recursive time analysis connects…',
        choices: [
          'Call structure to added time in the spec',
          'Only bunch commas',
          'ok = ⊤',
          'Midterm lecture Two only',
        ],
        correctIndex: 0,
        explainCorrect: 'Recursion depth/work shows up in t′.',
        explainWrong: 'Time specs track recursive cost.',
      },
    },
    {
      id: 'nine-c3',
      title: 'Termination',
      plain:
        'Termination means the computation reaches a final state. In this theory you prove it with the specification (often via a variant that decreases).',
      confused:
        '“It looks like it loops” is not a proof. You need a formal reason that progress is finite.',
      check: {
        kind: 'spot-trap',
        prompt: 'Which is NOT a termination argument?',
        choices: [
          'A numeric measure decreases each iteration and cannot decrease forever',
          '“It usually stops on my laptop”',
          'A specification that forces t′ to be finite relative to t',
          'Refinement to a loop with a proven variant',
        ],
        correctIndex: 1,
        explainCorrect: 'Anecdotes are not proofs.',
        explainWrong: 'Need a formal variant / time argument.',
      },
    },
    {
      id: 'nine-c4',
      title: 'Search example peek',
      plain:
        'Linear or binary search examples in the book combine a functional spec (find the index) with time (how many steps).',
      check: {
        kind: 'translate',
        prompt: 'A search specification must at least say…',
        source: 'search spec',
        choices: [
          'What “found” means for the final state (and optionally time)',
          'Only that ok = ⊤',
          'Only concurrency',
          'Only character codes',
        ],
        correctIndex: 0,
        explainCorrect: 'Define success in x′/result, optionally bound time.',
        explainWrong: 'State what “found” means finally.',
      },
    },
  ],
  proofs: [
    {
      id: 'nine-p1',
      title: 'Time tick',
      claim: 'A step that only advances time: t:= t+1',
      claimReading: 'One time unit passes; other vars per frame.',
      steps: [
        {
          connector: '=',
          expression: 't′ = t + 1 ∧ (other frame)',
          law: 'Assignment semantics',
          lawChoices: ['Assignment semantics', 'Bunch idempotence', 'De Morgan', 'Broadcast'],
          wrongReasons: {
            'Bunch idempotence': 'Wrong chapter.',
            'De Morgan': 'Binary rewrite, not assignment meaning.',
            Broadcast: 'Interaction chapter.',
          },
        },
      ],
    },
  ],
  drills: [
    {
      id: 'nine-d1',
      prompt: 'A loop variant should…',
      kind: 'multiple-choice',
      choices: [
        'Increase forever',
        'Decrease (or make progress) in a well-founded way',
        'Equal ⊤ always',
        'Be a string of commas',
      ],
      correctIndex: 1,
      explainCorrect: 'Well-founded decrease proves termination.',
      explainWrong: 'Variants show finite progress.',
    },
    {
      id: 'nine-d2',
      prompt: 'Explain in one sentence how time enters a specification. Hints OK.',
      kind: 'proof-with-hints',
      hints: [
        'Add a time variable to the state.',
        'Relate t′ to t in the binary expression.',
      ],
      solution:
        'Include a time variable in the state and write binary constraints relating final time t′ to initial time t (and the other variables), so duration becomes part of the specification.',
    },
  ],
};
