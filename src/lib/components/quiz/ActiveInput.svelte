<script lang="ts">
  import { session, submitAnswer } from '$lib/state/session.svelte';
  import CharacterCard from './CharacterCard.svelte';
  import BaybayinKeyboard from '$lib/components/input/BaybayinKeyboard.svelte';

  let userInput = $state('');
  let inputEl: HTMLInputElement | null = $state(null);
  let showKeyboard = $derived(session.direction === 'to-baybayin');

  function onSubmit(e: Event) {
    e.preventDefault();
    if (!userInput.trim()) return;
    submitAnswer(userInput);
    userInput = '';
  }

  // Clear input when item changes
  $effect(() => {
    session.currentItem; // track
    userInput = '';
  });
</script>

{#if session.currentItem}
  <CharacterCard value={session.currentItem.display} />

  <form onsubmit={onSubmit} class="space-y-3">
    <input
      bind:this={inputEl}
      bind:value={userInput}
      type="text"
      inputmode={showKeyboard ? 'none' : 'text'}
      placeholder={showKeyboard ? 'tap keys below...' : 'type romanization...'}
      autocomplete="off"
      autocorrect="off"
      spellcheck={false}
      class="input input-bordered w-full text-center text-lg
        {showKeyboard ? 'font-[var(--font-baybayin)] text-2xl' : ''}"
    />

    {#if showKeyboard}
      <BaybayinKeyboard target={inputEl} />
    {/if}

    <button
      type="submit"
      disabled={session.feedback !== 'idle' || !userInput.trim()}
      class="btn w-full bg-[hsl(180_60%_25%)] text-white hover:bg-[hsl(180_60%_20%)] border-0"
    >
      Check
    </button>
  </form>
{/if}
