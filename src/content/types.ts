export type Connector = '=' | '⇒' | '⇐';

export type Check =
  | {
      kind: 'multiple-choice';
      prompt: string;
      choices: string[];
      correctIndex: number;
      explainCorrect: string;
      explainWrong: string;
    }
  | {
      kind: 'value-table';
      prompt: string;
      rows: { expression: string; correct: 'theorem' | 'antitheorem' }[];
      explainCorrect: string;
      explainWrong: string;
    }
  | {
      kind: 'pick-rule';
      prompt: string;
      expression: string;
      choices: string[];
      correctIndex: number;
      explainCorrect: string;
      explainWrong: string;
    }
  | {
      kind: 'complete-line';
      prompt: string;
      before: string;
      choices: string[];
      correctIndex: number;
      explainCorrect: string;
      explainWrong: string;
    }
  | {
      kind: 'translate';
      prompt: string;
      source: string;
      choices: string[];
      correctIndex: number;
      explainCorrect: string;
      explainWrong: string;
    }
  | {
      kind: 'spot-trap';
      prompt: string;
      choices: string[];
      correctIndex: number;
      explainCorrect: string;
      explainWrong: string;
    };

export interface GuideSection {
  id: string;
  title: string;
  slidesRef?: string;
  paragraphs: string[];
  bullets?: string[];
  formulas?: string[];
  example?: string;
  trap?: string;
  check: Check;
}

export interface Card {
  id: string;
  title: string;
  plain: string;
  example?: string;
  notation?: string;
  readAloud?: string;
  confused?: string;
  check: Check;
}

export interface ProofStep {
  connector: Connector;
  expression: string;
  law: string;
  connectorChoices?: Connector[];
  lawChoices: string[];
  wrongReasons?: Partial<Record<string, string>>;
}

export interface Proof {
  id: string;
  title: string;
  claim: string;
  claimReading: string;
  steps: ProofStep[];
}

export interface Drill {
  id: string;
  prompt: string;
  kind: 'multiple-choice' | 'proof-with-hints';
  choices?: string[];
  correctIndex?: number;
  explainCorrect?: string;
  explainWrong?: string;
  hints?: [string, string];
  solution?: string;
}

export interface LectureContent {
  id: string;
  guides?: GuideSection[];
  cards: Card[];
  proofs: Proof[];
  drills: Drill[];
}

export interface CourseLecture {
  id: string;
  number: string;
  dateLabel: string;
  title: string;
  sections: string;
  midterm: boolean;
  note?: string;
}
