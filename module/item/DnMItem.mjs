import ArchetypeDataModel from './data/ArchetypeDataModel.mjs';
import ItemDataModel from './data/ItemDataModel.mjs';
import MajorNPCActionDataModel from './data/MajorNPCActionDataModel.mjs';
import OriginDataModel from './data/OriginDataModel.mjs';
import SpecialAbilityDataModel from './data/SpecialAbilityDataModel.mjs';
import TalentDataModel from './data/TalentDataModel.mjs';
import TemperamentDataModel from './data/TemperamentDataModel.mjs';

import DnMItemSheet from './DnMItemSheet.mjs';
import ArchetypeSheet from './sheet/ArchetypeSheet.mjs';
import EquipmentSheet from './sheet/EquipmentSheet.mjs';
import OriginSheet from './sheet/OriginSheet.mjs';
import MajorNPCActionSheet from './sheet/MajorNPCActionSheet.mjs';

/**
 * Shared base class for all Dreams and Machines item documents.
 */
export class DnMItem extends Item {}

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
	CONFIG.Item.dataModels.archetype = ArchetypeDataModel;
	CONFIG.Item.dataModels.item = ItemDataModel;
	CONFIG.Item.dataModels.origin = OriginDataModel;
	CONFIG.Item.dataModels.specialAbility = SpecialAbilityDataModel;
	CONFIG.Item.dataModels.talent = TalentDataModel;
	CONFIG.Item.dataModels.temperament = TemperamentDataModel;
	CONFIG.Item.dataModels.majorNPCAction = MajorNPCActionDataModel;
}

/**
 * Handles registration for all Dreams and Machine Item sheets.
 */
function registerSheets() {
	Items.unregisterSheet('core', ItemSheet);

	Items.registerSheet('dreams-and-machines', ArchetypeSheet, {
		types: ['archetype'],
		makeDefault: true,
	});

	Items.registerSheet('dreams-and-machines', EquipmentSheet, {
		types: ['item'],
		makeDefault: true,
	});

	Items.registerSheet('dreams-and-machines', OriginSheet, {
		types: ['origin'],
		makeDefault: true,
	});

	Items.registerSheet('dreams-and-machines', DnMItemSheet, {
		types: ['specialAbility', 'talent', 'temperament'],
		makeDefault: true,
	});

	Items.registerSheet('dreams-and-machines', MajorNPCActionSheet, {
		types: ['majorNPCAction'],
		makeDefault: true,
	});
}
