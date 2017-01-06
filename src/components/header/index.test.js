import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import Header from './index';

const mockStore = configureStore();

xit('renders without crashing', () => {
	const initalState = {
		fetchPublicPhotos: () => {},
		filter: null,
		location: {pathname: '/'},
		params: {},
		router: {params: {}},
		routes: {},
		title: null
	};
	const store = mockStore(initalState);

	const div = document.createElement('div');
	ReactDOM.render(<Header store={store} />, div);
});
