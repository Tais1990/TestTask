import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Layout from 'components/Layout';

import './main.scss';

const App = ({ children, store }) =>
	<Provider store={store}>
		<Layout>
			{children}
		</Layout>
	</Provider>;

App.propTypes = {
	children: PropTypes.element.isRequired,
	store: PropTypes.object.isRequired
};

export default App;
