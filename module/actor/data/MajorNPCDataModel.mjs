import Attributes from './templates/Attributes.mjs';
import Skills from './templates/Skills.mjs';
import Traits from './templates/Traits.mjs';

/**
 * Data Model representing a Major NPC
 *
 * @mixes {Attributes}
 * @mixes {Skills}
 * @mixes {Traits}
 *
 * @property {object} threat
 * @property {number} threat.current
 * @property {number} threat.max
 * @property {object} injuries
 * @property {number} injuries.current
 * @property {number} injuries.max
 * @property {string} notes
 * @property {string} description
 */
export default class ManorNPCDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...Attributes(),
			...Skills(),
			...Traits(),

			threat: new fields.SchemaField({
				current: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
					min: 0,
				}),

				max: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
					min: 0,
				}),
			}),

			injuries: new fields.SchemaField({
				current: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
					min: 0,
				}),

				max: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
					min: 0,
				}),
			}),

			notes: new fields.HTMLField({
				initial: '',
				nullable: false,
			}),

			description: new fields.HTMLField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
