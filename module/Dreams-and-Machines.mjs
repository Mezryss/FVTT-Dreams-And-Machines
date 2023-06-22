import CharacterSheet from './actor/sheets/CharacterSheet.mjs';

Hooks.once('init', () => {
	Actors.unregisterSheet('core', ActorSheet);
	Actors.registerSheet('dreams-and-machines', CharacterSheet, {
		types: ['character'],
		makeDefault: true,
	});
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
