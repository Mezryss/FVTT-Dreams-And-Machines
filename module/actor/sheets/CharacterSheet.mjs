import DnMActorSheet from '../DnMActorSheet.mjs';

/**
 * Player Character sheet
 */
export default class CharacterSheet extends DnMActorSheet {
	/** @type {DnMItem|undefined} **/
	get archetype() {
		return this.actor.items.find((i) => i.type === 'archetype');
	}

	/** @type {DnMItem|undefined} **/
	get origin() {
		return this.actor.items.find((i) => i.type === 'origin');
	}

	/** @type {DnMItem|undefined} **/
	get temperament() {
		return this.actor.items.find((i) => i.type === 'temperament');
	}

	/**
	 * @returns {CharacterDataModel}
	 */
	get system() {
		return super.system;
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find('[data-action=increase-quantity]').on('click', this.increaseQuantity.bind(this));
		html.find('[data-action=decrease-quantity]').on('click', this.decreaseQuantity.bind(this));
	}

	/**
	 * @param {Event} event
	 */
	async increaseQuantity(event) {
		const itemUuid = $(event.currentTarget).data('uuid');
		const item = await fromUuid(itemUuid);
		if (!item) {
			return;
		}

		await item.update({
			'system.quantity': item.system.quantity + 1,
		});
	}

	/**
	 * @param {Event} event
	 */
	async decreaseQuantity(event) {
		const itemUuid = $(event.currentTarget).data('uuid');
		const item = await fromUuid(itemUuid);
		if (!item) {
			return;
		}

		if (item.system.quantity - 1 === 0) {
			await item.delete();
		} else {
			await item.update({
				'system.quantity': item.system.quantity - 1,
			});
		}
	}

	async getData(options = {}) {
		const talents = await Promise.all(
			this.actor.items
				.filter((i) => i.type === 'talent')
				.map(
					/**
					 * @param {DnMItem} i
					 */
					async (i) => ({
						uuid: i.uuid,
						name: i.name,
						description: await TextEditor.enrichHTML(i.system.description, { async: true }),
					}),
				),
		);
		const equipment = await Promise.all(
			this.actor.items
				.filter((i) => i.type === 'item')
				.map(
					/**
					 * @param {DnMItem} item
					 */
					async (item) => {
						item.system.description = await TextEditor.enrichHTML(item.system.description, { async: true });

						return item;
					},
				),
		);

		let enrichedTemperamentEffect = undefined;
		let enrichedExhaustionEffect = undefined;
		if (this.temperament) {
			enrichedTemperamentEffect = await TextEditor.enrichHTML(this.temperament.system.spiritEffect, { async: true });
			enrichedExhaustionEffect = await TextEditor.enrichHTML(this.temperament.system.exhaustionEffect, { async: true });
		}

		return {
			...super.getData(options),

			archetype: this.archetype,
			origin: this.origin,
			temperament: this.temperament,

			talents,
			equipment,
			enrichedGoal: await TextEditor.enrichHTML(this.system.goal, { async: true }),
			enrichedAttitude: await TextEditor.enrichHTML(this.system.attitude, { async: true }),
			enrichedDrive: await TextEditor.enrichHTML(this.system.drive, { async: true }),

			exhausted: this.system.spirit.value <= 0,

			enrichedTemperamentEffect,
			enrichedExhaustionEffect,
		};
	}

	async _onDropItem(event, data) {
		if (!this.actor.isOwner) return false;
		const item = await Item.implementation.fromDropData(data);

		switch (item.type) {
			case 'archetype':
				await this.handleDropArchetype(item.system);
				break;

			case 'origin':
				await this.handleDropOrigin(item.system);
				break;

			case 'temperament':
				await this.handleDropTemperament();
				break;

			default:
				break;
		}

		return super._onDropItem(event, data);
	}

	/**
	 * Handles a change of character Archetype.
	 *
	 * @param {ArchetypeDataModel} archetypeSystem
	 */
	async handleDropArchetype(archetypeSystem) {
		const existingArchetype = this.archetype;

		const spirit = this.system.spirit;
		let supplyPoints = this.system.supplyPoints;
		let coin = this.system.coin;

		// Handle replacing an existing archetype
		if (existingArchetype) {
			// Don't need to un-set the Archetype's skills, since that will be reset anyway.

			// Reduce Spirit, Supply Points, and Coin.
			spirit.value -= existingArchetype.system.spirit;
			spirit.max -= existingArchetype.system.spirit;
			supplyPoints -= existingArchetype.system.supplyPoints;
			coin -= existingArchetype.system.startingCoin;

			// Starting gear is not automatically removed, because that could potentially get messy.

			await existingArchetype?.delete();
		}

		spirit.value += archetypeSystem.spirit;
		spirit.max += archetypeSystem.spirit;
		supplyPoints += archetypeSystem.supplyPoints;
		coin += archetypeSystem.startingCoin;

		spirit.value = Math.max(0, spirit.value);
		spirit.max = Math.max(0, spirit.max);
		supplyPoints = Math.max(0, supplyPoints);
		// coin is allowed to be negative.

		const startingGear = await Promise.all(
			archetypeSystem.startingGear.map(async (uuid) => {
				const gear = await fromUuid(uuid);
				if (!gear) {
					return;
				}

				return gear.toObject();
			}),
		);

		await this.actor.createEmbeddedDocuments('Item', startingGear);

		await this.actor.update({
			'system.skills': archetypeSystem.skills,
			'system.spirit': spirit,
			'system.supplyPoints': supplyPoints,
			'system.coin': coin,
		});
	}

	/**
	 * Handles a change of character Origin
	 *
	 * @param {OriginDataModel} originSystem
	 */
	async handleDropOrigin(originSystem) {
		const existingOrigin = this.origin;

		const spirit = this.system.spirit;
		let supplyPoints = this.system.supplyPoints;

		// Handle replacing an existing origin
		if (existingOrigin) {
			// Don't need to un-set the Origin's attributes or tech level, since those will be reset anyway.

			// Reduce Spirit and Supply Points.
			spirit.value -= existingOrigin.system.spirit;
			spirit.max -= existingOrigin.system.spirit;
			supplyPoints -= existingOrigin.system.supplyPoints;

			await existingOrigin?.delete();
		}

		// 1. Use Origin's Attribute values.
		/** @type CharacterAttributes */
		const attributes = { ...this.system.attributes };
		attributes.insight.value = originSystem.attributes.insight;
		attributes.might.value = originSystem.attributes.might;
		attributes.resolve.value = originSystem.attributes.resolve;
		attributes.quickness.value = originSystem.attributes.quickness;

		spirit.value += originSystem.spirit;
		spirit.max += originSystem.spirit;
		supplyPoints += originSystem.supplyPoints;

		spirit.value = Math.max(0, spirit.value);
		spirit.max = Math.max(0, spirit.max);
		supplyPoints = Math.max(0, supplyPoints);

		await this.actor.update({
			'system.attributes': attributes,
			'system.techLevel': originSystem.techLevel,
			'system.spirit': spirit,
			'system.supplyPoints': supplyPoints,
		});
	}

	/**
	 * Handles a change of character Temperament
	 */
	async handleDropTemperament() {
		const existingTemperament = this.temperament;

		// Handle replacing an existing temperament
		if (existingTemperament) {
			await existingTemperament?.delete();
		}
	}
}
