import React, { Component } from 'react';
import './index.css';

class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {search: ''};
	}

	changeListener(event) {
		this.setState({search: event.target.value});
	}

	submitListener(event) {
		console.log('Current state', this.state);
		event.preventDefault();
	}

	render() {
		return (
			<form className="search" onSubmit={this.submitListener}>
				<input type="text" className="search__input" value={this.state.value} onChange={this.changeListener} />
			</form>
		);
	}
}

export default Search;