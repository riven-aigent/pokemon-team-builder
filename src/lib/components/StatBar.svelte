<script>
  import { calcStat } from '$lib/pokemon.js';
  let { base, iv = 31, ev = 0, nature = null, statKey } = $props();
  
  let final = $derived(calcStat(base, iv, ev, nature, statKey));
  let percent = $derived(Math.min(100, (final / 500) * 100));
  let color = $derived(
    final >= 350 ? '#4ade80' :
    final >= 250 ? '#86efac' :
    final >= 150 ? '#fbbf24' :
    final >= 100 ? '#fb923c' : '#f87171'
  );
</script>

<div class="bar-wrap">
  <div class="bar" style="width: {percent}%; background: {color}"></div>
  <span class="value">{final}</span>
</div>

<style>
  .bar-wrap {
    position: relative;
    height: 18px;
    background: rgba(255,255,255,0.05);
    border-radius: 4px;
    overflow: hidden;
  }
  .bar {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  .value {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.7rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }
</style>
