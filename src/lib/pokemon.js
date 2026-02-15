import typesData from '$lib/data/types.json';

const { effectiveness } = typesData;
const allTypes = typesData.types;

/** Get effectiveness multiplier of attacking type vs defending types */
export function getEffectiveness(atkType, defTypes) {
  let mult = 1;
  for (const defType of defTypes) {
    const chart = effectiveness[atkType];
    if (chart && chart[defType] !== undefined) {
      mult *= chart[defType];
    }
  }
  return mult;
}

/** Get all defensive weaknesses/resistances for a type combo */
export function getDefensiveProfile(types) {
  const profile = {};
  for (const atkType of allTypes) {
    const mult = getEffectiveness(atkType, types);
    if (mult !== 1) {
      profile[atkType] = mult;
    }
  }
  return profile;
}

/** Get team defensive coverage: which types threaten the team */
export function getTeamWeaknesses(team) {
  const typeCount = {};
  for (const t of allTypes) typeCount[t] = { weak: 0, resist: 0, immune: 0 };
  
  for (const mon of team) {
    if (!mon) continue;
    for (const atkType of allTypes) {
      const mult = getEffectiveness(atkType, mon.types);
      if (mult > 1) typeCount[atkType].weak++;
      else if (mult === 0) typeCount[atkType].immune++;
      else if (mult < 1) typeCount[atkType].resist++;
    }
  }
  return typeCount;
}

/** Get offensive coverage for a set of move types */
export function getOffensiveCoverage(moveTypes) {
  const coverage = {};
  for (const defType of allTypes) {
    let bestMult = 0;
    for (const atkType of moveTypes) {
      const mult = getEffectiveness(atkType, [defType]);
      if (mult > bestMult) bestMult = mult;
    }
    coverage[defType] = bestMult;
  }
  return coverage;
}

/** Get team offensive coverage: types the team can hit super-effectively */
export function getTeamOffensiveCoverage(team) {
  const allMoveTypes = new Set();
  for (const mon of team) {
    if (!mon || !mon.selectedMoves) continue;
    for (const move of mon.selectedMoves) {
      if (move && move.type) allMoveTypes.add(move.type);
    }
  }
  return getOffensiveCoverage([...allMoveTypes]);
}

/** Calculate a stat at level 100 */
export function calcStat(base, iv, ev, nature, statKey) {
  if (statKey === 'hp') {
    if (base === 1) return 1; // Shedinja
    return Math.floor((2 * base + iv + Math.floor(ev / 4)) * 100 / 100) + 100 + 10;
  }
  let n = 1.0;
  if (nature && nature.plus === statKey) n = 1.1;
  if (nature && nature.minus === statKey) n = 0.9;
  return Math.floor((Math.floor((2 * base + iv + Math.floor(ev / 4)) * 100 / 100) + 5) * n);
}

/** Type color map */
export const typeColors = {
  Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0', Electric: '#F8D030',
  Grass: '#78C850', Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0',
  Ground: '#E0C068', Flying: '#A890F0', Psychic: '#F85888', Bug: '#A8B820',
  Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8', Dark: '#705848',
  Steel: '#B8B8D0', Fairy: '#EE99AC'
};
