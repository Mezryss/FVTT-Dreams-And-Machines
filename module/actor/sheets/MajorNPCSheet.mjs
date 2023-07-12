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
		const actions = await Promise.all(
			this.actor.items
				.filter((i) => i.type === 'majorNPCAction')
				.map(async (i) => {
					let enrichedDescription = undefined;

					if (i.system.description) {
						enrichedDescription = await TextEditor.enrichHTML(i.system.description);
					}

					i.enrichedDescription = enrichedDescription;

					return i;
				}),
		);

		return {
			...super.getData(options),
			enrichedDescription: await TextEditor.enrichHTML(this.system.description, { async: true }),
			enrichedNotes: await TextEditor.enrichHTML(this.system.notes, { async: true }),
			actions,
		};
	}

	activateListeners(html) {
		super.activateListeners(html);

		new ContextMenu(html, '[data-menu=action]', [
			{
				name: 'Labels.Item.Edit',
				icon: '<i class="fas fa-pencil"></i>',
				callback: async (i) => {
					const uuid = i.data('uuid');
					if (!uuid) {
						return;
					}

					const item = await this.actor.items.find((i) => i.uuid === uuid);
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

					const item = await this.actor.items.find((i) => i.uuid === uuid);
					item?.delete();
				},
			},
		]);
	}
}
