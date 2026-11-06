export interface PrintablePdf {
  id: string;
  title: string;
  href: string;
  detail: string;
}

const PRINT_VER = '20261103sym';

/** Study handouts: fixed logic symbols, ~half pages, study-readable layout. */
export const printablesByLecture: Record<string, PrintablePdf[]> = {
  one: [
    {
      id: 'one-print',
      title: 'Lecture One — study handout (13 pages)',
      href: `/slides/lecture-one-handout.pdf?v=${PRINT_VER}`,
      detail: '76 slides → 13 pages · symbols fixed (∧ ∨ ¬ ⇒ ≡ ⊥) · study layout · ink-saving',
    },
  ],
  two: [
    {
      id: 'two-print',
      title: 'Lecture Two — study handout (14 pages)',
      href: `/slides/lecture-two-handout.pdf?v=${PRINT_VER}`,
      detail: '78 slides → 14 pages · symbols fixed · study layout · ink-saving',
    },
    {
      id: 'two-addendum-print',
      title: 'Domain addendum — study handout (3 pages)',
      href: `/slides/lecture-two-addendum-handout.pdf?v=${PRINT_VER}`,
      detail: '12 slides → 3 pages · symbols fixed · study layout · ink-saving',
    },
  ],
  three: [
    {
      id: 'three-print',
      title: 'Lecture Three — study handout (15 pages)',
      href: `/slides/lecture-three-handout.pdf?v=${PRINT_VER}`,
      detail: '78 slides → 15 pages · symbols fixed · study layout · ink-saving',
    },
  ],
};
