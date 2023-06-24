import ItemDescription from "./templates/ItemDescription.mjs";

/**
 * @typedef {object} ItemQuality
 * @property {string} label String label that describes the quality.
 * @property {number|null} rating A numerical rating for qualities that are rated, null otherwise.
 */

/**
 * Data Model representing an Item type that is actually held in a character's inventory.
 *
 * @mixes ItemDescription
 *
 * @property {number} techLevel Tech level of the item, which may make use easier or more difficult.
 * @property {ItemQuality[]} qualities A list of Qualities added to the item.
 */
export default class ItemDataModel extends foundry.abstract.TypeDataModel {
	/**
	 * Utility for checking for the presence of qualities within Handlebars templates.
	 *
	 * @returns {boolean} Whether the Item has any Qualities in its list.
	 */
	get hasQualities() { return this.qualities.length > 0; }

	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...ItemDescription(),

			techLevel: new fields.NumberField({
				initial: 0,
				integer: true,
				nullable: false,
			}),

			qualities: new fields.ArrayField(
				new fields.SchemaField({
					label: new fields.StringField({
						initial: 'New Quality',
						nullable: false,
					}),

					rating: new fields.NumberField({
						initial: null,
						nullable: true,
					}),
				}),
				{
					initial: [],
					nullable: false,
				}
			)
		};
	}
}
