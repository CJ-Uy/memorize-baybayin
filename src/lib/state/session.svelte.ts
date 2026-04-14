import { characters, getDisplay, getRoman } from '$lib/data/characters';
import { wordDictionary } from '$lib/data/words';
import { buildDistractors } from '$lib/utils/distractors';
import type { SessionState, QuizItem, KudlitMode, DirectionMode, QuizLevel, BaybayinChar } from '$lib/types/baybayin';

export const session = $state<SessionState>({
  level: 1,
  direction: 'to-roman',
  correctCount: 0,
  totalCount: 0,
  currentItem: null,
  feedback: 'idle',
  kudlitFilter: ['base'],
  paragraphInput: '',
  paragraphSubmitted: false,
});

/**
 * Pick a random element from an array.
 */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get the eligible characters for the current kudlit filter.
 * If filter includes 'virama', exclude vowels (they have no virama form).
 */
function getEligibleChars(): BaybayinChar[] {
  const filter = session.kudlitFilter[0];
  if (filter === 'virama') {
    return characters.filter(c => !c.isVowel);
  }
  return characters;
}

/**
 * Advance to the next quiz item. Call this after feedback resolves.
 */
export function nextItem(): void {
  const eligible = getEligibleChars();
  if (eligible.length === 0) return;

  const char = pickRandom(eligible);
  const mode: KudlitMode = session.kudlitFilter[0] ?? 'base';

  const displayBaybayin = getDisplay(char, mode);
  const answerRoman = getRoman(char, mode);

  const distractors = buildDistractors(char, mode, session.direction, eligible);

  // For level 3 (words), override with a random word
  if (session.level === 3) {
    const word = pickRandom(wordDictionary);
    session.currentItem = {
      display: session.direction === 'to-roman' ? word.baybayin : word.tagalog,
      answer:  session.direction === 'to-roman' ? word.tagalog  : word.baybayin,
      distractors: [], // Level 3 uses text input, not multiple choice
      kudlitMode: mode,
      level: 3,
      direction: session.direction,
      charRef: char, // not meaningful for level 3 but satisfies type
    };
    return;
  }

  session.currentItem = {
    display: session.direction === 'to-roman' ? displayBaybayin : answerRoman,
    answer:  session.direction === 'to-roman' ? answerRoman     : displayBaybayin,
    distractors,
    kudlitMode: mode,
    level: session.level,
    direction: session.direction,
    charRef: char,
  };
}

/**
 * Submit an answer. Returns true if correct.
 * Automatically advances after 800ms.
 */
export function submitAnswer(userInput: string): boolean {
  if (!session.currentItem) return false;

  const { isCorrect } = (() => {
    // inline to avoid circular import
    const u = userInput.trim().toLowerCase();
    const e = session.currentItem!.answer.trim().toLowerCase();
    const flex = (s: string) => s.replace(/e/g, 'i').replace(/u/g, 'o');
    return { isCorrect: u === e || flex(u) === flex(e) };
  })();

  session.totalCount += 1;
  session.feedback = isCorrect ? 'correct' : 'incorrect';
  if (isCorrect) session.correctCount += 1;

  setTimeout(() => {
    session.feedback = 'idle';
    nextItem();
  }, 800);

  return isCorrect;
}

/**
 * Reset session counters and pick a new item.
 */
export function resetSession(): void {
  session.correctCount = 0;
  session.totalCount = 0;
  session.feedback = 'idle';
  session.paragraphInput = '';
  session.paragraphSubmitted = false;
  nextItem();
}

/**
 * Change level and reset.
 */
export function setLevel(level: QuizLevel): void {
  session.level = level;
  resetSession();
}

/**
 * Change direction and reset.
 */
export function setDirection(dir: DirectionMode): void {
  session.direction = dir;
  resetSession();
}

/**
 * Update kudlit filter and reset.
 */
export function setKudlitFilter(modes: KudlitMode[]): void {
  session.kudlitFilter = modes.length > 0 ? modes : ['base'];
  resetSession();
}
