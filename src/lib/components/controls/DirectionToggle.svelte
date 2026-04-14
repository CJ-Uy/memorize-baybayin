<script lang="ts">
  import { session, setDirection } from '$lib/state/session.svelte';
</script>

<div class="flex rounded-lg border border-[hsl(30_10%_85%)] overflow-hidden w-fit">
  <button
    type="button"
    onclick={() => setDirection('to-roman')}
    class="px-4 py-2 text-sm transition-colors {session.direction === 'to-roman'
      ? 'bg-[hsl(180_60%_25%)] text-white'
      : 'bg-[hsl(50_20%_98%)] text-[hsl(30_5%_45%)] hover:bg-[hsl(30_10%_90%)]'}"
  >
    <span class="font-[var(--font-baybayin)] text-base mr-1">ᜊ</span> → abc
  </button>
  <button
    type="button"
    onclick={() => setDirection('to-baybayin')}
    class="px-4 py-2 text-sm transition-colors {session.direction === 'to-baybayin'
      ? 'bg-[hsl(180_60%_25%)] text-white'
      : 'bg-[hsl(50_20%_98%)] text-[hsl(30_5%_45%)] hover:bg-[hsl(30_10%_90%)]'}"
  >
    abc → <span class="font-[var(--font-baybayin)] text-base ml-1">ᜊ</span>
  </button>
</div>
