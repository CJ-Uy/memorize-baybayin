<script lang="ts">
  import { session, setLevel, setDirection, setKudlitFilter, setSessionSize, startQuiz } from '$lib/state/session.svelte';
  import { loadCards, countDue, prioritizeCards } from '$lib/utils/sm2';
  import { characters } from '$lib/data/characters';
  import { wordDictionary } from '$lib/data/words';
  import { KUDLIT_I, KUDLIT_O, VIRAMA } from '$lib/data/characters';
  import { BookOpen, Keyboard, FileText, LayoutList } from 'lucide-svelte';
  import type { QuizLevel, KudlitMode } from '$lib/types/baybayin';

  const levels: { level: QuizLevel; label: string; desc: string; icon: typeof BookOpen }[] = [
    { level: 1, label: 'Recognition', desc: 'See a character, pick the correct romanization from 4 options.', icon: LayoutList },
    { level: 2, label: 'Recall',      desc: 'See a character, type the romanization from memory.', icon: Keyboard },
    { level: 3, label: 'Words',       desc: 'Transcribe full Tagalog words in Baybayin.', icon: BookOpen },
    { level: 4, label: 'Paragraph',   desc: 'Transcribe a full stanza of Lupang Hinirang.', icon: FileText },
  ];

  const sessionSizes = [5, 10, 20, 30] as const;

  const kudlitOptions: { mode: KudlitMode; label: string; sample: string }[] = [
    { mode: 'base',   label: 'Base (-a)',    sample: 'ᜊ' },
    { mode: 'i_e',    label: 'i/e kudlit',   sample: 'ᜊ' + KUDLIT_I },
    { mode: 'o_u',    label: 'o/u kudlit',   sample: 'ᜊ' + KUDLIT_O },
    { mode: 'virama', label: 'Pamudpod',     sample: 'ᜊ' + VIRAMA },
  ];

  function toggleKudlit(mode: KudlitMode) {
    const cur = [...session.kudlitFilter];
    const idx = cur.indexOf(mode);
    if (idx === -1) {
      setKudlitFilter([...cur, mode]);
    } else if (cur.length > 1) {
      setKudlitFilter(cur.filter(m => m !== mode));
    }
  }

  // Count due cards for the current config (shows the user what SM-2 queued)
  let dueCount = $derived(() => {
    const stored = loadCards();
    let ids: string[] = [];
    if (session.level === 3) {
      ids = wordDictionary.map(w => `word:${w.tagalog}`);
    } else if (session.level !== 4) {
      for (const char of characters) {
        for (const mode of session.kudlitFilter) {
          if (mode === 'virama' && char.isVowel) continue;
          ids.push(`${char.unicode.codePointAt(0)!.toString(16)}:${mode}`);
        }
      }
    }
    return countDue(ids, stored);
  });
</script>

<div class="max-w-lg mx-auto space-y-8">
  <div class="text-center">
    <h1 class="text-2xl font-semibold text-[hsl(0_0%_15%)] mb-1">Configure Session</h1>
    <p class="text-sm text-[hsl(30_5%_45%)]">Cards use spaced repetition to reinforce recall over time.</p>
  </div>

  <!-- Level selection -->
  <section>
    <h2 class="text-sm font-medium text-[hsl(30_5%_45%)] uppercase tracking-wide mb-3">Practice Level</h2>
    <div class="grid grid-cols-2 gap-2">
      {#each levels as { level, label, desc, icon: Icon }}
        <button
          type="button"
          onclick={() => setLevel(level)}
          class="text-left p-4 rounded-xl border-2 transition-all
            {session.level === level
              ? 'border-[hsl(180_60%_25%)] bg-[hsl(180_60%_25%)]/5'
              : 'border-[hsl(30_10%_85%)] bg-[hsl(50_20%_98%)] hover:border-[hsl(180_60%_25%)]/40'}"
        >
          <div class="flex items-center gap-2 mb-1">
            <Icon class="w-4 h-4 {session.level === level ? 'text-[hsl(180_60%_25%)]' : 'text-[hsl(30_5%_45%)]'}" />
            <span class="font-medium text-sm {session.level === level ? 'text-[hsl(180_60%_25%)]' : 'text-[hsl(0_0%_15%)]'}">{label}</span>
          </div>
          <p class="text-xs text-[hsl(30_5%_45%)] leading-snug">{desc}</p>
        </button>
      {/each}
    </div>
  </section>

  <!-- Direction -->
  <section>
    <h2 class="text-sm font-medium text-[hsl(30_5%_45%)] uppercase tracking-wide mb-3">Direction</h2>
    <div class="flex rounded-lg border border-[hsl(30_10%_85%)] overflow-hidden w-full">
      <button
        type="button"
        onclick={() => setDirection('to-roman')}
        class="flex-1 px-4 py-3 text-sm font-medium transition-colors
          {session.direction === 'to-roman'
            ? 'bg-[hsl(180_60%_25%)] text-white'
            : 'bg-[hsl(50_20%_98%)] text-[hsl(0_0%_15%)] hover:bg-[hsl(30_10%_90%)]'}"
      >
        <span class="font-[var(--font-baybayin)] text-lg mr-1">ᜊ</span> → abc
        <span class="block text-xs opacity-70 mt-0.5">See Baybayin, type Roman</span>
      </button>
      <button
        type="button"
        onclick={() => setDirection('to-baybayin')}
        class="flex-1 px-4 py-3 text-sm font-medium transition-colors
          {session.direction === 'to-baybayin'
            ? 'bg-[hsl(180_60%_25%)] text-white'
            : 'bg-[hsl(50_20%_98%)] text-[hsl(0_0%_15%)] hover:bg-[hsl(30_10%_90%)]'}"
      >
        abc → <span class="font-[var(--font-baybayin)] text-lg ml-1">ᜊ</span>
        <span class="block text-xs opacity-70 mt-0.5">See Roman, type Baybayin</span>
      </button>
    </div>
  </section>

  <!-- Kudlit filter (hidden for Level 4) -->
  {#if session.level !== 4}
    <section>
      <h2 class="text-sm font-medium text-[hsl(30_5%_45%)] uppercase tracking-wide mb-3">Characters to Study</h2>
      <div class="grid grid-cols-2 gap-2">
        {#each kudlitOptions as { mode, label, sample }}
          <button
            type="button"
            onclick={() => toggleKudlit(mode)}
            class="flex items-center gap-3 px-4 py-3 rounded-lg border transition-all
              {session.kudlitFilter.includes(mode)
                ? 'border-[hsl(180_60%_25%)] bg-[hsl(180_60%_25%)]/5 text-[hsl(180_60%_25%)]'
                : 'border-[hsl(30_10%_85%)] bg-[hsl(50_20%_98%)] text-[hsl(0_0%_15%)] hover:border-[hsl(180_60%_25%)]/40'}"
          >
            <span class="font-[var(--font-baybayin)] text-2xl w-8 text-center">{sample}</span>
            <span class="text-sm font-medium">{label}</span>
          </button>
        {/each}
      </div>
    </section>

    <!-- Session size -->
    <section>
      <h2 class="text-sm font-medium text-[hsl(30_5%_45%)] uppercase tracking-wide mb-3">Cards per Session</h2>
      <div class="flex gap-2">
        {#each sessionSizes as size}
          <button
            type="button"
            onclick={() => setSessionSize(size)}
            class="flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all
              {session.sessionSize === size
                ? 'border-[hsl(180_60%_25%)] bg-[hsl(180_60%_25%)] text-white'
                : 'border-[hsl(30_10%_85%)] bg-[hsl(50_20%_98%)] text-[hsl(0_0%_15%)] hover:border-[hsl(180_60%_25%)]/40'}"
          >
            {size}
          </button>
        {/each}
      </div>
      <p class="text-xs text-[hsl(30_5%_45%)] mt-2">
        {dueCount()} cards due for review now.
      </p>
    </section>
  {/if}

  <!-- Start button -->
  <button
    type="button"
    onclick={startQuiz}
    class="w-full py-4 rounded-xl bg-[hsl(180_60%_25%)] text-white font-semibold text-base
      hover:bg-[hsl(180_60%_20%)] active:scale-[0.98] transition-all shadow-sm"
  >
    Start Session
  </button>
</div>
