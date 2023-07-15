import ItemDescription from './templates/ItemDescription.mjs';

/**
 * @typedef {object} ItemQuality
 * @property {string} label String label that describes the quality.
 * @property {number|null} rating A numerical rating for qualities that are rated, null otherwise.
 */

/**
 * @typedef {object} WeaponDetails
 * @property {'Melee'|'Ranged'} type Whether the weapon is a Melee or Ranged weapon.
 * @property {ItemQuality[]} damageQualities Quality and rating applied for damage.
 * @property {ItemQuality[]} qualities Weapon Qualities
 */

/**
 * @typedef {object} ProtectionDetails
 * @property {number} value Actual protection value
 * @property {string} notes Note text, usually describing the impact of Breaker
 */

/**
 * Wrapper utility for specifying Item Qualities properties.
 */
export function ItemQualities() {
	const fields = foundry.data.fields;

	return new fields.ArrayField(
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
		},
	);
}

/**
 * Data Model representing an Item type that is actually held in a character's inventory.
 *
 * @mixes ItemDescription
 *
 * @property {number} techLevel Tech level of the item, which may make use easier or more difficult.
 * @property {ItemQuality[]} qualities A list of Qualities added to the item.
 * @property {boolean} hasProtection Whether the Item provides Protection.
 * @property {ProtectionDetails} protection Protection provided by the item if it's a type of armor.
 * @property {boolean} isWeapon Whether the Item is a weapon.
 * @property {WeaponDetails} weapon Details for the weapon, if the item is in fact a weapon.
 */
export default class ItemDataModel extends foundry.abstract.TypeDataModel {
	/**
	 * Utility for checking for the presence of qualities within Handlebars templates.
	 *
	 * @returns {boolean} Whether the Item has any Qualities in its list.
	 */
	get hasQualities() {
		return this.qualities.length > 0;
	}

	/**
	 * Utility for fetching all qualities in a single list.
	 *
	 * @returns {ItemQuality[]}
	 */
	get allQualities() {
		return [...this.weapon.damageQualities, ...this.weapon.qualities, ...this.qualities];
	}

	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...ItemDescription(),

			techLevel: new fields.NumberField({
				initial: 0,
				integer: true,
				nullable: false,
			}),

			value: new fields.NumberField({
				initial: 0,
				integer: true,
				nullable: false,
			}),

			qualities: ItemQualities(),

			hasProtection: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),

			protection: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),
				notes: new fields.HTMLField({
					initial: '',
					nullable: false,
				}),
			}),

			isWeapon: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),

			weapon: new fields.SchemaField({
				type: new fields.StringField({
					initial: 'Melee',
					choices: ['Melee', 'Ranged'],
					nullable: false,
				}),

				qualities: ItemQualities(),

				damageQualities: ItemQualities(),
			}),
		};
	}
}
