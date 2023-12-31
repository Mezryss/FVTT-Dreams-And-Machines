import ItemDescription from './templates/ItemDescription.mjs';

/**
 * @typedef {object} ItemQuality
 * @property {string} label String label that describes the quality.
 * @property {number|null} rating A numerical rating for qualities that are rated, null otherwise.
 */

/**
 * @typedef {object} WeaponDetails
 * @property {'Melee'|'Ranged'|'MeleeRanged'} type Whether the weapon is a Melee or Ranged weapon.
 * @property {ItemQuality[]} damageQualities Quality and rating applied for damage.
 * @property {ItemQuality[]} qualities Weapon Qualities
 */

/**
 * @typedef {object} ProtectionDetails
 * @property {number} value Normal protection value
 * @property {number} breaker Protection against Breaker attacks
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
 * @property {boolean} isGLIF Whether the Item is a GLIF.
 * @property {object} GLIF Details for the GLIF, if the item is in fact a GLIF.
 * @property {number} GLIF.complexity Complexity of the GLIF.
 */
export default class ItemDataModel extends foundry.abstract.TypeDataModel {
	/**
	 * Utility for checking for the presence of qualities within Handlebars templates.
	 *
	 * @returns {boolean} Whether the Item has any Qualities in its list.
	 */
	get hasQualities() {
		return this.allQualities.length > 0;
	}

	/**
	 * Template utility for fetching the last index for damage qualities.
	 */
	get lastDamageQualityIndex() {
		return this.weapon.damageQualities.length - 1;
	}

	/**
	 * Utility for fetching all qualities in a single list.
	 *
	 * @returns {ItemQuality[]}
	 */
	get allQualities() {
		let protection = [];

		if (this.hasProtection) {
			protection = [
				{
					label: game.i18n.localize('Labels.Item.Protection'),
					rating: this.protection.value,
				},
			];
		}

		return [...this.weapon.qualities, ...protection, ...this.qualities];
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

			rarity: new fields.NumberField({
				initial: 1,
				integer: true,
				min: 0,
				nullable: false,
			}),

			supplyPointCost: new fields.StringField({
				initial: '-',
				nullable: false,
			}),

			category: new fields.StringField({
				initial: '',
				nullable: false,
			}),

			quantity: new fields.NumberField({
				initial: 1,
				integer: true,
				min: 0,
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
				breaker: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
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
					choices: ['Melee', 'Ranged', 'MeleeRanged'],
					nullable: false,
				}),

				qualities: ItemQualities(),

				damageQualities: ItemQualities(),
			}),

			isGLIF: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),

			GLIF: new fields.SchemaField({
				complexity: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),
		};
	}
}
