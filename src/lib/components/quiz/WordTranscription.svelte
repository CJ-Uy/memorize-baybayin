<script lang="ts">
  import { session, submitAnswer } from '$lib/state/session.svelte';
  import BaybayinKeyboard from '$lib/components/input/BaybayinKeyboard.svelte';

  let userInput = $state('');
  let inputEl: HTMLInputElement | null = $state(null);
  let showKeyboard = $derived(session.direction === 'to-baybayin');
  let hint = $derived(
    !session.currentItem
      ? ''
      : session.direction === 'to-roman'
        ? 'Type the romanization'
        : 'Use the keyboard to type Baybayin'
  );

  function onSubmit(e: Event) {
    e.preventDefault();
    if (!userInput.trim()) return;
    submitAnswer(userInput);
    userInput = '';
  }

  $effect(() => {
    session.currentItem;
    userInput = '';
  });
</script>

{#if session.currentItem}
  <!-- Large word display -->
  <div class="flex items-center justify-center rounded-2xl border border-[hsl(30_10%_85%)]
    bg-[hsl(50_20%_98%)] shadow-sm min-h-40 p-8 mb-6
    {session.feedback === 'correct' ? 'animate-correct animate-flash-correct' : ''}
    {session.feedback === 'incorrect' ? 'animate-shake animate-flash-incorrect' : ''}">
    <span class="leading-relaxed text-center text-[hsl(0_0%_15%)]
      {session.direction === 'to-roman'
        ? 'font-[var(--font-baybayin)] text-6xl'
        : 'text-3xl font-medium'}">
      {session.currentItem.display}
    </span>
  </div>

  <p class="text-sm text-[hsl(30_5%_45%)] text-center mb-3">{hint}</p>

  <form onsubmit={onSubmit} class="space-y-3">
    <input
      bind:this={inputEl}
      bind:value={userInput}
      type="text"
      inputmode={showKeyboard ? 'none' : 'text'}
      placeholder={showKeyboard ? 'tap keys below...' : 'type the word...'}
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
