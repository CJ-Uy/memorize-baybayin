import { characters, getDisplay, getRoman, findChar } from '$lib/data/characters';
import { wordDictionary } from '$lib/data/words';
import { buildDistractors } from '$lib/utils/distractors';
import { loadCards, saveCards, getOrCreateCard, updateCard, prioritizeCards } from '$lib/utils/sm2';
import type {
  SessionState,
  QuizItem,
  KudlitMode,
  DirectionMode,
  QuizLevel,
  BaybayinChar,
  SessionResult,
  DiffToken,
} from '$lib/types/baybayin';

// ─── State ────────────────────────────────────────────────────────────────────

export const session = $state<SessionState>({
  appPhase: 'config',
  level: 1,
  direction: 'to-roman',
  kudlitFilter: ['base'],
  sessionSize: 10,
  currentItem: null,
  feedback: 'idle',
  sessionQueue: [],
  sessionIndex: 0,
  sessionResults: [],
  correctCount: 0,
  totalCount: 0,
  paragraphInput: '',
  paragraphSubmitted: false,
  diffTokens: [],
});

// ─── Card ID helpers ─────────────────────────────────────────────────────────

/**
 * Card ID format:
 *   Character cards : "{hex}:{kudlitMode}"  e.g. "170b:base", "1703:i_e"
 *   Word cards      : "word:{tagalog}"      e.g. "word:manok"
 */
function charCardId(char: BaybayinChar, mode: KudlitMode): string {
  return `${char.unicode.codePointAt(0)!.toString(16)}:${mode}`;
}

function parseCharCardId(id: string): { char: BaybayinChar; mode: KudlitMode } | null {
  const colonIdx = id.indexOf(':');
  if (colonIdx === -1) return null;
  const hex = id.slice(0, colonIdx);
  const mode = id.slice(colonIdx + 1) as KudlitMode;
  const unicode = String.fromCodePoint(parseInt(hex, 16));
  const char = findChar(unicode);
  return char ? { char, mode } : null;
}

// ─── Card generation ─────────────────────────────────────────────────────────

function generateCardIds(level: QuizLevel, kudlitFilter: KudlitMode[]): string[] {
  if (level === 3) {
    return wordDictionary.map(w => `word:${w.tagalog}`);
  }
  const ids: string[] = [];
  for (const char of characters) {
    for (const mode of kudlitFilter) {
      if (mode === 'virama' && char.isVowel) continue;
      ids.push(charCardId(char, mode));
    }
  }
  return ids;
}

// ─── QuizItem builder ────────────────────────────────────────────────────────

function buildItem(cardId: string): QuizItem | null {
  const dir = session.direction;
  const mode: KudlitMode = session.kudlitFilter[0] ?? 'base';

  if (cardId.startsWith('word:')) {
    const tagalog = cardId.slice(5);
    const word = wordDictionary.find(w => w.tagalog === tagalog);
    if (!word) return null;
    return {
      display: dir === 'to-roman' ? word.baybayin : word.tagalog,
      answer:  dir === 'to-roman' ? word.tagalog  : word.baybayin,
      distractors: [],
      kudlitMode: mode,
      level: session.level,
      direction: dir,
      charRef: characters[0], // word cards don't have a meaningful charRef
    };
  }

  const parsed = parseCharCardId(cardId);
  if (!parsed) return null;

  const { char, mode: cardMode } = parsed;
  const baybayin = getDisplay(char, cardMode);
  const roman = getRoman(char, cardMode);

  // Skip items where the baybayin display is empty (e.g. virama on a vowel)
  if (!baybayin && !roman) return null;

  const eligibleChars = characters.filter(c => {
    if (cardMode === 'virama') return !c.isVowel;
    return true;
  });
  const distractors = buildDistractors(char, cardMode, dir, eligibleChars);

  return {
    display: dir === 'to-roman' ? baybayin : roman,
    answer:  dir === 'to-roman' ? roman    : baybayin,
    distractors,
    kudlitMode: cardMode,
    level: session.level,
    direction: dir,
    charRef: char,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Start a quiz session. Builds SM-2 ordered card queue and switches to quiz phase.
 */
export function startQuiz(): void {
  const allIds = generateCardIds(session.level, session.kudlitFilter);
  const stored = loadCards();
  const ordered = prioritizeCards(allIds, stored);
  const queue = session.level === 4 ? [] : ordered.slice(0, session.sessionSize);

  session.sessionQueue = queue;
  session.sessionIndex = 0;
  session.sessionResults = [];
  session.correctCount = 0;
  session.totalCount = 0;
  session.feedback = 'idle';
  session.paragraphInput = '';
  session.paragraphSubmitted = false;
  session.diffTokens = [];
  session.appPhase = 'quiz';

  if (session.level !== 4) {
    loadNextItem();
  }
}

/**
 * Load the current card in the queue as the active QuizItem.
 */
function loadNextItem(): void {
  const cardId = session.sessionQueue[session.sessionIndex];
  if (!cardId) {
    session.appPhase = 'results';
    return;
  }
  const item = buildItem(cardId);
  if (!item) {
    // Skip broken cards
    session.sessionIndex += 1;
    loadNextItem();
    return;
  }
  session.currentItem = item;
}

/**
 * Submit an answer for the current card. Handles SM-2 update and session advancement.
 */
export function submitAnswer(userInput: string): boolean {
  if (!session.currentItem) return false;

  const u = userInput.trim().toLowerCase();
  const e = session.currentItem.answer.trim().toLowerCase();
  const flex = (s: string) => s.replace(/e/g, 'i').replace(/u/g, 'o');
  const correct = u === e || flex(u) === flex(e);

  // Record result
  const cardId = session.sessionQueue[session.sessionIndex] ?? 'unknown';
  const result: SessionResult = {
    cardId,
    display: session.currentItem.display,
    answer: session.currentItem.answer,
    userInput,
    correct,
  };
  session.sessionResults = [...session.sessionResults, result];

  // Update SM-2 state
  const stored = loadCards();
  const card = getOrCreateCard(cardId, stored);
  stored[cardId] = updateCard(card, correct ? 5 : 0);
  saveCards(stored);

  // Update counters
  session.totalCount += 1;
  session.feedback = correct ? 'correct' : 'incorrect';
  if (correct) session.correctCount += 1;

  setTimeout(() => {
    session.feedback = 'idle';
    session.sessionIndex += 1;
    if (session.sessionIndex >= session.sessionQueue.length) {
      session.appPhase = 'results';
    } else {
      loadNextItem();
    }
  }, 800);

  return correct;
}

/**
 * Called from ParagraphMode when the user submits a transcription.
 */
export function finishParagraph(tokens: DiffToken[], input: string): void {
  session.diffTokens = tokens;
  session.paragraphInput = input;
  session.paragraphSubmitted = true;
  session.appPhase = 'results';
}

/**
 * Return to config screen from results.
 */
export function goToConfig(): void {
  session.appPhase = 'config';
  session.currentItem = null;
  session.feedback = 'idle';
}

// ─── Config setters (used by ConfigScreen before quiz starts) ─────────────────

export function setLevel(level: QuizLevel): void {
  session.level = level;
}

export function setDirection(dir: DirectionMode): void {
  session.direction = dir;
}

export function setKudlitFilter(modes: KudlitMode[]): void {
  session.kudlitFilter = modes.length > 0 ? modes : ['base'];
}

export function setSessionSize(size: number): void {
  session.sessionSize = size;
}
