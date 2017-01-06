import { combineReducers } from 'redux';
import photoset from './photoset';
import error from './error';

const rootReducer = combineReducers({
	photoset: photoset,
	error: error,
});

export default rootReducer;