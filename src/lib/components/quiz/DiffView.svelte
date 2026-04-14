<script lang="ts">
  import type { DiffToken } from '$lib/types/baybayin';
  import { calcAccuracy } from '$lib/utils/diff';

  let { tokens, direction }: { tokens: DiffToken[]; direction: 'to-roman' | 'to-baybayin' } = $props();

  let accuracy = $derived(calcAccuracy(tokens));

  function colorClass(status: DiffToken['status']): string {
    switch (status) {
      case 'correct':  return 'bg-green-100 text-green-800 border-green-200';
      case 'wrong':    return 'bg-red-100 text-red-800 border-red-200';
      case 'missing':  return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'extra':    return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  }
</script>

<div class="space-y-4">
  <!-- Accuracy score -->
  <div class="flex items-center justify-between">
    <span class="text-sm text-[hsl(30_5%_45%)]">Accuracy</span>
    <span class="text-2xl font-semibold text-[hsl(180_60%_25%)]">{accuracy}%</span>
  </div>
  <progress class="progress progress-success w-full" value={accuracy} max={100}></progress>

  <!-- Token legend -->
  <div class="flex gap-3 text-xs flex-wrap">
    <span class="px-2 py-0.5 rounded border bg-green-100 text-green-800 border-green-200">correct</span>
    <span class="px-2 py-0.5 rounded border bg-red-100 text-red-800 border-red-200">wrong</span>
    <span class="px-2 py-0.5 rounded border bg-amber-100 text-amber-800 border-amber-200">missing</span>
    <span class="px-2 py-0.5 rounded border bg-blue-100 text-blue-800 border-blue-200">extra</span>
  </div>

  <!-- Diff tokens -->
  <div class="flex flex-wrap gap-1.5">
    {#each tokens as token}
      <div class="flex flex-col items-center">
        <span class="px-2 py-1 rounded border text-sm {colorClass(token.status)}
          {direction === 'to-roman' ? '' : 'font-[var(--font-baybayin)]'}">
          {token.actual || '—'}
        </span>
        {#if token.status !== 'correct' && token.expected}
          <span class="text-xs text-[hsl(30_5%_45%)] mt-0.5">{token.expected}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
