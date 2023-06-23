import ItemDataModel from "./data/ItemDataModel.mjs";
import DnMItemSheet from "./sheet/DnMItemSheet.mjs";

/**
 * Shared base class for all Dreams and Machines item documents.
 */
export class DnMItem extends Item {
}

/**
 * Handles registration for the DnMItem class, sheets, all data models.
 */
export function registerItems() {
	CONFIG.Item.documentClass = DnMItem;

	registerDataModels();
	registerSheets();
}

/**
 * Handles registration for all Dreams and Machine Item data models.
 */
function registerDataModels() {
	CONFIG.Item.dataModels.item = ItemDataModel;
}

/**
 * Handles registration for all Dreams and Machine Item sheets.
 */
function registerSheets() {
	Items.unregisterSheet('core', ItemSheet);

	Items.registerSheet('dreams-and-machines', DnMItemSheet, {
		types: ['item'],
		makeDefault: true,
	});
}
