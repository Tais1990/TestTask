import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const isDev = process.env.NODE_ENV !== 'production';

module.exports = require('./webpack.base.babel')({
	name: 'server',

	entry: {
		server: isDev
			? './src/server.js'
			: ['@babel/polyfill', './src/server.js']
	},

	output: {
		path: path.resolve(process.cwd(), 'dist/server'),
		filename: '[name].js',
		libraryTarget: 'commonjs2'
	},

	target: 'node',

	plugins: [
		...(isDev
			? []
			: [
				// Decrease script evaluation time
				// https://github.com/webpack/webpack/blob/master/examples/scope-hoisting/README.md
				new webpack.optimize.ModuleConcatenationPlugin(),
				// Minimize all JavaScript output of chunks
				// https://github.com/webpack-contrib/uglifyjs-webpack-plugin
				new UglifyJsPlugin()
			])
	],

	// Do not replace node globals with polyfills
	// https://webpack.js.org/configuration/node/
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false
	},

	externals: [
		'./assets.json',
	],

	performance: {
		hints: false
	}
});
