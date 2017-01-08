import React, { Component } from 'react';
import App from '../app';
import ErrorMessage from '../../components/error-message';

class NotFoundScreen extends Component {
	render() {
		return (
			<App content={<ErrorMessage message="Whoops, did you get lost?" />} />
		)
	}
}

export default NotFoundScreen;