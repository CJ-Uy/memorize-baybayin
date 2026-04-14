// SM-2 (SuperMemo 2) spaced repetition algorithm
// Reference: Wozniak, P.A. (1990). https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method

export interface CardState {
  id: string;
  interval: number;        // days until next review
  repetitions: number;     // consecutive correct answers
  ef: number;              // easiness factor (min 1.3, default 2.5)
  nextReview: number;      // unix timestamp ms
  lastReview: number;      // unix timestamp ms
  totalReviews: number;
  correctReviews: number;
}

const DEFAULT_EF = 2.5;
const MIN_EF = 1.3;
const STORAGE_KEY = 'baybayin-sm2-v1';

export function loadCards(): Record<string, CardState> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, CardState>) : {};
  } catch {
    return {};
  }
}

export function saveCards(cards: Record<string, CardState>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function getOrCreateCard(id: string, cards: Record<string, CardState>): CardState {
  return (
    cards[id] ?? {
      id,
      interval: 0,
      repetitions: 0,
      ef: DEFAULT_EF,
      nextReview: 0,
      lastReview: 0,
      totalReviews: 0,
      correctReviews: 0,
    }
  );
}

/**
 * Apply SM-2 update after a review.
 * quality: 5 = correct, 0 = incorrect (binary for this app).
 */
export function updateCard(card: CardState, quality: 0 | 5): CardState {
  const now = Date.now();
  const updated: CardState = {
    ...card,
    lastReview: now,
    totalReviews: card.totalReviews + 1,
  };

  if (quality >= 3) {
    updated.correctReviews = card.correctReviews + 1;

    if (card.repetitions === 0) {
      updated.interval = 1;
    } else if (card.repetitions === 1) {
      updated.interval = 6;
    } else {
      updated.interval = Math.round(card.interval * card.ef);
    }

    // EF formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    const q = quality;
    updated.ef = Math.max(
      MIN_EF,
      card.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    );
    updated.repetitions = card.repetitions + 1;
  } else {
    // Wrong answer: reset streak, shrink interval
    updated.repetitions = 0;
    updated.interval = 1;
    updated.ef = Math.max(MIN_EF, card.ef - 0.2);
  }

  updated.nextReview = now + updated.interval * 24 * 60 * 60 * 1000;
  return updated;
}

/**
 * Sort card IDs by review priority:
 * 1. Overdue cards (soonest due first)
 * 2. New cards (never reviewed, shuffled)
 * 3. Future cards (soonest due first)
 */
export function prioritizeCards(
  ids: string[],
  cards: Record<string, CardState>
): string[] {
  const now = Date.now();
  const due: string[] = [];
  const fresh: string[] = [];
  const future: string[] = [];

  for (const id of ids) {
    const c = cards[id];
    if (!c || c.totalReviews === 0) {
      fresh.push(id);
    } else if (c.nextReview <= now) {
      due.push(id);
    } else {
      future.push(id);
    }
  }

  due.sort((a, b) => (cards[a]?.nextReview ?? 0) - (cards[b]?.nextReview ?? 0));
  future.sort((a, b) => (cards[a]?.nextReview ?? 0) - (cards[b]?.nextReview ?? 0));
  // Randomise new cards so each session feels different
  fresh.sort(() => Math.random() - 0.5);

  return [...due, ...fresh, ...future];
}

/**
 * Count how many cards in a set are due right now.
 */
export function countDue(ids: string[], cards: Record<string, CardState>): number {
  const now = Date.now();
  return ids.filter(id => {
    const c = cards[id];
    return !c || c.totalReviews === 0 || c.nextReview <= now;
  }).length;
}
