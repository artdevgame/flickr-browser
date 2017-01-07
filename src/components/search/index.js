import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPhotosWithText, fetchPublicPhotos } from '../../actions/flickr';
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
		let {search} = this.state;

		if (search.replace(/\s+/, '')) {
			this.props.fetchPhotosWithText(search);
		} else {
			this.props.fetchPublicPhotos();
		}
		event.preventDefault();
	}

	render() {
		return (
			<form className="search" onSubmit={this.submitListener.bind(this)}>
				<input type="text" className="search__input" value={this.state.value} onChange={this.changeListener.bind(this)} />
			</form>
		);
	}
}

export default connect(null, (dispatch) => {
	return bindActionCreators({
		fetchPhotosWithText: fetchPhotosWithText,
		fetchPublicPhotos: fetchPublicPhotos,
	}, dispatch);
})(Search);