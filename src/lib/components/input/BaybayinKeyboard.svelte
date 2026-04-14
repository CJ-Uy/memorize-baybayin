<script lang="ts">
  import { characters, KUDLIT_I, KUDLIT_O, VIRAMA } from '$lib/data/characters';
  import { settings } from '$lib/state/settings.svelte';

  let { target }: { target: HTMLInputElement | HTMLTextAreaElement | null } = $props();

  interface ComboKey {
    label: string;
    value: string;
    hint: string;
  }

  const vowels    = characters.filter(c => c.isVowel);
  const consonants = characters.filter(c => !c.isVowel);

  let comboKeys = $derived<ComboKey[]>([
    { label: '\u25CC' + KUDLIT_I, value: KUDLIT_I, hint: '+i/e' },
    { label: '\u25CC' + KUDLIT_O, value: KUDLIT_O, hint: '+o/u' },
    ...(settings.classicalMode ? [] : [{ label: '\u25CC' + VIRAMA, value: VIRAMA, hint: 'virama' }]),
  ]);

  function insertAtCursor(value: string) {
    if (!target) return;
    const start = target.selectionStart ?? target.value.length;
    const end   = target.selectionEnd   ?? target.value.length;
    target.value = target.value.slice(0, start) + value + target.value.slice(end);
    const newPos = start + value.length;
    target.setSelectionRange(newPos, newPos);
    target.focus();
    target.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function backspace() {
    if (!target) return;
    const start = target.selectionStart ?? target.value.length;
    const end   = target.selectionEnd   ?? target.value.length;
    if (start !== end) {
      target.value = target.value.slice(0, start) + target.value.slice(end);
      target.setSelectionRange(start, start);
    } else if (start > 0) {
      // Remove one Unicode code point (not just one char code, handles combining marks)
      const arr = [...target.value];
      arr.splice(start - 1, 1);
      target.value = arr.join('');
      target.setSelectionRange(start - 1, start - 1);
    }
    target.focus();
    target.dispatchEvent(new Event('input', { bubbles: true }));
  }
</script>

<div class="rounded-xl border border-[hsl(30_10%_85%)] bg-[hsl(30_10%_90%)]/30 p-3 select-none">
  <!-- Row 1: Vowels + combining marks -->
  <div class="flex gap-1 mb-2 flex-wrap">
    {#each vowels as char}
      <button
        type="button"
        onclick={() => insertAtCursor(char.unicode)}
        title={char.romanBase}
        class="w-11 h-11 rounded-md bg-[hsl(50_20%_98%)] border border-[hsl(30_10%_85%)]
          font-[var(--font-baybayin)] text-2xl hover:bg-[hsl(180_60%_25%)]/10
          active:scale-95 transition-all flex items-center justify-center"
      >
        {char.unicode}
      </button>
    {/each}

    <div class="w-px bg-[hsl(30_10%_85%)] mx-1 self-stretch"></div>

    {#each comboKeys as key}
      <button
        type="button"
        onclick={() => insertAtCursor(key.value)}
        title={key.hint}
        class="px-2 h-11 rounded-md bg-[hsl(35_90%_65%)]/20 border border-[hsl(35_90%_65%)]/40
          font-[var(--font-baybayin)] text-xl hover:bg-[hsl(35_90%_65%)]/40
          active:scale-95 transition-all flex items-center justify-center gap-0.5"
      >
        {key.label}
      </button>
    {/each}
  </div>

  <!-- Row 2: Consonants grid -->
  <div class="grid grid-cols-7 gap-1 mb-2">
    {#each consonants as char}
      <button
        type="button"
        onclick={() => insertAtCursor(char.unicode)}
        title={char.romanBase}
        class="h-11 rounded-md bg-[hsl(50_20%_98%)] border border-[hsl(30_10%_85%)]
          font-[var(--font-baybayin)] text-2xl hover:bg-[hsl(180_60%_25%)]/10
          active:scale-95 transition-all flex items-center justify-center"
      >
        {char.unicode}
      </button>
    {/each}
  </div>

  <!-- Row 3: Utility -->
  <div class="flex gap-1">
    <button
      type="button"
      onclick={() => insertAtCursor(' ')}
      class="flex-1 h-9 rounded-md bg-[hsl(50_20%_98%)] border border-[hsl(30_10%_85%)]
        text-xs text-[hsl(30_5%_45%)] hover:bg-[hsl(30_10%_90%)]
        active:scale-95 transition-all"
    >
      space
    </button>
    <button
      type="button"
      onclick={backspace}
      class="w-16 h-9 rounded-md bg-[hsl(50_20%_98%)] border border-[hsl(30_10%_85%)]
        text-xs text-[hsl(30_5%_45%)] hover:bg-red-50 hover:border-red-200
        active:scale-95 transition-all"
    >
      ⌫ back
    </button>
  </div>
</div>
