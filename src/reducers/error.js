import { ERROR_FLICKR, ERROR_CONSUMED } from '../actions/action-types';

export default (state = {
	hasError: false,
	error: ''
}, action) => {
	switch (action.type) {
		case ERROR_FLICKR:
			return {...state, ...action.data, hasError: true};

		case ERROR_CONSUMED:
			return {...state, hasError: false};

		default:
			return state;
	}
}