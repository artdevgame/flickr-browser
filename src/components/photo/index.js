import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import Tags from '../tags';
import Spinner from '../spinner';
import './index.css';

class Photo extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		const loader = <Spinner />;

		let views;
		if (this.props.views > 0) {
			let count = this.props.views;
			if (count > 99) {
				count = '99+';
			}
			views = <span className="photo__views" title={count + ' views'}>{count}</span>;
		}

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
				{views}
			</div>
		);
	}
}

export default Photo;