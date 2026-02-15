<script>
  import '../app.css';
  let { children } = $props();
</script>

<div class="app">
  <header>
    <div class="header-inner">
      <h1>⚔️ Pokemon Team Builder</h1>
      <span class="subtitle">Gen 9 OU</span>
    </div>
  </header>
  <main>
    {@render children()}
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  header {
    background: linear-gradient(135deg, var(--bg2), var(--bg3));
    border-bottom: 2px solid var(--accent);
    padding: 1rem;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .header-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  h1 {
    font-size: 1.4rem;
    font-weight: 700;
  }
  .subtitle {
    background: var(--accent);
    color: white;
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  main {
    flex: 1;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    padding: 1rem;
  }
</style>
