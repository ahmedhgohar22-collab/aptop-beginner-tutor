export interface TopicVideo {
  id: string;
  title: string;
  duration: string;
  topic: string;
  videoUrl: string;
  transcriptUrl: string;
  visualsUrl: string;
  whyWatch: string;
}

const BASE = 'https://www.cs.toronto.edu/~hehner/FMSD';

function fmsd(
  n: number,
  title: string,
  duration: string,
  topic: string,
  whyWatch: string,
): TopicVideo {
  return {
    id: `fmsd-${n}`,
    title,
    duration,
    topic,
    videoUrl: `${BASE}/FMSD${n}.mp4`,
    transcriptUrl: `${BASE}/talk${n}.pdf`,
    visualsUrl: `${BASE}/show${n}.pdf`,
    whyWatch,
  };
}

/** Official Hehner FMSD lecture videos mapped to your timetable lectures. */
export const videosByLecture: Record<string, TopicVideo[]> = {
  one: [
    fmsd(
      0,
      'Introduction',
      '12:05',
      'Why formal methods / course big picture',
      'Start here: what the theory is for and how the course is organized.',
    ),
    fmsd(
      1,
      'Binary Theory',
      '30:43',
      '⊤ ⊥ operators theorems antitheorems',
      'Core logic lecture — watch before doing Lecture One drills.',
    ),
  ],
  two: [
    fmsd(
      1,
      'Binary Theory (review / proof skills)',
      '30:43',
      'Proof ideas in binary theory',
      'Re-watch if Completion / Consistency / proof format still feel fuzzy.',
    ),
    fmsd(
      2,
      'Binary continued, Number, Character',
      '12:28',
      'Number theory + character theory',
      'Matches Lecture Two number/character material and domain ideas.',
    ),
    fmsd(
      3,
      'Collections: Bunches and Sets',
      '14:42',
      'Bunch vs set',
      'Your timetable puts bunch/set with Lecture Two — this is the detailed video.',
    ),
  ],
  three: [
    fmsd(
      3,
      'Collections: Bunches and Sets',
      '14:42',
      'Bunch and set (reinforce)',
      'Useful recap before strings/lists.',
    ),
    fmsd(
      4,
      'Sequences: Strings and Lists',
      '27:25',
      'String and list theory',
      'Main video for Lecture Three data structures.',
    ),
    fmsd(
      5,
      'Functions',
      '10:30',
      'Function notation and scope',
      'Matches the function preview at the end of Lecture Three.P1.',
    ),
  ],
  four: [
    fmsd(
      8,
      'Specification',
      '30:31',
      'Specs as binary expressions; x and x′',
      'How specifications are written in this theory.',
    ),
    fmsd(
      9,
      'Refinement and Programs',
      '28:59',
      'ok, programs, refinement',
      'Sequential composition and refinement direction — midterm ceiling.',
    ),
  ],
  five: [
    fmsd(
      8,
      'Specification (laws context)',
      '30:31',
      'Specification laws backdrop',
      'Refresh specs before refinement-law practice.',
    ),
    fmsd(
      9,
      'Refinement and Programs',
      '28:59',
      'Refinement development',
      'Stepwise refinement examples and program view.',
    ),
  ],
  six: [
    fmsd(
      9,
      'Refinement and Programs',
      '28:59',
      'More refinement practice',
      'Keep this open while doing binary exponentiation style examples.',
    ),
    fmsd(
      12,
      'Fast Exponentiation and Fibonacci',
      '21:26',
      'Worked refinement examples',
      'Concrete developments that show refinement in action.',
    ),
  ],
  eight: [
    fmsd(
      14,
      'Old Theory',
      '12:00',
      'Hoare / weakest precondition connection',
      'Translates older notations into the specification style you already know.',
    ),
  ],
  nine: [
    fmsd(
      10,
      'Time Calculation',
      '28:54',
      'Real/recursive time in specs',
      'How time enters specifications.',
    ),
    fmsd(
      11,
      'Searching',
      '18:52',
      'Search with time',
      'Linear/binary search style examples with timing.',
    ),
  ],
  ten: [
    fmsd(
      15,
      'Scope and Data Structures',
      '16:43',
      'Declarations, arrays, records',
      'Programming-language data side.',
    ),
  ],
  eleven: [
    fmsd(
      16,
      'Control Structures',
      '27:25',
      'while, exit, for, …',
      'Loops and control as refined specifications.',
    ),
    fmsd(
      19,
      'Subprograms and Aliasing',
      '15:47',
      'Functions and procedures',
      'Subprogram ideas for the end of the construct lectures.',
    ),
  ],
  notation: [
    fmsd(
      5,
      'Functions',
      '10:30',
      'Substitution / function basics',
      'Supports the Notation tools panel.',
    ),
    fmsd(
      6,
      'Quantifiers',
      '11:12',
      '∀ and ∃',
      'Quantifiers used inside specifications.',
    ),
  ],
};

export interface ExplainerStep {
  title: string;
  body: string;
  visual: string;
}

export interface AnimatedExplainer {
  id: string;
  title: string;
  summary: string;
  steps: ExplainerStep[];
}

export const explainersByLecture: Record<string, AnimatedExplainer[]> = {
  one: [
    {
      id: 'exp-binary-values',
      title: 'Animated: theorem vs antitheorem',
      summary: 'Step through what ⊤ and ⊥ mean before you watch the long Binary Theory video.',
      steps: [
        {
          title: 'Two buckets',
          body: 'Every binary expression we care about is sorted into theorem (holds) or antitheorem (does not).',
          visual: '⊤  =  “in”     ⊥  =  “out”',
        },
        {
          title: 'And needs both',
          body: '∧ is a theorem only when both sides are theorems.',
          visual: '⊤ ∧ ⊤ = ⊤\n⊤ ∧ ⊥ = ⊥\n⊥ ∧ ⊥ = ⊥',
        },
        {
          title: 'Or needs one',
          body: '∨ is a theorem if at least one side is a theorem.',
          visual: '⊤ ∨ ⊥ = ⊤\n⊥ ∨ ⊥ = ⊥',
        },
        {
          title: 'Implication surprise',
          body: 'If the left side is already ⊥, implication holds. The dangerous case is ⊤ ⇒ ⊥.',
          visual: '⊥ ⇒ ⊤ = ⊤\n⊤ ⇒ ⊥ = ⊥\n⊤ ⇒ ⊤ = ⊤',
        },
      ],
    },
    {
      id: 'exp-material-implication',
      title: 'Animated: material implication',
      summary: 'The rewrite you will use constantly in proofs.',
      steps: [
        {
          title: 'Law',
          body: 'Implication is defined/usable as “not antecedent, or consequent”.',
          visual: 'x ⇒ y   ≡   ¬x ∨ y',
        },
        {
          title: 'Why ⊥ ⇒ y is ⊤',
          body: '¬⊥ ∨ y becomes ⊤ ∨ y which is ⊤.',
          visual: '⊥ ⇒ y\n= ¬⊥ ∨ y\n= ⊤ ∨ y\n= ⊤',
        },
        {
          title: 'Use in a proof line',
          body: 'When a calculation needs to expand ⇒, cite Material implication as the hint.',
          visual: 'a ⇒ a ∨ b\n= ¬a ∨ (a ∨ b)     Material implication',
        },
      ],
    },
  ],
  two: [
    {
      id: 'exp-five-rules',
      title: 'Animated: which proof rule?',
      summary: 'A decision map for Axiom / Evaluation / Completion / Consistency / Instance.',
      steps: [
        {
          title: 'Axiom',
          body: 'The expression is declared theorem or antitheorem (⊤ / ⊥, or an application axiom).',
          visual: 'axiom ⊤  → theorem\nantiaxiom ⊥ → antitheorem',
        },
        {
          title: 'Evaluation',
          body: 'All parts are already classified → use the truth table.',
          visual: 'known ∧ known  →  table lookup',
        },
        {
          title: 'Completion',
          body: 'Parts unknown, but every case gives the same class → that class.',
          visual: 'a ∨ ¬a\n(a=⊤ or a=⊥) both give ⊤',
        },
        {
          title: 'Consistency',
          body: 'Whole is classified; only one story about the parts is consistent → take it.',
          visual: '¬x is theorem  ⇒  x cannot be ⊤',
        },
        {
          title: 'Instance',
          body: 'A classified schema stays classified for every substitution instance.',
          visual: 'x = x is theorem\n⇒ (⊤∨⊥)=(⊤∨⊥) is theorem',
        },
      ],
    },
    {
      id: 'exp-bunch-set',
      title: 'Animated: bunch vs set',
      summary: 'Packaging is the whole exam trap.',
      steps: [
        {
          title: 'Bunch = content',
          body: '1,2,3 is the elements themselves (unpackaged, unindexed).',
          visual: '1 , 2 , 3',
        },
        {
          title: 'Set = package',
          body: '{1,2,3} is one value that packs that bunch.',
          visual: '{ 1 , 2 , 3 }',
        },
        {
          title: 'Move between them',
          body: '~ unpacks; { } packs.',
          visual: '~{1,2,3} = 1,2,3\n{1,2,3} packs 1,2,3',
        },
      ],
    },
  ],
  three: [
    {
      id: 'exp-four-structures',
      title: 'Animated: four data structures',
      summary: 'Packaging × indexing table as a story.',
      steps: [
        {
          title: 'Bunch',
          body: 'Unpackaged and unindexed — just elements with comma union.',
          visual: 'Bunch:  2, 5, 9',
        },
        {
          title: 'Set',
          body: 'Packaged and unindexed — braces create one object.',
          visual: 'Set:  {2, 5, 9}',
        },
        {
          title: 'String',
          body: 'Unpackaged and indexed — order and positions matter.',
          visual: 'String:  4;5;8;9\nindex:   0 1 2 3',
        },
        {
          title: 'List',
          body: 'Packaged and indexed — a string inside list brackets.',
          visual: 'List:  [4;5;8;9]\n~[4;5;8;9] = 4;5;8;9',
        },
      ],
    },
    {
      id: 'exp-prime',
      title: 'Animated: x vs x′',
      summary: 'Initial vs final state — the #1 program-theory mistake.',
      steps: [
        {
          title: 'Before',
          body: 'Unprimed variables are the starting state.',
          visual: 'start:  x = 3',
        },
        {
          title: 'After',
          body: 'Primed variables are the ending state.',
          visual: 'end:  x′ = 4',
        },
        {
          title: 'A tiny spec',
          body: '“Increase x by 1 and leave y alone.”',
          visual: 'x′ = x + 1  ∧  y′ = y',
        },
      ],
    },
  ],
  four: [
    {
      id: 'exp-ok-refine',
      title: 'Animated: ok vs ⊤ and refinement',
      summary: 'Do-nothing vs anything-goes, and which way ⇒ points.',
      steps: [
        {
          title: 'ok',
          body: 'Every variable ends equal to how it started.',
          visual: 'ok  ≡  x′=x ∧ y′=y ∧ …',
        },
        {
          title: '⊤ is weaker',
          body: '⊤ allows any final state. So ⊤ does not imply ok.',
          visual: 'ok ⇒ ⊤   (yes)\n⊤ ⇒ ok   (no)',
        },
        {
          title: 'Refinement',
          body: 'Program P refines spec S when P ⇒ S.',
          visual: 'P ⇒ S\n“every behavior of P is allowed by S”',
        },
      ],
    },
  ],
};
