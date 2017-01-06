import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header';
import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/error-message';
import './index.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {content: this.props.content};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error.hasError) {
			const errorMessage = <ErrorMessage message={
				nextProps.error.message || 'An unknown error occurred'
			} />
			this.setState({content: errorMessage});
		} else if (nextProps.isLoading) {
			this.setState({content: <Spinner />});
		} else if (nextProps.content !== this.props.content) {
			this.setState({content: nextProps.content});
		}
	}

	render() {
		return (
			<div className="app">
				<Header title={this.props.title} filter={this.props.filter} />
				{this.state.content}
			</div>
		)
	}
}

export default connect(
	(state) => ({
		isLoading: state.photoset.isLoading,
		error: state.error,
	})
)(App);