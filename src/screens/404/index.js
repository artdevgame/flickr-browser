import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorConsumed } from '../../actions';
import ErrorMessage from '../../components/error-message';
import App from '../app';

class NotFoundScreen extends Component {
	componentDidMount() {
		this.props.dispatch(errorConsumed());
	}

	render() {
		return (
			<App content={<ErrorMessage message="Whoops, did you get lost?" />} />
		)
	}
}

export default connect()(NotFoundScreen);