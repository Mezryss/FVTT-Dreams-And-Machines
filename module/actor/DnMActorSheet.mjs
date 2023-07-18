import DicePrompt from '../dice/DicePrompt.mjs';

/**
 * Shared base class for all Actor Sheets.
 */
export default class DnMActorSheet extends ActorSheet {
	/**
	 * Convenience accessor for the actor's data model
	 */
	get system() {
		return this.actor.system;
	}

	/**
	 * @returns {DnMActor}
	 */
	get actor() {
		return super.actor;
	}

	static get defaultOptions() {
		return {
			...super.defaultOptions,
			classes: ['dnm', 'sheet', 'actor'],
		};
	}

	get template() {
		return `systems/dreams-and-machines/templates/actor/${this.actor.type}-sheet.hbs`;
	}

	getData(options = {}) {
		return {
			...super.getData(options),
			system: this.system,
		};
	}

	/**
	 * @param {JQuery} html
	 */
	activateListeners(html) {
		super.activateListeners(html);

		html.find('[data-action="open-sheet"]').on('click', this.openSheet.bind(this));
		html.find('[data-action=roll]').on('click', this.promptForRoll.bind(this));

		html.find('[data-action=add-trait]').on('click', this.addTrait.bind(this));
		html.find('[data-action=delete-trait]').on('click', this.deleteTrait.bind(this));

		new ContextMenu(/** @type {jQuery} */ html, '[data-menu="item"]', [
			{
				name: 'Labels.Item.Edit',
				icon: '<i class="fas fa-pencil"></i>',
				callback: async (i) => {
					const uuid = i.data('uuid');
					if (!uuid) {
						return;
					}

					const item = await fromUuid(uuid);
					item?.sheet?.render(true);
				},
			},
			{
				name: 'Labels.Item.Delete',
				icon: '<i class="fas fa-trash"></i>',
				callback: async (i) => {
					const uuid = i.data('uuid');
					if (!uuid) {
						return;
					}

					const item = await fromUuid(uuid);
					await item?.delete?.();
				},
			},
		]);
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

	/**
	 * @param {MouseEvent} event
	 */
	async promptForRoll(event) {
		const target = $(event.currentTarget);

		const attribute = target.data('attribute');
		const skill = target.data('skill');

		const itemUuid = target.data('uuid');
		/** @type DnMItem|undefined */
		let item = undefined;
		if (itemUuid) {
			item = await fromUuid(itemUuid);
		}

		DicePrompt.promptForRoll({
			actor: this.actor,
			attribute,
			skill,
			item,
		});
	}

	/**
	 * @param {MouseEvent} event
	 */
	async openSheet(event) {
		const target = $(event.currentTarget);

		const uuid = target.data('uuid');
		if (!uuid) {
			return;
		}

		const item = await fromUuid(uuid);
		if (!item) {
			return;
		}

		await item?.sheet?.render(true);
	}
}
