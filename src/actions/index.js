import { ERROR_CONSUMED } from './action-types';

export function consumeError() {
	return {
		type: ERROR_CONSUMED
	};
}