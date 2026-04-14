<script lang="ts">
  import { session, setKudlitFilter } from '$lib/state/session.svelte';
  import { KUDLIT_I, KUDLIT_O, VIRAMA } from '$lib/data/characters';
  import { settings } from '$lib/state/settings.svelte';
  import type { KudlitMode } from '$lib/types/baybayin';

  const options: { mode: KudlitMode; label: string; hint: string }[] = [
    { mode: 'base',   label: 'ᜊ',               hint: 'Base (-a)' },
    { mode: 'i_e',    label: 'ᜊ' + KUDLIT_I,     hint: 'i / e kudlit' },
    { mode: 'o_u',    label: 'ᜊ' + KUDLIT_O,     hint: 'o / u kudlit' },
    { mode: 'virama', label: 'ᜊ' + VIRAMA,       hint: 'Pamudpod (virama)' },
  ];

  function toggle(mode: KudlitMode) {
    const current = [...session.kudlitFilter];
    const idx = current.indexOf(mode);
    if (idx === -1) {
      setKudlitFilter([...current, mode]);
    } else if (current.length > 1) {
      setKudlitFilter(current.filter(m => m !== mode));
    }
    // Don't allow deselecting all - keep at least one
  }

  function isActive(mode: KudlitMode): boolean {
    return session.kudlitFilter.includes(mode);
  }
</script>

<div class="flex gap-2 flex-wrap">
  {#each options as { mode, label, hint }}
    {#if mode !== 'virama' || !settings.classicalMode}
      <button
        type="button"
        title={hint}
        onclick={() => toggle(mode)}
        class="px-3 py-1.5 rounded-md border text-sm font-[var(--font-baybayin)] text-base transition-colors
          {isActive(mode)
            ? 'bg-[hsl(180_60%_25%)] text-white border-[hsl(180_60%_25%)]'
            : 'bg-[hsl(50_20%_98%)] text-[hsl(0_0%_15%)] border-[hsl(30_10%_85%)] hover:bg-[hsl(30_10%_90%)]'}"
      >
        {label}
        <span class="text-xs font-sans ml-1 opacity-70">{hint}</span>
      </button>
    {/if}
  {/each}
</div>
