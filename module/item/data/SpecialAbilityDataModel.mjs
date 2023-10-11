import ItemDescription from './templates/ItemDescription.mjs';

/**
 * Data model representing Special Abilities.
 *
 * @mixes ItemDescription
 *
 * @property {string} archetype Archetype the talent is associated with.
 */
export default class SpecialAbilityDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...ItemDescription(),
		};
	}
}
