<script lang="ts">
  import { session } from '$lib/state/session.svelte';

  let percent = $derived(
    session.totalCount === 0 ? 0 : Math.round((session.correctCount / session.totalCount) * 100)
  );
</script>

<div class="mb-6">
  <div class="flex justify-between text-sm text-[hsl(30_5%_45%)] mb-1">
    <span>{session.correctCount} correct</span>
    <span>{session.totalCount} answered</span>
  </div>
  <progress
    class="progress progress-success w-full h-2"
    value={percent}
    max={100}
  ></progress>
</div>
