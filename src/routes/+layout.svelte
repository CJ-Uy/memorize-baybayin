<script lang="ts">
  import './layout.css';
  import { page } from '$app/stores';

  let { children } = $props();
</script>

<div class="min-h-screen bg-[hsl(50_20%_98%)] text-[hsl(0_0%_15%)] font-sans">
  <header class="border-b border-[hsl(30_10%_85%)] bg-[hsl(50_20%_98%)]">
    <nav class="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2 font-semibold text-[hsl(180_60%_25%)]">
        <span class="font-[var(--font-baybayin)] text-2xl">ᜊᜌ᜔ᜊᜌᜒᜈ᜔</span>
        <span class="text-sm hidden sm:block">Baybayin</span>
      </a>
      <div class="flex items-center gap-4 text-sm">
        <a
          href="/"
          class="transition-colors {($page.url.pathname as string) === '/' ? 'text-[hsl(180_60%_25%)] font-medium' : 'text-[hsl(30_5%_45%)] hover:text-[hsl(0_0%_15%)]'}"
        >
          Practice
        </a>
        <a
          href="/about"
          class="transition-colors {($page.url.pathname as string) === '/about' ? 'text-[hsl(180_60%_25%)] font-medium' : 'text-[hsl(30_5%_45%)] hover:text-[hsl(0_0%_15%)]'}"
        >
          About
        </a>
      </div>
    </nav>
  </header>

  <main class="max-w-3xl mx-auto px-4 py-8">
    {@render children()}
  </main>
</div>
