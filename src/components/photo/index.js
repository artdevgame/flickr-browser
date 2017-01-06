import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import Tags from '../tags';
import './index.css';

class Photo extends Component {
	render() {
		return (
			<div className="photo">
				<LazyLoad height={200}>
					<div className="photo__image" style={{ backgroundImage: 'url("' + this.props.image + '")'}} />
				</LazyLoad>

				<p className="photo__details">
					<a href={ this.props.link } className="photo__title link">{ this.props.title }</a> by <a href={ this.props.authorUrl } className="photo__author link">{ this.props.author }</a>
				</p>

				<div className="photo__description">{ this.props.description }</div>

				<Tags tags={ this.props.tags } />
			</div>
		);
	}
}

export default Photo;