<script>
  import { exportToShowdown, importFromShowdown } from '$lib/moves.js';

  let { team = [], onimport } = $props();
  let showModal = $state(false);
  let mode = $state('export');
  let pasteText = $state('');

  function openExport() {
    mode = 'export';
    pasteText = exportToShowdown(team);
    showModal = true;
  }

  function openImport() {
    mode = 'import';
    pasteText = '';
    showModal = true;
  }

  function doImport() {
    const imported = importFromShowdown(pasteText);
    if (imported.length > 0 && onimport) {
      onimport(imported);
      showModal = false;
    }
  }

  function copyToClipboard() {
    navigator.clipboard?.writeText(pasteText);
  }
</script>

<div class="io-buttons">
  <button class="io-btn export" onclick={openExport}>📋 Export</button>
  <button class="io-btn import" onclick={openImport}>📥 Import</button>
</div>

{#if showModal}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" onclick={() => showModal = false}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h3>{mode === 'export' ? 'Export Team' : 'Import Team'}</h3>
        <button class="close-btn" onclick={() => showModal = false}>✕</button>
      </div>
      <p class="modal-hint">
        {mode === 'export' ? 'Pokemon Showdown paste format. Copy and use anywhere.' : 'Paste a Showdown team export below.'}
      </p>
      <textarea
        bind:value={pasteText}
        class="paste-area"
        rows="14"
        placeholder={mode === 'import' ? 'Paste your team here...' : ''}
        readonly={mode === 'export'}
      ></textarea>
      <div class="modal-actions">
        {#if mode === 'export'}
          <button class="action-btn" onclick={copyToClipboard}>📋 Copy to Clipboard</button>
        {:else}
          <button class="action-btn" onclick={doImport}>📥 Import Team</button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .io-buttons {
    display: flex;
    gap: 8px;
  }
  .io-btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s;
  }
  .io-btn.export {
    background: var(--bg3);
    color: var(--text);
  }
  .io-btn.import {
    background: rgba(255,255,255,0.08);
    color: var(--text2);
  }
  .io-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 300;
    padding: 1rem;
  }
  .modal {
    background: var(--bg2);
    border-radius: var(--radius);
    border: 1px solid rgba(255,255,255,0.1);
    max-width: 500px;
    width: 100%;
    padding: 1.2rem;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .modal-header h3 { font-size: 1.1rem; }
  .close-btn {
    background: rgba(255,255,255,0.08);
    color: var(--text2);
    width: 28px;
    height: 28px;
    border-radius: 6px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn:hover { background: var(--red); color: white; }
  .modal-hint {
    font-size: 0.8rem;
    color: var(--text2);
    margin-bottom: 10px;
  }
  .paste-area {
    width: 100%;
    background: var(--bg);
    color: var(--text);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 0.82rem;
    resize: vertical;
    line-height: 1.4;
  }
  .paste-area:focus { outline: none; border-color: var(--accent); }
  .modal-actions { margin-top: 10px; display: flex; justify-content: flex-end; }
  .action-btn {
    background: var(--accent);
    color: white;
    padding: 8px 18px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.85rem;
    transition: opacity 0.2s;
  }
  .action-btn:hover { opacity: 0.85; }
</style>
