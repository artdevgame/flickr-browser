import React, { Component } from 'react';
import './index.css';

class Tags extends Component {
	render() {
		const tags = this.props.tags.map((tag, i) => {
			return <dd key={i} className="tags__tag">{tag._content}</dd>
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