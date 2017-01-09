import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorConsumed } from '../../actions';
import ErrorMessage from '../../components/error-message';
import App from '../app';

class NotFoundScreen extends Component {
	componentDidMount() {
		this.props.dispatch(errorConsumed());
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<App>
				<ErrorMessage message="Whoops, did you get lost?" />
			</App>
		)
	}
}

export default connect()(NotFoundScreen);