/**
 * Helper function for registering an Actor partial.
 * @param {string} name
 */
function actorPartial(name) {
	return `systems/dreams-and-machines/templates/actor/partials/actor-${name}.hbs`;
}

/**
 * Helper function for registering an Item partial.
 * @param {string} name
 */
function itemPartial(name) {
	return `systems/dreams-and-machines/templates/item/partials/item-${name}.hbs`;
}

/**
 * Preload Foundry templates.
 */
export default async function registerTemplates() {
	console.log('Dreams and Machines | Pre-loading Templates...');
	await loadTemplates([itemPartial('description'), itemPartial('header')]);
	console.log('Dreams and Machines | Template Loading Complete.');
}
