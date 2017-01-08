import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './index.css';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {pattern: this.props.pattern};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.pattern !== this.props.pattern) {
			this.setState({pattern: nextProps.pattern});
		}
	}

	changeListener(event) {
		this.setState({pattern: event.target.value});
	}

	submitListener(event) {
		let {pattern} = this.state;

		if (pattern.replace(/\s+/, '')) {
			this.props.router.push('/search/' + pattern)
		} else {
			this.props.router.push('/');
		}
		event.preventDefault();
	}

	render() {
		return (
			<form className="search" onSubmit={this.submitListener.bind(this)}>
				<input type="text" className="search__input" value={this.state.pattern} onChange={this.changeListener.bind(this)} />
			</form>
		);
	}
}

export default withRouter(Search);