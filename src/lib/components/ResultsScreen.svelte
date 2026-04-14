<script lang="ts">
  import { session, goToConfig, startQuiz } from '$lib/state/session.svelte';
  import DiffView from '$lib/components/quiz/DiffView.svelte';
  import { calcAccuracy } from '$lib/utils/diff';
  import { CheckCircle, XCircle, RotateCcw, Settings } from 'lucide-svelte';

  let accuracy = $derived(
    session.totalCount === 0
      ? 0
      : Math.round((session.correctCount / session.totalCount) * 100)
  );

  let accuracyColor = $derived(
    accuracy >= 80 ? 'text-green-600' :
    accuracy >= 50 ? 'text-[hsl(35_90%_45%)]' :
    'text-red-600'
  );

  let progressColor = $derived(
    accuracy >= 80 ? 'progress-success' :
    accuracy >= 50 ? 'progress-warning' :
    'progress-error'
  );

  let paragraphAccuracy = $derived(
    session.diffTokens.length > 0 ? calcAccuracy(session.diffTokens) : 0
  );
</script>

<div class="max-w-lg mx-auto space-y-8">

  <!-- Header -->
  <div class="text-center py-4">
    <h1 class="text-2xl font-semibold text-[hsl(0_0%_15%)] mb-1">Session Complete</h1>
  </div>

  {#if session.level === 4 && session.diffTokens.length > 0}
    <!-- Paragraph results: show diff -->
    <DiffView tokens={session.diffTokens} direction={session.direction} />
  {:else}
    <!-- Card results: show score -->
    <div class="rounded-2xl border border-[hsl(30_10%_85%)] bg-[hsl(50_20%_98%)] p-6 text-center">
      <div class="text-5xl font-bold {accuracyColor} mb-1">{accuracy}%</div>
      <p class="text-[hsl(30_5%_45%)] text-sm mb-4">{session.correctCount} of {session.totalCount} correct</p>
      <progress class="progress {progressColor} w-full h-3" value={accuracy} max={100}></progress>
    </div>

    <!-- Card-by-card breakdown -->
    {#if session.sessionResults.length > 0}
      <section>
        <h2 class="text-sm font-medium text-[hsl(30_5%_45%)] uppercase tracking-wide mb-3">Review</h2>
        <div class="space-y-2">
          {#each session.sessionResults as result}
            <div class="flex items-center gap-3 px-4 py-3 rounded-lg border
              {result.correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}">
              {#if result.correct}
                <CheckCircle class="w-4 h-4 text-green-600 shrink-0" />
              {:else}
                <XCircle class="w-4 h-4 text-red-600 shrink-0" />
              {/if}
              <span class="font-[var(--font-baybayin)] text-xl text-[hsl(0_0%_15%)] w-12 shrink-0 text-center">
                {session.direction === 'to-roman' ? result.display : result.answer}
              </span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-[hsl(0_0%_15%)]">{result.answer}</p>
                {#if !result.correct && result.userInput}
                  <p class="text-xs text-red-600">You wrote: {result.userInput}</p>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}
  {/if}

  <!-- Actions -->
  <div class="flex gap-3">
    <button
      type="button"
      onclick={goToConfig}
      class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[hsl(30_10%_85%)]
        bg-[hsl(50_20%_98%)] text-[hsl(0_0%_15%)] text-sm font-medium
        hover:bg-[hsl(30_10%_90%)] active:scale-[0.98] transition-all"
    >
      <Settings class="w-4 h-4" />
      Adjust Settings
    </button>
    <button
      type="button"
      onclick={startQuiz}
      class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
        bg-[hsl(180_60%_25%)] text-white text-sm font-medium
        hover:bg-[hsl(180_60%_20%)] active:scale-[0.98] transition-all"
    >
      <RotateCcw class="w-4 h-4" />
      Practice Again
    </button>
  </div>

</div>
