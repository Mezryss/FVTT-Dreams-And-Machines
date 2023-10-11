import DnMActorSheet from '../DnMActorSheet.mjs';
import DicePrompt from '../../dice/DicePrompt.mjs';

/**
 * NPC Sheet
 */
export default class NPCSheet extends DnMActorSheet {
	/**
	 * @returns {NPCDataModel}
	 */
	get system() {
		return super.system;
	}

	async getData(options = {}) {
		const enrichedSpecialActions = await TextEditor.enrichHTML(this.system.specialActions, { async: true });
		const enrichedNotes = await TextEditor.enrichHTML(this.system.notes, { async: true });

		const abilities = this.actor.items.filter(i => i.type === 'specialAbility')
		const weapons = this.actor.items.filter((i) => i.type === 'item' && i.system.isWeapon);

		return {
			...super.getData(options),
			enrichedSpecialActions,
			enrichedNotes,
			abilities,
			weapons,
		};
	}

	activateListeners(html) {
		super.activateListeners(html);

		// Unbind listener from DnMActorSheet
		html.find('[data-action=roll]').off('click');
		html.find('[data-action=roll]').on('click', this.roll.bind(this));
		html.find('[data-action=roll-default]').on('click', this.rollDefault.bind(this));
	}

	/**
	 * Event Handler; Called when the user clicks to roll for the NPC's attribute & skill.
	 *
	 * @param {Event} event
	 */
	async roll(event) {
		const target = $(event.currentTarget);
		const itemUuid = target.data('uuid');
		let item = undefined;
		if (itemUuid) {
			item = await fromUuid(itemUuid);
		}

		DicePrompt.promptForRoll({
			actor: this.actor,
			fixedTargetNumber: this.system.attribute.value,
			fixedFocus: this.system.skill.value,
			item,
		});
	}

	/**
	 * Event Handler; Called when the user clicks to roll for the NPC's default attribute & skill.
	 */
	rollDefault() {
		DicePrompt.promptForRoll({
			actor: this.actor,
			fixedTargetNumber: this.system.attribute.default,
			fixedFocus: this.system.skill.default,
		});
	}
}
