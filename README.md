# Memorize Baybayin

A premium, single-page app for learning Baybayin — the pre-colonial Philippine script. Built with SvelteKit 5, deployed on Cloudflare Pages.

## What it does

The app takes you through four escalating difficulty levels with a config-first flow: you set your options, run a fixed session, and see your results. Cards use SM-2 spaced repetition (the algorithm behind Anki) to schedule reviews based on your performance.

**Learning levels:**

1. Recognition — see a Baybayin character, pick the correct romanization from 4 options
2. Recall — see a character, type the romanization from memory
3. Words — transcribe full KWF-sourced Tagalog words
4. Paragraph — transcribe the opening verse of Lupang Hinirang

**Two-way practice:** every level works in both directions. See Baybayin and type Roman, or see Roman and type Baybayin. A virtual keyboard handles Baybayin input so no system IME is needed.

**Kudlit system:** filter by base characters (-a), i/e kudlit, o/u kudlit, and pamudpod (virama). Toggle Classical mode to study Baybayin without the Spanish-era virama, as it appeared in pre-colonial manuscripts.

**Spaced repetition:** SM-2 algorithm tracks each character card. Due cards appear first each session. Correct answers lengthen the review interval; wrong answers reset it.

## Stack

- SvelteKit 2 + Svelte 5 (runes)
- TypeScript strict mode
- Tailwind CSS v4
- DaisyUI v5
- Cloudflare Pages (adapter-cloudflare)

## Baybayin Unicode

Characters use the Unicode Tagalog block (U+1700–U+171F). Combining marks:

| Code | Mark | Effect |
|------|------|--------|
| U+1712 | ᜒ | Kudlit above — adds -i / -e vowel |
| U+1713 | ᜓ | Kudlit below — adds -o / -u vowel |
| U+1714 | ᜔ | Pamudpod (virama) — cancels inherent vowel |

Note: U+170D is unassigned. The 14 consonants run U+1703–U+170C and U+170E–U+1711.

## Word list source

Vocabulary for Level 3 comes from the KWF (Komisyon sa Wikang Filipino) Pangunahing Talasalitaan — the official 2,000 Basic Filipino Words list. Source: [kwf.gov.ph](https://kwf.gov.ph).

## Historical context

Baybayin is an abugida in the Brahmic family. The Laguna Copperplate Inscription (900 CE) is the earliest confirmed Philippine writing. The kudlit system was documented by Pedro de San Buenaventura in 1613. The pamudpod was introduced by Francisco Lopez in 1620. The KWF standardized modern Baybayin orthography in Resolution 2018-4.

Full citations and historical context are on the About page inside the app.

## Developing

```sh
pnpm install
pnpm dev
```

## Building

```sh
pnpm build
```

## Deploying

```sh
pnpm deploy
```

Deploys to Cloudflare Pages via Wrangler. Requires a Cloudflare account and `wrangler login`.
