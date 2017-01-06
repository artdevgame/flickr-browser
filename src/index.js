import React from 'react';
import ReactDOM from 'react-dom';
import FlickrApi from './utils/flickr-api';
import Photo from './components/photo';
import PhotoSet from './components/photoset';
import './normalize.css';
import './index.css';

const api = new FlickrApi(
	process.env.REACT_APP_FLICKR_KEY,
	process.env.REACT_APP_FLICKR_SECRET
);

ReactDOM.render(
	<div className="app">
		<div className="loader" />

	</div>,
	document.getElementById('root')
);

// api.fetchPublicPhotos().then(function (photos) {
// <PhotoSet photos={photos.map(function (photo, i) {
// 			return <Photo key={i} {...photo} />
// 		})} />
// });