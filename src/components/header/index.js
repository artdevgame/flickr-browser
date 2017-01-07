import React, { Component } from 'react';
import { Link } from 'react-router'
import Search from '../search';
import './index.css';

class Header extends Component {
	render() {

		let filter;
		if (this.props.filter) {
			filter = <p className="filter">{this.props.filter}</p>
		}

		return (
			<div className="header">
				<Link to="/" className="header__title link">Flickr Photo Stream</Link>
				{filter}
				<Search />
			</div>
		);
	}
}

export default Header;