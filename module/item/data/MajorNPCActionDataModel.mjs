import ItemDescription from './templates/ItemDescription.mjs';
import { ItemQualities } from './ItemDataModel.mjs';

/**
 * @typedef {WeaponDetails} WeaponDetailExpanded
 * @property {string} name Name used for the weapon.
 */

/**
 * Data Model representing a Major NPC Action that can be added to a Major NPC.
 *
 * @mixes ItemDescription
 *
 * @property {object} skillTest Skill test the Major NPC makes for this action
 * @property {'-'|'might'|'quickness'|'insight'|'resolve'} skillTest.attribute Attribute used for the skill test.
 * @property {'-'|'fight'|'move'|'operate'|'sneak'|'study'|'survive'|'talk'} skillTest.skill Skill used for the skill test.
 * @property {WeaponDetailExpanded} weapon Properties of the weapon used in this attack, if any.
 */
export default class MajorNPCActionDataModel extends foundry.abstract.TypeDataModel {
	/**
	 * Utility property to get all weapon qualities in one combined array.
	 *
	 * @return ItemQuality[]
	 */
	get weaponQualities() {
		return [...this.weapon.damageQualities, ...this.weapon.qualities];
	}

	/**
	 * Allow chat templates to treat this equivalent to an Equipment item.
	 */
	get isWeapon() {
		return true;
	}

	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...ItemDescription(),

			skillTest: new fields.SchemaField({
				attribute: new fields.StringField({
					initial: '-',
					nullable: false,
					choices: [
						'-',
						'might',
						'quickness',
						'insight',
						'resolve'
					]
				}),

				skill: new fields.StringField({
					initial: '-',
					nullable: false,
					choices: [
						'-',
						'fight',
						'move',
						'operate',
						'sneak',
						'study',
						'survive',
						'talk'
					]
				}),
			}),

			weapon: new fields.SchemaField({
				name: new fields.StringField({
					initial: '',
					nullable: false,
				}),

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
