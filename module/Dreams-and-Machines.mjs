import { registerItems } from './item/DnMItem.mjs';
import { registerActors } from './actor/DnMActor.mjs';
import registerTemplates from './templates.mjs';

Hooks.once('init', () => {
	registerActors();
	registerItems();

	registerTemplates();
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
