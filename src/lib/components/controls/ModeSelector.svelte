<script lang="ts">
  import { session, setLevel } from '$lib/state/session.svelte';
  import type { QuizLevel } from '$lib/types/baybayin';

  const levels: { level: QuizLevel; label: string; desc: string }[] = [
    { level: 1, label: 'Recognition',   desc: 'Multiple choice' },
    { level: 2, label: 'Recall',        desc: 'Type the answer' },
    { level: 3, label: 'Words',         desc: 'Full words' },
    { level: 4, label: 'Paragraph',     desc: 'Full text' },
  ];
</script>

<div role="tablist" class="tabs tabs-boxed mb-6 bg-[hsl(30_10%_90%)]">
  {#each levels as { level, label, desc }}
    <button
      role="tab"
      type="button"
      class="tab gap-1 text-[hsl(0_0%_15%)]! {session.level === level ? 'bg-primary! text-white!' : 'hover:bg-border!'}"
      onclick={() => setLevel(level)}
    >
      <span class="font-medium">{label}</span>
      <span class="text-xs opacity-70 hidden sm:inline">({desc})</span>
    </button>
  {/each}
</div>
