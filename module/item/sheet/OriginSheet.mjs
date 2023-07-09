import DnMItemSheet from '../DnMItemSheet.mjs';
import { DnMItem } from '../DnMItem.mjs';

/**
 * Document sheet for origins.
 */
export default class OriginSheet extends DnMItemSheet {
	/** @type OriginDataModel */
	get system() {
		return this.item.system;
	}

	activateListeners(html) {
		super.activateListeners(html);

		new ContextMenu(html, '[data-menu=archetype]', [
			{
				name: 'Labels.Item.Edit',
				icon: '<i class="fas fa-pencil"></i>',
				callback: async (i) => {
					const uuid = i.data('uuid');
					if (!uuid) {
						return;
					}

					const document = await fromUuid(uuid);
					document?.sheet?.render(true);
				},
			},

			{
				name: 'Labels.Item.Delete',
				icon: '<i class="fas fa-trash"></i>',
				callback: async (i) => {
					const index = +i.data('index');
					if (isNaN(index) || index < 0) {
						return;
					}

					const archetypes = [...this.system.archetypes];
					archetypes.splice(index, 1);

					await this.item.update({
						'system.archetypes': archetypes,
					});
				},
			},
		]);
	}

	async getData(options = {}) {
		const enrichedBenefitDescription = await TextEditor.enrichHTML(this.system.benefit.description);
		const archetypes = await Promise.all(this.system.archetypes.map(i => fromUuid(i)));

		return {
			...(await super.getData(options)),
			archetypes,
			enrichedBenefitDescription,
		}
	}

	async _onDropItem(_event, data) {
		if (!this.isEditable || !data.uuid) {
			return;
		}

		/** @type DnMItem */
		const droppedItem = await DnMItem.implementation.fromDropData(data);
		if (droppedItem.type !== 'archetype') {
			return;
		}

		// Disallow multiples of the same item.
		if (this.system.archetypes.find((id) => id === droppedItem.uuid)) {
			return;
		}

		await this.item.update({
			'system.archetypes': [...this.system.archetypes, droppedItem.uuid],
		});
	}
}
