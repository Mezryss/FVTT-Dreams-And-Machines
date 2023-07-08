import DnMItemSheet from '../DnMItemSheet.mjs';
import { DnMItem } from '../DnMItem.mjs';

/**
 * Document sheet for archetypes.
 */
export default class ArchetypeSheet extends DnMItemSheet {
	/** @type ArchetypeDataModel */
	get system() { return this.item.system; }

	activateListeners(html) {
		super.activateListeners(html);

		new ContextMenu(html, '[data-menu=starting-gear]', [
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

					const gear = [...this.system.startingGear];
					gear.splice(index, 1);

					await this.item.update({
						'system.startingGear': gear,
					});
				},
			}
		]);
	}

	async getData(options = {}) {
		/** @type DnMItem[] */
		const startingGear = await Promise.all(
			this.system.startingGear.map(i => fromUuid(i)),
		);

		return {
			...await super.getData(options),
			startingGear,
		};
	}

	async _onDropItem(_event, data) {
		if (!this.isEditable || !data.uuid) {
			return;
		}

		/** @type DnMItem */
		const droppedItem = await DnMItem.implementation.fromDropData(data);
		if (droppedItem.type !== 'item') {
			return;
		}

		// Disallow multiples of the same item.
		if (this.system.startingGear.find(id => id === droppedItem.uuid)) {
			return;
		}

		await this.item.update({
			'system.startingGear': [
				...this.system.startingGear,
				droppedItem.uuid,
			],
		});
	}
}
