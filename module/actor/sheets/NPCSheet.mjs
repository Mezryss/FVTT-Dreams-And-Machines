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

		const weapons = this.actor.items.filter((i) => i.type === 'item' && i.system.isWeapon);

		return {
			...super.getData(options),
			enrichedSpecialActions,
			enrichedNotes,
			weapons,
		};
	}

	activateListeners(html) {
		super.activateListeners(html);

		// Unbind listener from DnMActorSheet
		html.find('[data-action=roll]').off('click');
		html.find('[data-action=roll]').on('click', this.roll.bind(this));
		html.find('[data-action=roll-default]').on('click', this.rollDefault.bind(this));

		if (!this.isEditable) {
			return;
		}

		new ContextMenu(html, '[data-menu=weapon]', [
			{
				name: 'Labels.Item.Edit',
				icon: '<i class="fas fa-pencil"></i>',
				callback: async (i) => {
					const uuid = i.data('uuid');
					if (!uuid) {
						return;
					}

					const item = await this.actor.items.find((i) => i.uuid === uuid);
					item?.sheet?.render(true);
				},
			},

			{
				name: 'Labels.Item.Delete',
				icon: '<i class="fas fa-trash"></i>',
				callback: async (i) => {
					const uuid = i.data('uuid');
					if (!uuid) {
						return;
					}

					const item = await this.actor.items.find((i) => i.uuid === uuid);
					item?.delete();
				},
			},
		]);
	}

	/**
	 * Event Handler; Called when the user clicks to roll for the NPC's attribute & skill.
	 */
	roll() {
		DicePrompt.promptForRoll({
			actor: this.actor,
			fixedTargetNumber: this.system.attribute.value,
			fixedFocus: this.system.skill.value,
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
