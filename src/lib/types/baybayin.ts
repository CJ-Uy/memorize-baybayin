export type KudlitMode = 'base' | 'i_e' | 'o_u' | 'virama';
export type QuizLevel = 1 | 2 | 3 | 4;
export type FeedbackState = 'idle' | 'correct' | 'incorrect';
export type DirectionMode = 'to-roman' | 'to-baybayin';

export interface BaybayinChar {
  unicode: string;        // base character unicode (e.g. '\u170B' = ᜋ = ma)
  romanBase: string;      // romanization with inherent -a (e.g. 'ma')
  romanI: string;         // with i/e kudlit (e.g. 'mi')
  romanO: string;         // with o/u kudlit (e.g. 'mo')
  romanVirama: string;    // bare consonant (e.g. 'm'). Empty string for independent vowels.
  isVowel: boolean;       // true for A, I, U independent vowels
}

export interface QuizItem {
  display: string;        // what the user sees (Baybayin string OR romanization)
  answer: string;         // correct response
  distractors: string[];  // 3 wrong options for Level 1 multiple choice
  kudlitMode: KudlitMode;
  level: QuizLevel;
  direction: DirectionMode;
  charRef: BaybayinChar;  // the source character for this item
}

export interface WordEntry {
  tagalog: string;        // romanized word (e.g. 'manok')
  baybayin: string;       // Baybayin unicode string (e.g. '\u170B\u1708\u1713\u1703\u1714')
  meaning: string;        // English gloss
  source: 'kwf-pangunahing';
}

export interface ParagraphEntry {
  id: string;
  title: string;
  baybayin: string;       // full Baybayin unicode text
  roman: string;          // full romanized text
  source: string;         // citation
}

export type AppPhase = 'config' | 'quiz' | 'results';

export interface SessionResult {
  cardId: string;
  display: string;   // what was shown
  answer: string;    // correct answer
  userInput: string; // what the user gave
  correct: boolean;
}

export interface SessionState {
  appPhase: AppPhase;
  level: QuizLevel;
  direction: DirectionMode;
  kudlitFilter: KudlitMode[];
  sessionSize: number;
  currentItem: QuizItem | null;
  feedback: FeedbackState;
  sessionQueue: string[];  // SM-2 ordered card IDs
  sessionIndex: number;
  sessionResults: SessionResult[];
  correctCount: number;
  totalCount: number;
  paragraphInput: string;
  paragraphSubmitted: boolean;
  diffTokens: DiffToken[];
}

export interface DiffToken {
  expected: string;
  actual: string;
  status: 'correct' | 'wrong' | 'missing' | 'extra';
}
