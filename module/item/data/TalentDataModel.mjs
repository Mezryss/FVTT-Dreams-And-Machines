import ItemDescription from './templates/ItemDescription.mjs';

/**
 * Data model representing Talents.
 *
 * @mixes ItemDescription
 *
 * @property {string} archetype Archetype the talent is associated with.
 */
export default class ItemDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...ItemDescription(),

			archetype: new fields.StringField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
