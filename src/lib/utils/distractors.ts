import { characters, getRoman } from '$lib/data/characters';
import type { BaybayinChar, KudlitMode, DirectionMode } from '$lib/types/baybayin';

/**
 * Build 3 distractor answers for a quiz item.
 * Picks visually/phonetically similar characters where possible.
 * Returns answers in the same "language" as the correct answer:
 * - to-roman direction: returns roman strings
 * - to-baybayin direction: returns Baybayin unicode strings (base character only)
 */
export function buildDistractors(
  correct: BaybayinChar,
  mode: KudlitMode,
  direction: DirectionMode,
  allChars: BaybayinChar[] = characters
): string[] {
  const pool = allChars.filter(c => c.unicode !== correct.unicode);

  // Shuffle pool
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, 3);

  if (direction === 'to-roman') {
    return picked.map(c => getRoman(c, mode));
  } else {
    // to-baybayin: show base character as option (no kudlit on buttons)
    return picked.map(c => c.unicode);
  }
}
