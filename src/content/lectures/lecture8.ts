import type { LectureContent } from '../types';

export const lecture8: LectureContent = {
  id: 'eight',
  cards: [
    {
      id: 'eight-c1',
      title: 'Old program theory',
      plain:
        'Section 4.4 connects Hehner’s specifications to older notations you may have seen: Hoare triples and weakest preconditions. Learn them as translations.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Old theory is best treated as…',
        choices: [
          'A replacement that deletes x′',
          'A translation layer into/from the specification style',
          'Concurrency only',
          'Bunch theory',
        ],
        correctIndex: 1,
        explainCorrect: 'Map between notations; keep the same ideas.',
        explainWrong: 'Translate; do not throw away what you learned.',
      },
    },
    {
      id: 'eight-c2',
      title: 'Hoare triple idea',
      plain:
        '{P} S {Q} means: if precondition P holds initially, and S runs, then postcondition Q holds finally — when S terminates (classic reading).',
      notation: '{P} S {Q}',
      readAloud: 'From P, program S establishes Q.',
      check: {
        kind: 'translate',
        prompt: 'Roughly, {x=0} x:= x+1 {x=1} says…',
        source: '{x=0} x:= x+1 {x=1}',
        choices: [
          'x is always a bunch',
          'Starting from x=0, after increment, x=1',
          'ok equals ⊤',
          'Strings reverse',
        ],
        correctIndex: 1,
        explainCorrect: 'Precondition → program → postcondition.',
        explainWrong: 'Read pre, code, post.',
      },
    },
    {
      id: 'eight-c3',
      title: 'Weakest precondition',
      plain:
        'wp(S, Q) is the weakest precondition that makes S establish Q. It is another packaging of the same before/after idea.',
      check: {
        kind: 'multiple-choice',
        prompt: 'wp(S, Q) is…',
        choices: [
          'The weakest P such that from P, S establishes Q',
          'Always ⊤',
          'Only for midterm lecture One',
          'A string join',
        ],
        correctIndex: 0,
        explainCorrect: 'Weakest precondition semantics.',
        explainWrong: 'wp packages “what must be true before.”',
      },
    },
  ],
  proofs: [
    {
      id: 'eight-p1',
      title: 'Translation mindset',
      claim: 'Same behavior, different spelling',
      claimReading: 'Hoare/wp and x/x′ specs describe related facts.',
      steps: [
        {
          connector: '=',
          expression: 'related specification form',
          law: 'Notational translation',
          lawChoices: ['Notational translation', 'Excluded middle', 'List sum', 'Deadlock'],
          wrongReasons: {
            'Excluded middle': 'Not the point of this card.',
            'List sum': 'Wrong example.',
            Deadlock: 'Concurrency topic.',
          },
        },
      ],
    },
  ],
  drills: [
    {
      id: 'eight-d1',
      prompt: 'In {P} S {Q}, Q talks mainly about…',
      kind: 'multiple-choice',
      choices: ['The final state / after', 'Only bunches', 'Only ⊤', 'The compiler vendor'],
      correctIndex: 0,
      explainCorrect: 'Postcondition is about after.',
      explainWrong: 'Q is post.',
    },
  ],
};
