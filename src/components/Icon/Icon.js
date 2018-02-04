import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ src, onClick, className }) => {
	if (!src) return null;
	// As somehow we can't get url from svg-sprite-loader, we'll hardcode it here.
	//  Maybe some day, they will fix it.
	const href = `/assets/images/sprite.svg#${src.id.replace(/-usage/g, '')}`;
	return (
		<span
			role="button"
			onClick={onClick}
			className={className}
		>
			<svg viewBox={src.viewBox}>
				<use xlinkHref={href}/>
			</svg>
		</span>
	);
};

Icon.propTypes = {
	src: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};


export default Icon;
