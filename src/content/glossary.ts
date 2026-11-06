export interface GlossaryEntry {
  symbol: string;
  name: string;
  reading: string;
  tip?: string;
}

export const glossary: GlossaryEntry[] = [
  {
    symbol: '⊤',
    name: 'top / true',
    reading: 'A theorem. The “always holds” binary value.',
    tip: 'Think: “this claim is in.”',
  },
  {
    symbol: '⊥',
    name: 'bottom / false',
    reading: 'An antitheorem. The “never holds” binary value.',
    tip: 'Think: “this claim is out.”',
  },
  {
    symbol: '∧',
    name: 'and / conjunction',
    reading: 'Both sides must hold.',
  },
  {
    symbol: '∨',
    name: 'or / disjunction',
    reading: 'At least one side holds.',
  },
  {
    symbol: '¬',
    name: 'not / negation',
    reading: 'Flips theorem ↔ antitheorem.',
  },
  {
    symbol: '⇒',
    name: 'implies',
    reading: 'If the left holds, so does the right. Read “left implies right.”',
  },
  {
    symbol: '⇐',
    name: 'implied by',
    reading: 'The left follows from the right. Useful when driving a proof upward to ⊤.',
  },
  {
    symbol: '=',
    name: 'equals',
    reading: 'Both sides have the same binary classification (or same value).',
  },
  {
    symbol: 'x′',
    name: 'x prime',
    reading: 'The final value of state variable x. Plain x is the initial value.',
    tip: 'Before / after: x is start, x′ is end.',
  },
  {
    symbol: 'ok',
    name: 'do nothing',
    reading: 'The empty program: every variable ends equal to how it started. σ′ = σ.',
    tip: 'Not the same as ⊤. ok is a specific specification about the state.',
  },
  {
    symbol: '.',
    name: 'sequential composition',
    reading: 'P.Q means “do P, then do Q.” The final state of P is the initial state of Q.',
  },
  {
    symbol: ':=',
    name: 'assignment',
    reading: 'x:= e sets the final value of x to e (and usually leaves other variables alone).',
  },
  {
    symbol: ',',
    name: 'bunch union (comma)',
    reading: 'In bunch theory, A,B is the bunch of elements from A or B (or both).',
  },
  {
    symbol: '{}',
    name: 'set packing',
    reading: 'A set packages a bunch. {1,2} is a single set value whose contents are the bunch 1,2.',
  },
  {
    symbol: '⟨⟩',
    name: 'function scope brackets',
    reading: '〈x: D → body〉 introduces a function with domain D. (Strings use semicolon sequences, not these brackets.)',
  },
  {
    symbol: '[]',
    name: 'list brackets',
    reading: 'A list packages a string: [0;1;2]. Contents ~L unpack back to a string.',
  },
  {
    symbol: ':',
    name: 'bunch inclusion',
    reading: 'A:B means A is included in B (bunch order). Like ≤ on numbers and ⇒ on binary.',
  },
  {
    symbol: ',',
    name: 'bunch union',
    reading: 'A,B is the union of bunches A and B (unpackaged, unindexed).',
  },
  {
    symbol: '~',
    name: 'contents',
    reading: '~S / ~L unpacks a set or list to the underlying bunch or string.',
  },
  {
    symbol: '¢',
    name: 'bunch size',
    reading: '¢A is the cardinality of bunch A. Duplicates are already collapsed.',
  },
  {
    symbol: '⊢',
    name: 'refinement (often written as implication)',
    reading: 'Specification S is refined by program P when P ⇒ S: every behavior of P is allowed by S.',
  },
];

export function findGlossary(symbol: string): GlossaryEntry | undefined {
  return glossary.find((g) => g.symbol === symbol);
}
