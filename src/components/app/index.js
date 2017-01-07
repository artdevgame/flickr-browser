import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../header';
import Photo from '../photo';
import PhotoSet from '../photoset';
import './index.css';

import { fetchPublicPhotos, fetchPhotosWithTag } from '../../actions/flickr';

function getPhotos(props) {
	if (props.params.tag) {
		props.fetchPhotosWithTag(props.params.tag);
	} else {
		props.fetchPublicPhotos();
	}
}

class App extends Component {
	componentDidMount() {
		getPhotos(this.props);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.error.hasError) {
			this.props.router.push('/oops');
		}

		if (newProps.params.tag !== this.props.params.tag) {
			getPhotos(newProps);
		}
	}

	render() {
		let content = <div className="loader" />;
		if (!this.props.isLoading) {
			content = <PhotoSet photos={this.props.photos.map((photo, i) => <Photo key={i} {...photo} />)} />;
		}

		return (
			<div className="app">
				<Header filter={this.props.params.tag} />
				{content}
			</div>
		)
	}
}

export default connect(
	(state) => ({
		isLoading: state.photoset.isLoading,
		photos: state.photoset.photos,
		error: state.error,
	}),
	(dispatch) => {
		return bindActionCreators({
			fetchPublicPhotos: fetchPublicPhotos,
			fetchPhotosWithTag: fetchPhotosWithTag
		}, dispatch);
	}
)(App);