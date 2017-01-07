import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import Tags from '../tags';
import './index.css';

class Photo extends Component {
	render() {

		const loader = <div className="loader" />;

		return (
			<div className="photo">
				<LazyLoad height={150} once placeholder={loader}>
					<a href={ this.props.link } className="photo__image" style={{ backgroundImage: 'url("' + this.props.image + '")'}} />
				</LazyLoad>

				<p className="photo__details">
					<a href={ this.props.link } className="photo__title link">{ this.props.title }</a>
					<span className="fixed-col">by</span>
					<a href={ this.props.authorUrl } className="photo__author link">{ this.props.author }</a>
				</p>

				<div className="photo__description">{ this.props.description }</div>

				<Tags tags={ this.props.tags } />
			</div>
		);
	}
}

export default Photo;