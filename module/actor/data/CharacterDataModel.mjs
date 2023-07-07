import Attributes from './templates/Attributes.mjs';
import Skills from './templates/Skills.mjs';
import Traits from './templates/Traits.mjs';

/**
 * Data Model representing a Player Character
 *
 * @mixes {Attributes}
 * @mixes {Skills}
 * @mixes {Traits}
 *
 * @property {string} origin
 * @property {string} archetype
 * @property {string} temperament
 * @property {string} bond
 * @property {number} coin
 * @property {number} techLevel
 * @property {object} spirit
 * @property {number} spirit.value
 * @property {number} spirit.max
 * @property {number} supplyPoints
 * @property {string} goal
 * @property {string} attitude
 * @property {string} drive
 */
export default class CharacterDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...Attributes(),
			...Skills(),
			...Traits(),

			origin: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			archetype: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			temperament: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			bond: new fields.StringField({
				initial: '',
				nullable: false,
			}),

			coin: new fields.NumberField({
				initial: 0,
				integer: true,
				nullable: false,
			}),

			techLevel: new fields.NumberField({
				initial: 1,
				integer: true,
				nullable: false,
				min: 0,
			}),

			spirit: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),
				max: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),

			supplyPoints: new fields.NumberField({
				initial: 0,
				integer: true,
				nullable: false,
			}),

			goal: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			attitude: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			drive: new fields.StringField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
