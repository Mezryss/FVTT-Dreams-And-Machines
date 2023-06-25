import DnMActorSheet from '../DnMActorSheet.mjs';

/**
 * Manor JPC Sheet
 */
export default class MajorNPCSheet extends DnMActorSheet {
	/**
	 * @returns {ManorNPCDataModel}
	 */
	get system() {
		return super.system;
	}

	async getData(options = {}) {
		return {
			...super.getData(options),
			enrichedDescription: await TextEditor.enrichHTML(this.system.description, { async: true }),
			enrichedNotes: await TextEditor.enrichHTML(this.system.notes, { async: true }),
			traits: this.system.traits,
		};
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find('[data-action=add-trait]').on('click', this.addTrait.bind(this));
		html.find('[data-action=delete-trait]').on('click', this.deleteTrait.bind(this));
	}

	async addTrait() {
		await this.actor.update({
			'system.traits': [
				// Object.values is a workaround for Foundry trying to turn this into an object.
				...Object.values(this.system.traits),
				'New Trait',
			],
		});
	}

	/**
	 * @param {MouseEvent} event
	 */
	async deleteTrait(event) {
		const target = $(event.currentTarget);
		const index = target.data('index');

		const traits = Object.values(this.system.traits);
		traits.splice(index, 1);

		await this.actor.update({
			'system.traits': traits,
		});
	}
}
