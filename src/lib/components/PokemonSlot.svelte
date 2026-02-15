<script>
  import TypeBadge from './TypeBadge.svelte';
  import StatBar from './StatBar.svelte';
  import pokemonData from '$lib/data/pokemon.json';
  import naturesData from '$lib/data/natures.json';
  import typesData from '$lib/data/types.json';
  import { getMovesWithTypes, getMoveType, isStatusMove } from '$lib/moves.js';
  import { typeColors } from '$lib/pokemon.js';

  let { slot = $bindable(), index, onremove } = $props();

  let search = $state('');
  let showPicker = $state(false);
  let expanded = $state(false);

  let filtered = $derived(
    search.length > 0
      ? pokemonData.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      : pokemonData
  );

  function selectPokemon(mon) {
    const movesWithTypes = getMovesWithTypes(mon);
    slot = {
      pokemon: mon,
      ability: mon.abilities[0],
      nature: naturesData.natures.find(n => n.name === 'Adamant'),
      teraType: mon.types[0],
      evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      selectedMoves: [],
      item: ''
    };
    showPicker = false;
    search = '';
  }

  function toggleMove(move) {
    if (!slot) return;
    const idx = slot.selectedMoves.findIndex(m => m.name === move.name);
    if (idx > -1) {
      slot.selectedMoves = slot.selectedMoves.filter((_, i) => i !== idx);
    } else if (slot.selectedMoves.length < 4) {
      slot.selectedMoves = [...slot.selectedMoves, move];
    }
  }

  function setEv(stat, val) {
    const num = Math.max(0, Math.min(252, parseInt(val) || 0));
    const totalOther = Object.entries(slot.evs).reduce((s, [k, v]) => k === stat ? s : s + v, 0);
    slot.evs = { ...slot.evs, [stat]: Math.min(num, 510 - totalOther) };
  }

  let totalEvs = $derived(slot ? Object.values(slot.evs).reduce((a, b) => a + b, 0) : 0);

  const statLabels = { hp: 'HP', atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe' };

  const commonItems = [
    'Leftovers', 'Choice Band', 'Choice Specs', 'Choice Scarf', 'Life Orb',
    'Heavy-Duty Boots', 'Rocky Helmet', 'Assault Vest', 'Focus Sash',
    'Black Sludge', 'Toxic Orb', 'Flame Orb', 'Eviolite', 'Air Balloon',
    'Loaded Dice', 'Booster Energy', 'Clear Amulet', 'Covert Cloak',
    'Wellspring Mask', 'Hearthflame Mask', 'Cornerstone Mask'
  ];
</script>

<div class="slot" class:empty={!slot}>
  {#if !slot}
    <button class="add-btn" onclick={() => showPicker = true}>
      <span class="plus">+</span>
      <span>Slot {index + 1}</span>
    </button>
  {:else}
    <div class="slot-header">
      <div class="mon-info">
        <h3>{slot.pokemon.name}</h3>
        <div class="types">
          {#each slot.pokemon.types as t}
            <TypeBadge type={t} />
          {/each}
        </div>
      </div>
      <div class="slot-actions">
        <button class="icon-btn" onclick={() => expanded = !expanded} title={expanded ? 'Collapse' : 'Expand'}>
          {expanded ? '▲' : '▼'}
        </button>
        <button class="icon-btn remove" onclick={() => { onremove(); expanded = false; }} title="Remove">✕</button>
      </div>
    </div>

    {#if slot.selectedMoves.length > 0}
      <div class="moves-preview">
        {#each slot.selectedMoves as move}
          <span class="move-pill" style="background: {typeColors[move.type] || '#888'}55; border: 1px solid {typeColors[move.type] || '#888'}">{move.name}</span>
        {/each}
      </div>
    {/if}

    {#if expanded}
      <div class="details">
        <!-- Ability -->
        <div class="field">
          <label>Ability</label>
          <select bind:value={slot.ability}>
            {#each slot.pokemon.abilities as ab}
              <option value={ab}>{ab}</option>
            {/each}
          </select>
        </div>

        <!-- Item -->
        <div class="field">
          <label>Item</label>
          <select bind:value={slot.item}>
            <option value="">None</option>
            {#each commonItems as item}
              <option value={item}>{item}</option>
            {/each}
          </select>
        </div>

        <!-- Tera Type -->
        <div class="field">
          <label>Tera Type</label>
          <select bind:value={slot.teraType}>
            {#each typesData.types as t}
              <option value={t}>{t}</option>
            {/each}
          </select>
        </div>

        <!-- Nature -->
        <div class="field">
          <label>Nature</label>
          <select value={slot.nature?.name} onchange={(e) => {
            slot.nature = naturesData.natures.find(n => n.name === e.target.value);
          }}>
            {#each naturesData.natures as n}
              <option value={n.name}>
                {n.name}{n.plus ? ` (+${statLabels[n.plus]} -${statLabels[n.minus]})` : ''}
              </option>
            {/each}
          </select>
        </div>

        <!-- EVs -->
        <div class="evs-section">
          <div class="ev-header">
            <label>EVs</label>
            <span class="ev-total" class:over={totalEvs > 510}>{totalEvs}/510</span>
          </div>
          <div class="ev-grid">
            {#each Object.entries(statLabels) as [key, label]}
              <div class="ev-row">
                <span class="stat-label">{label}</span>
                <input type="range" min="0" max="252" step="4" value={slot.evs[key]}
                  oninput={(e) => setEv(key, e.target.value)} />
                <input type="number" min="0" max="252" step="4" value={slot.evs[key]}
                  onchange={(e) => setEv(key, e.target.value)} class="ev-num" />
                <StatBar base={slot.pokemon.baseStats[key]} iv={slot.ivs[key]} ev={slot.evs[key]} nature={slot.nature} statKey={key} />
              </div>
            {/each}
          </div>
        </div>

        <!-- Moves -->
        <div class="moves-section">
          <label>Moves ({slot.selectedMoves.length}/4)</label>
          <div class="moves-grid">
            {#each getMovesWithTypes(slot.pokemon) as move}
              {@const selected = slot.selectedMoves.some(m => m.name === move.name)}
              {@const status = isStatusMove(move.name)}
              <button class="move-btn" class:selected class:status
                onclick={() => toggleMove(move)}
                disabled={!selected && slot.selectedMoves.length >= 4}>
                <span class="move-type-dot" style="background: {typeColors[move.type]}"></span>
                {move.name}
              </button>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  {/if}

  {#if showPicker}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="picker-overlay" onclick={() => { showPicker = false; search = ''; }}>
      <div class="picker" onclick={(e) => e.stopPropagation()}>
        <input type="text" placeholder="Search Pokemon..." bind:value={search} class="search-input" />
        <div class="picker-list">
          {#each filtered as mon}
            <button class="picker-item" onclick={() => selectPokemon(mon)}>
              <span class="picker-name">{mon.name}</span>
              <div class="picker-types">
                {#each mon.types as t}
                  <TypeBadge type={t} small />
                {/each}
              </div>
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .slot {
    background: var(--bg2);
    border-radius: var(--radius);
    border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden;
    position: relative;
    transition: border-color 0.2s;
  }
  .slot:hover { border-color: rgba(255,255,255,0.15); }
  .empty { border-style: dashed; }

  .add-btn {
    width: 100%;
    padding: 2rem;
    background: none;
    color: var(--text2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    transition: color 0.2s;
  }
  .add-btn:hover { color: var(--accent); }
  .plus { font-size: 2rem; }

  .slot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    background: rgba(255,255,255,0.03);
  }
  .mon-info h3 { font-size: 1rem; margin-bottom: 4px; }
  .types { display: flex; gap: 4px; }

  .slot-actions { display: flex; gap: 4px; }
  .icon-btn {
    background: rgba(255,255,255,0.08);
    color: var(--text2);
    width: 28px;
    height: 28px;
    border-radius: 6px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .icon-btn:hover { background: rgba(255,255,255,0.15); color: var(--text); }
  .icon-btn.remove:hover { background: var(--red); color: white; }

  .moves-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 0 1rem 0.6rem;
  }
  .move-pill {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 4px;
    color: var(--text);
  }

  .details { padding: 0 1rem 1rem; }

  .field {
    margin-bottom: 0.6rem;
  }
  .field label {
    display: block;
    font-size: 0.75rem;
    color: var(--text2);
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .field select {
    width: 100%;
    padding: 6px 10px;
    font-size: 0.85rem;
  }

  .evs-section { margin-bottom: 0.8rem; }
  .ev-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .ev-header label {
    font-size: 0.75rem;
    color: var(--text2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .ev-total { font-size: 0.75rem; color: var(--green); font-weight: 600; }
  .ev-total.over { color: var(--red); }

  .ev-grid { display: flex; flex-direction: column; gap: 4px; }
  .ev-row {
    display: grid;
    grid-template-columns: 36px 1fr 52px 80px;
    align-items: center;
    gap: 6px;
  }
  .stat-label { font-size: 0.75rem; color: var(--text2); font-weight: 600; }
  input[type="range"] {
    -webkit-appearance: none;
    height: 4px;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
    border: none;
    padding: 0;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    background: var(--accent);
    border-radius: 50%;
    cursor: pointer;
  }
  .ev-num {
    width: 52px;
    text-align: center;
    padding: 2px 4px;
    font-size: 0.8rem;
  }

  .moves-section label {
    display: block;
    font-size: 0.75rem;
    color: var(--text2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }
  .moves-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .move-btn {
    background: rgba(255,255,255,0.06);
    color: var(--text);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.78rem;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.15s;
  }
  .move-btn:hover:not(:disabled) { background: rgba(255,255,255,0.12); }
  .move-btn.selected { background: var(--accent); color: white; }
  .move-btn.status { font-style: italic; }
  .move-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .move-type-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .picker-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    padding: 1rem;
  }
  .picker {
    background: var(--bg2);
    border-radius: var(--radius);
    border: 1px solid rgba(255,255,255,0.1);
    max-width: 400px;
    width: 100%;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .search-input {
    margin: 1rem;
    font-size: 1rem;
    padding: 10px 14px;
  }
  .picker-list {
    overflow-y: auto;
    flex: 1;
    padding: 0 0.5rem 0.5rem;
  }
  .picker-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: none;
    color: var(--text);
    border-radius: 8px;
    font-size: 0.9rem;
    transition: background 0.15s;
  }
  .picker-item:hover { background: rgba(255,255,255,0.08); }
  .picker-types { display: flex; gap: 4px; }
</style>
