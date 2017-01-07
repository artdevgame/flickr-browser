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

function fetchPhoto(id, dispatch) {
	return axios.get('/services/rest', {
		params: {
			...defaultParams,
			method: 'flickr.photos.getInfo',
			photo_id: id,
		}
	}).then(function (response) {
		if (200 !== response.status || !response.data.hasOwnProperty('photo')) {
			Promise.reject('No photo found');
		}

		const photo = response.data.photo;
		return Promise.resolve({
			...photo,
			image: getStaticImageUrl(photo),
			link: photo.urls.url[0]._content,
			title: sanitizeHtml(photo.title._content.replace(/\s+/, ''), sanitizeParams) || 'Untitled',
			description: sanitizeHtml(photo.description._content.replace(/\s+/, ''), sanitizeParams),
			authorUrl: '//www.flickr.com/photos/' + photo.owner.nsid,
			author: photo.owner.username,
			tags: photo.tags.tag.filter(function (tag) {
				return tag.machine_tag < 1;
			})
		});
	}, error => dispatch(flickrError(error)));
}

function getStaticImageUrl(photo, size = 'm') {
	return '//farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
}

export function fetchPublicPhotos(tags) {
	return (dispatch) => {
		dispatch(loading());

		let params = {...defaultParams};

		if (tags) {
			params.tags = tags.join();
			params.tagmode = 'any';
		}

		return axios.get('/services/feeds/photos_public.gne', {
			params: params
		}).then(function (response) {
			if (response.data.hasOwnProperty('items') && response.data.items.length) {

				let photoInfo = [];

				// the data from the public api comes unsanitised and incomplete,
				// lookup full photo details from the flickr.photos.getInfo endpoint
				response.data.items.forEach(function (item) {
					photoInfo.push(fetchPhoto(item.link.match(/\/([0-9]+)\/$/)[1], dispatch));
					return item;
				});

				return axios.all(photoInfo);
			}
			return Promise.resolve([]);
		}, error => dispatch(flickrError(error)))
		.then(function (photos) {
			dispatch(photosLoaded(photos));
		}, function (error) { alert(error); })
		.catch(error => dispatch(flickrError(error)));
	}
}

export function fetchPhotosWithTag(tag) {
	return fetchPublicPhotos([tag]);
}