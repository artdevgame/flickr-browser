import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../header';
import { consumeError } from '../../actions';
import './index.css';

class Error extends Component {
	componentDidMount() {
		this.props.dispatch(consumeError());
	}

	render() {
		let message = 'Nope, nothing here :(';

		if (this.props.error) {
			message = this.props.error;
		} else if (this.props.hasError) {
			message = 'An unknown error occurred';
		}

		return (
			<div className="app">
				<Header />
				<p className="message">{message}</p>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		hasError: state.error.hasError,
		error: state.error.error,
	})
)(Error);