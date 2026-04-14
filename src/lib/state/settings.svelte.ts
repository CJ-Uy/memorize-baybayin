export const settings = $state({
  classicalMode: false,    // if true, virama is hidden in display (historical Baybayin)
  showHints: true,         // show romanization hints below keyboard keys
  soundEnabled: false,     // reserved for future audio
});

// Persist to localStorage (runs in browser only)
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('baybayin-settings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(settings, parsed);
    } catch {
      // ignore corrupt data
    }
  }
}

export function saveSettings(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('baybayin-settings', JSON.stringify(settings));
  }
}
