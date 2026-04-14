<script lang="ts">
  import { session } from '$lib/state/session.svelte';
  import ConfigScreen  from '$lib/components/ConfigScreen.svelte';
  import ResultsScreen from '$lib/components/ResultsScreen.svelte';
  import FeedbackToast from '$lib/components/controls/FeedbackToast.svelte';
  import MultipleChoice    from '$lib/components/quiz/MultipleChoice.svelte';
  import ActiveInput       from '$lib/components/quiz/ActiveInput.svelte';
  import WordTranscription from '$lib/components/quiz/WordTranscription.svelte';
  import ParagraphMode     from '$lib/components/quiz/ParagraphMode.svelte';
</script>

<svelte:head>
  <title>Baybayin Practice</title>
</svelte:head>

{#if session.appPhase === 'config'}
  <ConfigScreen />

{:else if session.appPhase === 'quiz'}
  <div class="space-y-4 max-w-lg mx-auto">
    {#if session.level !== 4}
      <!-- Progress bar shows position in session queue -->
      <div>
        <div class="flex justify-between text-sm text-[hsl(30_5%_45%)] mb-1">
          <span class="text-muted-foreground">Card {Math.min(session.sessionIndex + 1, session.sessionQueue.length)} of {session.sessionQueue.length}</span>
          <span class="text-muted-foreground">{session.correctCount} correct</span>
        </div>
        <progress
          class="progress progress-success w-full h-2"
          value={session.sessionIndex}
          max={session.sessionQueue.length}
        ></progress>
      </div>
    {/if}

    <div class="pt-2 min-h-80">
      {#if session.level === 1}
        <MultipleChoice />
      {:else if session.level === 2}
        <ActiveInput />
      {:else if session.level === 3}
        <WordTranscription />
      {:else}
        <ParagraphMode />
      {/if}
    </div>

    <FeedbackToast />
  </div>

{:else}
  <ResultsScreen />
{/if}
