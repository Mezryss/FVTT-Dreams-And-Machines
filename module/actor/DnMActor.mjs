import CharacterSheet from './sheets/CharacterSheet.mjs';
import CharacterDataModel from './data/CharacterDataModel.mjs';

/**
 * Shared base class for all Dreams and Machines actor documents.
 *
 * @property {EmbeddedCollection} items
 * @property {object} system
 * @property {string} type
 */
export default class DnMActor extends Actor {}

/**
 * Handles registration for the DnMActor class, sheets, and all data models.
 */
export function registerActors() {
	CONFIG.Actor.documentClass = DnMActor;

	registerDataModels();
	registerSheets();
}

/**
 * Handles registration for all Dreams and Machines Actor data models.
 */
function registerDataModels() {
	CONFIG.Actor.dataModels.character = CharacterDataModel;
}

/**
 * Handles registration for all Dreams and Machines Actor sheets.
 */
function registerSheets() {
	Actors.unregisterSheet('core', ActorSheet);

	Actors.registerSheet('dreams-and-machines', CharacterSheet, {
		types: ['character'],
		makeDefault: true,
	});
}
