import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPublicPhotos } from '../../actions/flickr';
import Search from '../search';
import './index.css';

class Header extends Component {
	loadPhotos(event) {
		this.props.fetchPublicPhotos();
		event.preventDefault();
	}

	render() {

		let filter;
		if (this.props.filter) {
			filter = <p className="filter">{this.props.filter}</p>
		}

		return (
			<div className="header">
				<a className="header__title link" onClick={this.loadPhotos.bind(this)}>Flickr Photo Stream</a>
				{filter}
				<Search />
			</div>
		);
	}
}

export default connect(null, dispatch => {
	return bindActionCreators({
		fetchPublicPhotos: fetchPublicPhotos,
	}, dispatch);
})(Header);