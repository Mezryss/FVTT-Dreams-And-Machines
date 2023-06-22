/**
 * Player Character sheet
 */
export default class CharacterSheet extends ActorSheet {
	static get defaultOptions() {
		return {
			...super.defaultOptions,
			classes: ['dnm', 'sheet', 'actor'],
		};
	}

	get template() {
		return 'systems/dreams-and-machines/templates/actor/character-sheet.hbs';
	}

	getData(options = {}) {
		return {
			...super.getData(options),
			system: this.actor.system,
		};
	}
}
