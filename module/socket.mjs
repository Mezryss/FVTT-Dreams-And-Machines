export const SOCKET_NAME = 'system.dreams-and-machines';

/**
 * @readonly
 * @enum {number}
 */
export const SocketOperation = {
	/**
	 * A player is attempting to spend Momentum.
	 */
	PlayerSpendMomentum: 0,

	/**
	 * A player is attempting to store Momentum.
	 */
	PlayerStoreMomentum: 1,
};

/**
 * @typedef {object} SocketPayload
 *
 * @property {SocketOperation} operation
 * @property {any} data
 */

/**
 * Emit a Socket operation.
 *
 * @param {SocketOperation} operation
 * @param {any} data
 */
export function socketEmit(operation, data = undefined) {
	/** @type SocketPayload */
	const payload = { operation, data };

	game.socket.emit(SOCKET_NAME, payload);
}
