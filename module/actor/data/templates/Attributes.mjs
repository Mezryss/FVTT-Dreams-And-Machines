/**
 * @typedef {object} CharacterAttributes
 *
 * @property {object} insight
 * @property {number} insight.value
 * @property {boolean} insight.exhaustion
 * @property {boolean} insight.confused
 *
 * @property {object} might
 * @property {number} might.value
 * @property {boolean} might.exhaustion
 * @property {boolean} might.weary
 *
 * @property {object} quickness
 * @property {number} quickness.value
 * @property {boolean} quickness.exhaustion
 * @property {boolean} quickness.breathless
 *
 * @property {object} resolve
 * @property {number} resolve.value
 * @property {boolean} resolve.exhaustion
 * @property {boolean} resolve.despairing
 */

const fields = foundry.data.fields;

/**
 * Data model template providing Attributes for actors.
 *
 * @mixin
 * @property {CharacterAttributes} attributes
 */
const Attributes = () => ({
	attributes: new fields.SchemaField({
		insight: new fields.SchemaField({
			value: new fields.NumberField({
				integer: true,
				initial: 7,
				nullable: false,
			}),
			exhaustion: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),
			confused: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),
		}),
		might: new fields.SchemaField({
			value: new fields.NumberField({
				integer: true,
				initial: 7,
				nullable: false,
			}),
			exhaustion: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),
			weary: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),
		}),
		quickness: new fields.SchemaField({
			value: new fields.NumberField({
				integer: true,
				initial: 7,
				nullable: false,
			}),
			exhaustion: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),
			breathless: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),
		}),
		resolve: new fields.SchemaField({
			value: new fields.NumberField({
				integer: true,
				initial: 7,
				nullable: false,
			}),
			exhaustion: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),
			despairing: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),
		}),
	}),
});

export default Attributes;
