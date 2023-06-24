/**
 * @typedef {object} CharacterAttributes
 *
 * @property {object} insight
 * @property {number} insight.value
 * @property {boolean} insight.exhaustion
 * @property {boolean} insight.confused
 *
 * @property {object} might
 * @property {number} might.value
 * @property {boolean} might.exhaustion
 * @property {boolean} might.weary
 *
 * @property {object} quickness
 * @property {number} quickness.value
 * @property {boolean} quickness.exhaustion
 * @property {boolean} quickness.breathless
 *
 * @property {object} resolve
 * @property {number} resolve.value
 * @property {boolean} resolve.exhaustion
 * @property {boolean} resolve.despairing
 */

/**
 * @typedef {object} CharacterSkills
 *
 * @property {number} fight
 * @property {number} move
 * @property {number} operate
 * @property {number} sneak
 * @property {number} study
 * @property {number} survive
 * @property {number} talk
 */

/**
 * Data Model representing a Player Character
 *
 * @property {string} origin
 * @property {string} archetype
 * @property {string} temperament
 * @property {string} bond TODO: Identify whether Bond should be something else.
 * @property {CharacterAttributes} attributes
 * @property {CharacterSkills} skills
 * @property {number} coin
 * @property {number} techLevel
 * @property {object} spirit
 * @property {number} spirit.value
 * @property {number} spirit.max
 * @property {number} supplyPoints
 * @property {string} goal
 * @property {string} attitude
 * @property {string} drive
 */
export default class CharacterDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			origin: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			archetype: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			temperament: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			bond: new fields.StringField({
				initial: '',
				nullable: false,
			}),

			attributes: new fields.SchemaField({
				insight: new fields.SchemaField({
					value: new fields.NumberField({
						integer: true,
						initial: 7,
						nullable: false,
					}),
					exhaustion: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),
					confused: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),
				}),
				might: new fields.SchemaField({
					value: new fields.NumberField({
						integer: true,
						initial: 7,
						nullable: false,
					}),
					exhaustion: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),
					weary: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),
				}),
				quickness: new fields.SchemaField({
					value: new fields.NumberField({
						integer: true,
						initial: 7,
						nullable: false,
					}),
					exhaustion: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),
					breathless: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),
				}),
				resolve: new fields.SchemaField({
					value: new fields.NumberField({
						integer: true,
						initial: 7,
						nullable: false,
					}),
					exhaustion: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),
					despairing: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),
				}),
			}),

			skills: new fields.SchemaField({
				fight: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
					min: 0,
				}),
				move: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
					min: 0,
				}),
				operate: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
					min: 0,
				}),
				sneak: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
					min: 0,
				}),
				study: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
					min: 0,
				}),
				survive: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
					min: 0,
				}),
				talk: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
					min: 0,
				}),
			}),

			coin: new fields.NumberField({
				initial: 0,
				integer: true,
				nullable: false,
			}),

			techLevel: new fields.NumberField({
				initial: 1,
				integer: true,
				nullable: false,
				min: 0,
			}),

			spirit: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),
				max: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),

			supplyPoints: new fields.NumberField({
				initial: 0,
				integer: true,
				nullable: false,
			}),

			goal: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			attitude: new fields.StringField({
				initial: '',
				nullable: false,
			}),
			drive: new fields.StringField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
