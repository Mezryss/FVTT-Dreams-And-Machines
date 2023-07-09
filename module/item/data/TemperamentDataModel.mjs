import ItemDescription from './templates/ItemDescription.mjs';
import Exhaustion from '../../actor/Exhaustion.mjs';

/**
 * Data Model representing a Temperament that can be assigned to a character.
 *
 * @mixes ItemDescription
 *
 * @property {string} spiritEffect
 * @property {string} exhaustionEffect
 * @property {Exhaustion} exhaustionType
 */
export default class TemperamentDataModel extends foundry.abstract.TypeDataModel {
	/** @type {{ [key: string]: string}} */
	get enrichedFields() {
		return {
			enrichedSpiritEffect: this.spiritEffect,
			enrichedExhaustionEffect: this.exhaustionEffect,
		};
	}

	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...ItemDescription(),

			spiritEffect: new fields.HTMLField({
				initial: '',
				nullable: false,
			}),

			exhaustionEffect: new fields.HTMLField({
				initial: '',
				nullable: false,
			}),

			exhaustionType: new fields.StringField({
				initial: Exhaustion.Despairing,
				choices: Exhaustion.all,
				nullable: false,
			}),
		};
	}
}
