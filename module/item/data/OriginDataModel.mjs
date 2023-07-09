import ItemDescription from './templates/ItemDescription.mjs';

/**
 * Data model representing an Origin that can be assigned to a character.
 *
 * @mixes ItemDescription
 *
 * @property {object} attributes Initial for the four attributes provided by the Origin.
 * @property {number} attributes.might
 * @property {number} attributes.quickness
 * @property {number} attributes.insight
 * @property {number} attributes.resolve
 * @property {number} techLevel Starting tech level provided by the Origin
 * @property {number} spirit Spirit points provided by the Origin
 * @property {number} supplyPoints Starting supply points provided by the origin
 * @property {object} benefit Benefit provided by the origin
 * @property {string} benefit.name
 * @property {string} benefit.description
 * @property {string[]} archetypes A list of archetype Item UUIDs the character can choose from.
 */
export default class OriginDataModel extends foundry.abstract.TypeDataModel {
	/**
	 * Utility method to retrieve the number of assigned archetypes in the template.
	 */
	get numArchetypes() {
		return this.archetypes.length;
	}

	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...ItemDescription(),

			attributes: new fields.SchemaField({
				might: new fields.NumberField({
					initial: 8,
					integer: true,
					min: 0,
					nullable: false,
				}),
				quickness: new fields.NumberField({
					initial: 8,
					integer: true,
					min: 0,
					nullable: false,
				}),
				insight: new fields.NumberField({
					initial: 8,
					integer: true,
					min: 0,
					nullable: false,
				}),
				resolve: new fields.NumberField({
					initial: 8,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),

			techLevel: new fields.NumberField({
				initial: 1,
				integer: true,
				min: 0,
				nullable: false,
			}),

			spirit: new fields.NumberField({
				initial: 1,
				integer: true,
				min: 0,
				nullable: false,
			}),

			supplyPoints: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			benefit: new fields.SchemaField({
				name: new fields.StringField({
					initial: 'Origin Benefit Name',
					nullable: false,
				}),

				description: new fields.HTMLField({
					initial: 'Origin Benefit Description',
					nullable: false,
				}),
			}),

			archetypes: new fields.ArrayField(
				new fields.StringField({
					initial: '',
					nullable: false,
				}),
				{
					initial: [],
					nullable: false,
				}
			),
		};
	}
}
