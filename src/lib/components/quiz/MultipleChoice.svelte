<script lang="ts">
  import { session, submitAnswer } from '$lib/state/session.svelte';
  import CharacterCard from './CharacterCard.svelte';

  let item = $derived(session.currentItem);

  let shuffledOptions = $state<string[]>([]);

  $effect(() => {
    if (!session.currentItem) return;
    const all = [session.currentItem.answer, ...session.currentItem.distractors];
    shuffledOptions = all.sort(() => Math.random() - 0.5);
  });

  function handleChoice(option: string) {
    submitAnswer(option);
  }
</script>

{#if item}
  <CharacterCard value={item.display} />

  <div class="grid grid-cols-2 gap-3">
    {#each shuffledOptions as option}
      <button
        type="button"
        onclick={() => handleChoice(option)}
        disabled={session.feedback !== 'idle'}
        class="btn btn-outline border-[hsl(30_10%_85%)] hover:bg-[hsl(180_60%_25%)] hover:text-white
          hover:border-[hsl(180_60%_25%)] text-base h-14 transition-all
          {item.direction === 'to-baybayin' ? 'font-[var(--font-baybayin)] text-2xl' : ''}"
      >
        {option}
      </button>
    {/each}
  </div>
{/if}
