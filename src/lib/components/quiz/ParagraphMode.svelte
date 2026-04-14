<script lang="ts">
  import { session, finishParagraph } from '$lib/state/session.svelte';
  import { paragraphs } from '$lib/data/paragraphs';
  import { diffParagraph } from '$lib/utils/diff';
  import BaybayinKeyboard from '$lib/components/input/BaybayinKeyboard.svelte';

  const para = paragraphs[0];

  let userInput = $state('');
  let textareaEl: HTMLTextAreaElement | null = $state(null);

  let showKeyboard = $derived(session.direction === 'to-baybayin');
  let displayText = $derived(session.direction === 'to-roman' ? para.roman : para.roman);

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!userInput.trim()) return;
    const expected = session.direction === 'to-roman' ? para.roman : para.baybayin;
    const tokens = diffParagraph(expected, userInput);
    finishParagraph(tokens, userInput);
  }
</script>

<div class="space-y-4">
  <div class="rounded-xl border border-[hsl(30_10%_85%)] bg-[hsl(50_20%_98%)] p-5">
    <p class="text-xs text-[hsl(30_5%_45%)] mb-2 uppercase tracking-wide">
      {session.direction === 'to-roman' ? 'Read and transcribe' : 'Transcribe to Baybayin'}
    </p>
    <p class="whitespace-pre-line leading-relaxed text-[hsl(0_0%_15%)]
      {session.direction === 'to-roman' ? 'font-(--font-baybayin) text-2xl' : 'text-base'}">
      {displayText}
    </p>
    <p class="text-xs text-[hsl(30_5%_45%)] mt-3">— {para.title}</p>
  </div>

  <form onsubmit={handleSubmit} class="space-y-3">
    <textarea
      bind:this={textareaEl}
      bind:value={userInput}
      rows={6}
      inputmode={showKeyboard ? 'none' : undefined}
      placeholder={showKeyboard ? 'tap keys below to write Baybayin...' : 'type your transcription here...'}
      spellcheck={false}
      class="textarea textarea-bordered w-full resize-none text-base leading-relaxed
        {showKeyboard ? 'font-[var(--font-baybayin)] text-xl' : ''}"
    ></textarea>

    {#if showKeyboard}
      <BaybayinKeyboard target={textareaEl} />
    {/if}

    <button
      type="submit"
      disabled={!userInput.trim()}
      class="btn w-full bg-primary text-white hover:bg-[hsl(180_60%_20%)] border-0"
    >
      Submit Transcription
    </button>
  </form>
</div>
