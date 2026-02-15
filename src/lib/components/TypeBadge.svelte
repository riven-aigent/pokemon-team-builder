<script>
  import { typeColors } from '$lib/pokemon.js';
  let { type, small = false } = $props();
</script>

<span class="badge" class:small style="background: {typeColors[type] || '#888'}">
  {type}
</span>

<style>
  .badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .small {
    padding: 1px 6px;
    font-size: 0.65rem;
  }
</style>
