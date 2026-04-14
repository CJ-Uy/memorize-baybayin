<script lang="ts">
  import { onMount } from 'svelte';
  import { nextItem } from '$lib/state/session.svelte';
  import { session } from '$lib/state/session.svelte';
  import SessionProgress   from '$lib/components/controls/SessionProgress.svelte';
  import ModeSelector      from '$lib/components/controls/ModeSelector.svelte';
  import DirectionToggle   from '$lib/components/controls/DirectionToggle.svelte';
  import KudlitSelector    from '$lib/components/controls/KudlitSelector.svelte';
  import FeedbackToast     from '$lib/components/controls/FeedbackToast.svelte';
  import MultipleChoice    from '$lib/components/quiz/MultipleChoice.svelte';
  import ActiveInput       from '$lib/components/quiz/ActiveInput.svelte';
  import WordTranscription from '$lib/components/quiz/WordTranscription.svelte';
  import ParagraphMode     from '$lib/components/quiz/ParagraphMode.svelte';

  onMount(() => {
    nextItem();
  });
</script>

<svelte:head>
  <title>Baybayin Practice</title>
</svelte:head>

<div class="space-y-4">
  <SessionProgress />

  <ModeSelector />

  <div class="flex flex-wrap items-center gap-3 pb-4 border-b border-[hsl(30_10%_85%)]">
    <DirectionToggle />
    <KudlitSelector />
  </div>

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
