/**
 * Enum representing all Exhaustion types.
 *
 * @readonly
 * @enum {string}
 */
const Exhaustion = {
	Breathless: 'Breathless',
	Confused: 'Confused',
	Despairing: 'Despairing',
	Weary: 'Weary',

	/**
	 * Utility method for fetching all Exhaustion types.
	 *
	 * @type {Exhaustion[]}
	 */
	get all() {
		return [Exhaustion.Breathless, Exhaustion.Confused, Exhaustion.Despairing, Exhaustion.Weary];
	},
};

export default Exhaustion;
