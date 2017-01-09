import React, { Component } from 'react';
import './index.css';

class ErrorMessage extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
	        <p className="message">{this.props.message}</p>
        );
	}
}

export default ErrorMessage;