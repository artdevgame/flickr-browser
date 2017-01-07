import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import { PHOTOS_LOADING, PHOTOS_LOADING_SUCCESS, ERROR_FLICKR } from './action-types';

const defaultParams = {
	api_key: process.env.REACT_APP_FLICKR_KEY,
	secret: process.env.REACT_APP_FLICKR_SECRET,
	format: 'json',
	nojsoncallback: 1,
};

// an effort to prevent xss, disallow all tags
const sanitizeParams = {
	allowedTags: [],
};

function loading() {
	return {
		type: PHOTOS_LOADING,
		data: {
			isLoading: true,
			photos: [],
		}
	};
}

function photosLoaded(photos) {
	return {
		type: PHOTOS_LOADING_SUCCESS,
		data: {
			isLoading: false,
			photos: photos,
		}
	}
}

function flickrError(error) {
	return {
		type: ERROR_FLICKR,
		data: {
			error: error
		}
	}
}

function getStaticImageUrl(photo, size = 'm') {
	return '//farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
}

function initPhoto(photo) {
	return {
		...photo,
		image: getStaticImageUrl(photo),
		link: '//www.flickr.com/photos/' + photo.owner + '/' + photo.id,
		title: sanitizeHtml(photo.title.replace(/\s+/, ''), sanitizeParams) || 'Untitled',
		description: sanitizeHtml(photo.description._content.replace(/\s+/, ''), sanitizeParams),
		authorUrl: '//www.flickr.com/photos/' + photo.owner,
		author: photo.ownername,
		tags: photo.tags.split(' ').filter(tag => tag)
	};
}

export function fetchPublicPhotos(filter) {
	return dispatch => {
		dispatch(loading());

		let params = {
			...defaultParams,
			method: 'flickr.photos.getRecent',
			extras: [
				'description',
				'owner_name',
				'tags',
				'views',
			].join()
		};

		if (filter) {
			filter = filter.filter(keyword => keyword);
			if (filter.length) {
				params.text = filter.join();
				params.method = 'flickr.photos.search';
			}
		}

		return axios.get('/services/rest', {
			params: params
		}).then(response => {
			if ('ok' === response.data.stat) {
				return Promise.resolve(response.data.photos);
			}
			return Promise.reject(response.data.message);
		})
		.then(photoData => {
			const photos = photoData.photo.map(function (photo) {
				return initPhoto(photo);
			});
			dispatch(photosLoaded(photos));
		})
		.catch(error => dispatch(flickrError(error)));
	}
}

export function fetchPhotosWithTag(tag) {
	return fetchPublicPhotos([tag]);
}

export function fetchPhotosWithText(text) {
	return fetchPublicPhotos(text.split(',').map(keyword => keyword.trim()));
}