import ItemDescription from './templates/ItemDescription.mjs';

/**
 * Data model representing Talents.
 *
 * @mixes ItemDescription
 */
export default class ItemDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			...ItemDescription(),
		};
	}
}
