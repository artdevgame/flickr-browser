import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router'
import { fetchPublicPhotos } from '../../actions/flickr';
import Search from '../search';
import './index.css';

class Header extends Component {
	loadPhotos(event) {
		if ('/' === this.props.location.pathname) {
			// if we're already on the homepage, reload the photos
			this.props.fetchPublicPhotos();
			event.preventDefault();
		}
	}

	render() {
		let title;
		if (this.props.title) {
			title = <p className="title">{this.props.title}</p>
		}

		return (
			<div className="header">
				<Link to="/" className="header__title link" onClick={this.loadPhotos.bind(this)}>Flickr Photo Stream</Link>
				{title}
				<Search pattern={this.props.filter} />
			</div>
		);
	}
}

export default connect(null, dispatch => {
	return bindActionCreators({
		fetchPublicPhotos: fetchPublicPhotos,
	}, dispatch);
})(withRouter(Header));