import React from 'react';
import PropTypes from 'prop-types';

const AsyncImage = ({ src, className }) =>
	<img
		className={`lazyload ${className || ''}`}
		src={src}
	/>;


AsyncImage.propTypes = {
	src: PropTypes.string,
	className: PropTypes.string
};

export default AsyncImage;

