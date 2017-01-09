import React, { Component } from 'react';
import './index.css';

class Spinner extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (<div className="spinner" />);
	}
}

export default Spinner;