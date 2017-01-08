import React from 'react';
import ReactDOM from 'react-dom';
import Photo from './index';

xit('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Photo />, div);
});
