import webpack from 'webpack';
import clientConfig from './webpack/webpack.client.babel';
import serverConfig from './webpack/webpack.server.babel';

/**
 * Creates application bundles from the source files.
 */
function bundle() {
	return new Promise((resolve, reject) => {
		webpack([clientConfig, serverConfig]).run((err, stats) => {
			if (err) {
				return reject(err);
			}

			console.info(stats.toString({
				cached: true,
				cachedAssets: true,
				chunks: true,
				chunkModules: true,
				colors: true,
				hash: true,
				modules: true,
				reasons: true,
				timings: true,
				version: true,
			}));
			if (stats.hasErrors()) {
				return reject(new Error('Webpack compilation errors'));
			}

			return resolve();
		});
	});
}

export default bundle;
