import MomentumTracker from './MomentumTracker.mjs';
import { SOCKET_NAME, SocketOperation } from '../socket.mjs';

export const SETTINGS_KEY_MOMENTUM = 'momentum';
export const SETTINGS_KEY_THREAT = 'threat';

Hooks.once('init', async () => {
	// Register the Momentum Tracker hidden settings.
	game.settings.register('dreams-and-machines', SETTINGS_KEY_MOMENTUM, {
		name: 'Momentum',
		scope: 'world',
		config: false,
		default: 0,
		type: Number,
		onChange: () => MomentumTracker.forceRender(),
	});

	game.settings.register('dreams-and-machines', SETTINGS_KEY_THREAT, {
		name: 'Threat',
		scope: 'world',
		config: false,
		default: 0,
		type: Number,
		onChange: () => MomentumTracker.forceRender(),
	});
});

Hooks.once('ready', async () => {
	if (MomentumTracker.instance) {
		return;
	}

	new MomentumTracker();
	MomentumTracker.forceRender();

	game.socket.on(
		SOCKET_NAME,
		/** @param {SocketPayload} payload */ async (payload) => {
			if (!MomentumTracker.instance) {
				return;
			}

			switch (payload.operation) {
				/**
				 * Player has spent Momentum.
				 */
				case SocketOperation.PlayerSpendMomentum: {
					// Only GM clients should process the operation.
					if (!game.user.isGM) {
						return;
					}

					const momentum = MomentumTracker.instance.momentum;
					if (momentum === 0) {
						return;
					}

					await game.settings.set('dreams-and-machines', SETTINGS_KEY_MOMENTUM, momentum - 1);

					break;
				}

				/**
				 * Player has stored Momentum.
				 */
				case SocketOperation.PlayerStoreMomentum: {
					// Only GM clients should process the operation.
					if (!game.user.isGM) {
						return;
					}

					const momentum = MomentumTracker.instance.momentum;
					if (momentum === 6) {
						return;
					}

					await game.settings.set('dreams-and-machines', SETTINGS_KEY_MOMENTUM, momentum + 1);

					break;
				}
			}
		},
	);
});
