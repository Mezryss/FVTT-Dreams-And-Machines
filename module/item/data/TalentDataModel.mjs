import ItemDescription from "./templates/ItemDescription.mjs";

/**
 * Data model representing Talents & Origin Benefits.
 *
 * @mixes ItemDescription
 */
export default class ItemDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...ItemDescription(),
		};
	}
}
