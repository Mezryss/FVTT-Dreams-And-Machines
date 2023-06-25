/**
 * @typedef {object} ParsedResultFace
 *
 * @property {number} face
 * @property {boolean} isCritical
 * @property {boolean} isSuccess
 * @property {boolean} isComplication
 */

/**
 *
 */
export default class DnMRoller {
	/**
	 * @param {DnMActor} actor
	 *
	 * @param {object} attribute
	 * @param {string} attribute.label
	 * @param {number} attribute.value
	 *
	 * @param {object|undefined} skill
	 * @param {string} skill.label
	 * @param {number} skill.value
	 *
	 * @param {number} numDice
	 * @param {number} complicationRange
	 */
	static async roll({ actor, attribute, skill, numDice, complicationRange }) {
		const targetNumber = attribute.value + (skill?.value ?? 0);

		const roll = new Roll(`${numDice}d20`);
		await roll.evaluate({ async: true });
		const result = this.parseRoll({
			roll,
			skillValue: skill?.value ?? 1,
			targetNumber,
			complicationRange,
		});

		const template = await renderTemplate('systems/dreams-and-machines/templates/chat/dice-roll.hbs', {
			...result,
			attribute: attribute.label,
			skill: skill?.label,
			isGM: game.user.isGM,
			targetNumber,
			complicationRange,
		});

		await ChatMessage.create({
			user: game.userId,
			speaker: { actor: actor?.id },
			rollMode: game.settings.get('core', 'rollMode'),
			content: template,
			type: CONST.CHAT_MESSAGE_TYPES.ROLL,
			roll,
		});
	}

	/**
	 * @param {Roll} roll
	 * @param {number} skillValue
	 * @param {number} targetNumber
	 * @param {number} complicationRange
	 */
	static parseRoll({ roll, skillValue, targetNumber, complicationRange }) {
		let successes = 0;
		let complications = 0;
		/**
		 * @type {ParsedResultFace[]}
		 */
		const results = [];

		roll.dice.forEach((term) => {
			term.results.forEach((result) => {
				let isCritical = false;
				let isSuccess = false;
				let isComplication = false;

				if (result.result <= skillValue) {
					successes += 2;
					isCritical = true;
				} else if (result.result <= targetNumber) {
					successes += 1;
					isSuccess = true;
				}

				if (result.result >= complicationRange) {
					complications += 1;
					isComplication = true;
				}

				results.push({
					face: result.result,
					isCritical,
					isSuccess,
					isComplication,
				});
			});
		});

		return {
			successes,
			complications,
			results,
		};
	}
}
