import React from 'react';
import ReactDOM from 'react-dom';
import Photo from './index';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Photo />, div);
});
