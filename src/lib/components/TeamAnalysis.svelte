<script>
  import { getTeamWeaknesses } from '$lib/pokemon.js';
  import { getMoveType, isStatusMove } from '$lib/moves.js';
  import { typeColors } from '$lib/pokemon.js';
  import TypeBadge from './TypeBadge.svelte';
  import threatsData from '$lib/data/threats.json';
  import typesData from '$lib/data/types.json';

  let { team = [] } = $props();

  let activeMons = $derived(team.filter(s => s && s.pokemon));
  let weaknesses = $derived(getTeamWeaknesses(activeMons.map(s => s.pokemon)));

  // Sort types by how many team members are weak to them
  let sortedWeaknesses = $derived(
    Object.entries(weaknesses)
      .map(([type, counts]) => ({ type, ...counts }))
      .sort((a, b) => (b.weak - b.resist - b.immune) - (a.weak - a.resist - a.immune))
  );

  // Offensive coverage: which types can the team hit super-effectively
  let offensiveCoverage = $derived(() => {
    const coverage = {};
    for (const type of typesData.types) coverage[type] = false;
    for (const slot of activeMons) {
      if (!slot.selectedMoves) continue;
      for (const move of slot.selectedMoves) {
        if (isStatusMove(move.name)) continue;
        for (const defType of typesData.types) {
          const eff = typesData.effectiveness[move.type];
          if (eff && eff[defType] === 2) coverage[defType] = true;
        }
      }
    }
    return coverage;
  });

  // Threat analysis
  let threatAnalysis = $derived(() => {
    return threatsData.threats.map(threat => {
      const hasCheck = threat.checks.some(check =>
        activeMons.some(s => s.pokemon.name === check)
      );
      return { ...threat, hasCheck, severity: hasCheck ? 'ok' : 'danger' };
    });
  });

  let activeTab = $state('defense');
</script>

{#if activeMons.length > 0}
<div class="analysis">
  <div class="tabs">
    <button class="tab" class:active={activeTab === 'defense'} onclick={() => activeTab = 'defense'}>
      🛡️ Defense
    </button>
    <button class="tab" class:active={activeTab === 'offense'} onclick={() => activeTab = 'offense'}>
      ⚔️ Offense
    </button>
    <button class="tab" class:active={activeTab === 'threats'} onclick={() => activeTab = 'threats'}>
      ⚠️ Threats
    </button>
    <button class="tab" class:active={activeTab === 'cores'} onclick={() => activeTab = 'cores'}>
      🔗 Cores
    </button>
  </div>

  <div class="tab-content">
    {#if activeTab === 'defense'}
      <h3>Defensive Type Coverage</h3>
      <p class="hint">How many team members are weak/resistant to each type</p>
      <div class="weakness-grid">
        {#each sortedWeaknesses as entry}
          {@const score = entry.weak - entry.resist - entry.immune}
          <div class="weakness-row" class:danger={score >= 2} class:warning={score === 1} class:safe={score <= 0}>
            <div class="type-col">
              <TypeBadge type={entry.type} />
            </div>
            <div class="bars-col">
              {#if entry.weak > 0}
                <div class="mini-bar red" style="width: {entry.weak * 30}px">
                  {entry.weak}× weak
                </div>
              {/if}
              {#if entry.resist > 0}
                <div class="mini-bar green" style="width: {entry.resist * 30}px">
                  {entry.resist}× resist
                </div>
              {/if}
              {#if entry.immune > 0}
                <div class="mini-bar blue" style="width: {entry.immune * 30}px">
                  {entry.immune}× immune
                </div>
              {/if}
            </div>
            <div class="score-col" class:text-red={score >= 2} class:text-yellow={score === 1} class:text-green={score <= 0}>
              {score > 0 ? '+' : ''}{score}
            </div>
          </div>
        {/each}
      </div>

    {:else if activeTab === 'offense'}
      <h3>Offensive Coverage</h3>
      <p class="hint">Types your team can hit super-effectively with selected moves</p>
      {@const cov = offensiveCoverage()}
      <div class="coverage-grid">
        {#each typesData.types as type}
          <div class="coverage-item" class:covered={cov[type]} class:uncovered={!cov[type]}>
            <TypeBadge type={type} />
            <span class="cov-status">{cov[type] ? '✓' : '✗'}</span>
          </div>
        {/each}
      </div>
      {@const uncovered = typesData.types.filter(t => !cov[t])}
      {#if uncovered.length > 0}
        <div class="warning-box">
          ⚠️ No super-effective coverage against: {uncovered.join(', ')}
        </div>
      {:else}
        <div class="success-box">✅ Full offensive coverage!</div>
      {/if}

    {:else if activeTab === 'threats'}
      <h3>Threat Checklist</h3>
      <p class="hint">Common OU threats and whether your team has answers</p>
      {@const threats = threatAnalysis()}
      <div class="threat-list">
        {#each threats as threat}
          <div class="threat-item" class:has-check={threat.hasCheck} class:no-check={!threat.hasCheck}>
            <div class="threat-status">
              {threat.hasCheck ? '✅' : '🚨'}
            </div>
            <div class="threat-info">
              <div class="threat-name">{threat.name}</div>
              <div class="threat-desc">{threat.description}</div>
              <div class="threat-checks">
                Checks: {threat.checks.map(c => {
                  const onTeam = activeMons.some(s => s.pokemon.name === c);
                  return onTeam ? `**${c}**` : c;
                }).join(', ')}
              </div>
            </div>
          </div>
        {/each}
      </div>

    {:else if activeTab === 'cores'}
      <h3>Team Cores</h3>
      <p class="hint">Common competitive cores found in your team</p>
      {@const teamNames = activeMons.map(s => s.pokemon.name)}
      {#each threatsData.cores as core}
        {@const matches = core.pokemon.filter(p => teamNames.includes(p))}
        {@const complete = matches.length === core.pokemon.length}
        {#if matches.length > 0}
          <div class="core-item" class:complete>
            <div class="core-header">
              <span class="core-name">{core.name}</span>
              <span class="core-count">{matches.length}/{core.pokemon.length}</span>
            </div>
            <div class="core-desc">{core.description}</div>
            <div class="core-mons">
              {#each core.pokemon as p}
                <span class="core-mon" class:on-team={teamNames.includes(p)}>{p}</span>
              {/each}
            </div>
          </div>
        {/if}
      {/each}
      {#if threatsData.cores.every(c => c.pokemon.filter(p => teamNames.includes(p)).length === 0)}
        <p class="hint">No known cores detected. Build around your own synergy!</p>
      {/if}
    {/if}
  </div>
</div>
{/if}

<style>
  .analysis {
    background: var(--bg2);
    border-radius: var(--radius);
    border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden;
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    overflow-x: auto;
  }
  .tab {
    flex: 1;
    padding: 10px 12px;
    background: none;
    color: var(--text2);
    font-size: 0.8rem;
    font-weight: 600;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .tab:hover { color: var(--text); background: rgba(255,255,255,0.03); }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); }

  .tab-content { padding: 1rem; }
  .tab-content h3 { font-size: 1rem; margin-bottom: 4px; }
  .hint { font-size: 0.78rem; color: var(--text2); margin-bottom: 1rem; }

  /* Defense tab */
  .weakness-grid { display: flex; flex-direction: column; gap: 4px; }
  .weakness-row {
    display: grid;
    grid-template-columns: 80px 1fr 40px;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    border-radius: 6px;
    background: rgba(255,255,255,0.02);
  }
  .weakness-row.danger { background: rgba(248,113,113,0.1); }
  .weakness-row.warning { background: rgba(251,191,36,0.06); }
  .weakness-row.safe { background: rgba(74,222,128,0.05); }

  .bars-col { display: flex; gap: 4px; flex-wrap: wrap; }
  .mini-bar {
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 0.65rem;
    font-weight: 600;
    color: white;
    white-space: nowrap;
  }
  .mini-bar.red { background: rgba(248,113,113,0.7); }
  .mini-bar.green { background: rgba(74,222,128,0.6); }
  .mini-bar.blue { background: rgba(96,165,250,0.6); }

  .score-col { font-weight: 700; font-size: 0.85rem; text-align: right; }
  .text-red { color: var(--red); }
  .text-yellow { color: var(--yellow); }
  .text-green { color: var(--green); }

  /* Offense tab */
  .coverage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 6px;
    margin-bottom: 1rem;
  }
  .coverage-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    border-radius: 6px;
    background: rgba(255,255,255,0.03);
  }
  .coverage-item.covered { background: rgba(74,222,128,0.1); }
  .coverage-item.uncovered { background: rgba(248,113,113,0.08); }
  .cov-status { font-weight: 700; font-size: 0.9rem; }
  .covered .cov-status { color: var(--green); }
  .uncovered .cov-status { color: var(--red); }

  .warning-box {
    padding: 10px 14px;
    background: rgba(251,191,36,0.1);
    border: 1px solid rgba(251,191,36,0.3);
    border-radius: 8px;
    font-size: 0.85rem;
    color: var(--yellow);
  }
  .success-box {
    padding: 10px 14px;
    background: rgba(74,222,128,0.1);
    border: 1px solid rgba(74,222,128,0.3);
    border-radius: 8px;
    font-size: 0.85rem;
    color: var(--green);
  }

  /* Threats tab */
  .threat-list { display: flex; flex-direction: column; gap: 8px; }
  .threat-item {
    display: flex;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    background: rgba(255,255,255,0.03);
  }
  .threat-item.no-check { background: rgba(248,113,113,0.08); border-left: 3px solid var(--red); }
  .threat-item.has-check { background: rgba(74,222,128,0.05); border-left: 3px solid var(--green); }
  .threat-status { font-size: 1.2rem; }
  .threat-name { font-weight: 700; font-size: 0.9rem; }
  .threat-desc { font-size: 0.78rem; color: var(--text2); }
  .threat-checks { font-size: 0.75rem; color: var(--text2); margin-top: 4px; }

  /* Cores tab */
  .core-item {
    padding: 10px;
    border-radius: 8px;
    background: rgba(255,255,255,0.03);
    margin-bottom: 8px;
    border-left: 3px solid var(--accent2);
  }
  .core-item.complete { border-left-color: var(--green); background: rgba(74,222,128,0.05); }
  .core-header { display: flex; justify-content: space-between; align-items: center; }
  .core-name { font-weight: 700; font-size: 0.9rem; }
  .core-count { font-size: 0.8rem; color: var(--text2); }
  .core-desc { font-size: 0.78rem; color: var(--text2); margin: 4px 0; }
  .core-mons { display: flex; gap: 6px; flex-wrap: wrap; }
  .core-mon {
    font-size: 0.78rem;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(255,255,255,0.06);
    color: var(--text2);
  }
  .core-mon.on-team { background: var(--accent); color: white; }
</style>
