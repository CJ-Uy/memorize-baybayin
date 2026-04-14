import type { WordEntry } from '$lib/types/baybayin';

// Source: KWF Pangunahing Talasalitaan (kwf.gov.ph)
export const wordDictionary: WordEntry[] = [
  // Body / family
  { tagalog: 'ama',    baybayin: '\u1700\u170B',                          meaning: 'father',  source: 'kwf-pangunahing' },
  { tagalog: 'ina',    baybayin: '\u1701\u1708',                          meaning: 'mother',  source: 'kwf-pangunahing' },
  { tagalog: 'mata',   baybayin: '\u170B\u1706',                          meaning: 'eye',     source: 'kwf-pangunahing' },
  { tagalog: 'kamay',  baybayin: '\u1703\u170B\u170C\u1714',              meaning: 'hand',    source: 'kwf-pangunahing' },
  { tagalog: 'bata',   baybayin: '\u170A\u1706',                          meaning: 'child',   source: 'kwf-pangunahing' },
  // Nature
  { tagalog: 'araw',   baybayin: '\u1700\u1707\u170F\u1714',              meaning: 'sun/day', source: 'kwf-pangunahing' },
  { tagalog: 'buwan',  baybayin: '\u170A\u1713\u170F\u1708\u1714',        meaning: 'moon',    source: 'kwf-pangunahing' },
  { tagalog: 'dagat',  baybayin: '\u1707\u1704\u1706\u1714',              meaning: 'sea',     source: 'kwf-pangunahing' },
  { tagalog: 'langit', baybayin: '\u170E\u1705\u1712\u1706\u1714',        meaning: 'sky',     source: 'kwf-pangunahing' },
  { tagalog: 'lupa',   baybayin: '\u170E\u1713\u1709',                    meaning: 'land',    source: 'kwf-pangunahing' },
  // Things
  { tagalog: 'bahay',  baybayin: '\u170A\u1711\u170C\u1714',              meaning: 'house',   source: 'kwf-pangunahing' },
  { tagalog: 'tubig',  baybayin: '\u1706\u1713\u170A\u1712\u1704\u1714',  meaning: 'water',   source: 'kwf-pangunahing' },
  { tagalog: 'apoy',   baybayin: '\u1700\u1709\u1713\u170C\u1714',        meaning: 'fire',    source: 'kwf-pangunahing' },
  // Animals
  { tagalog: 'manok',  baybayin: '\u170B\u1708\u1713\u1703\u1714',        meaning: 'chicken', source: 'kwf-pangunahing' },
  { tagalog: 'ibon',   baybayin: '\u1701\u170A\u1713\u1708\u1714',        meaning: 'bird',    source: 'kwf-pangunahing' },
  // People / abstract
  { tagalog: 'tao',    baybayin: '\u1706\u1702',                          meaning: 'person',  source: 'kwf-pangunahing' },
  { tagalog: 'puso',   baybayin: '\u1709\u1713\u1710\u1713',              meaning: 'heart',   source: 'kwf-pangunahing' },
  { tagalog: 'buhay',  baybayin: '\u170A\u1713\u1711\u170C\u1714',        meaning: 'life',    source: 'kwf-pangunahing' },
  { tagalog: 'puno',   baybayin: '\u1709\u1713\u1708\u1713',              meaning: 'tree',    source: 'kwf-pangunahing' },
  { tagalog: 'hangin', baybayin: '\u1711\u1705\u1712\u1708\u1714',        meaning: 'wind',    source: 'kwf-pangunahing' },
];
