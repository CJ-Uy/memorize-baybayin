<script lang="ts">
  import { session } from '$lib/state/session.svelte';
  import { CheckCircle, XCircle } from 'lucide-svelte';
</script>

{#if session.feedback !== 'idle'}
  <div class="flex items-center gap-2 justify-center py-2 text-sm font-medium
    {session.feedback === 'correct'
      ? 'text-green-700'
      : 'text-red-700'}">
    {#if session.feedback === 'correct'}
      <CheckCircle class="w-4 h-4" />
      <span>Correct!</span>
    {:else}
      <XCircle class="w-4 h-4" />
      <span>Incorrect — correct answer: {session.currentItem?.answer}</span>
    {/if}
  </div>
{/if}
