import type { CourseLecture, LectureContent } from './types';
import { lecture1 } from './lectures/lecture1';
import { lecture2 } from './lectures/lecture2';
import { lecture3 } from './lectures/lecture3';
import { lecture4 } from './lectures/lecture4';
import { lecture5 } from './lectures/lecture5';
import { lecture6 } from './lectures/lecture6';
import { lecture8 } from './lectures/lecture8';
import { lecture9 } from './lectures/lecture9';
import { lecture10 } from './lectures/lecture10';
import { lecture11 } from './lectures/lecture11';
import { notationTools } from './lectures/notation';

export const COURSE_META = {
  book: 'a Practical Theory of Programming',
  edition: '2026-11-1',
  author: 'Eric C.R. Hehner',
  credit:
    'Based on a Practical Theory of Programming by Eric C.R. Hehner (2026-11-1). You may copy all or part of that book freely if you include its title page. Lessons here are original study explanations in that notation.',
  midtermDate: '2026-11-22',
  reviewDate: '2027-01-03',
};

export const lectures: CourseLecture[] = [
  {
    id: 'one',
    number: 'One',
    dateLabel: '11/10',
    title: 'Intro + Logic Theory',
    sections: 'Slides L1 · book §§0, 1.0',
    midterm: true,
    note: 'Detailed guide aligned to Lecture one.pdf',
  },
  {
    id: 'two',
    number: 'Two',
    dateLabel: '18/10',
    title: 'Proof rules, Number, Character, Bunch',
    sections: 'Slides L2 + domain addendum · book §§1.0–2.1',
    midterm: true,
    note: 'Detailed guide aligned to Lecture Two-sun.pdf + Domain_addendum',
  },
  {
    id: 'three',
    number: 'Three',
    dateLabel: '25/10',
    title: 'Set, String, List, Functions (start)',
    sections: 'Slides L3.P1 · book §§2.1–3.0, 4.0 start',
    midterm: true,
    note: 'Detailed guide aligned to Lecture Three-P1.pdf',
  },
  {
    id: 'four',
    number: 'Four',
    dateLabel: '1/11',
    title: 'Sequential Composition & Refinement',
    sections: '§§4.0.0, 4.0.2, 4.0.3',
    midterm: true,
  },
  {
    id: 'five',
    number: 'Five',
    dateLabel: '8/11',
    title: 'Spec. and Programs Refinement Rules, p1',
    sections: '§§4.0.1, 4.1.0–4.1.1',
    midterm: false,
    note: 'Taught before 22 Nov, not in the default midterm set',
  },
  {
    id: 'six',
    number: 'Six',
    dateLabel: '15/11',
    title: 'Spec. and Programs Refinement Rules, p2',
    sections: '§§4.1.0, 4.1.2',
    midterm: false,
    note: 'Taught before 22 Nov, not in the default midterm set',
  },
  {
    id: 'eight',
    number: 'Eight',
    dateLabel: '6/12',
    title: 'Old Theory and Examples',
    sections: '§4.4',
    midterm: false,
  },
  {
    id: 'nine',
    number: 'Nine',
    dateLabel: '13/12',
    title: 'Time and Termination',
    sections: '§§4.2–4.2.2',
    midterm: false,
  },
  {
    id: 'ten',
    number: 'Ten',
    dateLabel: '20/12',
    title: 'Programming Constructs — p1',
    sections: '§§5.0–5.1',
    midterm: false,
  },
  {
    id: 'eleven',
    number: 'Eleven',
    dateLabel: '27/12',
    title: 'Programming Constructs — p2',
    sections: '§§5.2, 5.5',
    midterm: false,
  },
];

export const contentById: Record<string, LectureContent> = {
  one: lecture1,
  two: lecture2,
  three: lecture3,
  four: lecture4,
  five: lecture5,
  six: lecture6,
  eight: lecture8,
  nine: lecture9,
  ten: lecture10,
  eleven: lecture11,
  notation: notationTools,
};

export function getLecture(id: string): CourseLecture | undefined {
  return lectures.find((l) => l.id === id);
}

export function daysUntil(isoDate: string): number {
  const target = new Date(isoDate + 'T00:00:00');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
