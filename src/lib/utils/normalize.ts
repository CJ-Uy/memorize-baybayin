/**
 * Normalize a romanization string for comparison.
 * Handles: trim, lowercase, common substitutions (e/i interchangeable, o/u interchangeable for Baybayin)
 */
export function normalize(input: string): string {
  return input.trim().toLowerCase();
}

/**
 * Check if user answer matches expected, with Baybayin-aware leniency.
 * In Baybayin, i/e use the same kudlit and o/u use the same kudlit,
 * so we accept either vowel as correct for those pairs.
 */
export function isCorrect(userInput: string, expected: string): boolean {
  const u = normalize(userInput);
  const e = normalize(expected);
  if (u === e) return true;
  // Allow i/e and o/u substitutions
  const flexible = (s: string) => s.replace(/e/g, 'i').replace(/u/g, 'o');
  return flexible(u) === flexible(e);
}
