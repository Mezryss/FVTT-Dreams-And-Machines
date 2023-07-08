import ItemDescription from './templates/ItemDescription.mjs';
import Skills from '../../actor/data/templates/Skills.mjs';

/**
 * Data Model representing an Archetype that can be assigned to a character.
 *
 * @mixes ItemDescription
 * @mixes Skills
 *
 * @property {number} spirit Starting spirit provided by this archetype.
 * @property {number} supplyPoints Starting Supply Points provided by this archetype.
 * @property {string[]} startingGear Item UUIDs for starting gear granted by this archetype.
 * @property {number} startingCoin Starting Coin provided by this archetype.
 */
export default class ArchetypeDataModel extends foundry.abstract.TypeDataModel {
	/**
	 * Utility method to check that there is at least one piece of starting gear added.
	 */
	get hasStartingGear() {
		return this.startingGear.length > 0;
	}

	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...ItemDescription(),
			...Skills(),

			spirit: new fields.NumberField({
				initial: 0,
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

			startingGear: new fields.ArrayField(
				new fields.StringField({
					initial: '',
					nullable: false,
				}),
				{
					initial: [],
					nullable: false,
				},
			),

			startingCoin: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),
		};
	}
}
