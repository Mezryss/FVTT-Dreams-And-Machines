import DnMActorSheet from '../DnMActorSheet.mjs';
import DicePrompt from '../../dice/DicePrompt.mjs';

/**
 * Major NPC Sheet
 */
export default class MajorNPCSheet extends DnMActorSheet {
	/**
	 * @returns {ManorNPCDataModel}
	 */
	get system() {
		return super.system;
	}

	async getData(options = {}) {
		const actions = await Promise.all(
			this.actor.items
				.filter((i) => i.type === 'majorNPCAction')
				.map(async (i) => {
					let enrichedDescription = undefined;

					if (i.system.description) {
						enrichedDescription = await TextEditor.enrichHTML(i.system.description);
					}

					i.enrichedDescription = enrichedDescription;

					return i;
				}),
		);

		const abilities = await Promise.all(
			this.actor.items
				.filter(i => i.type === 'specialAbility')
				.map(async i => {
					i.enrichedDescription = await TextEditor.enrichHTML(i.system.description, { async: true });
					return i;
				}),
		);

		return {
			...super.getData(options),
			enrichedDescription: await TextEditor.enrichHTML(this.system.description, { async: true }),
			enrichedNotes: await TextEditor.enrichHTML(this.system.notes, { async: true }),
			actions,
			abilities,
		};
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find('[data-action=roll-action]').on('click', this.rollAction.bind(this));
	}

	/**
	 * Event Handler; Called when the user clicks to roll an action with a TN > 0
	 * @param {Event} event
	 */
	rollAction(event) {
		const uuid = $(event.currentTarget).data('uuid');
		if (!uuid) {
			return;
		}

		const action = this.actor.items.find((i) => i.uuid === uuid);
		if (!action) {
			return;
		}

		/** @type MajorNPCActionDataModel */
		const actionSystem = action.system;

		DicePrompt.promptForRoll({
			actor: this.actor,
			fixedTargetNumber: actionSystem.skillTest.tn,
			fixedFocus: actionSystem.skillTest.focus,
			item: action,
		});
	}
}
