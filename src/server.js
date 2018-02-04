import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

import store from './redux/configureStore';
import App from 'app/App';
import Html from 'app/Html';

import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import config from '../config';

const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
// app.use(express.static('../client'));
app.use('/assets', express.static(path.resolve(process.cwd(), 'dist/client')));  // TODO fix routes
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
	try {
		const context = {};
		const data = {};

		data.children = ReactDOM.renderToString(
			<StaticRouter location={req.url} context={context}>
				<App store={store}>
					{renderRoutes(routes)}
				</App>
			</StaticRouter>
		);
		data.styles = [assets.client.css];
		data.scripts = [assets.vendor.js, assets.client.js];
		if (assets['images/sprite']) { // add svg, only when there is sprite
			data.svgSprite = assets['images/sprite'].svg;
		}

		if (context.url) {
			res.redirect(context.url);
			return;
		}

		const html = ReactDOM.renderToStaticMarkup(
			<Html {...data} />
		);

		res.send(`
			<!doctype html>
			${html}
		`);
	} catch (err) {
		next(err);
	}
});

//
// Launch the server (NOTE: Must be sync with option in runServer.js)
// -----------------------------------------------------------------------------
if (!module.hot) {
	app.listen(config.port, () => {
		console.info(`The server is running at http://localhost:${config.port}/`); // eslint-disable-line no-console
	});
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
	app.hot = module.hot;
	module.hot.accept('app/App');
}

export default app;
