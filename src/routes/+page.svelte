<script>
  import PokemonSlot from '$lib/components/PokemonSlot.svelte';
  import TeamAnalysis from '$lib/components/TeamAnalysis.svelte';
  import ImportExport from '$lib/components/ImportExport.svelte';
  import { teamPresets, presetList } from '$lib/data/presets';

  let team = $state([null, null, null, null, null, null]);
  let showPresets = $state(false);

  function removeSlot(i) {
    team[i] = null;
  }

  function clearTeam() {
    team = [null, null, null, null, null, null];
  }

  function handleImport(imported) {
    const newTeam = [null, null, null, null, null, null];
    for (let i = 0; i < Math.min(imported.length, 6); i++) {
      newTeam[i] = imported[i];
    }
    team = newTeam;
  }

  function loadPreset(presetId) {
    const preset = teamPresets[presetId];
    if (preset) {
      team = preset.team.map(p => ({
        name: p.name,
        types: p.types,
        ability: p.ability,
        nature: p.nature,
        evs: { ...p.evs },
        moves: [...p.moves],
        teraType: p.teraType,
        item: p.item || null
      }));
    }
    showPresets = false;
  }

  let filledCount = $derived(team.filter(s => s !== null).length);
</script>

<div class="page">
  <div class="toolbar">
    <div class="team-info">
      <span class="count">{filledCount}/6</span>
      <span class="label">Pokemon</span>
    </div>
    <div class="toolbar-actions">
      <button class="preset-btn" onclick={() => showPresets = !showPresets}>📋 Presets</button>
      <ImportExport team={team} onimport={handleImport} />
      {#if filledCount > 0}
        <button class="clear-btn" onclick={clearTeam}>🗑️ Clear</button>
      {/if}
    </div>
  </div>

  {#if showPresets}
    <div class="presets-panel">
      {#each presetList as preset}
        <button class="preset-card" onclick={() => loadPreset(preset.id)}>
          <div class="preset-name">{preset.name}</div>
          <div class="preset-desc">{preset.description}</div>
        </button>
      {/each}
    </div>
  {/if}

  <div class="content">
    <div class="team-grid">
      {#each team as slot, i}
        <PokemonSlot bind:slot={team[i]} index={i} onremove={() => removeSlot(i)} />
      {/each}
    </div>

    <div class="analysis-panel">
      <TeamAnalysis team={team} />
    </div>
  </div>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .team-info {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .count {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--accent);
  }
  .label {
    font-size: 0.9rem;
    color: var(--text2);
  }

  .toolbar-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .clear-btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    background: rgba(248,113,113,0.15);
    color: var(--red);
    transition: all 0.2s;
  }
  .clear-btn:hover { background: rgba(248,113,113,0.25); }
  .clear-btn:hover { background: rgba(248,113,113,0.25); }

  .preset-btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    background: rgba(96, 165, 250, 0.15);
    color: var(--accent);
    transition: all 0.2s;
  }
  .preset-btn:hover { background: rgba(96, 165, 250, 0.25); }

  .presets-panel {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    padding: 12px;
    background: var(--card);
    border-radius: 12px;
    border: 1px solid var(--border);
  }

  .preset-card {
    flex: 1;
    min-width: 150px;
    padding: 12px 16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
  }
  .preset-card:hover {
    border-color: var(--accent);
    background: rgba(96, 165, 250, 0.1);
  }

  .preset-name {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 4px;
  }

  .preset-desc {
    font-size: 0.8rem;
    color: var(--text2);
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }

  .team-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.7rem;
  }

  .analysis-panel {
    position: sticky;
    top: 80px;
  }

  @media (max-width: 1100px) {
    .content {
      grid-template-columns: 1fr;
    }
    .analysis-panel {
      position: static;
    }
  }

  @media (max-width: 600px) {
    .team-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
