const fields = foundry.data.fields;

/**
 * Data model template providing Traits for actors.
 *
 * @mixin
 * @property {string[]} traits
 */
const Traits = () => ({
	traits: new fields.ArrayField(
		new fields.StringField({
			initial: '',
			nullable: false,
		}),
		{
			initial: [],
			nullable: false,
		},
	),
});

export default Traits;
