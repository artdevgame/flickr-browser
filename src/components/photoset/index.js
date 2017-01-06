import React, { Component } from 'react';
import './index.css';

class PhotoSet extends Component {
	render() {
		return (
			<div className="photoset">
				{this.props.photos}
			</div>
		);
	}
}

export default PhotoSet;