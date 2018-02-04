import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-danger */

class Html extends React.Component {
	static propTypes = {
		styles: PropTypes.arrayOf(PropTypes.string.isRequired),
		scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
		svgSprite: PropTypes.string.isRequired,
		children: PropTypes.string.isRequired
	};

	static defaultProps = {
		styles: [],
		scripts: []
	};

	render() {
		const { styles, scripts, children, svgSprite } = this.props;
		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					{scripts.map(script => (
						<link
							key={script}
							rel="preload"
							href={script}
							as="script"
						/>
					))}
					{styles.map(style => (
						<link
							key={style}
							rel="stylesheet"
							href={style}
						/>
					))}
				</head>
				<body>
					<div id="app" dangerouslySetInnerHTML={{ __html: children }} />
					{scripts.map(script =>
						<script
							key={script}
							src={script}
						/>
					)}
					<svg>
						<use xlinkHref={svgSprite}/>
					</svg>
				</body>
			</html>
		);
	}
}

export default Html;
