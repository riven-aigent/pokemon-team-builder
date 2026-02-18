// Sample team presets for different playstyles
export const teamPresets = {
	semistall: {
		name: "Semistall Core",
		description: "Defensive backbone with win conditions",
		team: [
			{
				name: "Blissey",
				types: ["Normal"],
				ability: "Natural Cure",
				nature: "Calm",
				evs: { hp: 252, def: 0, spa: 0, spd: 252, spe: 4 },
				moves: ["Soft-Boiled", "Stealth Rock", "Seismic Toss", "Thunder Wave"],
				teraType: "Ghost"
			},
			{
				name: "Corviknight",
				types: ["Steel", "Flying"],
				ability: "Pressure",
				nature: "Impish",
				evs: { hp: 248, def: 252, spa: 0, spd: 8, spe: 0 },
				moves: ["Roost", "Defog", "Brave Bird", "U-turn"],
				teraType: "Dragon"
			},
			{
				name: "Great Tusk",
				types: ["Ground", "Fighting"],
				ability: "Protosynthesis",
				nature: "Impish",
				evs: { hp: 252, def: 252, spa: 0, spd: 4, spe: 0 },
				moves: ["Rapid Spin", "Earthquake", "Knock Off", "Body Press"],
				teraType: "Steel"
			},
			{
				name: "Slowking-Galar",
				types: ["Poison", "Psychic"],
				ability: "Regenerator",
				nature: "Calm",
				evs: { hp: 252, def: 0, spa: 0, spd: 252, spe: 4 },
				moves: ["Chilly Reception", "Future Sight", "Sludge Bomb", "Flamethrower"],
				teraType: "Water"
			},
			{
				name: "Dragapult",
				types: ["Dragon", "Ghost"],
				ability: "Infiltrator",
				nature: "Timid",
				evs: { hp: 0, def: 0, spa: 252, spd: 4, spe: 252 },
				moves: ["Draco Meteor", "Shadow Ball", "U-turn", "Will-O-Wisp"],
				teraType: "Fairy"
			},
			{
				name: "Iron Valiant",
				types: ["Fairy", "Fighting"],
				ability: "Quark Drive",
				nature: "Timid",
				evs: { hp: 0, def: 0, spa: 252, spd: 4, spe: 252 },
				moves: ["Moonblast", "Spirit Break", "Thunderbolt", "Calm Mind"],
				teraType: "Fairy"
			}
		]
	},
	balance: {
		name: "Balance Core",
		description: "Mix of offense and defense",
		team: [
			{
				name: "Garganacl",
				types: ["Rock"],
				ability: "Purifying Salt",
				nature: "Careful",
				evs: { hp: 252, def: 4, spa: 0, spd: 252, spe: 0 },
				moves: ["Salt Cure", "Recover", "Stealth Rock", "Earthquake"],
				teraType: "Ghost"
			},
			{
				name: "Kingambit",
				types: ["Dark", "Steel"],
				ability: "Supreme Overlord",
				nature: "Adamant",
				evs: { hp: 0, def: 0, spa: 0, spd: 252, spe: 252 },
				moves: ["Sucker Punch", "Kowtow Cleave", "Iron Head", "Swords Dance"],
				teraType: "Flying"
			},
			{
				name: "Ogerpon-Wellspring",
				types: ["Water", "Grass"],
				ability: "Water Absorb",
				nature: "Jolly",
				evs: { hp: 0, def: 0, spa: 0, spd: 4, spe: 252 },
				moves: ["Ivy Cudgel", "Horn Leech", "Spiky Shield", "Swords Dance"],
				teraType: "Water"
			},
			{
				name: "Zapdos",
				types: ["Electric", "Flying"],
				ability: "Static",
				nature: "Bold",
				evs: { hp: 248, def: 252, spa: 0, spd: 8, spe: 0 },
				moves: ["Volt Switch", "Hurricane", "Roost", "Defog"],
				teraType: "Ground"
			},
			{
				name: "Enamorus",
				types: ["Fairy", "Flying"],
				ability: "Cute Charm",
				nature: "Timid",
				evs: { hp: 0, def: 0, spa: 252, spd: 4, spe: 252 },
				moves: ["Moonblast", "Earth Power", "Psychic", "Nasty Plot"],
				teraType: "Fairy"
			},
			{
				name: "Ting-Lu",
				types: ["Dark", "Ground"],
				ability: "Vessel of Ruin",
				nature: "Careful",
				evs: { hp: 252, def: 4, spa: 0, spd: 252, spe: 0 },
				moves: ["Earthquake", "Ruination", "Spikes", "Heavy Slam"],
				teraType: "Water"
			}
		]
	},
	hazardStack: {
		name: "Hazard Stack",
		description: "Spikes + TSpikes + SR pressure",
		team: [
			{
				name: "Samurott-Hisui",
				types: ["Water", "Dark"],
				ability: "Sharpness",
				nature: "Adamant",
				evs: { hp: 0, def: 0, spa: 0, spd: 4, spe: 252 },
				moves: ["Ceaseless Edge", "Aqua Jet", "Megahorn", "Swords Dance"],
				teraType: "Water"
			},
			{
				name: "Clodsire",
				types: ["Poison", "Ground"],
				ability: "Unaware",
				nature: "Careful",
				evs: { hp: 252, def: 4, spa: 0, spd: 252, spe: 0 },
				moves: ["Recover", "Toxic Spikes", "Earthquake", "Stealth Rock"],
				teraType: "Water"
			},
			{
				name: "Corviknight",
				types: ["Steel", "Flying"],
				ability: "Pressure",
				nature: "Impish",
				evs: { hp: 248, def: 252, spa: 0, spd: 8, spe: 0 },
				moves: ["Roost", "Defog", "Brave Bird", "U-turn"],
				teraType: "Dragon"
			},
			{
				name: "Gholdengo",
				types: ["Steel", "Ghost"],
				ability: "Good as Gold",
				nature: "Modest",
				evs: { hp: 0, def: 0, spa: 252, spd: 4, spe: 252 },
				moves: ["Make It Rain", "Shadow Ball", "Nasty Plot", "Recover"],
				teraType: "Fairy"
			},
			{
				name: "Dragapult",
				types: ["Dragon", "Ghost"],
				ability: "Infiltrator",
				nature: "Timid",
				evs: { hp: 0, def: 0, spa: 252, spd: 4, spe: 252 },
				moves: ["Draco Meteor", "Shadow Ball", "U-turn", "Will-O-Wisp"],
				teraType: "Fairy"
			},
			{
				name: "Iron Moth",
				types: ["Fire", "Poison"],
				ability: "Quark Drive",
				nature: "Timid",
				evs: { hp: 0, def: 0, spa: 252, spd: 4, spe: 252 },
				moves: ["Fiery Dance", "Sludge Wave", "Energy Ball", "Morning Sun"],
				teraType: "Ground"
			}
		]
	}
};

export const presetList = Object.entries(teamPresets).map(([key, value]) => ({
	id: key,
	name: value.name,
	description: value.description
}));
