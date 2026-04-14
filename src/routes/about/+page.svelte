<script lang="ts">
  import { KUDLIT_I, KUDLIT_O, VIRAMA } from '$lib/data/characters';

  const demoChars = [
    { base: '\u170B', roman: 'ma', withI: '\u170B\u1712', romanI: 'mi', withO: '\u170B\u1713', romanO: 'mu', withV: '\u170B\u1714', romanV: 'm' },
    { base: '\u1703', roman: 'ka', withI: '\u1703\u1712', romanI: 'ki', withO: '\u1703\u1713', romanO: 'ku', withV: '\u1703\u1714', romanV: 'k' },
    { base: '\u170A', roman: 'ba', withI: '\u170A\u1712', romanI: 'bi', withO: '\u170A\u1713', romanO: 'bu', withV: '\u170A\u1714', romanV: 'b' },
    { base: '\u1708', roman: 'na', withI: '\u1708\u1712', romanI: 'ni', withO: '\u1708\u1713', romanO: 'nu', withV: '\u1708\u1714', romanV: 'n' },
  ];

  const allChars = [
    { b: '\u1700', r: 'a' }, { b: '\u1701', r: 'i/e' }, { b: '\u1702', r: 'u/o' },
    { b: '\u1703', r: 'ka' }, { b: '\u1704', r: 'ga' }, { b: '\u1705', r: 'nga' },
    { b: '\u1706', r: 'ta' }, { b: '\u1707', r: 'da/ra' }, { b: '\u1708', r: 'na' },
    { b: '\u1709', r: 'pa' }, { b: '\u170A', r: 'ba' }, { b: '\u170B', r: 'ma' },
    { b: '\u170C', r: 'ya' }, { b: '\u170E', r: 'la' }, { b: '\u170F', r: 'wa' },
    { b: '\u1710', r: 'sa' }, { b: '\u1711', r: 'ha' },
  ];

  // suppress unused warning — used conceptually for context
  void KUDLIT_I; void KUDLIT_O; void VIRAMA;
</script>

<svelte:head>
  <title>About Baybayin</title>
</svelte:head>

<article class="space-y-10 max-w-2xl mx-auto">

  <!-- Hero -->
  <div class="text-center py-8 border-b border-[hsl(30_10%_85%)]">
    <div class="font-[var(--font-baybayin)] text-6xl text-[hsl(180_60%_25%)] mb-3 leading-relaxed tracking-wide">
      ᜊᜌ᜔ᜊᜌᜒᜈ᜔
    </div>
    <h1 class="text-3xl font-semibold text-[hsl(0_0%_15%)] mb-1">Baybayin</h1>
    <p class="text-[hsl(30_5%_45%)]">The ancient script of the Philippine archipelago</p>
  </div>

  <!-- What is Baybayin -->
  <section class="space-y-3">
    <h2 class="text-xl font-semibold text-[hsl(0_0%_15%)]">What is Baybayin?</h2>
    <p class="text-[hsl(0_0%_15%)] leading-relaxed">
      Baybayin is an abugida — a writing system where each symbol represents a consonant with an inherent vowel sound. It belongs to the Brahmic family of scripts that spread across Southeast Asia. Filipinos used it before Spanish colonization to write on perishable materials like bamboo and leaves.
    </p>
    <p class="text-[hsl(0_0%_15%)] leading-relaxed">
      The earliest confirmed Philippine writing is the Laguna Copperplate Inscription (900 CE), which belongs to the same Indic script tradition. Baybayin was widely used across Luzon and the Visayas by the time Spanish missionaries arrived in the 16th century.
    </p>
  </section>

  <!-- Character System -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold text-[hsl(0_0%_15%)]">The Character System</h2>
    <p class="text-[hsl(0_0%_15%)] leading-relaxed">
      Baybayin has 17 base characters: 3 independent vowels (a, i/e, u/o) and 14 consonants. Every consonant carries an inherent -a vowel. You modify the vowel using small marks called kudlit.
    </p>

    <div class="overflow-x-auto rounded-xl border border-[hsl(30_10%_85%)]">
      <table class="w-full text-sm">
        <thead class="bg-[hsl(30_10%_90%)]">
          <tr>
            <th class="px-4 py-3 text-left font-medium text-[hsl(30_5%_45%)]">Base (-a)</th>
            <th class="px-4 py-3 text-left font-medium text-[hsl(30_5%_45%)]">Kudlit above (-i/e)</th>
            <th class="px-4 py-3 text-left font-medium text-[hsl(30_5%_45%)]">Kudlit below (-o/u)</th>
            <th class="px-4 py-3 text-left font-medium text-[hsl(30_5%_45%)]">Pamudpod (no vowel)</th>
          </tr>
        </thead>
        <tbody>
          {#each demoChars as row}
            <tr class="border-t border-[hsl(30_10%_85%)]">
              <td class="px-4 py-3">
                <span class="font-[var(--font-baybayin)] text-2xl text-[hsl(180_60%_25%)]">{row.base}</span>
                <span class="ml-2 text-[hsl(30_5%_45%)]">{row.roman}</span>
              </td>
              <td class="px-4 py-3">
                <span class="font-[var(--font-baybayin)] text-2xl text-[hsl(180_60%_25%)]">{row.withI}</span>
                <span class="ml-2 text-[hsl(30_5%_45%)]">{row.romanI}</span>
              </td>
              <td class="px-4 py-3">
                <span class="font-[var(--font-baybayin)] text-2xl text-[hsl(180_60%_25%)]">{row.withO}</span>
                <span class="ml-2 text-[hsl(30_5%_45%)]">{row.romanO}</span>
              </td>
              <td class="px-4 py-3">
                <span class="font-[var(--font-baybayin)] text-2xl text-[hsl(180_60%_25%)]">{row.withV}</span>
                <span class="ml-2 text-[hsl(30_5%_45%)]">{row.romanV}</span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Kudlit -->
  <section class="space-y-3">
    <h2 class="text-xl font-semibold text-[hsl(0_0%_15%)]">The Kudlit</h2>
    <p class="text-[hsl(0_0%_15%)] leading-relaxed">
      A kudlit is a small diacritic mark. A dot or tick above the character changes the vowel to -i or -e. A dot or tick below changes it to -o or -u. Because i/e share one mark and o/u share another, Baybayin does not distinguish between these vowel pairs in writing.
    </p>
    <p class="text-[hsl(0_0%_15%)] leading-relaxed">
      Pedro de San Buenaventura documented the kudlit system in his 1613 <em>Vocabulario de la Lengua Tagala</em> — one of the earliest systematic descriptions of Baybayin.
    </p>
  </section>

  <!-- Pamudpod -->
  <section class="space-y-3">
    <h2 class="text-xl font-semibold text-[hsl(0_0%_15%)]">The Pamudpod (Virama)</h2>
    <p class="text-[hsl(0_0%_15%)] leading-relaxed">
      Pre-colonial Baybayin had no way to write a final consonant without a vowel. When writing "bundok" (mountain), scribes wrote all consonants with their inherent vowels — readers understood which vowels to drop from context.
    </p>
    <p class="text-[hsl(0_0%_15%)] leading-relaxed">
      In 1620, Franciscan friar Francisco Lopez introduced the pamudpod: a mark placed below a consonant to cancel its inherent vowel, producing a bare consonant sound. This made Baybayin phonetically precise.
    </p>
    <div class="rounded-lg bg-[hsl(35_90%_65%)]/15 border border-[hsl(35_90%_65%)]/40 px-4 py-3 text-sm text-[hsl(0_0%_15%)]">
      This app follows KWF 2018 standard Baybayin (with pamudpod) by default. The Classical toggle removes the pamudpod from the keyboard, reflecting pre-colonial manuscript style.
    </div>
  </section>

  <!-- All 17 characters -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold text-[hsl(0_0%_15%)]">All 17 Characters</h2>
    <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {#each allChars as char}
        <div class="flex flex-col items-center p-3 rounded-lg border border-[hsl(30_10%_85%)] bg-[hsl(50_20%_98%)]">
          <span class="font-[var(--font-baybayin)] text-3xl text-[hsl(180_60%_25%)] mb-1">{char.b}</span>
          <span class="text-xs text-[hsl(30_5%_45%)]">{char.r}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Modern use -->
  <section class="space-y-3">
    <h2 class="text-xl font-semibold text-[hsl(0_0%_15%)]">Modern Baybayin</h2>
    <p class="text-[hsl(0_0%_15%)] leading-relaxed">
      Baybayin fell out of everyday use by the late 17th century as the Spanish administration promoted the Latin alphabet. Today it appears on Philippine banknotes, government seals, and street signs as a cultural symbol.
    </p>
    <p class="text-[hsl(0_0%_15%)] leading-relaxed">
      The Komisyon sa Wikang Filipino (KWF) issued Resolution 2018-4 standardizing modern Baybayin orthography, including pamudpod usage and treating da/ra as a single character. This app follows that standard.
    </p>
  </section>

  <!-- Sources -->
  <section class="border-t border-[hsl(30_10%_85%)] pt-6 space-y-2">
    <h2 class="text-xl font-semibold text-[hsl(0_0%_15%)] mb-3">Sources</h2>
    <ul class="space-y-2 text-sm text-[hsl(30_5%_45%)]">
      <li>Postma, A. (1992). The Laguna Copper Plate Inscription. <em>Philippine Studies</em>, 40(2), 183–203.</li>
      <li>Scott, W. H. (1994). <em>Barangay: Sixteenth-Century Philippine Culture and Society</em>. Ateneo de Manila University Press.</li>
      <li>San Buenaventura, P. de. (1613). <em>Vocabulario de la Lengua Tagala</em>. Pila.</li>
      <li>Lopez, F. (1620). <em>Arte de la lengua Ilocana</em>. (Introduced pamudpod.)</li>
      <li>Komisyon sa Wikang Filipino (KWF). Resolution 2018-4.
        <a href="https://kwf.gov.ph" class="text-[hsl(180_60%_25%)] underline" target="_blank" rel="noopener">kwf.gov.ph</a>
      </li>
      <li>Unicode Consortium. (2024). <em>The Unicode Standard</em>, Chapter 17, Tagalog block (U+1700–U+171F).</li>
      <li>KWF Pangunahing Talasalitaan (vocabulary source).
        <a href="https://kwf.gov.ph" class="text-[hsl(180_60%_25%)] underline" target="_blank" rel="noopener">kwf.gov.ph</a>
      </li>
    </ul>
  </section>

</article>
