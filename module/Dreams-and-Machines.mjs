import { registerActors } from './actor/DnMActor.mjs';
import { registerCombatTracker } from './combat/combat-tracker.mjs';
import { registerFonts } from './fonts.mjs';
import { registerItems } from './item/DnMItem.mjs';
import registerTemplates from './templates.mjs';

import DicePrompt from './dice/DicePrompt.mjs';

import Exhaustion from './actor/Exhaustion.mjs';

import './momentumTracker/index.mjs';

Hooks.once('init', () => {
	registerActors();
	registerItems();
	registerCombatTracker();

	registerFonts();
	registerTemplates();

	CONFIG.DreamsAndMachines = {
		DicePrompt,
		Exhaustion,
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
