import pokemonData from '$lib/data/pokemon.json';

/** Move type mapping based on common knowledge */
const moveTypeMap = {
  'Make It Rain': 'Steel', 'Shadow Ball': 'Ghost', 'Nasty Plot': 'Dark', 'Recover': 'Normal',
  'Thunder Wave': 'Electric', 'Trick': 'Psychic', 'Focus Blast': 'Fighting', 'Thunderbolt': 'Electric',
  'Sucker Punch': 'Dark', 'Kowtow Cleave': 'Dark', 'Iron Head': 'Steel', 'Swords Dance': 'Normal',
  'Low Kick': 'Fighting', 'Stealth Rock': 'Rock', 'Headlong Rush': 'Ground', 'Close Combat': 'Fighting',
  'Ice Spinner': 'Ice', 'Knock Off': 'Dark', 'Rapid Spin': 'Normal', 'Earthquake': 'Ground',
  'Bulk Up': 'Fighting', 'Moonblast': 'Fairy', 'Destiny Bond': 'Ghost', 'Encore': 'Normal',
  'Shadow Sneak': 'Ghost', 'Spirit Break': 'Fairy', 'Dragon Darts': 'Dragon', 'U-turn': 'Bug',
  'Draco Meteor': 'Dragon', 'Hex': 'Ghost', 'Will-O-Wisp': 'Fire', 'Dragon Dance': 'Dragon',
  'Roost': 'Flying', 'Toxic': 'Poison', 'Defog': 'Flying', 'Magma Storm': 'Fire',
  'Flash Cannon': 'Steel', 'Earth Power': 'Ground', 'Taunt': 'Dark', 'Roar': 'Normal',
  'Eruption': 'Fire', 'Stone Edge': 'Rock', 'Fly': 'Flying', 'Dark Pulse': 'Dark',
  'Sludge Bomb': 'Poison', 'Hypnosis': 'Psychic', 'Dream Eater': 'Psychic', 'Substitute': 'Normal',
  'Ivy Cudgel': 'Grass', 'Horn Leech': 'Grass', 'Spiky Shield': 'Grass', 'Power Whip': 'Grass',
  'Ceaseless Edge': 'Dark', 'Aqua Jet': 'Water', 'Sacred Sword': 'Fighting', 'Razor Shell': 'Water',
  'Acrobatics': 'Flying', 'Jaw Lock': 'Dark', 'Crunch': 'Dark', 'Dragon Claw': 'Dragon',
  'Iron Defense': 'Steel', 'Body Press': 'Fighting', 'Brave Bird': 'Flying',
  'Torch Song': 'Fire', 'Slack Off': 'Normal', 'Yawn': 'Normal', 'Hex': 'Ghost',
  'Iron Moth': 'Fire', 'Fiery Dance': 'Fire', 'Quiver Dance': 'Bug', 'Bug Buzz': 'Bug',
  'Psychic': 'Psychic', 'Energy Ball': 'Grass', 'Giga Drain': 'Grass', 'Morning Sun': 'Normal',
  'Scald': 'Water', 'Haze': 'Ice', 'Recover': 'Normal', 'Toxic Spikes': 'Poison',
  'Baneful Bunker': 'Poison', 'Calm Mind': 'Psychic', 'Flamethrower': 'Fire',
  'Soft-Boiled': 'Normal', 'Moonlight': 'Fairy', 'Thunder': 'Electric',
  'Iron Head': 'Steel', 'Howl': 'Normal', 'Crunch': 'Dark',
  'Hydro Steam': 'Water', 'Flamethrower': 'Fire', 'Dragon Pulse': 'Dragon',
  'Thunderclap': 'Electric', 'Breaking Swipe': 'Dragon', 'Outrage': 'Dragon',
  'Flare Blitz': 'Fire', 'Morning Sun': 'Normal', 'Scale Shot': 'Dragon',
  'Meteor Beam': 'Rock', 'Psyshock': 'Psychic', 'Stone Axe': 'Rock',
  'Hurricane': 'Flying', 'Bleakwind Storm': 'Flying', 'Superpower': 'Fighting',
  'Freeze-Dry': 'Ice', 'Ice Beam': 'Ice', 'Blizzard': 'Ice', 'Fusion Bolt': 'Electric',
  'Discharge': 'Electric', 'Dazzling Gleam': 'Fairy', 'Volt Switch': 'Electric',
  'Fire Punch': 'Fire', 'Extreme Speed': 'Normal', 'Multiscale': 'Normal',
  'Future Sight': 'Psychic', 'Sludge Wave': 'Poison', 'Chilly Reception': 'Ice',
  'Aura Sphere': 'Fighting', 'Luster Purge': 'Psychic', 'Mist Ball': 'Psychic',
  'Flip Turn': 'Water', 'Triple Axel': 'Ice', 'Night Slash': 'Dark',
  'Ice Shard': 'Ice', 'Icicle Crash': 'Ice', 'Pyro Ball': 'Fire', 'Court Change': 'Normal',
  'High Jump Kick': 'Fighting', 'Gunk Shot': 'Poison', 'Surging Strikes': 'Water',
  'Aqua Jet': 'Water', 'Wicked Blow': 'Dark', 'Drain Punch': 'Fighting',
  'Mystical Fire': 'Fire', 'Calm Mind': 'Psychic', 'Healing Wish': 'Psychic',
  'Springtide Storm': 'Fairy', 'Ruination': 'Dark', 'Whirlwind': 'Normal',
  'Rest': 'Psychic', 'Sleep Talk': 'Normal', 'Icicle Spear': 'Ice',
  'Flower Trick': 'Grass', 'Play Rough': 'Fairy', 'Trick Room': 'Psychic',
  'Shadow Claw': 'Ghost', 'Malignant Chain': 'Poison', 'Nasty Plot': 'Dark',
  'Fiery Wrath': 'Dark', 'Air Slash': 'Flying', 'Agility': 'Psychic',
  'Psyshock': 'Psychic', 'Focus Blast': 'Fighting', 'Expanding Force': 'Psychic',
  'Wild Charge': 'Electric', 'Brave Bird': 'Flying',
  'Transform': 'Normal',
  'Order Up': 'Dragon', 'Curse': 'Ghost', 'Rest': 'Psychic', 'Stockpile': 'Normal',
  'Wish': 'Normal', 'Protect': 'Normal', 'Flip Turn': 'Water',
  'Leech Seed': 'Grass', 'Gyro Ball': 'Steel', 'Power Whip': 'Grass',
  'Spikes': 'Ground', 'Thunder Wave': 'Electric', 'Body Slam': 'Normal'
};

/** Get the type of a move by name */
export function getMoveType(moveName) {
  return moveTypeMap[moveName] || 'Normal';
}

/** Get moves with their types for a pokemon */
export function getMovesWithTypes(pokemon) {
  if (!pokemon || !pokemon.moves) return [];
  return pokemon.moves.map(name => ({
    name,
    type: getMoveType(name)
  }));
}

/** Check if a move is a status move (non-damaging) */
const statusMoves = new Set([
  'Nasty Plot', 'Swords Dance', 'Thunder Wave', 'Trick', 'Recover', 'Stealth Rock',
  'Bulk Up', 'Encore', 'Destiny Bond', 'Dragon Dance', 'Roost', 'Toxic', 'Defog',
  'Taunt', 'Roar', 'Substitute', 'Spiky Shield', 'Will-O-Wisp', 'Iron Defense',
  'Quiver Dance', 'Haze', 'Toxic Spikes', 'Baneful Bunker', 'Calm Mind',
  'Soft-Boiled', 'Moonlight', 'Howl', 'Morning Sun', 'Yawn', 'Slack Off',
  'Court Change', 'Rest', 'Sleep Talk', 'Whirlwind', 'Wish', 'Protect',
  'Leech Seed', 'Stockpile', 'Curse', 'Agility', 'Trick Room', 'Hypnosis',
  'Chilly Reception', 'Healing Wish'
]);

export function isStatusMove(moveName) {
  return statusMoves.has(moveName);
}

/** Generate Showdown paste format for a team */
export function exportToShowdown(team) {
  const lines = [];
  for (const slot of team) {
    if (!slot || !slot.pokemon) continue;
    const mon = slot.pokemon;
    let line1 = mon.name;
    if (slot.item) line1 += ` @ ${slot.item}`;
    lines.push(line1);
    if (slot.ability) lines.push(`Ability: ${slot.ability}`);
    if (slot.teraType) lines.push(`Tera Type: ${slot.teraType}`);
    if (slot.nature) lines.push(`${slot.nature.name} Nature`);
    
    // EVs
    const evParts = [];
    const statLabels = { hp: 'HP', atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe' };
    for (const [key, label] of Object.entries(statLabels)) {
      if (slot.evs && slot.evs[key] > 0) evParts.push(`${slot.evs[key]} ${label}`);
    }
    if (evParts.length) lines.push(`EVs: ${evParts.join(' / ')}`);
    
    // IVs (only non-31)
    const ivParts = [];
    for (const [key, label] of Object.entries(statLabels)) {
      if (slot.ivs && slot.ivs[key] < 31) ivParts.push(`${slot.ivs[key]} ${label}`);
    }
    if (ivParts.length) lines.push(`IVs: ${ivParts.join(' / ')}`);
    
    // Moves
    if (slot.selectedMoves) {
      for (const move of slot.selectedMoves) {
        if (move) lines.push(`- ${move.name}`);
      }
    }
    lines.push('');
  }
  return lines.join('\n');
}

/** Parse Showdown paste format into team data */
export function importFromShowdown(text) {
  const team = [];
  const blocks = text.trim().split('\n\n');
  
  for (const block of blocks) {
    if (!block.trim()) continue;
    const lines = block.trim().split('\n');
    const slot = { evs: {hp:0,atk:0,def:0,spa:0,spd:0,spe:0}, ivs: {hp:31,atk:31,def:31,spa:31,spd:31,spe:31}, selectedMoves: [] };
    
    // Line 1: Name @ Item
    const line1 = lines[0];
    const atIdx = line1.indexOf(' @ ');
    if (atIdx > -1) {
      slot.pokemonName = line1.substring(0, atIdx).trim();
      slot.item = line1.substring(atIdx + 3).trim();
    } else {
      slot.pokemonName = line1.trim();
    }
    
    // Find pokemon in database
    slot.pokemon = pokemonData.find(p => p.name === slot.pokemonName);
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('Ability:')) {
        slot.ability = line.replace('Ability:', '').trim();
      } else if (line.startsWith('Tera Type:')) {
        slot.teraType = line.replace('Tera Type:', '').trim();
      } else if (line.endsWith('Nature')) {
        slot.natureName = line.replace('Nature', '').trim();
      } else if (line.startsWith('EVs:')) {
        const parts = line.replace('EVs:', '').split('/');
        const labelMap = { HP: 'hp', Atk: 'atk', Def: 'def', SpA: 'spa', SpD: 'spd', Spe: 'spe' };
        for (const part of parts) {
          const m = part.trim().match(/(\d+)\s+(\w+)/);
          if (m && labelMap[m[2]]) slot.evs[labelMap[m[2]]] = parseInt(m[1]);
        }
      } else if (line.startsWith('IVs:')) {
        const parts = line.replace('IVs:', '').split('/');
        const labelMap = { HP: 'hp', Atk: 'atk', Def: 'def', SpA: 'spa', SpD: 'spd', Spe: 'spe' };
        for (const part of parts) {
          const m = part.trim().match(/(\d+)\s+(\w+)/);
          if (m && labelMap[m[2]]) slot.ivs[labelMap[m[2]]] = parseInt(m[1]);
        }
      } else if (line.startsWith('- ')) {
        const moveName = line.substring(2).trim();
        slot.selectedMoves.push({ name: moveName, type: getMoveType(moveName) });
      }
    }
    
    if (slot.pokemon) team.push(slot);
  }
  return team;
}
