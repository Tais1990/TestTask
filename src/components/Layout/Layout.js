import React from 'react';
import PropTypes from 'prop-types';

class Layout extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired
	};

	render() {
		return (
			<div>
				{/* <Header /> */}
				{this.props.children}
				{/* <Footer /> */}
			</div>
		);
	}
}

export default Layout;
