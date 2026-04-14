import type { DiffToken } from '$lib/types/baybayin';
import { normalize } from './normalize';

/**
 * Produce a word-level diff between expected and actual strings.
 * Returns an array of DiffToken for rendering colored feedback.
 */
export function diffParagraph(expected: string, actual: string): DiffToken[] {
  const expWords = expected.trim().split(/\s+/);
  const actWords = actual.trim().split(/\s+/);
  const tokens: DiffToken[] = [];

  const len = Math.max(expWords.length, actWords.length);

  for (let i = 0; i < len; i++) {
    const exp = expWords[i] ?? '';
    const act = actWords[i] ?? '';

    if (!act) {
      tokens.push({ expected: exp, actual: '', status: 'missing' });
    } else if (!exp) {
      tokens.push({ expected: '', actual: act, status: 'extra' });
    } else if (normalize(act) === normalize(exp)) {
      tokens.push({ expected: exp, actual: act, status: 'correct' });
    } else {
      tokens.push({ expected: exp, actual: act, status: 'wrong' });
    }
  }

  return tokens;
}

/**
 * Calculate accuracy percentage from diff tokens.
 */
export function calcAccuracy(tokens: DiffToken[]): number {
  if (tokens.length === 0) return 0;
  const correct = tokens.filter(t => t.status === 'correct').length;
  return Math.round((correct / tokens.length) * 100);
}
