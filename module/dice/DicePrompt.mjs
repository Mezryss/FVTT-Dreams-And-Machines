import DnMRoller from './DnMRoller.mjs';

export default class DicePrompt extends Application {
	/**
	 * @param {DnMActor} actor
	 * @param {string|undefined} attribute
	 * @param {string|undefined} skill
	 * @param {number|undefined} fixedTargetNumber
	 * @param {number|undefined} fixedFocus
	 */
	static promptForRoll({ actor, attribute = 'insight', skill = '-', fixedTargetNumber = undefined, fixedFocus = undefined } = {}) {
		const prompt = new DicePrompt();

		prompt.actor = actor;
		prompt.attribute = attribute;
		prompt.skill = skill;
		prompt.fixedTargetNumber = fixedTargetNumber;
		prompt.fixedFocus = fixedFocus;

		prompt.render(true);
	}

	static get defaultOptions() {
		return {
			...super.defaultOptions,
			classes: ['dnm', 'dice-prompt'],
			resizable: false,
			width: 'auto',
		};
	}

	/**
	 * @type {DnMActor}
	 */
	actor = undefined;

	/**
	 * @type {?string}
	 */
	attribute = 'insight';

	/**
	 * @type {?string}
	 */
	skill = '-';

	/**
	 * @type {number|undefined}
	 */
	fixedTargetNumber = undefined;

	/**
	 * @type {number|undefined}
	 */
	fixedFocus = undefined;

	/**
	 * @type {number}
	 */
	numDice = 2;

	/**
	 * @type {number}
	 */
	complication = 20;

	get template() {
		return 'systems/dreams-and-machines/templates/app/dice-prompt.hbs';
	}

	getData(options = {}) {
		let attributes = [];
		let skills = [];

		if (this.actor.type !== 'npc') {
			attributes = Object.entries(this.actor.system.attributes).map(([k, v]) => ({
				name: k,
				label: game.i18n.localize(`Attributes.${k.capitalize()}`),
				value: v.value,
			}));

			skills = Object.entries(this.actor.system.skills).map(([k, v]) => ({
				name: k,
				label: game.i18n.localize(`Skills.${k.capitalize()}`),
				value: v,
			}));
		}

		return {
			...super.getData(options),
			actor: this.actor,
			attribute: this.attribute ?? 'insight',
			attributes,
			skill: this.skill ?? '-',
			skills,
			fixedTargetNumber: this.fixedTargetNumber,
			fixedFocus: this.fixedFocus,
			numDice: this.numDice,
			isGM: game.user.isGM,
			complication: this.complication,
		};
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find('[name=fixedTargetNumber]').on('change', this.setFixedTargetNumber.bind(this));
		html.find('[name=fixedFocus]').on('change', this.setFixedFocus.bind(this));
		html.find('[name=attribute]').on('change', this.setAttribute.bind(this));
		html.find('[name=skill]').on('change', this.setSkill.bind(this));
		html.find('[name=complication]').on('change', this.setComplicationRange.bind(this));
		html.find('[data-action=set-num-dice]').on('click', this.setNumDice.bind(this));
		html.find('[data-action=roll]').on('click', this.roll.bind(this));
	}

	async _render(force, options) {
		// Logic borrowed from FormApplication._render to re-apply focus so that up/down arrows in Complication Range work as expected.
		let focus = this.element.find(':focus');
		focus = focus.length ? focus[0] : null;

		await super._render(force, options);

		if (focus && focus.name) {
			const input = this /**@type JQuery*/.element
				.find(`[name=${focus.name}]`);
			if (input && input.focus instanceof Function) {
				input.focus();
			}
		}
	}

	setFixedTargetNumber(event) {
		const fixedTargetNumber = +$(event.currentTarget).val();

		if (!isNaN(fixedTargetNumber)) {
			this.fixedTargetNumber = fixedTargetNumber;
		}

		this.render(true);
	}

	setFixedFocus(event) {
		const fixedFocus = +$(event.currentTarget).val();

		if (!isNaN(fixedFocus)) {
			this.fixedFocus = fixedFocus;
		}

		this.render(true);
	}

	/**
	 * @param {InputEvent} event
	 */
	setAttribute(event) {
		this.attribute = $(event.currentTarget).val();
		this.render(true);
	}

	/**
	 * @param {InputEvent} event
	 */
	setSkill(event) {
		this.skill = $(event.currentTarget).val();
		this.render(true);
	}

	/**
	 * @param {InputEvent} event
	 */
	setComplicationRange(event) {
		this.complication = +$(event.currentTarget).val();

		if (isNaN(this.complication)) {
			this.complication = 20;
		}

		this.render(true);
	}

	/**
	 * @param {MouseEvent} event
	 */
	setNumDice(event) {
		this.numDice = $(event.currentTarget).data('value');

		this.render(true);
	}

	async roll() {
		let attribute = undefined;
		let skill = undefined;

		switch (this.actor.type) {
			case 'npc':
				break;

			default: {
				attribute = {
					label: game.i18n.localize(`Attributes.${this.attribute.capitalize()}`),
					value: this.actor.system.attributes[this.attribute].value,
				};

				// Moving to this instead of a ternary because Prettier & ESLint weren't getting along.
				if (this.skill) {
					skill = {
						label: game.i18n.localize(`Skills.${this.skill.capitalize()}`),
						value: this.actor.system.skills[this.skill],
					};
				}
			}
		}

		await DnMRoller.roll({
			actor: this.actor,
			attribute,
			skill,
			numDice: this.numDice,
			complicationRange: this.complication,
			fixedTargetNumber: this.fixedTargetNumber,
			fixedFocus: this.fixedFocus,
		});

		await this.close();
	}
}
