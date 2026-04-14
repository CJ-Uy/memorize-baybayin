<script lang="ts">
  import { session } from '$lib/state/session.svelte';
  import { paragraphs } from '$lib/data/paragraphs';
  import { diffParagraph } from '$lib/utils/diff';
  import BaybayinKeyboard from '$lib/components/input/BaybayinKeyboard.svelte';
  import DiffView from './DiffView.svelte';
  import type { DiffToken } from '$lib/types/baybayin';

  const para = paragraphs[0];

  let userInput = $state('');
  let textareaEl: HTMLTextAreaElement | null = $state(null);
  let submitted = $state(false);
  let diffTokens = $state<DiffToken[]>([]);

  let showKeyboard = $derived(session.direction === 'to-baybayin');

  // In to-roman: display Baybayin, user types roman
  // In to-baybayin: display roman, user types Baybayin
  // Note: para.baybayin is a placeholder, so both directions show roman for now.
  // When para.baybayin is complete, change displayText to:
  // session.direction === 'to-roman' ? para.baybayin : para.roman
  let displayText = $derived(session.direction === 'to-roman' ? para.roman : para.roman);

  function handleSubmit(e: Event) {
    e.preventDefault();
    const expected = session.direction === 'to-roman' ? para.roman : para.baybayin;
    diffTokens = diffParagraph(expected, userInput);
    submitted = true;
    session.paragraphSubmitted = true;
  }

  function handleReset() {
    userInput = '';
    submitted = false;
    diffTokens = [];
    session.paragraphSubmitted = false;
  }
</script>

<div class="space-y-4">
  <!-- Source text -->
  <div class="rounded-xl border border-[hsl(30_10%_85%)] bg-[hsl(50_20%_98%)] p-5">
    <p class="text-xs text-[hsl(30_5%_45%)] mb-2 uppercase tracking-wide">
      {session.direction === 'to-roman' ? 'Read and transcribe' : 'Transcribe to Baybayin'}
    </p>
    <p class="whitespace-pre-line leading-relaxed text-[hsl(0_0%_15%)]
      {session.direction === 'to-roman' ? 'font-[var(--font-baybayin)] text-2xl' : 'text-base'}">
      {displayText}
    </p>
    <p class="text-xs text-[hsl(30_5%_45%)] mt-3">— {para.title}</p>
  </div>

  {#if !submitted}
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
        class="btn w-full bg-[hsl(180_60%_25%)] text-white hover:bg-[hsl(180_60%_20%)] border-0"
      >
        Submit Transcription
      </button>
    </form>
  {:else}
    <DiffView tokens={diffTokens} direction={session.direction} />

    <button
      type="button"
      onclick={handleReset}
      class="btn btn-outline border-[hsl(30_10%_85%)] w-full"
    >
      Try Again
    </button>
  {/if}
</div>
