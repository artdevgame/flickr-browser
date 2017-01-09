import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPhotosWithTag } from '../../actions/flickr';
import Photo from '../../components/photo';
import PhotoSet from '../../components/photoset';
import App from '../app';

class TagsScreen extends Component {
	componentDidMount() {
		this.fetchData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.tag !== this.props.params.tag) {
			this.fetchData(nextProps);
		}
	}

	fetchData(props) {
		props.fetchPhotosWithTag(props.params.tag);
	}

	render() {
		return (
			<App title={'Tag: ' + this.props.params.tag} filter={this.props.params.tag}>
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
			fetchPhotosWithTag: fetchPhotosWithTag,
		}, dispatch);
	}
)(TagsScreen);