export default (className = '', options) => {
	let collectedClassName = className;

	if (options) {
		Object.entries(options).forEach((key, value) => value
			? collectedClassName += key
			: null
		);
	}

	return collectedClassName;
};
