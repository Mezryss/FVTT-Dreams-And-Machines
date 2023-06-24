/**
 * Shared base class for all Item Sheets.
 */
export default class DnMItemSheet extends ItemSheet {
	/**
	 * Convenience accessor for the item's data model
	 */
	get system() {
		return this.item.system;
	}

	static get defaultOptions() {
		return {
			...super.defaultOptions,
			classes: ['dnm', 'sheet', 'item'],
		};
	}

	get template() {
		return `systems/dreams-and-machines/templates/item/${this.item.type}-sheet.hbs`;
	}

	async getData(options = {}) {
		const enrichedDescription = await TextEditor.enrichHTML(this.system.description, { async: true });

		return {
			...super.getData(options),
			system: this.system,
			enrichedDescription,
		};
	}
}
