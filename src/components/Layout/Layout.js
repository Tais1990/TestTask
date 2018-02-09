import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'components/Footer';

class Layout extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired
	};

	render() {
		return (
			<div>
				<div className ="wrap">
					{/* <Header /> */}
					{this.props.children}
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Layout;
