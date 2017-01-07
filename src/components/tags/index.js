import React, { Component } from 'react';
import { Link } from 'react-router'
import './index.css';

class Tags extends Component {
	render() {
		const tags = this.props.tags.map((tag, i) => {
			return <dd key={i} className="tags__tag"><Link to={'/tags/' + tag._content} className="link">{tag._content}</Link></dd>
		});

		if (!tags.length) {
			return (<div className="tags" />);
		}

		return (
			<dl className="tags">
				<dt className="tags__title">Tags:</dt>
				{tags}
			</dl>
		);
	}
}

export default Tags;