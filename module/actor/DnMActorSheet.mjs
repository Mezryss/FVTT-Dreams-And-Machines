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
