/**
 * Data Model representing a Non-Player Character
 *
 * @property {string} truth
 * @property {object} attribute
 * @property {number} attribute.value
 * @property {number} attribute.default
 * @property {object} skill
 * @property {number} skill.value
 * @property {number} skill.default
 * @property {string} specialActions
 * @property {string} notes
 */
export default class NPCDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			truth: new fields.StringField({
				initial: '',
				nullable: false,
			}),

			attribute: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 8,
					integer: true,
					min: 0,
					nullable: false,
				}),

				default: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),

			skill: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),

				default: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),

			specialActions: new fields.HTMLField({
				initial: '',
				nullable: false,
			}),

			notes: new fields.HTMLField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
