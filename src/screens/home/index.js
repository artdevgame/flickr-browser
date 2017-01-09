import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPublicPhotos } from '../../actions/flickr';
import Photo from '../../components/photo';
import PhotoSet from '../../components/photoset';
import App from '../app';

class HomeScreen extends Component {
	componentDidMount() {
		this.props.fetchPublicPhotos();
	}

	render() {
		return (
			<App>
				<PhotoSet photos={this.props.photos.map((photo, i) => <Photo key={i} {...photo} />)} />
			</App>
		)
	}
}

export default connect(
	(state) => ({
		photos: state.photoset.photos,
	}),
	(dispatch) => {
		return bindActionCreators({
			fetchPublicPhotos: fetchPublicPhotos,
		}, dispatch);
	}
)(HomeScreen);