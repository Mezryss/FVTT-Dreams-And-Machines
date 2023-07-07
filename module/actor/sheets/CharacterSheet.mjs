import DnMActorSheet from '../DnMActorSheet.mjs';

/**
 * Player Character sheet
 */
export default class CharacterSheet extends DnMActorSheet {
	/**
	 * @returns {CharacterDataModel}
	 */
	get system() {
		return super.system;
	}

	async getData(options = {}) {
		const talents = await Promise.all(
			this.actor.items
				.filter((i) => i.type === 'talent')
				.map(
					/**
					 * @param {DnMItem} i
					 */
					async (i) => ({
						uuid: i.uuid,
						name: i.name,
						description: await TextEditor.enrichHTML(i.system.description, { async: true }),
					}),
				),
		);
		const equipment = await Promise.all(
			this.actor.items
				.filter((i) => i.type === 'item')
				.map(
					/**
					 * @param {DnMItem} item
					 */
					async (item) => {
						item.system.description = await TextEditor.enrichHTML(item.system.description, { async: true });

						return item;
					},
				),
		);

		return {
			...super.getData(options),
			talents,
			equipment,
			enrichedGoal: await TextEditor.enrichHTML(this.system.goal, { async: true }),
			enrichedAttitude: await TextEditor.enrichHTML(this.system.attitude, { async: true }),
			enrichedDrive: await TextEditor.enrichHTML(this.system.drive, { async: true }),
		};
	}
}
