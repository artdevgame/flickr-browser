import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPhotosWithText } from '../../actions/flickr';
import Photo from '../../components/photo';
import PhotoSet from '../../components/photoset';
import App from '../app';

class SearchResultsScreen extends Component {
	componentDidMount() {
		this.fetchData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.pattern !== this.props.params.pattern) {
			this.fetchData(nextProps);
		}
	}

	fetchData(props) {
		props.fetchPhotosWithText(props.params.pattern);
	}

	render() {
		return (
			<App title="Search Results" filter={this.props.params.pattern}>
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
			fetchPhotosWithText: fetchPhotosWithText,
		}, dispatch);
	}
)(SearchResultsScreen);