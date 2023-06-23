import { registerItems } from './item/DnMItem.mjs';
import { registerActors } from "./actor/DnMActor.mjs";

Hooks.once('init', () => {
	registerActors();
	registerItems();
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
