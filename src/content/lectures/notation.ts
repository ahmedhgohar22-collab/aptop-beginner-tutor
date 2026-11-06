import type { LectureContent } from '../types';

/** Not a timetable lecture — tools needed for specs in lectures Three–Four. */
export const notationTools: LectureContent = {
  id: 'notation',
  cards: [
    {
      id: 'not-c1',
      title: 'Why this panel exists',
      plain:
        'Chapter 3 (functions, substitution, quantifiers) is not its own lecture on your timetable, but specs and proofs quietly use those ideas. This panel is a beginner toolkit — not a separate exam lecture.',
      check: {
        kind: 'multiple-choice',
        prompt: 'Is “Notation tools” a separate midterm lecture on your schedule?',
        choices: ['Yes — lecture Zero', 'No — support panel for later lectures', 'Yes — replaces lecture Three', 'Only for the final'],
        correctIndex: 1,
        explainCorrect: 'It is support material, not a numbered exam lecture.',
        explainWrong: 'Treat it as help for reading specs, not a fifth midterm lecture.',
      },
    },
    {
      id: 'not-c2',
      title: 'Substitution idea',
      plain:
        'Substitution means: in an expression, replace a variable by a value or another expression. Assignment and proof steps rely on this.',
      example: 'In x′ = x + 1, if initial x is 4, the interesting final claim becomes x′ = 5.',
      notation: 'E[x: e]  — “E with x replaced by e” (notation varies; learn the idea)',
      check: {
        kind: 'complete-line',
        prompt: 'After substituting x by 2 in x + 1, you get…',
        before: '(x + 1) with x↦2',
        choices: ['x + 1', '2 + 1', 'x′ + 1', '⊥'],
        correctIndex: 1,
        explainCorrect: 'Replace x with 2.',
        explainWrong: 'Substitution replaces the variable.',
      },
    },
    {
      id: 'not-c3',
      title: 'Quantifiers in specs',
      plain:
        '∀ means “for all.” ∃ means “there exists.” Specs sometimes say “for all indices…” or “there exists a final state…”',
      notation: '∀i: 0..n-1· L i > 0',
      readAloud: 'For every index i in range, list element L i is positive.',
      check: {
        kind: 'translate',
        prompt: 'Read ∀n: nat· n+0 = n',
        source: '∀n: nat· n+0 = n',
        choices: [
          'Some natural n has n+0 = n',
          'Every natural n has n+0 = n',
          'n is a list',
          'Only n = 0 works',
        ],
        correctIndex: 1,
        explainCorrect: '∀ is for all.',
        explainWrong: 'Universal quantifier = every.',
      },
    },
    {
      id: 'not-c4',
      title: 'Functions as mappings',
      plain:
        'A function maps inputs to outputs. Lists are a special case: domain is an initial segment of naturals. You only need the beginner reading for now.',
      check: {
        kind: 'multiple-choice',
        prompt: 'A list can be seen as…',
        choices: [
          'A binary axiom',
          'A function from indices to items',
          'Always equal to ok',
          'A set of braces only',
        ],
        correctIndex: 1,
        explainCorrect: 'Indexing is function application.',
        explainWrong: 'Lists behave as functions from positions to values.',
      },
    },
  ],
  proofs: [
    {
      id: 'not-p1',
      title: 'Tiny quantifier recognition',
      claim: '(∀x· P x) ⇒ P a',
      claimReading: 'If P holds for all x, then it holds for a particular a.',
      steps: [
        {
          connector: '=',
          expression: '⊤',
          law: 'Instantiation / ∀-elimination',
          lawChoices: [
            'Instantiation / ∀-elimination',
            'ok expansion',
            'String length',
            'Assignment',
          ],
          wrongReasons: {
            'ok expansion': 'Not about ok.',
            'String length': 'Wrong domain.',
            Assignment: 'Not a program step.',
          },
        },
      ],
    },
  ],
  drills: [
    {
      id: 'not-d1',
      prompt: '∃ means…',
      kind: 'multiple-choice',
      choices: ['For all', 'There exists', 'Assignment', 'Refinement'],
      correctIndex: 1,
      explainCorrect: 'Existential quantifier.',
      explainWrong: '∃ = there exists.',
    },
  ],
};
