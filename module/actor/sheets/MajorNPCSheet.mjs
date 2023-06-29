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
		};
	}
}
