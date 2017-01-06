import { ERROR_CONSUMED } from './action-types';

export function errorConsumed() {
	return {
		type: ERROR_CONSUMED
	};
}