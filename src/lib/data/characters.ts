import type { BaybayinChar, KudlitMode } from '$lib/types/baybayin';

export const KUDLIT_I   = '\u1712'; // combining mark: adds i/e vowel
export const KUDLIT_O   = '\u1713'; // combining mark: adds o/u vowel
export const VIRAMA     = '\u1714'; // combining mark: cancels inherent vowel

export const characters: BaybayinChar[] = [
  // Independent vowels (isVowel: true, romanVirama: '')
  { unicode: '\u1700', romanBase: 'a',   romanI: 'i',   romanO: 'u',   romanVirama: '', isVowel: true  },
  { unicode: '\u1701', romanBase: 'i',   romanI: 'i',   romanO: 'u',   romanVirama: '', isVowel: true  },
  { unicode: '\u1702', romanBase: 'u',   romanI: 'i',   romanO: 'u',   romanVirama: '', isVowel: true  },
  // Consonants (isVowel: false)
  { unicode: '\u1703', romanBase: 'ka',  romanI: 'ki',  romanO: 'ku',  romanVirama: 'k',  isVowel: false },
  { unicode: '\u1704', romanBase: 'ga',  romanI: 'gi',  romanO: 'gu',  romanVirama: 'g',  isVowel: false },
  { unicode: '\u1705', romanBase: 'nga', romanI: 'ngi', romanO: 'ngu', romanVirama: 'ng', isVowel: false },
  { unicode: '\u1706', romanBase: 'ta',  romanI: 'ti',  romanO: 'tu',  romanVirama: 't',  isVowel: false },
  { unicode: '\u1707', romanBase: 'da',  romanI: 'di',  romanO: 'du',  romanVirama: 'd',  isVowel: false },
  { unicode: '\u1708', romanBase: 'na',  romanI: 'ni',  romanO: 'nu',  romanVirama: 'n',  isVowel: false },
  { unicode: '\u1709', romanBase: 'pa',  romanI: 'pi',  romanO: 'pu',  romanVirama: 'p',  isVowel: false },
  { unicode: '\u170A', romanBase: 'ba',  romanI: 'bi',  romanO: 'bu',  romanVirama: 'b',  isVowel: false },
  { unicode: '\u170B', romanBase: 'ma',  romanI: 'mi',  romanO: 'mu',  romanVirama: 'm',  isVowel: false },
  { unicode: '\u170C', romanBase: 'ya',  romanI: 'yi',  romanO: 'yu',  romanVirama: 'y',  isVowel: false },
  // Note: U+170D is unassigned - DO NOT include it
  { unicode: '\u170E', romanBase: 'la',  romanI: 'li',  romanO: 'lu',  romanVirama: 'l',  isVowel: false },
  { unicode: '\u170F', romanBase: 'wa',  romanI: 'wi',  romanO: 'wu',  romanVirama: 'w',  isVowel: false },
  { unicode: '\u1710', romanBase: 'sa',  romanI: 'si',  romanO: 'su',  romanVirama: 's',  isVowel: false },
  { unicode: '\u1711', romanBase: 'ha',  romanI: 'hi',  romanO: 'hu',  romanVirama: 'h',  isVowel: false },
];

// Consonants only (no independent vowels) - useful for Level 1/2 quiz
export const consonants = characters.filter(c => !c.isVowel);

// Look up a character by its base unicode
export function findChar(unicode: string): BaybayinChar | undefined {
  return characters.find(c => c.unicode === unicode);
}

// Get the display string for a character + kudlit mode
export function getDisplay(char: BaybayinChar, mode: KudlitMode): string {
  switch (mode) {
    case 'base':   return char.unicode;
    case 'i_e':    return char.isVowel ? '\u1701' : char.unicode + KUDLIT_I;
    case 'o_u':    return char.isVowel ? '\u1702' : char.unicode + KUDLIT_O;
    case 'virama': return char.isVowel ? '' : char.unicode + VIRAMA;
  }
}

// Get the roman answer for a character + kudlit mode
export function getRoman(char: BaybayinChar, mode: KudlitMode): string {
  switch (mode) {
    case 'base':   return char.romanBase;
    case 'i_e':    return char.romanI;
    case 'o_u':    return char.romanO;
    case 'virama': return char.romanVirama;
  }
}
