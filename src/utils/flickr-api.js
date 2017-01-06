import axios from 'axios';
import sanitizeHtml from 'sanitize-html';

class FlickrApi {
	constructor(key, secret) {
		this.defaultParams = {
			api_key: key,
			secret: secret,
			format: 'json',
			nojsoncallback: 1,
		};

		// a conservative effort to prevent xss, disallow all tags
		this.sanitizeParams = {
			allowedTags: [],
		};
	}

	fetchPublicPhotos() {
		const self = this;
		return axios.get('/services/feeds/photos_public.gne', {
			params: this.defaultParams
		}).then(function (response) {
			if (response.data.hasOwnProperty('items') && response.data.items.length) {

				let photoInfo = [];

				// the data from the public api comes unsanitised and incomplete,
				// lookup full photo details from the flickr.photos.getInfo endpoint
				response.data.items.forEach(function (item) {
					photoInfo.push(self.fetchPhoto(item.link.match(/\/([0-9]+)\/$/)[1]));
					return item;
				});

				return axios.all(photoInfo);
			}
			return Promise.resolve([]);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	fetchPhoto(id) {
		const self = this;
		return axios.get('/services/rest', {
			params: {
				...this.defaultParams,
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
				image: self.getStaticImageUrl(photo),
				link: photo.urls.url[0]._content,
				title: sanitizeHtml(photo.title._content.replace(/\s+/, ''), self.sanitizeParams) || 'Untitled',
				description: sanitizeHtml(photo.description._content.replace(/\s+/, ''), self.sanitizeParams),
				authorUrl: '//www.flickr.com/photos/' + photo.owner.nsid,
				author: photo.owner.username,
				tags: photo.tags.tag.filter(function (tag) {
					return tag.machine_tag < 1;
				})
			});
		});
	}

	getStaticImageUrl(photo, size = 'm') {
		return '//farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
	}
}

export default FlickrApi;