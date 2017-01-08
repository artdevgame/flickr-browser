import { PHOTOS_LOADING, PHOTOS_LOADING_SUCCESS, PHOTOS_RESET } from '../actions/action-types';

export default (state = {
	isLoading: false,
	photos: []
}, action) => {
	switch (action.type) {
		case PHOTOS_LOADING_SUCCESS:
		case PHOTOS_LOADING:
			return {...state, ...action.data};

		case PHOTOS_RESET:
			return {isLoading: false, photos: []};

		default:
			return state;
	}
}