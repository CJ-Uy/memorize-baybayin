<script lang="ts">
  import { session } from '$lib/state/session.svelte';

  let { value, large = false }: { value: string; large?: boolean } = $props();

  let animClass = $derived(
    session.feedback === 'correct'
      ? 'animate-correct animate-flash-correct'
      : session.feedback === 'incorrect'
        ? 'animate-shake animate-flash-incorrect'
        : ''
  );
</script>

<div
  class="flex items-center justify-center rounded-2xl border border-[hsl(30_10%_85%)]
    bg-[hsl(50_20%_98%)] shadow-sm transition-all mb-6 {animClass}
    {large ? 'min-h-48 p-8' : 'min-h-32 p-6'}"
>
  <span
    class="font-[var(--font-baybayin)] select-none leading-none text-[hsl(0_0%_15%)]
      {large ? 'text-8xl' : 'text-6xl'}"
  >
    {value}
  </span>
</div>
