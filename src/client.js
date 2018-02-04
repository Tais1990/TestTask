import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes';

import App from 'app/App';
import routes from './routes';

import store from './redux/configureStore';

hydrate(
	<BrowserRouter>
		<App store={store}>
			{renderRoutes(routes)}
		</App>
	</BrowserRouter>,
	document.getElementById('app'),
);
