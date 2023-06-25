import { registerItems } from './item/DnMItem.mjs';
import { registerActors } from './actor/DnMActor.mjs';
import { registerCombatTracker } from './combat/combat-tracker.mjs';
import registerTemplates from './templates.mjs';

import './momentumTracker/index.mjs';
import DicePrompt from './dice/DicePrompt.mjs';

Hooks.once('init', () => {
	registerActors();
	registerItems();
	registerCombatTracker();

	registerTemplates();

	CONFIG.DreamsAndMachines = {
		DicePrompt,
	};
});

// Add the prose class from Tailwind Typography to Journal text entries.
Hooks.on(
	'renderJournalTextPageSheet',
	/**
	 * @param _application
	 * @param html {JQuery}
	 * @param _data
	 */
	(_application, html, _data) => {
		$(html[2]).addClass('prose');
	},
);
