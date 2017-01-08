import React, { Component } from 'react';
import './index.css';

class ErrorMessage extends Component {
	render() {
		return (
	        <p className="message">{this.props.message}</p>
        );
	}
}

export default ErrorMessage;